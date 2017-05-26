from flask import Flask, g
from webserver.controllers import *

app = Flask(__name__, static_folder='assets', static_url_path='')
app.secret_key = 'secret'

app.before_request(SessionController.initiate)
app.add_url_rule('/', 'index', view_func=SearchController.index)
app.add_url_rule('/search', 'search', view_func=SearchController.search)
app.add_url_rule('/search', 'add_or_remove', view_func=SearchController.add_or_remove, methods=['POST'])
app.add_url_rule('/bibliography', 'render', view_func=BibliographyController.render)
app.add_url_rule('/bibliography', 'remove', view_func=BibliographyController.remove, methods=['POST'])
app.add_url_rule('/paywall', 'status', view_func=PaywallController.status)
app.add_url_rule('/paywall', 'ask_to_pay', view_func=PaywallController.ask_to_pay, methods=['POST'])
