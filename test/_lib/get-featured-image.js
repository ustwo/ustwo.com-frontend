import getFeaturedImage from '../../src/app/_lib/get-featured-image';
import {
  caseStudy as NullCaseStudy,
  attachment as NullAttachment
} from '../../src/app/flux/nulls';

describe('getFeaturedImage', () => {
  let featuredAttachment;
  let result;

  beforeEach(() => {
    featuredAttachment = Object.assign(NullAttachment, { id: 1337 });
    const data = Object.assign(NullCaseStudy, { featured_image: 1337 });
    const attachments = [{}, NullAttachment, NullAttachment, featuredAttachment];
    result = getFeaturedImage(data, attachments);
  });

  it('should return the featured attachment', () => {
    expect(result).to.equal(featuredAttachment);
  });

  describe('if the featured image is not present', () => {
    beforeEach(() => {
      const data = Object.assign(NullCaseStudy, { featured_image: 9443 });
      const attachments = [{}, NullAttachment, NullAttachment, NullAttachment];
      result = getFeaturedImage(data, attachments);
    });

    it('should return undefined', () => {
      expect(result).to.equal(undefined);
    });
  });
});
