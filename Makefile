.ONESHELL:
SHELL := /bin/bash

# List containers
CONTAINERS=$(shell docker ps --all --quiet)

# List images
IMAGES=$(shell docker images --quiet)

SEPARATOR = "*********************************************************************************************************************************"

TERRAFORM_ENV ?="development"
TERRAFORM_DIR="terraform/site-main/$(TERRAFORM_ENV)"

IMAGE_NAME ?= myob
CONTAINER_NAME ?= website

PYTHON_VIRTUALENV_PATH=$(HOME)/.virtualenv
NODE_VIRTUALENV_PATH=$(HOME)/.nodeenv

PROJECT_NAME=myob-nextgen
NODE_VERSION=9.4.0

PYTHON_VENV_PATH=$(PYTHON_VIRTUALENV_PATH)/$(PROJECT_NAME)
NODE_VENV_PATH=$(NODE_VIRTUALENV_PATH)/$(PROJECT_NAME)-$(NODE_VERSION)

ACTIVATE_PYTHON_VENV_PATH=$(PYTHON_VENV_PATH)/bin/activate
ACTIVATE_NODE_VENV_PATH=$(NODE_VENV_PATH)/bin/activate

.PHONY: bootstrap
bootstrap: ## make bootstrap # Bootstrap the project in the local machine
	$(info $(SEPARATOR))
	which -s bread || ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
	which -s python || brew install python
	which -s pip2 || curl -O http://python-distribute.org/distribute_setup.py
	which -s pip2 || curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
	which -s pip2 || python distribute_setup.py
	which -s pip2 || python get-pip.py
	which -s virtualenv || pip2 install virtualenv
	if [ ! -d $(PYTHON_VIRTUALENV_PATH) ]; then mkdir -p $(PYTHON_VIRTUALENV_PATH); fi
	if [ ! -d $(NODE_VIRTUALENV_PATH) ]; then mkdir -p $(NODE_VIRTUALENV_PATH); fi
	if [ ! -d $(PYTHON_VENV_PATH) ]; then virtualenv $(PYTHON_VENV_PATH); pip2 install --upgrade --requirement requirements.txt; fi
	if [ ! -d $(NODE_VENV_PATH) ]; then . $(ACTIVATE_PYTHON_VENV_PATH); nodeenv --node=$(NODE_VERSION) $(NODE_VENV_PATH); fi
	if [ -d $(NODE_VENV_PATH) ]; then . $(ACTIVATE_NODE_VENV_PATH); yarn; fi
	rm -f distribute_setup.py
	rm -f get-pip.py
	echo "$(SEPARATOR)"
	echo "Bootstrap completed with sucess!"

.PHONY: env
env: ## make env ## Display information regarding the environment
	$(info $(SEPARATOR))
	$(info Python virtual environment: source $(ACTIVATE_PYTHON_VENV_PATH))
	$(info Node virtual environment: source $(ACTIVATE_NODE_VENV_PATH))


.PHONY:	clean
clean: stop delete ## make clean # Stops all running docker containers and delete docker containers and docker images, also remove some temporary directories of the project
	$(info $(SEPARATOR))
	rm -rf dist/ .cache/ node_modules/

.PHONY:	stop
stop: ## make stop # Stops all running docker containers
	$(info $(SEPARATOR))
	$(if $(CONTAINERS),docker stop $(CONTAINERS),$(info 'No containers found to stop'))

.PHONY: delete
delete: delete_containers delete_images ## make delete # Stop all running docker containers and deletes docker containers and docker images

.PHONY: delete_containers
delete_containers: stop ## make delete_containers # Delete all docker containers
	$(info $(SEPARATOR))
	$(if $(CONTAINERS),docker rm $(CONTAINERS),$(info 'No containers found to delete'))

.PHONY: delete_images
delete_images: stop ## make delete_images # Delete all docker images
	$(info $(SEPARATOR))
	$(if $(IMAGES),docker rmi --force $(IMAGES),$(info 'No images found to delete'))

.PHONY: delete_terraform_files
delete_terraform_files: ## make delete_terraform_files # Delete local terraform temporary files
	find . -type f \( -name "*.tfstate*" -o -name "*.plan" -o -name "*.backup" \) -exec rm -f {} \;
	find . -type d -name "*.terraform" -exec rm -rf {} \;
	rm -rf $(TERRAFORM_DIR)/.terraform

