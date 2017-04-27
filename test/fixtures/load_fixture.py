def load_fixture(path):
    with open('test/fixtures/' + path) as data:
       return data.read() 
