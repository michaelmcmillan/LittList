BIN="./venv/bin"
PYTHON="$(BIN)/python3.5"
PYLINT="$(BIN)/pylint"
PIP="$(BIN)/pip3.5"
TEST_DIR="./test"
SRC_DIR="./src"
TEST_FILES="*_test.py"
REQUIREMENTS="./.requirements.txt"
LINT_CONFIG="./test/lint/pylint.rc"
MODULES=$(shell find $(SRC_DIR)/* -type d | xargs | sed -e 's/ /:/g')

install:
	@$(PIP) install -r $(REQUIREMENTS) 

test: unit-test clean

unit-test: export PYTHONPATH=$PYTHONPATH:$(MODULES)
unit-test: export PYTHONDONTWRITEBYTECODE="false"
unit-test:
	@$(PYTHON) -m unittest discover -s $(TEST_DIR) -p $(TEST_FILES) 

lint:
	@$(PYLINT) --rcfile $(LINT_CONFIG) src/*/*

clean:
	@find . -name '.DS_Store' -delete
	@find . -name '*.pyc' -delete
	@find . -name '__pycache__' -delete

.PHONY: test install
