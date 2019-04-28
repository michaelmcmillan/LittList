from flask import Flask, g
from webserver.controllers import *
from configuration import Configuration

app = Flask(__name__, static_folder='assets', static_url_path='')
app.secret_key = Configuration.session_secret
app.jinja_env.globals.update(type=lambda reference: reference.__class__.__name__)

app.before_request(SessionController.initiate)
app.add_url_rule('/', 'index', view_func=SearchController.index)
app.add_url_rule('/search', 'search', view_func=SearchController.search)
app.add_url_rule('/search', 'add_or_remove', view_func=SearchController.add_or_remove, methods=['POST'])
app.add_url_rule('/bibliography', 'render', view_func=BibliographyController.render)
app.add_url_rule('/bibliography', 'modify', view_func=BibliographyController.modify, methods=['POST'])
app.add_url_rule('/survey', 'answer_survey', view_func=BibliographyController.answer_survey, methods=['POST'])
app.add_url_rule('/paywall', 'status', view_func=PaywallController.status)
app.add_url_rule('/paywall', 'ask_to_pay', view_func=PaywallController.ask_to_pay, methods=['POST'])
app.add_url_rule('/paywall/admin', 'admin', view_func=PaywallController.admin, methods=['GET'])
