## Proxy tasks ################################################################

PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443
PROXY_NAME ?= proxy_staging
PROXY_LINK ?= us2staging

proxy-rm :
	docker rm -f $(PROXY_NAME)

proxy-create :
	docker run -d \
		--name $(PROXY_NAME) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		--link $(PROXY_LINK) \
		--volumes-from $(VAULT_NAME) \
		nginx
