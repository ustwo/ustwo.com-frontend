## App tasks ##################################################################
app_image = $(image) # Clean me
app_version = $(tag)
app_name = $(project_name)_$(TIER)_app

.PHONY: app-rm app-create

app-rm:
	docker rm -f $(app_name)

app-create:
	docker run -d \
		--name $(app_name) \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		--label version=$(app_version) \
		$(app_image)
