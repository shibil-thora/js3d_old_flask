import firebase_admin
from firebase_admin import credentials, messaging


def run(): 
    print('hi')

    
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

   
    registration_token = "ezNPggPYQnyYNZ9KD5Nwxx:APA91bFvS9rO4L_yIJ8pr_PcNDfdzHPP3LbqczB5M6PYkTIyphTwp2rW9-fwhVUE-hWoB2lRMjFavqlqkqROP5YNpDtFu-ZH9Gni2BmvuvOkQ8YjXuWhtHI"
 
    message = messaging.Message(
        notification=messaging.Notification(
            title="Hello from Python 👋",
            body="This is a test push notification via Firebase Admin SDK.",
        ),
        token=registration_token,
    )


    response = messaging.send(message)
    print("✅ Successfully sent message:", response)

if __name__ == '__main__': 
    run()