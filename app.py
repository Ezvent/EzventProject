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
from flask_mail import Mail, Message
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
import datetime
from datetime import timedelta
import os.path
import json
import os

import secret

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
app.secret_key = os.getenv("APP_SECRET_KEY")

SCOPES = ["https://www.googleapis.com/auth/calendar"]

# mail configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
app.config["MAIL_USERNAME"] = os.getenv("admin_email")
app.config["MAIL_PASSWORD"] = os.getenv("password")
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
mail = Mail(app)

db = SQLAlchemy(app)


class Allusers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True)
    is_admin = db.Column(db.Boolean, unique=False, default=False)
    nickname = db.Column(db.String, unique=False, default=None)

    def __repr__(self):
        return f"{self.email}"


db.create_all()


# oauth config
oauth = OAuth(app)


google = oauth.register(
    name="google",
    client_id=secret.client_id,
    client_secret=secret.client_secret,
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

creds = None
# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    print(creds)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        print("here")
    else:
        flow = InstalledAppFlow.from_client_secrets_file("client_secret.json", SCOPES)
        creds = flow.run_local_server(port=5000)
        print(creds)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
        token.write(creds.to_json())

service = build("calendar", "v3", credentials=creds)

bp = Blueprint("bp", __name__, template_folder="./build")


def create_event(start_date_time, summary, duration=1, description=None, location=None):

    end_time = start_date_time + timedelta(hours=duration)
    event = {
        "summary": summary,
        "location": location,
        "description": description,
        "start": {
            "dateTime": start_date_time.strftime("%Y-%m-%dT%H:%M:%S"),
            "timeZone": "America/New_York",
        },
        "end": {
            "dateTime": end_time.strftime("%Y-%m-%dT%H:%M:%S"),
            "timeZone": "America/New_York",
        },
        "reminders": {
            "useDefault": False,
            "overrides": [
                {"method": "email", "minutes": 24 * 60},
                {"method": "popup", "minutes": 10},
            ],
        },
    }
    return (
        service.events()
        .insert(
            calendarId="qb4oq3kl7h98fvkvudmq98mpqg@group.calendar.google.com",
            body=event,
        )
        .execute()
    )


def getData():
    user = Allusers.query.filter_by(email=os.getenv("admin_email")).first()
    if not user:
        admin = Allusers(email=os.getenv("admin_email"), is_admin=True, nickname="None")
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

    return redirect("/")


@app.route("/logout")
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect("/")


@app.route("/adduser", methods=["POST"])
def addUser():
    try:
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
        message = "successfull"
    except:
        message = ""
    finally:
        print("code running...")

    return jsonify({"message": message})


@app.route("/removeuser", methods=["POST"])
def removeUser():
    try:
        user = request.json["data"]
        db_user = Allusers.query.filter_by(email=user["email"]).first()
        print(db_user)
        if db_user:
            Allusers.query.filter_by(id=db_user.id).delete()
            db.session.commit()
            print("what happened here")
            message = "successfull"

        else:
            message = ""
    except:
        message = ""
    finally:
        print("code running...")

    return jsonify({"message": message})


@app.route("/getallusers")
def getallUser():

    email = dict(session).get("email", None)
    users = []
    user = Allusers.query.filter_by(email=email).first()
    if user and user.is_admin:
        general_users = Allusers.query.filter_by(is_admin=False).all()

        admins = Allusers.query.filter_by(is_admin=True).all()
        all_users = general_users + admins
        print(general_users)
        print(admins)
        print(all_users)
        for user in all_users:
            if user.email:
                users.append(user.email)

    return jsonify({"email": users})


@app.route("/sendmail", methods=["POST"])
def SendMail():
    data = request.json["data"]
    print(data)
    msg = Message(
        data["job_description"],
        sender=os.getenv("admin_email"),
        recipients=data["emails"],
    )

    dateandtime = data["select_a_date"] + " " + data["start_time"]
    dateandtime = datetime.datetime.strptime(dateandtime, "%Y-%m-%d %H:%M")
    ev = create_event(dateandtime, data["job_description"])

    msg.body = f'{data["job_description"]}\n selected event date: {data["select_a_date"]} \n start time: {data["start_time"]} \n end time: {data["end_time"]} \n {ev["htmlLink"]} \n \n'
    mail.send(msg)

    return jsonify({"message": "success"})


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8081)), debug=True
    )
