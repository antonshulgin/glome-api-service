FILES += ./src/glome-api-service.js
FILES += ./src/features/util.js
FILES += ./src/features/core.js

build:
	make clean
	make reset-dist
	make uglify

HTTP_SERVER = ./node_modules/http-server/bin/http-server

serve:
	${HTTP_SERVER} ./demo/

UGLIFY = ./node_modules/uglify-js/bin/uglifyjs
UGLIFY_PARAMS += -m -c -o ./dist/glome-api-service.min.js
UGLIFY_PARAMS += --source-map=./dist/glome-api-service.min.map.js
UGLIFY_PARAMS += --source-map-include-sources -p relative

watch:
	fswatch ${FILES} | xargs -n1 sh -c 'make update-demo'

uglify:
	${UGLIFY} ${FILES} ${UGLIFY_PARAMS}

reset-dist:
	mkdir ./dist/

clean:
	rm -rf ./dist/

update-demo:
	make build
	cp ./dist/glome-api-service.min.js ./demo/
	cp ./dist/glome-api-service.min.map.js ./demo/
