TIER := staging
BASE_PATH := $(PWD)
TAG := 0.2.1

project_name := ustwosite

include tasks/app.mk
include tasks/build.mk
include tasks/provision.mk
include tasks/proxy.mk
include tasks/vault.mk


init: vault-create app-create proxy-create
init-rm: vault-rm app-rm proxy-rm
deploy: app-rm proxy-rm app-create proxy-create
# make all TIER=production PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443
