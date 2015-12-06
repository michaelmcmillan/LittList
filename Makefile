TESTS="*_test.py"
REQUIREMENTS="requirements.txt"

install:
	pip install -r $(REQUIREMENTS) 

test: unit-test clean

unit-test:
	@python -B -m unittest discover -s tests -p $(TESTS)

clean:
	@find . -name '*.pyc' -delete

.PHONY: test install serve
