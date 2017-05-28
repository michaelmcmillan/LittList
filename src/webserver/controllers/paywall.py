from webserver.services import paywall
from flask import render_template, session, request, g, redirect, url_for
from paywall import User

class PaywallController:

    @staticmethod
    def status():
        customer = User(session['user_id'])
        status = paywall.get_status(customer)
        return render_template('paywall.html', status=status)

    @staticmethod
    def ask_to_pay():
        customer = User(request.form.get('phone_number'))
        paywall.customer_asks_to_pay(customer)
        return redirect(url_for('status'))
