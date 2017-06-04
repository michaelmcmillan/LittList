remembered = {}

def load_fixture(path):
    if path in remembered:
        return remembered[path]
    else:
        with open('test/fixtures/' + path) as data:
            contents = data.read()
        remembered[path] = contents
        return remembered[path]
