start: build node_modules
	node src/server

dev: node_modules
	node src/server

node_modules:
	yarn install

build:
	cd src/client && yarn run build
