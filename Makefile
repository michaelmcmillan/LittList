TESTS="*_test.py"
REQUIREMENTS="./requirements.txt"
LINT_CONFIG="./tests/lint/pylint.rc"

install:
	pip install -r $(REQUIREMENTS) 

test: unit-test clean

unit-test:
	@python -B -m unittest discover -s tests -p $(TESTS)

lint:
	@pylint --rcfile $(LINT_CONFIG) book.py

clean:
	@find . -name '*.pyc' -delete

.PHONY: test install serve
