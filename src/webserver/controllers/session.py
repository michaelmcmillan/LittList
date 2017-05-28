from flask import session
from webserver.services import repository 

class SessionController:

    @staticmethod
    def initiate():
        if 'user_id' not in session:
            session['user_id'] = 'anonymous'
            session['bibliography_id'] = repository.create(session['user_id'], [])
