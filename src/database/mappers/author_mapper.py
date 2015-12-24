from author.author import Author

class AuthorMapper:

    @classmethod
    def to_model(cls, author_record):
        author_model = Author()
        return author_model
