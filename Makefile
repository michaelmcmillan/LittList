BIN="./venv/bin"
PYTHON="$(BIN)/python3.5"
PYLINT="$(BIN)/pylint"
TEST_DIR="./test"
SRC_DIR="./src"
TEST_FILES="*_test.py"
REQUIREMENTS="./requirements.txt"
LINT_CONFIG="./tests/lint/pylint.rc"

install:
	@pip install -r $(REQUIREMENTS) 

test: unit-test clean

unit-test: export PYTHONPATH=./src
unit-test: export PYTHONDONTWRITEBYTECODE="false"
unit-test:
	@$(PYTHON) -m unittest discover -s $(TEST_DIR) -p $(TEST_FILES) 

lint:
	@$(PYLINT) --rcfile $(LINT_CONFIG) book.py

clean:
	@find . -name '*.pyc' -delete
	@find . -name '__pycache__' -delete

.PHONY: test install
