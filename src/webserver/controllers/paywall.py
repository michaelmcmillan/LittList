from webserver.services import paywall
from flask import render_template, session, request, g, redirect, url_for
from paywall import Customer

class PaywallController:

    @staticmethod
    def status():
        customer = Customer(session['customer_id'])
        status = paywall.get_status(customer)
        return render_template('paywall.html', status=status, statuses=paywall.status)

    @staticmethod
    def ask_to_pay():
        session['customer_id'] = request.form.get('phone_number')
        customer = Customer(session['customer_id'])
        paywall.request_payment(customer)
        return redirect(url_for('status'))
