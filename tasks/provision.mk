# Provisioning ################################################################

provision-vault: load-vault

# Ansible #####################################################################
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
# * host
provision-%: etc/ansible/%.yml
	$(ANSIBLE_PLAY) $<

