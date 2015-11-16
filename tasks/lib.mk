ifeq ("$(VERBOSE)", "true")
  verbose_flag = -e VERBOSE=true
endif

ifeq ("$(FLUSH_CACHE)", "true")
  cache_flag = -e FLUSH_CACHE=true
endif

define project_labels
--label project_name=$(project_name) \
--label version=$(VERSION)
endef

define project_filters
--filter "label=project_name=$(project_name)"
endef
##
# Gets the Git commit hash from the given version
#
# $1 — version
#
# Example:
#
#     $(call git_sha1,1.2.3)  #=> 276961d32fb08c8fb104892fd929a9ec63f58b37
#
define git_sha1
$(shell $(GIT) show-ref --tags v$1 | $(AWK) '{print $$1}')
endef
##
# Gets the Git tag from the given hash
#
# $1 — Git hash
#
# Example:
#
#     $(call git_tag,276961d32fb08c8fb104892fd929a9ec63f58b37)  #=> v1.2.3
#
define git_tag
$(shell $(GIT) tag --points-at $1)
endef
##
# Composes the docker image tag
#
# $1 — id
# $2 — version
#
# Example:
#
#     $(call image_tag,app,1.2.0)  #=>  ustwo/usweb:app-1.2.0
#
define image_tag
$(project_namespace):$1-$2
endef
##
# Checks if the given tag exists
#
# $1 — version
#
define version_exists
$(shell $(GIT) tag -l v$1)
endef

define abort
	@echo $1
	@exit 1
endef
##
# Prompts with a y/n question and reacts on the answer
#
# $1 - Question
# $2 - Action
#
# Example:
#
#     $(call confirm,"Wanna dance?",make dance)
define confirm
	@echo $1 [y/n]
	@read -e ANSWER; \
	case $$ANSWER in \
		[Yy]) $2;; \
		*) echo "Action cancelled";exit 0;; \
	esac
endef

define warn
	@echo "*********************************************************************"
	@echo "*WARNING* $1"
	@echo "*********************************************************************"
endef
