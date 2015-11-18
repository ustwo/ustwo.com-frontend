import getFeaturedImage from 'app/lib/get-featured-image';
import set from 'lodash/object/set';

describe('getFeaturedImage', () => {
  const NullCaseStudy = {
    "name": null,
    "link": null,
    "excerpt": null,
    "bgColor": {
      "name": "bgColor",
      "value": null,
      "type": "color"
    },
    "primaryColor": {
      "name": "primaryColor",
      "value": null,
      "type": "color"
    },
    "secondaryColor": {
      "name": "secondaryColor",
      "value": null,
      "type": "color"
    },
    "page_builder": [],
    "featured_image": null,
    "_links": {},
    "_embedded": {
      "wp:attachment": []
    }
  }
  const NullAttachment = {
    "_links": {},
    "alt_text": null,
    "author": null,
    "date": null,
    "id": null,
    "link": null,
    "media_details": {},
    "media_type": null,
    "slug": null,
    "source_url": null,
    "title": {},
    "type": "attachment"
  }
  let featuredAttachment;
  let result;
  let data;
  let attachments;

  beforeEach(() => {
    featuredAttachment = Object.assign(NullAttachment, { id: 1337 });
    data = Object.assign(NullCaseStudy, { featured_image: 1337 });
    attachments = [{}, NullAttachment, NullAttachment, featuredAttachment];
    set(data, '_embedded.wp:attachment', attachments);
  });

  it('should return the featured attachment', () => {
    result = getFeaturedImage(data, attachments);
    expect(result).to.equal(featuredAttachment);
  });

  it('looks within data if attachments are not specified', () => {
    set(data, '_embedded.wp:attachment', attachments);
    result = getFeaturedImage(data);
    expect(result).to.equal(featuredAttachment);
  });

  describe('if the featured image is not present', () => {
    beforeEach(() => {
      const data = Object.assign(NullCaseStudy, { featured_image: 9443 });
      const attachments = [{}, NullAttachment, NullAttachment, NullAttachment];
      set(data, '_embedded.wp:attachment', attachments);
      result = getFeaturedImage(data);
    });

    it('should return undefined', () => {
      expect(result).to.equal(undefined);
    });
  });
});
