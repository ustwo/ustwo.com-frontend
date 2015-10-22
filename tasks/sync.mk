# Browser Sync tasks ##########################################################

sync-proxy:
	$(DOCKER) run --rm -t \
		-p 3000:3000 \
		-p 3001:3001 \
		-v $(PWD)/etc/browser-sync/polling.js:/home/ustwo/bs.js \
		-v $(PWD)/share:/home/ustwo/share \
		-w /home/ustwo \
		--name usweb_sync \
		$(docker_host) \
		ustwo/browser-sync \
		start --proxy "https://docker.ustwo.com:$(PROXY_HTTPS_PORT)" \
					--files "share/nginx/assets/css/*.css" \
					--reload-delay 0 \
					--https

sync-proxy-raw:
		@browser-sync \
			start --proxy "https://local.ustwo.com:$(PROXY_HTTPS_PORT)" \
						--files "share/nginx/assets/css/*.css" \
						--ws \
						--browser false \
						--https


sync-reload:
	docker exec -t \
		usweb_sync \
		browser-sync reload
