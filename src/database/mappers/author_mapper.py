from author.author import Author

class AuthorMapper:

    @classmethod
    def to_model(self, author_record):
        author_model = Author()
        return author_model
