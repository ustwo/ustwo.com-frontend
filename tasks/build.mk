image_name := ustwo/ustwo.com-frontend
image := $(image_name):$(TAG)

.PHONY: build pull push

build:
	docker build -t $(image) .

pull:
	docker pull $(image)

push:
	docker push $(image)
