# Provisioning ################################################################

##
# When provisioning a machine from scratch, remember to load the vault docker
# image.
#
# Assuming you created the VM with docker-machine, select it and use:
#
#     $ make vault-load VAULT_PATH=build/vault.tar



##
# Provisions the target machine
#
# Possible options are:
#
# * provision-canary
# * provision-staging
# * provision-production
#
# Example:
#
#     $ make provision-staging IDENTITY_FILE=~/.ssh/usweb_rsa
#
provision-%: etc/ansible/%.yml
	$(ANSIBLE_PLAY) $<

provision-sh:
	$(ANSIBLE) sh
