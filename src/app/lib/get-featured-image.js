import { get } from 'lodash';
import find from 'lodash/collection/find';

export default (data, attachments) => {
  if (!attachments) {
    attachments = get(data, '_embedded.wp:attachment', []);
  }
  return find(attachments, 'id', get(data, 'featured_image'));
};
