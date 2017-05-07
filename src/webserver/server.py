from library import Library
from paywall import Paywall
from bibliography import BibliographyRepository
from flask import Flask, render_template, request as req, redirect, url_for, session

app = Flask(__name__, static_folder='assets', static_url_path='')
library, paywall, repo = Library(), Paywall(), BibliographyRepository('./data')
app.secret_key = 'secret'

@app.before_request
def assign_user():
    if not 'user_id' not in session:
        session['user_id'] = 'anonymous'
        session['bibliography_id'] = repo.create(session['user_id'], [])

@app.route('/')
def search():
    return render_template('search.html')

@app.route('/search')
def results():
    query = req.args.get('q', None)
    results = library.search(query)
    bibliography = repo.read(**session)
    return render_template('results.html', results=results, bibliography=bibliography)

@app.route('/search', methods=['POST'])
def modify():
    repo.add(**session, identifier=req.form.get('add', None))
    repo.remove(**session, identifier=req.form.get('remove', None))
    return redirect(url_for('results', query=req.args.get('q')))

@app.route('/bibliography')
def bibliography():
    bibliography = repo.read(**session)
    return render_template('bibliography.html', bibliography=bibliography)

@app.route('/paywall')
def pay():
    customer = 'lol'
    status = paywall.get_status(customer)
    return render_template('paywall.html', status=status)

@app.route('/paywall', methods=['POST'])
def asks_to_pay():
    customer = User(req.form.get('phone_number', None))
    paywall.customer_asks_to_pay(customer)
    return redirect(url_for('paywall'))
