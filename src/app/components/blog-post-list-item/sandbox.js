import BlogPostListItem from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const data = {
    id: 8878,
    date: "2015-09-16T10:00:32",
    guid: {
        rendered: "http://wp.ustwo.com/?p=8878"
    },
    modified: "2015-09-24T13:34:21",
    modified_gmt: "2015-09-24T13:34:21",
    slug: "texting-and-driving-washington-uni",
    type: "post",
    link: "https://backend/blog/texting-and-driving-washington-uni/",
    title: {
        rendered: "Shift – the End of Texting While Driving?"
    },
    excerpt: {
        rendered: "<p>This is a guest post written by Rohan Kharbanda and Chris Olsen, graduates of the Masters Program in Human Computer Interaction + Design, headed by Linda Wagner at University of Washington in Seattle.The ustwo auto team – David Mingay, Tim Smith and Harsha Vardhan – worked with this group as advisors on their capstone project, [&hellip;]</p> "
    },
    author: 11,
    featured_image: 8962,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    format: "standard",
    seo: {
        title: "Shift – the End of Texting While Driving?",
        desc: "This is a guest post written by Rohan Kharbanda and Chris Olsen, graduates of the Masters Program in Human Computer Interaction + Design, headed by Linda Wagner at University of Washington in Seattle.The ustwo auto team – David Mingay, Tim Smith and Harsha Vardhan – worked with this group as advisors on their capstone project, [&hellip;] ",
        keywords: "digital design, product design, app design, product development, washington university, ustwo auto,",
        image: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image.jpg"
    },
    display_title: "",
    colors: {
        bg: "",
        primary: "",
        secondary: ""
    },
    _embedded: {
        author: [{
            avatar_urls: {
                24: "https://secure.gravatar.com/avatar/37b98a13dfeecf78eea4fb9adc2e4bdd?s=24&d=mm&r=g",
                48: "https://secure.gravatar.com/avatar/37b98a13dfeecf78eea4fb9adc2e4bdd?s=48&d=mm&r=g",
                96: "https://secure.gravatar.com/avatar/37b98a13dfeecf78eea4fb9adc2e4bdd?s=96&d=mm&r=g"
            },
            description: "ustwo Auto is the automotive team here at ustwo. We work on thought-pieces and build services and products around the connected car. ustwo Auto is comprised of a core team including Tim Smith, David Mingay and Harsha Vardhan.",
            first_name: "ustwo Auto",
            id: 11,
            last_name: "",
            link: "https://backend/blog/author/steve/",
            name: "ustwo Auto",
            url: "",
            contact_methods: {
                twitter: "",
                facebook: ""
            },
            _links: {
                self: [{
                    href: "https://backend/wp-json/wp/v2/users/11"
                }],
                collection: [{
                    href: "https://backend/wp-json/wp/v2/users"
                }]
            }
        }],
        "wp:attachment": [
            [{
                id: 8962,
                date: "2015-09-14T15:15:46",
                slug: "featured-image",
                type: "attachment",
                link: "https://backend/blog/texting-and-driving-washington-uni/featured-image/",
                title: {
                    rendered: "driving simulator"
                },
                author: 4,
                alt_text: "driving simulator",
                media_type: "image",
                source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image.jpg",
                media_details: {
                    width: 3456,
                    height: 2304,
                    file: "2012/09/featured-image.jpg",
                    sizes: {
                        thumbnail: {
                            file: "featured-image-300x300.jpg",
                            width: 300,
                            height: 300,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-300x300.jpg"
                        },
                        medium: {
                            file: "featured-image-1024x683.jpg",
                            width: 1024,
                            height: 683,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1024x683.jpg"
                        },
                        large: {
                            file: "featured-image-1800x1200.jpg",
                            width: 1800,
                            height: 1200,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1800x1200.jpg"
                        },
                        small: {
                            file: "featured-image-640x427.jpg",
                            width: 640,
                            height: 427,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-640x427.jpg"
                        },
                        small_crop: {
                            file: "featured-image-640x480.jpg",
                            width: 640,
                            height: 480,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-640x480.jpg"
                        },
                        medium_crop: {
                            file: "featured-image-1024x768.jpg",
                            width: 1024,
                            height: 768,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1024x768.jpg"
                        },
                        large_crop: {
                            file: "featured-image-1800x1200.jpg",
                            width: 1800,
                            height: 1200,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1800x1200.jpg"
                        }
                    },
                    image_meta: {
                        aperture: 0,
                        credit: "",
                        camera: "",
                        caption: "",
                        created_timestamp: 0,
                        copyright: "",
                        focal_length: 0,
                        iso: 0,
                        shutter_speed: 0,
                        title: "",
                        orientation: 0
                    }
                },
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/media/8962"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/media"
                    }],
                    author: [{
                        embeddable: true,
                        href: "https://backend/wp-json/wp/v2/users/4"
                    }],
                    replies: [{
                        embeddable: true,
                        href: "https://backend/wp-json/wp/v2/comments?post_id=8962"
                    }]
                }
            }], {
                id: 8962,
                date: "2015-09-14T15:15:46",
                slug: "featured-image",
                type: "attachment",
                link: "https://backend/blog/texting-and-driving-washington-uni/featured-image/",
                title: {
                    rendered: "driving simulator"
                },
                author: 4,
                alt_text: "driving simulator",
                media_type: "image",
                source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image.jpg",
                media_details: {
                    width: 3456,
                    height: 2304,
                    file: "2012/09/featured-image.jpg",
                    sizes: {
                        thumbnail: {
                            file: "featured-image-300x300.jpg",
                            width: 300,
                            height: 300,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-300x300.jpg"
                        },
                        medium: {
                            file: "featured-image-1024x683.jpg",
                            width: 1024,
                            height: 683,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1024x683.jpg"
                        },
                        large: {
                            file: "featured-image-1800x1200.jpg",
                            width: 1800,
                            height: 1200,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1800x1200.jpg"
                        },
                        small: {
                            file: "featured-image-640x427.jpg",
                            width: 640,
                            height: 427,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-640x427.jpg"
                        },
                        small_crop: {
                            file: "featured-image-640x480.jpg",
                            width: 640,
                            height: 480,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-640x480.jpg"
                        },
                        medium_crop: {
                            file: "featured-image-1024x768.jpg",
                            width: 1024,
                            height: 768,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1024x768.jpg"
                        },
                        large_crop: {
                            file: "featured-image-1800x1200.jpg",
                            width: 1800,
                            height: 1200,
                            "mime-type": "image/jpeg",
                            source_url: "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1800x1200.jpg"
                        }
                    },
                    image_meta: {
                        aperture: 0,
                        credit: "",
                        camera: "",
                        caption: "",
                        created_timestamp: 0,
                        copyright: "",
                        focal_length: 0,
                        iso: 0,
                        shutter_speed: 0,
                        title: "",
                        orientation: 0
                    }
                },
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/media/8962"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/media"
                    }],
                    author: [{
                        embeddable: true,
                        href: "https://backend/wp-json/wp/v2/users/4"
                    }],
                    replies: [{
                        embeddable: true,
                        href: "https://backend/wp-json/wp/v2/comments?post_id=8962"
                    }]
                }
            }
        ],
        "wp:term": [
            [{
                id: 489,
                link: "https://backend/blog/category/innovation/",
                name: "Innovation",
                slug: "innovation",
                taxonomy: "category",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/category/489"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/category"
                    }]
                }
            }],
            [{
                id: 280,
                link: "https://backend/blog/tag/auto/",
                name: "auto",
                slug: "auto",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/280"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 516,
                link: "https://backend/blog/tag/bluetooth/",
                name: "bluetooth",
                slug: "bluetooth",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/516"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 316,
                link: "https://backend/blog/tag/digital/",
                name: "digital",
                slug: "digital",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/316"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 317,
                link: "https://backend/blog/tag/digital-products/",
                name: "Digital Products",
                slug: "digital-products",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/317"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 392,
                link: "https://backend/blog/tag/people/",
                name: "people",
                slug: "people",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/392"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 517,
                link: "https://backend/blog/tag/safety/",
                name: "safety",
                slug: "safety",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/517"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 515,
                link: "https://backend/blog/tag/texting/",
                name: "texting",
                slug: "texting",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/515"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 447,
                link: "https://backend/blog/tag/ui/",
                name: "UI",
                slug: "ui",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/447"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 518,
                link: "https://backend/blog/tag/ustwo-auto/",
                name: "ustwo auto",
                slug: "ustwo-auto",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/518"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 459,
                link: "https://backend/blog/tag/ux/",
                name: "UX",
                slug: "ux",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/459"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }, {
                id: 519,
                link: "https://backend/blog/tag/washington-university/",
                name: "washington university",
                slug: "washington-university",
                taxonomy: "post_tag",
                color: "",
                _links: {
                    self: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag/519"
                    }],
                    collection: [{
                        href: "https://backend/wp-json/wp/v2/terms/tag"
                    }]
                }
            }],
            [{
                code: "rest_no_route",
                message: "No route was found matching the URL and request method",
                data: {
                    status: 404
                }
            }]
        ]
    }
};

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      {renderVariations({
        'Featured': <BlogPostListItem data={data} featured={true} />,
        'Default': <BlogPostListItem data={data} />
      })}
    </div>;
  }
});

export default Sandbox;
