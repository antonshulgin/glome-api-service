FILES += ./src/glome-api-service.js

HTTP_SERVER = ./node_modules/http-server/bin/http-server
UGLIFY = ./node_modules/uglifyjs/bin/uglifyjs

update-demo:
	make build
	cp ./dist/glome-api-service.min.js ./demo/

build:
	make clean
	make reset-dist
	make uglify

serve:
	${HTTP_SERVER} ./demo/

uglify:
	${UGLIFY} ${FILES} --mangle --compress --output ./dist/glome-api-service.min.js

reset-dist:
	mkdir ./dist/

clean:
	rm -rf ./dist/
