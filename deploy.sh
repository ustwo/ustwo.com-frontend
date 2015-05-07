#!/usr/bin/env bash

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${green}Pushing files to Hector...${NC}"
rsync -avz ./public/ -e ssh ustwoweb:~/public_html/2015/
# ssh ustwoweb "cd ~/public_html/wordpress/wp-content/themes/ustwo.com-wp; git status; git pull origin master; git status"
if [ "$?" = "0" ]; then
	echo -e "${green}Great success!${NC}"
else
	echo -e "${red}For this to work you have to set up the SSH connection to Hector as 'ustwoweb' in your ~/.ssh/config file!"
	exit 1
fi
