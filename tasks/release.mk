## Release tasks ##############################################################
.PHONY: \
  release-create \
  release-tag-create \
  release-pull-snapshots \
  release-tag-snapshots \
  release-tag-rm

release-create: snapshot_sha1 = $(call git_sha1,$(VERSION))
release-create: app_snapshot = $(call image_tag,$(app_id),$(snapshot_sha1))
release-create: assets_snapshot = $(call image_tag,$(assets_id),$(snapshot_sha1))
release-create: sandbox_snapshot = $(call image_tag,$(sandbox_id),$(snapshot_sha1))
release-create: release-tag-create release-pull-snapshots release-tag-snapshots
	$(DOCKER) push $(app_image)
	$(DOCKER) push $(assets_image)
	$(DOCKER) push $(sandbox_image)

release-pull-snapshots:
	$(DOCKER) pull $(app_snapshot)
	$(DOCKER) pull $(assets_snapshot)
	$(DOCKER) pull $(sandbox_snapshot)

release-tag-snapshots:
	$(DOCKER) tag $(app_snapshot) $(app_image)
	$(DOCKER) tag $(assets_snapshot) $(assets_image)
	$(DOCKER) tag $(sandbox_snapshot) $(sandbox_image)

release-tag-create:
ifeq ("$(VERSION)", "dev")
	$(call abort,"Error: Version $(VERSION) is not a proper version")
endif
	$(if $(call version_exists,$(VERSION)), $(call abort,"Error: Version $(VERSION) exists"),)
	$(GIT) tag v$(VERSION)

release-tag-rm:
	$(GIT) tag -d v$(VERSION)
