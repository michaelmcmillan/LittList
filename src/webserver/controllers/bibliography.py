from paywall import Customer
from flask import session, request, redirect, url_for, render_template
from webserver.services import paywall, repository, generator, notifier

class BibliographyController:

    @staticmethod
    def render():
        customer = Customer(session['customer_id'])
        bibliography_id = session['bibliography_id']
        bibliography = repository.read(bibliography_id)
        notifier.customer_rendered(customer, bibliography)
        output, formatted_bibliography = generator.render(customer, bibliography_id)
        return render_template(
            'bibliography.html',
            output=output,
            formatted_bibliography=formatted_bibliography,
            bibliography=bibliography
        )

    @staticmethod
    def modify():
        style = request.form.get('style', None)
        session['bibliography_id'] = repository.change_style(session['bibliography_id'], style=style)
        for identifier in request.form.getlist('identifier[]'):
            session['bibliography_id'] = repository.remove(session['bibliography_id'], identifier=identifier)
        return redirect(url_for('render'))
