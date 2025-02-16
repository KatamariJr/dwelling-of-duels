.PHONY: clean build buildAndServe serve

build:
	python3 build.py

buildAndServe: build serve

serve:
	cd deploy; python3 -m http.server

uploadAll:
	./aws_archive_sync.sh && ./aws_html_sync.sh
