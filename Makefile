PYTHON=$(shell which python3)
PYLINT=$(shell which pylint)
PIP=$(shell which pip3.5)
TEST_DIR="./test"
SRC_DIR="./src"
TEST_FILES="*_test.py"
REQUIREMENTS="./.requirements.txt"
LINT_CONFIG="./.pylint.rc"
MODULES=$(shell find $(SRC_DIR)/* -type d | xargs | sed -e 's/ /:/g')
UNITTEST_COMMAND=unittest discover -s $(TEST_DIR) -p $(TEST_FILES)

install:
	@$(PIP) install -r $(REQUIREMENTS) 

test: unit-test clean
ci-test: unit-test lint coverage clean

unit-test: export PYTHONPATH=$PYTHONPATH:$(MODULES)
unit-test: export PYTHONDONTWRITEBYTECODE="false"
unit-test:
	@$(PYTHON) -m $(UNITTEST_COMMAND) 

coverage: export PYTHONPATH=$PYTHONPATH:$(MODULES)
coverage: export PYTHONDONTWRITEBYTECODE="false"
coverage:
	@coverage run --include=$(SRC_DIR)/* -m $(UNITTEST_COMMAND)

lint: export PYTHONDONTWRITEBYTECODE="false"
lint:
	@$(PYLINT) --rcfile $(LINT_CONFIG) src/*/*

clean:
	@find . -name '.DS_Store' -delete
	@find . -name '__pycache__' -delete

.PHONY: test install
