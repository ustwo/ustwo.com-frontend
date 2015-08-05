## App tasks ##################################################################
app_image = $(image)
app_version = $(TAG)
app_name = $(project_name)_$(TIER)_app

.PHONY: app-rm app-create app-log app-sh

ifeq ($(TIER), dev)
  app_volumes = \
    -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
    -v $(BASE_PATH)/package.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/src:/usr/local/src/src
  app_cmd = npm run dev
endif

app-rm:
	@echo "Removing $(app_name)"
	@docker rm -f $(app_name)

app-create:
	@echo "Creating $(app_name)"
	@docker run -d \
		--name $(app_name) \
		$(app_volumes) \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		--label version=$(app_version) \
		$(app_image) \
		$(app_cmd)

app-log:
	docker logs -f $(app_name)

app-sh:
	docker exec -it $(app_name) /bin/bash

css:
	docker exec -t $(app_name) npm run css

app-compile:
	docker exec -t $(app_name) npm run compile

app-assets: app-compile
	rm -rf share/nginx/public
	docker cp $(app_name):/usr/local/src/public share/nginx/
	cp src/templates/index.html share/nginx/html/index.html
