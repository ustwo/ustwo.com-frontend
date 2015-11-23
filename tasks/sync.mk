# Browser Sync tasks ##########################################################
SYNC_PORT ?= 3000
SYNC_ADMIN_PORT ?= 3001

sync_id = sync
sync_image = ustwo/browser-sync
sync_name = $(project_name)_$(sync_id)

.PHONY: \
  sync-create \
  sync-rm \
  sync-log \
  sync-reload

sync: sync-rm sync-create

sync-create:
	@$(DOCKER_PROC) \
		-p $(SYNC_PORT):$(SYNC_PORT) \
		-p $(SYNC_ADMIN_PORT):$(SYNC_ADMIN_PORT) \
		-v $(PWD)/share:/home/ustwo/share \
		-w /home/ustwo \
		$(project_labels) \
		--name $(sync_name) \
		--net $(network_name) \
		$(sync_image) \
		start --proxy "http://$(proxy_name)" \
					--files "share/nginx/assets/css/*.css" \
					--port $(SYNC_PORT) \
					--ui-port $(SYNC_ADMIN_PORT) \
					--browser false

sync-rm:
	$(DOCKER_RM) $(sync_name)

sync-log:
	$(DOCKER) logs -f $(sync_name)

sync-reload:
	$(DOCKER_EXEC) $(sync_name) reload
