from paywall import Customer
from configuration import Configuration
from flask import session, request, redirect, url_for, render_template
from webserver.services import paywall, repository, generator, notifier

class BibliographyController:

    @staticmethod
    def render():
        customer = Customer(session['customer_id'])
        bibliography_id = session['bibliography_id']
        bibliography = repository.read(bibliography_id)
        rendered_bibliography = generator.render(customer, bibliography_id)
        contains_blurred = any((entry[0] for entry in rendered_bibliography))
        return render_template(
            'bibliography.html',
            blurred=contains_blurred,
            price=Configuration.price,
            rendered_bibliography=rendered_bibliography,
            bibliography=bibliography
        )

    @staticmethod
    def modify():
        style = request.form.get('style', None)
        language = request.form.get('language', None)
        identifier = request.form.get('identifier', None)
        session['bibliography_id'] = repository.change_style(session['bibliography_id'], style=style)
        session['bibliography_id'] = repository.remove(session['bibliography_id'], identifier=identifier)
        session['bibliography_id'] = repository.change_language(session['bibliography_id'], language=language)
        return redirect(url_for('render'))
