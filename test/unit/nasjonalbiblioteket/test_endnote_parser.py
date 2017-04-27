from unittest import TestCase
from nasjonalbiblioteket import EndNoteParser

class TestEndnote(TestCase):

    def test_returns_T1_as_key_and_title_as_value(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'TI  - Snømannen',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        self.assertEqual(fields['TI'], 'Snømannen')

    def test_strips_value_of_trailing_whitespace(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'A1  - Rugstad, Christian 1955- ',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        self.assertEqual(fields['A1'][0], 'Rugstad, Christian 1955-')

    def test_returns_titles_that_contain_ws_ws_hyhpen(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'TI  - TI  - Snømannen',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        self.assertEqual(fields['TI'], 'TI  - Snømannen')

    def test_groups_multiple_A1_fields_together(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'A1  - Baldwin,S.A.',
            'A1  - Fugaccia,I.',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        authors = fields['A1']
        self.assertIn('Baldwin,S.A.', authors)
        self.assertIn('Fugaccia,I.', authors)

    def test_groups_multiple_AU_fields_together(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'AU  - Baldwin,S.A.',
            'AU  - Fugaccia,I.',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        authors = fields['AU']
        self.assertIn('Baldwin,S.A.', authors)
        self.assertIn('Fugaccia,I.', authors)

    def test_groups_multiple_KW_fields_together(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'KW  - norway',
            'KW  - scandinavia',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        keywords = fields['KW']
        self.assertIn('norway', keywords)
        self.assertIn('scandinavia', keywords)

    def test_does_not_return_ER(self):
        endnote = '\n'.join([
            'TY  - BOOK',
            'TI  - TI  - Snømannen',
            'ER  - ',
        ])
        fields = EndNoteParser().parse(endnote)
        self.assertNotIn('ER', fields)
