tag ?= 0.0.5
image_name ?= ustwo/ustwo.com-frontend
container ?= us2
vm ?= dev
image = $(image_name):$(tag)
.PHONY : browsersync restart rm watch

# Build container
build :
	docker build -t $(image) .

# Run container with watcher and browsersync
browsersync :
	docker run -d -p 8888:8888 -p 3001:3001 --name $(container) -v $$(pwd)/src:/usr/local/src/src -v $$(pwd)/package.json:/usr/local/src/package.json -v $$(pwd)/gulpfile.js:/usr/local/src/gulpfile.js $(image) npm run browsersync

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

# Restart container
restartbs : rm browsersync

# Remove container
rm :
	docker rm -f $(container)

# Run container
run :
	docker run -d -p 8888:8888 --name $(container) -v $$(pwd)/src:/usr/local/src/src -v $$(pwd)/package.json:/usr/local/src/package.json -v $$(pwd)/gulpfile.js:/usr/local/src/gulpfile.js $(image) npm run dev

# Run container with watcher
watch :
	docker run -d -p 8888:8888 --name $(container) -v $$(pwd)/src:/usr/local/src/src -v $$(pwd)/package.json:/usr/local/src/package.json -v $$(pwd)/gulpfile.js:/usr/local/src/gulpfile.js $(image) npm run watch

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
update :
	docker exec $(container) npm install
