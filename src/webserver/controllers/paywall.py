from configuration import Configuration
from webserver.services import paywall
from flask import render_template, session, request, redirect, url_for
from paywall import Customer

class PaywallController:

    @staticmethod
    def status():
        customer = Customer(session['customer_id'])
        statuses = paywall.status
        status = paywall.get_status(customer)
        on_hold = status in (statuses['unacknowledged'], statuses['acknowledged'], statuses['responded'])
        return render_template('paywall.html', status=status, on_hold=on_hold, statuses=statuses)

    @staticmethod
    def ask_to_pay():
        session['customer_id'] = request.form.get('phone_number')
        customer = Customer(session['customer_id'])
        paywall.request_payment(customer)
        return redirect(url_for('status'))

    @staticmethod
    def admin():
        secret = request.args.get('secret')
        action = request.args.get('action')
        customer = Customer(request.args.get('phone_number'))
        if secret == Configuration.admin_secret:
            getattr(paywall, action)(customer)
            return '✓'
        else:
            return 'X'
