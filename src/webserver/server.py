from paywall import User
from library import Library
from paywall import Paywall
from bibliography import BibliographyRepository, BibliographyGenerator
from flask import Flask, render_template, request, redirect, url_for, session, send_file

app = Flask(__name__, static_folder='assets', static_url_path='')
app.secret_key = 'secret'

library, paywall, repo, generator = \
    Library(), Paywall(), BibliographyRepository('./data'), BibliographyGenerator()

@app.before_request
def assign_user():
    if 'user_id' not in session:
        session['user_id'] = 'anonymous'
        session['bibliography_id'] = repo.create(session['user_id'], [])

@app.route('/')
def search():
    return render_template('search.html')

@app.route('/search')
def results():
    query = request.args.get('q', '')
    results = library.search(query)
    bibliography = repo.read(**session)
    return render_template('results.html', query=query, results=results, bibliography=bibliography)

@app.route('/search', methods=['POST'])
def modify():
    repo.add(**session, identifier=request.form.get('add', None))
    repo.remove(**session, identifier=request.form.get('remove', None))
    return redirect(url_for('results', q=request.args.get('q', '')))

@app.route('/bibliography', methods=['POST'])
def remove():
    for identifier in request.form.getlist('identifier[]'):
        repo.remove(**session, identifier=identifier)
    return redirect(url_for('bibliography'))

@app.route('/bibliography')
def bibliography():
    bibliography = repo.read(**session)
    user = User(session['user_id'])
    bibliography_id = session['bibliography_id']
    output, formatted_bibliography = generator.get_formatted_bibliography(user, bibliography_id)
    return render_template('bibliography.html', output=output, formatted_bibliography=formatted_bibliography, bibliography=bibliography)

@app.route('/paywall')
def pay():
    customer = User('95015843')
    status = paywall.get_status(customer)
    return render_template('paywall.html', status=status)

@app.route('/paywall', methods=['POST'])
def asks_to_pay():
    customer = User(request.form.get('phone_number'))
    paywall.customer_asks_to_pay(customer)
    return redirect(url_for('pay'))
