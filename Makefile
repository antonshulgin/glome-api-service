FILES += ./src/glome-api-service.js
FILES += ./src/features/util.js

HTTP_SERVER = ./node_modules/http-server/bin/http-server
UGLIFY = ./node_modules/uglifyjs/bin/uglifyjs

build:
	make clean
	make reset-dist
	make uglify

serve:
	${HTTP_SERVER} ./meta/

uglify:
	${UGLIFY} ${FILES} --mangle --compress --output ./dist/glome-api-service.min.js

reset-dist:
	mkdir ./dist/

clean:
	rm -rf ./dist/
