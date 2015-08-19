## Vault tasks ################################################################
vault_image = ustwo/usweb-vault
vault_name = $(project_name)_$(TIER)_vault

.PHONY: \
	vault-build \
	vault-create \
	vault-rm \
	vault-save

ifeq ($(TIER), dev)
  nginx_config = \
    -v $(BASE_PATH)/etc/nginx/conf.d/dev.conf:/etc/nginx/conf.d/default.conf:ro \
    -v $(BASE_PATH)/etc/nginx/locations:/etc/nginx/locations:ro
endif

ifeq ($(TIER), staging)
  nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/staging.conf:/etc/nginx/conf.d/default.conf:ro
endif

ifeq ($(TIER), canary)
  nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/canary.conf:/etc/nginx/conf.d/default.conf:ro
endif

vault-rm:
	@echo "Removing $(vault_name)"
	@$(DOCKER_RM) $(vault_name)

vault-create:
	@echo "Creating $(vault_name)"
	@$(DOCKER_VOLUME) \
		--name $(vault_name) \
		$(project_labels) \
		$(nginx_config) \
		$(vault_image)

vault-build:
	$(DOCKER) build -t $(vault_image) -f Dockerfile.vault .

build/vault-$(TAG).tar: vault-build
	$(MKDIR) build
	$(DOCKER) save -o $@ $(vault_image)

vault-save: build/vault-$(TAG).tar
