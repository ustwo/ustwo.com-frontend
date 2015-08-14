## Vault tasks ################################################################
vault_name = $(project_name)_$(TIER)_vault

.PHONY: vault-rm vault-create

nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf:ro

ifeq ($(TIER), dev)
  nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/dev.conf:/etc/nginx/conf.d/default.conf:ro
endif

ifeq ($(TIER), staging)
  nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/staging.conf:/etc/nginx/conf.d/default.conf:ro
endif

vault-rm:
	@echo "Removing $(vault_name)"
	@$(DOCKER_RM) $(vault_name)

vault-create:
	@echo "Creating $(vault_name)"
	@$(DOCKER_VOLUME) \
		--name $(vault_name) \
		-v $(BASE_PATH)/etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
		-v $(BASE_PATH)/etc/nginx/ssl.conf:/etc/nginx/ssl.conf:ro \
		$(nginx_config) \
		-v $(BASE_PATH)/etc/nginx/ssl:/etc/nginx/ssl:ro \
		-v $(BASE_PATH)/share/nginx/html:/usr/share/nginx/html \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		busybox true
