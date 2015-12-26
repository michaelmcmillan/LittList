PYTHON=$(shell which python3)
PYLINT=$(shell which pylint)
PIP=$(shell which pip3.5)
COVERAGE=$(shell which coverage)
TEST_DIR=./test
SRC_DIR=./src
TEST_FILES=*_test.py
REQUIREMENTS=./.requirements.txt
LINT_CONFIG=./.pylint.rc
MODULES=$(shell pwd)/$(SRC_DIR)
UNITTEST_COMMAND=unittest discover -s $(TEST_DIR) -p $(TEST_FILES)

install: install-submodules
	@$(PIP) install -r $(REQUIREMENTS) 

install-submodules:
	@git submodule update --init --recursive

test: unit-test clean
ci-test: coverage lint
lint: pylint clean

unit-test: export PYTHONPATH=$(MODULES)
unit-test: export PYTHONDONTWRITEBYTECODE="false"
unit-test:
	@echo $(MODULES)
	@$(PYTHON) -m $(UNITTEST_COMMAND) 

coverage: export PYTHONPATH=$(MODULES)
coverage: export PYTHONDONTWRITEBYTECODE="false"
coverage:
	@$(COVERAGE) run --branch --source=$(SRC_DIR) -m $(UNITTEST_COMMAND)
	@$(COVERAGE) report --skip-covered -m 

pylint: export PYTHONPATH=$(MODULES)
pylint: export PYTHONDONTWRITEBYTECODE="false"
pylint:
	@$(PYLINT) --rcfile $(LINT_CONFIG) $(SRC_DIR)/*

clean:
	-@find . -name '.DS_Store' -delete
	-@find . -name '*.pyc' -delete
	-@find . -name '__pycache__' -exec rm -rf {} \;

.PHONY: test install
