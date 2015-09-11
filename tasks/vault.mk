## Vault tasks ################################################################

# vault version matches the SSL cert year of creation.
vault_version := 2015
vault_image := ustwo/vault:$(vault_version)
vault_name = $(project_name)_vault

.PHONY: \
	vault-build \
	vault-create \
	vault-rm \
	vault-save

vault-rm:
	@echo "Removing $(vault_name)"
	@$(DOCKER_RM) $(vault_name)

vault-create:
	@echo "Creating $(vault_name)"
	@$(DOCKER_VOLUME) \
		--read-only \
		--name $(vault_name) \
		$(project_labels) \
		$(vault_image)

vault-build:
	$(DOCKER) build -t $(vault_image) -f Dockerfile.vault .

build/vault-$(vault_version).tar: vault-build
	$(MKDIR) build
	$(DOCKER) save -o $@ $(vault_image)

vault-save: build/vault-$(vault_version).tar

# Imports the vault tarball into the docker environment.
load-vault: build/vault-$(vault_version).tar
	$(DOCKER) load -i $<

vault-load:
	$(DOCKER) load -i $(VAULT_PATH)
