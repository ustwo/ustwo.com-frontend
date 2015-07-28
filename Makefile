tag ?= 0.1.0
image_name ?= ustwo/ustwo.com-frontend
container ?= us2
vm ?= dev
image = $(image_name):$(tag)
mount = -v $$(pwd)/node_modules:/usr/local/src/node_modules -v $$(pwd)/src:/usr/local/src/src -v $$(pwd)/npm-shrinkwrap.json:/usr/local/src/npm-shrinkwrap.json -v $$(pwd)/package.json:/usr/local/src/package.json -v $$(pwd)/gulpfile.js:/usr/local/src/gulpfile.js
.PHONY : browsersync restart rm styleguide watch

# Build container
build :
	docker build -t $(image) .

# Run container with watcher and browsersync
browsersync :
	docker run -d -p 8888:8888 -p 3001:3001 --name $(container) $(mount) $(image) npm run browsersync

# Create Docker host
create :
	docker-machine create --driver virtualbox --virtualbox-memory "2048" $(vm)

# Get container host IP
ip :
	docker-machine ip $(vm)

# Tail container output
log :
	docker logs -f $(container)

# Open app in browser
open :
	open http://$$(docker-machine ip $(vm)):8888

# Pull container from hub
pull :
	docker pull $(image)

# Push container to hub
push :
	docker push $(image)

# Restart container
restart : rm watch

# Restart container with browsersync
restartbs : rm browsersync

# Restart container with styleguide
restartsg : rm styleguide

# Remove container
rm :
	docker rm -f $(container)

# Run container
run :
	docker run -d -p 8888:8888 --name $(container) $(mount) $(image) npm run dev

# Run container with watcher (including styleguide) and browsersync
styleguide :
	docker run -d -p 8888:8888 -p 3001:3001 --name $(container) $(mount) $(image) npm run styleguide

# Run container with watcher
watch :
	docker run -d -p 8888:8888 --name $(container) $(mount) $(image) npm run watch

# Run staging container
staging :
	docker run -d -p 127.0.0.1:7777:8888 --name $(container) -e VIRTUAL_HOST=staging.ustwo.com $(image)

# Run prod container
prod :
	docker run -d -p 0.0.0.0:80:8888 --name $(container) $(image)

# Open container shell
ssh :
	docker exec -it $(container) /bin/bash

# Start container
start :
	docker start $(container)

# Stop container
stop :
	docker stop $(container)

# Update packages inside container
install :
	docker run -p 8888:8888 --name $(container) $(mount) $(image) npm install

# Update packages inside container
update :
	docker exec $(container) npm run update

# Check if there are updates to packages inside container
updatecheck :
	docker exec $(container) npm run updatecheck



## Vault tasks ################################################################
BASE_PATH ?= $$(pwd)
VAULT_IMAGE ?= busybox
VAULT_NAME ?= vault_staging
vault.build :
	docker build -t $(VAULT_IMAGE) -f $(VAULT_FILE) ./vaults

vault.rm :
	docker rm $(VAULT_NAME)

vault.create :
	docker run \
		--name $(VAULT_NAME) \
		-v $(BASE_PATH)/etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
		-v $(BASE_PATH)/etc/nginx/conf.d/staging.conf:/etc/nginx/conf.d/default.conf:ro \
		-v $(BASE_PATH)/etc/nginx/ssl:/etc/nginx/ssl:ro \
		-v $(BASE_PATH)/share/nginx/html:/usr/share/nginx/html \
		$(VAULT_IMAGE) echo "Be careful with me"

## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443
PROXY_NAME ?= proxy_staging

proxy.rm :
	docker rm -f $(PROXY_NAME)

proxy.create :
	docker run -d \
		--name $(PROXY_NAME) \
		-p $(PROXY_HTTPS_PORT):443 \
		--volumes-from $(VAULT_NAME) \
		nginx

# Provisioning with Ansible ###################################################
# Better using ssh agent:
#    $ ssh-agent bash # if not already running
#    $ ssh-add ~/.docker/machine/machines/caretool/id_rsa
#
# Alternatively, an ad-hoc command can be triggered via
#
#    $ ansible $(docker-machine ip caretool) -a "ls -la"
#    $ ansible $(docker-machine ip caretool) -m copy -a "src=./foo.txt dest=/home/ubuntu/foo.txt"
#
# Which avoids the need of configuring the host in /etc/ansible/hosts
provision.data:
	ansible-playbook -b -v \
		--private-key=~/.docker/machine/machines/ustwosite/id_rsa \
		etc/ansible/data.yml
