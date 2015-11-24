import getAuthor from 'app/lib/get-author';

describe('getAuthor', () => {
  let post;

  beforeEach(() => {
    post = {
      _embedded: {
        author: [{
          _links: {},
          avatar_urls: {},
          contact_methods: {},
          description: null,
          first_name: null,
          id: null,
          last_name: null,
          link: null,
          name: null,
          url: null
        }]
      },
      _links: {},
      author: null,
      colors: {},
      comment_status: null,
      date: null,
      display_title: null,
      excerpt: {},
      featured_image: null,
      format: null,
      guid: {},
      id: null,
      link: null,
      modified: null,
      modified_gmt: null,
      page_builder: [],
      ping_status: null,
      seo: {},
      slug: null,
      sticky: null,
      terms: {},
      title: {},
      type: "post"
    }
  });

  it('should return the first and last name of the author', () => {
    Object.assign(post._embedded.author[0], {
      first_name: "Bob",
      last_name: "Dylan",
      name: "spongebob"
    });
    expect(getAuthor(post)).to.equal("Bob Dylan");
  });

  describe('if the first name is not present', () => {
    it('should return the username', () => {
      Object.assign(post._embedded.author[0], {
        last_name: "Dylan",
        name: "spongebob"
      });
      expect(getAuthor(post)).to.equal("spongebob");
    });
  });

  describe('if only the first name is present', () => {
    it('should return the first name', () => {
      Object.assign(post._embedded.author[0], {
        first_name: "Bob",
        name: "spongebob"
      });
      expect(getAuthor(post)).to.equal("Bob");
    });
  });

  describe('if post is undefined', () => {
    it('should not throw an error', () => {
      expect(getAuthor).to.not.throw(ReferenceError);
      expect(getAuthor()).to.equal(undefined);
    });
  });

});
