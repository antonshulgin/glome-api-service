FILES += ./src/glome-api-service.js
FILES += ./src/features/util.js
FILES += ./src/features/core.js

HTTP_SERVER = ./node_modules/http-server/bin/http-server

UGLIFY = ./node_modules/uglify-js/bin/uglifyjs
UGLIFY_PARAMS += -m -c -o ./dist/glome-api-service.min.js
UGLIFY_PARAMS += --source-map=./dist/glome-api-service.min.map.js --source-map-include-sources -p relative

build:
	make clean
	make reset-dist
	make uglify

serve:
	${HTTP_SERVER} ./demo/

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
