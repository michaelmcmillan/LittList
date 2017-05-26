from flask import session, g
from paywall import Paywall
from library import Library
from bibliography import BibliographyRepository, BibliographyGenerator

class SessionController:

    @staticmethod
    def initiate():
        g.library = Library()
        g.paywall = Paywall()
        g.generator = BibliographyGenerator()
        g.repository = BibliographyRepository('./data')

        if 'user_id' not in session:
            session['user_id'] = 'anonymous'
            session['bibliography_id'] = g.repository.create(session['user_id'], [])
