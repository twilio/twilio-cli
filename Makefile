.PHONY: githooks clean install test docker-build docker-push

githooks:
	ln -sf ../../githooks/pre-commit .git/hooks/pre-commit

clean:
	rm -rf node_modules

install: githooks clean
	rm -f package-lock.json
	npm install --no-optional

test:
	npm test

API_DEFINITIONS_SHA=$(shell git log --oneline | grep Regenerated | head -n1 | cut -d ' ' -f 5)
docker-build:
	docker build -t twilio/twilio-cli .
	docker tag twilio/twilio-cli twilio/twilio-cli:${TRAVIS_TAG}
	docker tag twilio/twilio-cli twilio/twilio-cli:apidefs-${API_DEFINITIONS_SHA}
	docker tag twilio/twilio-cli twilio/twilio-cli:latest

docker-push:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
	docker push twilio/twilio-cli:${TRAVIS_TAG}
	docker push twilio/twilio-cli:apidefs-${API_DEFINITIONS_SHA}
	docker push twilio/twilio-cli:latest

# make owner=username generate-fork-pipeline-changes
generate-fork-pipeline-changes:
	git checkout main
	node .github/scripts/create-fork-pipeline-changes.js $(PWD) $(owner)
