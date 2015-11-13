## Purge  #####################################################################

# For API documentation see: https://client.cdn77.com/support/api/version/2.0/data#Purge All

# usweb-staging-cdn.ustwo.com 60414
cdn-purge-staging:
	@$(CURL) --data "cdn_id=60414&login=$(CDN77_LOGIN)&passwd=$(CDN77_API_KEY)" https://api.cdn77.com/v2.0/data/purge-all

# ustwo.it 48643
# TODO: replace ID with ustwo.com CDN eventually
# TODO: integrate with Slack as a dirty solution for manual content refresh?
cdn-purge-production:
	@$(CURL) --data "cdn_id=48643&login=$(CDN77_LOGIN)&passwd=$(CDN77_API_KEY)" https://api.cdn77.com/v2.0/data/purge-all

## Prefetch  ##################################################################

# TODO: we should warm up the CDN after a purge, but to do that we'll need to feed it a list of URLs, maybe from the sitemap...
# For API documentation see: https://client.cdn77.com/support/api/version/2.0/data#Prefetch
cdn-prefetch-staging:
	@echo "Not implemented yet..."

cdn-prefetch-production:
	@echo "Not implemented yet..."
