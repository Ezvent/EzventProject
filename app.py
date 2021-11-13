import flask
import os
import json
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    UserMixin,
    logout_user,
    login_user,
    current_user,
    login_required,
)


app = flask.Flask(__name__, static_folder="./build/static")
bp = flask.Blueprint("bp", __name__, template_folder="./build")

###delete this### 
isAdmin = True


@bp.route("/index")
# @login_required
def index():
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )


@app.route("/")
def home():
    return "Hello. Go to /index to see the React page"


app.register_blueprint(bp)


#region Login Routes


@app.route("/")
def index():
    return flask.render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    
    user = flask.request.get_json()["user"]
    pswd = flask.request.get_json()["pswd"]

    #password matches?
    print(user)
    print(pswd)

    return flask.redirect("/login/updatecalendar")

@app.route("/login/updatecalendar")
def update_google_calendar():
    # update calendar logic
    # check if user is admin
    if(isAdmin):
        return flask.redirect("/adminhomepage")
    return flask.redirect("/userhomepage")

#endregion
 







#region User Homepage routes

# we need to figure out at when to get the pending requests to load it up when the page opens
@app.route("/userhomepage")
def render_userhomepage():
    # probably going to try and get the pending events here with a call to "somefile.py"
    return flask.render_template("userhomepage.html")
    

@app.route("/acceptevent")
def accept_event_request():
    # add event with user's nickname or email to calendar
    # remove from events pending list

    return 0 # not sure how to handle the return here


@app.route("/rejectevent")
def reject_event_request():
    # remove from events pending list
    # notify admin of rejection

    return 0 # again not sure how to handle the return here

#endregion








#region Admin Homepage routes

@app.route("/adminhomepage")
def render_adminhomepage():
    return flask.render_template("adminhomepage.html")

@app.route("/createuser")
def create_user():
    # change the swappable window element to "create new user" template
    # add new user to user database logic
    return flask.render_template("adminhomepage.html")

@app.route("/removeuser")
def render_adminhomepage():
    #  change the swappable window element to "list of users you can remove" template
    #  remove user from database logic
   return flask.render_template("adminhomepage.html")

@app.route("/showcalendar")
def render_calendar():
    #change swappable window element to show the google calendar
    #update the google calendar state
    return 0 # also not sure what to return here

@app.route("/createeventrequest")
def create_new_event():
    #change swappable window element to show the the "create new event" template
    #create new event Logic
    return flask.redirect("/sendoutnewrequest")
  
@app.route("/sendoutnewrequest")
def send_request_to_users():
    #send new request to users logic
    return flask.render_template("adminhomepage.html")

#endregion

#region Routes for both employees and Admin

@app.route("/changepassword")
def change_password():
    #change password logic
    return flask.redirect("/userhomepage")

@app.route("/logout")
def logout_session():
    #logout logic
    return flask.redirect("/")

#endregion

app.run(host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8081)), debug=True)
