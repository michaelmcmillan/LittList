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
        output, formatted_bibliography = generator.render(customer, bibliography_id)
        return render_template(
            'bibliography.html',
            price=Configuration.price,
            output=output,
            formatted_bibliography=formatted_bibliography,
            bibliography=bibliography
        )

    @staticmethod
    def modify():
        style = request.form.get('style', None)
        identifier = request.form.get('identifier', None)
        session['bibliography_id'] = repository.change_style(session['bibliography_id'], style=style)
        session['bibliography_id'] = repository.remove(session['bibliography_id'], identifier=identifier)
        return redirect(url_for('render'))
