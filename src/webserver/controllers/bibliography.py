from paywall import User
from webserver.services import paywall, repository, generator
from flask import session, request, redirect, url_for, render_template, g

class BibliographyController:

    @staticmethod
    def render():
        user = User(session['user_id'])
        bibliography = repository.read(**session)
        bibliography_id = session['bibliography_id']
        output, formatted_bibliography = generator.render(user, bibliography_id)
        return render_template(
            'bibliography.html',
            output=output,
            formatted_bibliography=formatted_bibliography,
            bibliography=bibliography
        )

    @staticmethod
    def remove():
        for identifier in request.form.getlist('identifier[]'):
            repository.remove(**session, identifier=identifier)
        return redirect(url_for('render'))
