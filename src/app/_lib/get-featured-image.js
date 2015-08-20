import get from 'lodash/object/get';
import find from 'lodash/collection/find';

import getAttachments from './get-attachments';

export default data => find(getAttachments(data), 'id', get(data, 'featured_image'));
