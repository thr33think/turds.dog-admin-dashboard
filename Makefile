# Config
dockerHubOrg := threethink
imageName := "turdsdog-admin-dashboard"
commitHash := $(shell git rev-parse HEAD)
fullImageName := $(dockerHubOrg)/$(imageName):$(commitHash)

# default make target
all: build

# install all dependencies and compile js files
build:
	@npm install && npm run build

# build the docker image with the current git rev
dockerimage:
	@docker build -t $(fullImageName) .

# Publish the docker image. Should be only used by the CI
push:
ifeq ($(TRAVIS_PULL_REQUEST_BRANCH),)
	@docker push $(fullImageName)
else
	@echo "BRANCH not Master. Nothing to do!"
endif

# Deploy the docker container. Should be only used by the CI
deploy:
ifeq	($(TRAVIS_PULL_REQUEST_BRANCH),)
	@docker-compose up -d
else
	@echo "BRANCH not Master. Nothing to do!"
endif