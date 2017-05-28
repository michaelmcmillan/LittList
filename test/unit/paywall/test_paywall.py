from unittest import TestCase, skip
from os import remove
from datetime import datetime as dt, timedelta as delta
from concurrent.futures import ThreadPoolExecutor
from paywall import Paywall, User

class TestPaywall(TestCase):

    def setUp(self): self.cleanUp()
    def tearDown(self): self.cleanUp()
    def cleanUp(self):
        try:
            remove('ledger.pickle')
        except:
            pass

    def test_user_that_requests_payment_is_put_on_hold(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.customer_asks_to_pay(user)
        self.assertEqual(paywall.get_status(user), paywall.STATUS['HOLD'])

    @skip('pending')
    def test_user_that_did_not_request_payment_is_asked_to_do_so(self):
        user = User('95015843')
        paywall = Paywall()
        self.assertEqual(paywall.get_status(user), paywall.STATUS['PAY'])

    def test_owner_is_pinged_when_customer_asks_to_pay(self):
        user = User('95015843')
        paywall = Paywall()
        with self.assertLogs('Paywall') as logger:
            paywall.customer_asks_to_pay(user)
            self.assertIn('95015843', logger.output[0])

    def test_user_is_granted_access_when_owner_receives_payment(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.customer_asks_to_pay(user)
        paywall.owner_received_payment(user)
        self.assertEqual(paywall.get_status(user), paywall.STATUS['ACCESS'])

    def test_user_loses_access_if_he_starts_over(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.customer_asks_to_pay(user)
        paywall.owner_received_payment(user)
        paywall.customer_asks_to_start_over(user)
        self.assertEqual(paywall.get_status(user), paywall.STATUS['HOLD'])

    def test_user_does_not_lose_access_if_asks_to_pay_after_granted_access(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.customer_asks_to_pay(user)
        paywall.owner_received_payment(user)
        paywall.customer_asks_to_pay(user)
        self.assertEqual(paywall.get_status(user), paywall.STATUS['ACCESS'])
