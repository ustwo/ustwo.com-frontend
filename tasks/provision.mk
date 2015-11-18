# Provisioning ################################################################

provision-vault: load-vault


# Possible options are:
#
# * provision-host
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
