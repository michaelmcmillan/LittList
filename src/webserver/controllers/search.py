from flask import render_template as render, session, request, redirect, url_for, g
from webserver.services import library, repository

class SearchController:

    @staticmethod
    def index():
        return render('search.html')

    @staticmethod
    def search():
        query = request.args.get('q', '')
        results = library.search(query)
        bibliography = repository.read(session['bibliography_id'])
        return render('results.html', query=query, results=results, bibliography=bibliography)

    @staticmethod
    def add_or_remove():
        identifier_to_add = request.form.get('add', None)
        identifier_to_remove = request.form.get('remove', None)
        session['bibliography_id'] = repository.add(session['bibliography_id'], identifier=identifier_to_add)
        session['bibliography_id'] = repository.remove(session['bibliography_id'], identifier=identifier_to_remove)
        return redirect(url_for('search', q=request.args.get('q', '')))
