from googlecalendarapi import main
from httplib2 import Http
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from oauth2client import file, client, tools

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None
def createEvent():
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    store = file.Storage('storage.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('client_secret.json', SCOPES)
        creds = tools.run_flow(flow, store, flags) \
            if flags else tools.run(flow,store)
    CAL = build('calendar', 'v3', http=creds.authorize(Http()))
    GMT_OFF = '-05:00'
    event = {
        'summary': 'Need a worker',
        'description':'Needs worker',
        'start' : {"dateTime": '2021-11-21T19:00:00%s' % GMT_OFF},
        'end' : {"dateTime": '2021-11-22T23:00:00%s' % GMT_OFF}
    } #will use front end to create event, this is just a demo

    ev = CAL.events().insert(calendarId='qij1ole8gr85v1dklbo6d5mok4@group.calendar.google.com',sendNotifications=True, body=event).execute()

    print('''*** %r event added: 
        Start: %s
        End: %s''' % (ev['summary'].encode('utf-8'),
            ev['start']['dateTime'],ev['end']['dateTime']))

