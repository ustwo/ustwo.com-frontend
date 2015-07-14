tag ?= 0.0.1
image_name ?= ustwo/ustwo.com-frontend
container ?= us2
vm ?= dev
image = $(image_name):$(tag)
.PHONY : rm run restart

# Build container
build :
	docker build -t $(image) .

# Get container host IP
ip :
	docker-machine ip $(vm)

# Tail container output
log :
	docker logs -f $(container)

# Push container to hub
push :
	docker push $(image)

# Restart container
restart : rm run

# Remove container
rm :
	docker rm -f $(container)

# Run container
run :
	docker run -d -p 8888:8888 --name $(container) -v $(shell pwd)/src:/usr/local/src/src -v $(shell pwd)/gulpfile.js:/usr/local/src/gulpfile.js $(image) npm run dev

# Open container shell
ssh :
	docker exec -it $(container) /bin/bash

# Start container
start :
	docker start $(container)

# Stop container
stop :
	docker stop $(container)
