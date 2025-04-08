.PHONY: build-prod

build-prod:
	docker build -t joanfont/poble -f Dockerfile.prod .