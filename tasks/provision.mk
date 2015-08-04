# Provisioning with Ansible ###################################################
IDENTITY_FILE ?= ~/.docker/machine/machines/ustwosite/id_rsa
ANSIBLE.c = ansible-playbook -b -v --private-key=$(IDENTITY_FILE)
#
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
#
# Possible options are:
#
# * data
# * vault
provision-%: etc/ansible/%.yml
	@echo "*********************************************************************"
	@echo "*WARNING* This task may require files intentionally left out the git"
	@echo "          repository"
	@echo "*********************************************************************"
	$(ANSIBLE.c) $<
