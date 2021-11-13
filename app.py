from flask import (
    Flask,
    redirect,
    url_for,
    session,
    Blueprint,
    jsonify,
    render_template,
    request,
)
from authlib.integrations.flask_client import OAuth
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import EmailType
from gmail import get_credentials, create_message, send_message

import json
import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder="./build/static")
# Point SQLAlchemy to your Heroku database
db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "your secret"

db = SQLAlchemy(app)


class Allusers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True)
    is_admin = db.Column(db.Boolean, unique=False, default=False)
    nickname = db.Column(db.String, unique=False, default=None)

    def __repr__(self):
        return f"<email: {self.email}>"


db.create_all()


# oauth config
oauth = OAuth(app)

google = oauth.register(
    name="google",
    client_id="437004354025-2fp5btncj22trld1ihbctqnp9ltpa5ut.apps.googleusercontent.com",
    client_secret="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",
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorized_params=None,
    api_base_url="https://www.googleapis.com/oauth2/v1/",
    client_kwargs={"scope": "openid profile email"},
)


# This tells our Flask app to look at the results of `npm build` instead of the
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.


bp = Blueprint("bp", __name__, template_folder="./build")


def getData():
    user = Allusers.query.filter_by(email="pateljahnavi0@gmail.com").first()
    if not user:
        admin = Allusers(
            # default Admin
            email="pateljahnavi0@gmail.com",
            is_admin=True,
            nickname="Jahnavi",
        )
        db.session.add(admin)
        db.session.commit()
    email = dict(session).get("email", None)
    # nickname = dict(session).get('nickname', None)
    user = Allusers.query.filter_by(email=email).first()
    if user:
        pass

    else:
        user = Allusers(email=email, nickname=None)
        db.session.add(user)
        db.session.commit()

    DATA = {"email": email, "is_admin": user.is_admin}
    data = json.dumps(DATA)
    return data


@bp.route("/")
def index():
    data = getData()
    return render_template(
        "index.html",
        data=data,
    )


app.register_blueprint(bp)


@app.route("/login")
def login():
    google = oauth.create_client("google")
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route("/callback")
def authorize():
    google = oauth.create_client("google")
    token = google.authorize_access_token()
    resp = google.get("userinfo")
    user_info = resp.json()
    session["email"] = user_info["email"]
    # session['nickname'] = user_info['family_name']
    # do something with the token and profile

    return redirect("/")


@app.route("/logout")
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect("/")


@app.route("/adduser", methods=["POST"])
def addUser():
    user = request.json["data"]
    db_user = Allusers.query.filter_by(email=user["email"]).first()
    if db_user:
        db_user.is_admin = user["is_admin"]
        db.session.commit()
    else:
        new_user = Allusers(
            email=user["email"], is_admin=user["is_admin"], nickname=None
        )
        db.session.add(new_user)
        db.session.commit()

    return jsonify({"message": "Sucessfully added"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