.PHONY: build_image
build_image: ## make build_image # Builds a docker image described at the Dockerfile
	$(info $(SEPARATOR))
	@docker build --tag $(IMAGE_NAME) .

.PHONY: run
run: ## make run # Runs a docker container $(CONTAINER_NAME) based on a docker image $(IMAGE_NAME)
	$(info $(SEPARATOR))
	@docker run --interactive --tty --detach --name $(CONTAINER_NAME) $(IMAGE_NAME) /bin/sh

.PHONY: build
build: build_image run ## make build # Builds the project within a docker container
	$(info $(SEPARATOR))
	@docker exec --tty $(CONTAINER_NAME) yarn build
	@docker cp $(CONTAINER_NAME):/app/dist/ dist/

.PHONY: test
test: build_image run ## make test # Test the project within a docker container
	$(info $(SEPARATOR))
	@docker exec --tty $(CONTAINER_NAME) yarn test

.PHONY: build_interactive
build_interactive: ## make build_interactive # Builds the project image and run a docker container in interactive mode
	$(info $(SEPARATOR))
	@docker build --tag $(IMAGE_NAME) .
	@docker run --interactive --tty --name $(CONTAINER_NAME) $(IMAGE_NAME)

.PHONE: list
list: list_containers list_images ## make list # List all docker containers following by all docker images

.PHONY: list_images
list_images: ## make list_images ## List only all docker images
	$(info $(SEPARATOR))
	@docker images

.PHONY: list_containers
list_containers: ## make list_containers # List only all docker containers
	$(info $(SEPARATOR))
	@docker ps --all

.PHONY: info
info: ## make info # Show information of docker networks
	$(info $(SEPARATOR))
	@docker network inspect bridge

.PHONY: install
install:
	$(info $(SEPARATOR))
	source ~/.virtualenv/myob-nextgen/bin/activate; pip2 install -r requirements.txt

.PHONY: freeze
freeze: ## make freeze # Dumps all the Python packages and its versions
	pip2 freeze > requirements.txt
	# TODO: do the same with node?

.PHONY: init
init: ## make init # Initilize the backend infrastructure required by Terraform
	$(info $(SEPARATOR))
	$(info TERRAFORMING: $(TERRAFORM_ENV) ENVIRONMENT)
	@cd $(TERRAFORM_DIR) && terraform init
	$(info $(SEPARATOR))

.PHONY: plan
plan: ## make plan # Runs the terraform plan for a specific environment $(TERRAFORM_ENV)
	$(info $(SEPARATOR))
	$(info TERRAFORMING: $(TERRAFORM_ENV) ENVIRONMENT)
	@cd $(TERRAFORM_DIR) && terraform plan -out $(TERRAFORM_ENV).plan -var-file=$(TERRAFORM_ENV).tfvars
	$(info $(SEPARATOR))

.PHONY: apply
apply: ## make apply # Applies the plan generated by Terraform for a specific environment $(TERRAFORM_ENV)
	$(info $(SEPARATOR))
	$(info TERRAFORMING: $(TERRAFORM_ENV) ENVIRONMENT)
	@cd $(TERRAFORM_DIR) && terraform apply $(TERRAFORM_ENV).plan
	$(info $(SEPARATOR))

.PHONY: destroy
destroy: ## make destroy # Destroy the infrastructure built by Terraform for a specifc enviroment $(TERRAFORM_ENV)
	$(info $(SEPARATOR))
	$(info TERRAFORMING: $(TERRAFORM_ENV) ENVIRONMENT)
	@cd $(TERRAFORM_DIR) && terraform destroy -force -var-file=$(TERRAFORM_ENV).tfvars
	$(info $(SEPARATOR))

.PHONY: deploy
deploy: ## make deploy # Deploys the artificats located at dist/ into the development bucket on S3
	$(info $(SEPARATOR))
	$(info SYNCING: $(TERRAFORM_ENV) ENVIRONMENT)
	@aws --profile=myob-nextgen-deployer s3 sync dist/ s3://dev-myob-nextgen.orderbird.com/

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
