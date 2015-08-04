## App tasks ##################################################################
APP_IMAGE = $(image) # Clean me
APP_VERSION = $(tag)
APP_NAME = $(PROJECT_NAME)_$(TIER)_app

app-rm:
	docker rm -f $(APP_NAME)

app-create:
	docker run -d \
		--name $(APP_NAME) \
		--label project_name=$(PROJECT_NAME) \
		--label tier=$(TIER) \
		--label version=$(APP_VERSION) \
		$(APP_IMAGE)
