from flask import render_template, session, request, g, redirect, url_for
from paywall import User, Paywall

class PaywallController:

    @staticmethod
    def status():
        customer = User(session['user_id'])
        status = g.paywall.get_status(customer)
        return render_template('paywall.html', status=status)

    @staticmethod
    def ask_to_pay():
        customer = User(request.form.get('phone_number'))
        g.paywall.customer_asks_to_pay(customer)
        return redirect(url_for('status'))
