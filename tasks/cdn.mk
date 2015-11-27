## Purge  #####################################################################

# For API documentation see: https://client.cdn77.com/support/api/version/2.0/data#Purge All

# usweb-staging-cdn.ustwo.com 60414
cdn-purge-staging:
	@$(CURL) --data "cdn_id=60414&login=$(CDN77_LOGIN)&passwd=$(CDN77_API_KEY)" https://api.cdn77.com/v2.0/data/purge-all

# ustwo.com 60720
# TODO: integrate with Slack as a dirty solution for manual content refresh?
cdn-purge-production:
	@$(CURL) --data "cdn_id=60720&login=$(CDN77_LOGIN)&passwd=$(CDN77_API_KEY)" https://api.cdn77.com/v2.0/data/purge-all

## Prefetch  ##################################################################

# Instead of using the CDN prefetch API, we're just running a crawler and let it discover and trigger all pages
cdn-prefetch-production:
	@$(CURL) --data "" https://www.apifier.com/api/v1/fMXoktZAWXXQyTetr/crawlers/ustwo-com/execute?token=$(APIFIER_TOKEN)
