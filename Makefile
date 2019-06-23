start: node_modules build
	node .

dev: node_modules
	yarn run dev

node_modules:
	yarn install

build: client/node_modules
	cd client && yarn build

client/node_modules:
	cd client && yarn install
