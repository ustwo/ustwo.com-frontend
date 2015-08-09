image_name := ustwo/ustwo.com-frontend
app_image := $(image_name):$(TAG)

.PHONY: build pull push

build:
	$(DOCKER) build -t $(app_image) .

pull:
	$(DOCKER) pull $(app_image)

push:
	$(DOCKER) push $(app_image)
