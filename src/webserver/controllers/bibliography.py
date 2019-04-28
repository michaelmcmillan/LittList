from schools import schools
from paywall import Customer, Notifier
from configuration import Configuration
from flask import session, request, redirect, url_for, render_template
from webserver.services import paywall, repository, generator, notifier

class BibliographyController:

    @staticmethod
    def render():
        customer = Customer(session['customer_id'])
        bibliography_id = session['bibliography_id']
        taken_survey = session.get('taken_survey', False)
        bibliography = repository.read(bibliography_id)
        override_has_payed = taken_survey
        rendered_bibliography = generator.render(customer, bibliography_id, override_has_payed)
        contains_blurred = any((not entry[0] for entry in rendered_bibliography))
        return render_template(
            'bibliography.html',
            schools=schools,
            taken_survey=taken_survey,
            blurred=contains_blurred,
            price=Configuration.price,
            rendered_bibliography=rendered_bibliography,
            bibliography=bibliography
        )

    @staticmethod
    def answer_survey():
        selected_school = request.form.get('school', None)
        session['taken_survey'] = True
        Notifier.survey_was_answered(selected_school)
        return redirect(url_for('render'))

    @staticmethod
    def modify():
        style = request.form.get('style', None)
        language = request.form.get('language', None)
        identifier = request.form.get('identifier', None)
        session['bibliography_id'] = repository.change_style(session['bibliography_id'], style=style)
        session['bibliography_id'] = repository.remove(session['bibliography_id'], identifier=identifier)
        session['bibliography_id'] = repository.change_language(session['bibliography_id'], language=language)
        return redirect(url_for('render'))
