from unittest import TestCase
from os import remove
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor
from paywall import Paywall, User

class TestPaywall(TestCase):

    def cleanUp(self):
        try:
            remove('ledger.pickle')
        except:
            pass

    def setUp(self):
        self.cleanUp()

    def tearDown(self):
        self.cleanUp()

    def test_user_that_has_access_is_granted_access(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.mark_as_paid(user)
        self.assertTrue(paywall.has_access(user))

    def test_user_that_has_not_paid_is_not_granted_access(self):
        user = User('95015843')
        paywall = Paywall()
        self.assertFalse(paywall.has_access(user))

    def test_user_with_different_number_is_not_granted_access(self):
        first_user, second_user = User('95015843'), User('99234564')
        paywall = Paywall()
        paywall.mark_as_paid(first_user)
        self.assertFalse(paywall.has_access(second_user))

    def test_user_country_codes_are_ignored(self):
        user, same_user = User('95015843'), User('+4795015843')
        paywall = Paywall()
        paywall.mark_as_paid(user)
        self.assertTrue(paywall.has_access(same_user))

    def test_user_whitespace_are_ignored(self):
        user, same_user = User('950 15 843'), User('95015843')
        paywall = Paywall()
        paywall.mark_as_paid(user)
        self.assertTrue(paywall.has_access(same_user))

    def test_user_does_not_have_access_after_time_expiration(self):
        user = User('95015843')
        paywall = Paywall()
        twenty_minutes_ago = datetime.now() - timedelta(minutes=30)
        paywall.mark_as_paid(user, timestamp=twenty_minutes_ago)
        self.assertFalse(paywall.has_access(user))

    def test_returns_please_pay_status_if_user_has_not_paid(self):
        user = User('95015843')
        paywall = Paywall()
        status = paywall.get_status(user)
        self.assertEqual(status, Paywall.STATUS['PLEASE_PAY'])

    def test_returns_outdated_if_payment_has_expired(self):
        user = User('95015843')
        paywall = Paywall()
        twenty_minutes_ago = datetime.now() - timedelta(minutes=20)
        paywall.mark_as_paid(user, timestamp=twenty_minutes_ago)
        status = paywall.get_status(user)
        self.assertEqual(status, Paywall.STATUS['EXPIRED'])

    def test_payments_are_persisted(self):
        user = User('95015843')
        old_paywall = Paywall()
        old_paywall.mark_as_paid(user)
        new_paywall = Paywall()
        self.assertTrue(new_paywall.has_access(user))
