﻿# Ezvent App
 
#Heroku App Link.
http://intense-coast-41258.herokuapp.com

# what does this app do?
App is design to schedule the working hours for the employee.
This is secure app with Google login for Admin and Employe users.
Only admin can setu setuo the employee role and functionally. Admin can add/delete/ change role of an user.
Create event deatils and delete it if its cancelled.
Admin can sechdule your event online and send work request via email with event details.
Employee can see the global calendar with the event details of the month
Employee can print or copy the event details to his personal calendar. 
(Need to refresh the app after adding the event to the calendar).

# Requirements
- pip3 install -r requirements.txt
- pip3 install Flask-Mail
- npm install

# Run Application
- npm run build
- python3 app.py 

# API Secrets requirnment
Google oAUTH credentials
Google calendar credenstials
