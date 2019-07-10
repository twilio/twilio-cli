.PHONY: githooks install test clean

githooks:
	ln -sf ../../githooks/pre-commit .git/hooks/pre-commit

install: githooks
	npm install

test:
	npm test

clean:
	rm -rf node_modules
