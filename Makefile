.PHONY: install test clean

install:
	npm install

test:
	npm test

clean:
	rm -rf node_modules
