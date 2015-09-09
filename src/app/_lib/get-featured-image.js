import get from 'lodash/object/get';
import find from 'lodash/collection/find';

export default (data, attachments) => find(attachments, 'id', get(data, 'featured_image'));
