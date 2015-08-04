## Vault tasks ################################################################
VAULT_NAME = $(PROJECT_NAME)_$(TIER)_vault

vault-rm:
	docker rm $(VAULT_NAME)

vault-create:
	docker run \
		--name $(VAULT_NAME) \
		-v $(BASE_PATH)/etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
		-v $(BASE_PATH)/etc/nginx/conf.d/staging.conf:/etc/nginx/conf.d/default.conf:ro \
		-v $(BASE_PATH)/etc/nginx/ssl:/etc/nginx/ssl:ro \
		-v $(BASE_PATH)/share/nginx/html:/usr/share/nginx/html \
		--label project_name=$(PROJECT_NAME) \
		--label tier=$(TIER) \
		busybox echo "Be careful with me"
