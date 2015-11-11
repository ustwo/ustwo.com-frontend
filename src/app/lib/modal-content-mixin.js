const ModalContentMixin = {
  onClickContent(event) {
    event.stopPropagation();
  }
};

export default ModalContentMixin;
