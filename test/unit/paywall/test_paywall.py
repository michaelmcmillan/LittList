from unittest import TestCase, skip
from datetime import datetime as dt, timedelta as delta
from paywall import Paywall, Customer

class TestPaywall(TestCase):

    def test_customer_has_no_state_by_default(self):
        paywall = Paywall()
        customer = Customer('95015843')
        status = paywall.get_status(customer)
        self.assertEqual(status, None)

    def test_customer_is_unackknowledged_after_requesting_payment(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer)
        status = paywall.get_status(customer)
        self.assertEqual(status, paywall.status['unacknowledged'])

    def test_customer_is_not_allowed_to_request_payment_if_he_has_access(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer)
        paywall.received_payment(customer)
        with self.assertRaises(Exception):
            paywall.request_payment(customer)

    def test_customer_is_granted_access_if_unacknowledged_for_1_minute(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer, when=dt.now()-delta(minutes=1))
        status = paywall.get_status(customer)
        self.assertEqual(status, paywall.status['timeout'])
        self.assertTrue(paywall.has_access(customer))

    def test_customer_is_acknowledged_after_admin_acknowledges(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer)
        paywall.acknowledge(customer)
        status = paywall.get_status(customer)
        self.assertEqual(status, paywall.status['acknowledged'])

    def test_customer_is_granted_access_if_acknowledged_for_2_minutes(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer, when=dt.now()-delta(minutes=5))
        paywall.acknowledge(customer, when=dt.now()-delta(minutes=3))
        status = paywall.get_status(customer)
        self.assertEqual(status, paywall.status['timeout'])
        self.assertTrue(paywall.has_access(customer))

    def test_customer_is_responded_if_admin_has_sent_request(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer)
        paywall.acknowledge(customer)
        paywall.responded(customer)
        status = paywall.get_status(customer)
        self.assertEqual(status, paywall.status['responded'])

    def test_customer_has_paid_if_admin_received_payment(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer)
        paywall.acknowledge(customer)
        paywall.responded(customer)
        paywall.received_payment(customer)
        status = paywall.get_status(customer)
        self.assertEqual(status, paywall.status['paid'])
        self.assertTrue(paywall.has_access(customer))

    def test_customer_is_not_granted_access_if_paid_for_20_minutes_ago(self):
        paywall = Paywall()
        customer = Customer('95015843')
        paywall.request_payment(customer)
        paywall.acknowledge(customer)
        paywall.responded(customer)
        paywall.received_payment(customer, when=dt.now()-delta(minutes=20))
        status = paywall.get_status(customer)
        self.assertEqual(status, None)
        self.assertFalse(paywall.has_access(customer))
