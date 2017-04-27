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

    def test_user_that_has_only_claimed_is_not_granted_access(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.claims_payment(user)
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

    def test_the_latest_payment_is_the_one_that_counts(self):
        user = User('95015843')
        paywall = Paywall()
        twenty_minutes_ago = datetime.now() - timedelta(minutes=30)
        paywall.mark_as_paid(user, timestamp=twenty_minutes_ago)
        paywall.mark_as_paid(user, timestamp=datetime.now())
        self.assertTrue(paywall.has_access(user))

    def test_returns_refund_status_if_user_paid_but_not_access(self):
        user = User('95015843')
        paywall = Paywall()
        twenty_seconds_ago = datetime.now() - timedelta(seconds=20)
        paywall.claims_payment(user, timestamp=twenty_seconds_ago)
        paywall.complain(user)
        status = paywall.get_status(user)
        self.assertEqual(status, Paywall.STATUS['REFUND'])

    def test_returns_wait_status_if_complains_too_early(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.claims_payment(user)
        paywall.complain(user)
        status = paywall.get_status(user)
        self.assertEqual(status, Paywall.STATUS['PROCESSING'])

    def test_returns_please_pay_status_if_user_has_not_paid(self):
        user = User('95015843')
        paywall = Paywall()
        status = paywall.get_status(user)
        self.assertEqual(status, Paywall.STATUS['PLEASE_PAY'])

    def test_returns_thanks_if_payment_and_access_granted(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.claims_payment(user)
        paywall.mark_as_paid(user)
        status = paywall.get_status(user)
        self.assertEqual(status, Paywall.STATUS['THANK_YOU'])

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

    def test_verified_payment_trumps_unverified_payment(self):
        user = User('95015843')
        paywall = Paywall()
        paywall.claims_payment(user)
        paywall.mark_as_paid(user)
        paywall.claims_payment(user)
        self.assertTrue(paywall.has_access(user))
