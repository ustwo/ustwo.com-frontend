## Release tasks ##############################################################
release-create: snapshot_sha1 = $(call git_sha1,$(VERSION))
release-create: app_snapshot = $(call image_tag,$(app_id),$(snapshot_sha1))
release-create: assets_snapshot = $(call image_tag,$(assets_id),$(snapshot_sha1))
release-create: release-tag-create release-pull-snapshots release-tag-snapshots
	$(DOCKER) push $(app_image)
	$(DOCKER) push $(assets_image)

release-pull-snapshots:
	$(DOCKER) pull $(app_snapshot)
	$(DOCKER) pull $(assets_snapshot)

release-tag-snapshots:
	$(DOCKER) tag -f $(app_snapshot) $(app_image)
	$(DOCKER) tag -f $(assets_snapshot) $(assets_image)

release-tag-create:
	$(if $(call version_exists,$(VERSION)), \
       $(call abort,"Error: Version $(VERSION) exists"),)
	$(GIT) tag v$(VERSION)

release-tag-rm:
	$(GIT) tag -d v$(VERSION)
