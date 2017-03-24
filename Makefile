FILES += ./src/glome-api-service.js
FILES += ./src/features/util.js
FILES += ./src/features/core.js
FILES += ./src/features/account.js
FILES += ./src/features/user.js
FILES += ./src/features/social-objects.js
FILES += ./src/features/schemas.js
FILES += ./src/features/webhooks.js
FILES += ./src/features/access-control-lists.js

build:
	make clean
	make reset-dist
	make uglify

reset-dist:
	mkdir ./dist/

clean:
	rm -rf ./dist/

UGLIFY = ./node_modules/uglify-js/bin/uglifyjs
UGLIFY_PARAMS += -m -c -o ./dist/glome-api-service.min.js
UGLIFY_PARAMS += --source-map=./dist/glome-api-service.min.map.js
UGLIFY_PARAMS += --source-map-include-sources -p relative

uglify:
	${UGLIFY} ${FILES} ${UGLIFY_PARAMS}

# Non-essential dev stuff

HTTP_SERVER = ./node_modules/http-server/bin/http-server

serve:
	${HTTP_SERVER} ./demo/

update-demo:
	make build
	cp ./dist/glome-api-service.min.js ./demo/
	cp ./dist/glome-api-service.min.map.js ./demo/

# https://github.com/emcrisostomo/fswatch
watch:
	fswatch ${FILES} | xargs -n1 sh -c 'make update-demo'
