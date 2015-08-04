## Vault tasks ################################################################
BASE_PATH ?= $$(pwd)
VAULT_IMAGE ?= busybox
VAULT_NAME ?= vault_staging

vault-rm:
	docker rm $(VAULT_NAME)

vault-create:
	docker run \
		--name $(VAULT_NAME) \
		-v $(BASE_PATH)/etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
		-v $(BASE_PATH)/etc/nginx/conf.d/staging.conf:/etc/nginx/conf.d/default.conf:ro \
		-v $(BASE_PATH)/etc/nginx/ssl:/etc/nginx/ssl:ro \
		-v $(BASE_PATH)/share/nginx/html:/usr/share/nginx/html \
		$(VAULT_IMAGE) echo "Be careful with me"
