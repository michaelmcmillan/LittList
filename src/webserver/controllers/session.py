from flask import session
from webserver.services import repository 

class SessionController:

    @staticmethod
    def initiate():
        if 'customer_id' not in session:
            session['customer_id'] = 'anonymous'
            session['bibliography_id'] = repository.create([])
