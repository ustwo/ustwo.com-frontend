import GridCell from './';

const cell = {
    "name": "grid_cell",
    "attr": {
        "heading": {
            "name": "heading",
            "value": "Make things that you love",
            "type": "text"
        },
        "body": {
            "name": "body",
            "value": "Together we’ll tackle unique, engaging challenges and evolve them into outstanding products that will make you proud to say, “I did that.”",
            "type": "wysiwyg"
        },
        "image": {
            "name": "image",
            "value": [{
                "id": 8785,
                "title": "01_makethingsyoulove",
                "filename": "01_makethingsyoulove.jpg",
                "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove.jpg",
                "link": "https://wp.ustwo.com/?attachment_id=8785",
                "alt": "",
                "author": "4",
                "description": "",
                "caption": "",
                "name": "01_makethingsyoulove",
                "status": "inherit",
                "uploadedTo": 0,
                "date": "2015-08-20T19:43:57.000Z",
                "modified": "2015-08-20T19:43:57.000Z",
                "menuOrder": 0,
                "mime": "image/jpeg",
                "type": "image",
                "subtype": "jpeg",
                "icon": "https://wp.ustwo.com/wordpress/wp-includes/images/media/default.png",
                "dateFormatted": "August 20, 2015",
                "nonces": {
                    "update": "b57d505e56",
                    "delete": "c0e073624a",
                    "edit": "16d1cd1872"
                },
                "editLink": "https://wp.ustwo.com/wordpress/wp-admin/post.php?post=8785&action=edit",
                "meta": false,
                "authorName": "ustwo",
                "filesizeInBytes": 107201,
                "filesizeHumanReadable": "105 kB",
                "sizes": {
                    "thumbnail": {
                        "height": 300,
                        "width": 300,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-300x300.jpg",
                        "orientation": "landscape"
                    },
                    "small": {
                        "height": 356,
                        "width": 640,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-640x356.jpg",
                        "orientation": "landscape",
                        "name": "small"
                    },
                    "small_crop": {
                        "height": 480,
                        "width": 640,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-640x480.jpg",
                        "orientation": "landscape"
                    },
                    "medium": {
                        "height": 569,
                        "width": 1024,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-1024x569.jpg",
                        "orientation": "landscape",
                        "name": "medium"
                    },
                    "medium_crop": {
                        "height": 768,
                        "width": 1024,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-1024x768.jpg",
                        "orientation": "landscape"
                    },
                    "large": {
                        "height": 1000,
                        "width": 1800,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-1800x1000.jpg",
                        "orientation": "landscape",
                        "name": "large"
                    },
                    "large_crop": {
                        "height": 1000,
                        "width": 1800,
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove-1800x1000.jpg",
                        "orientation": "landscape"
                    },
                    "full": {
                        "url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/01_makethingsyoulove.jpg",
                        "height": 1000,
                        "width": 1800,
                        "orientation": "landscape",
                        "name": "full"
                    }
                },
                "height": 1000,
                "width": 1800,
                "orientation": "landscape",
                "compat": {
                    "item": "",
                    "meta": ""
                }
            }],
            "type": "image"
        }
    }
};

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <GridCell cell={cell} />
      <GridCell cell={cell} />
    </div>;
  }
});

export default Sandbox;
