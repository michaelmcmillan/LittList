BIN="./venv/bin"
PYTHON="$(BIN)/python3.5"
PYLINT="$(BIN)/pylint"
TESTS="*_test.py"
REQUIREMENTS="./requirements.txt"
LINT_CONFIG="./tests/lint/pylint.rc"

install:
	pip install -r $(REQUIREMENTS) 

test: unit-test clean

unit-test:
	@$(PYTHON) -m unittest discover -s tests -p $(TESTS) 

lint:
	@$(PYLINT) --rcfile $(LINT_CONFIG) book.py

clean:
	@find . -name '*.pyc' -delete
	@rm -rf __pycache__

.PHONY: test install
