'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import MediaQuery from 'react-responsive';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import getFeaturedImage from 'app/lib/get-featured-image';

import ScrollMagic from 'app/adaptors/server/scroll-magic';
import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';
import Tracking from 'app/adaptors/server/tracking';
import window from 'app/adaptors/server/window';
import Track from 'app/adaptors/server/track';
import env from 'app/adaptors/server/env';

import DownChevron from 'app/components/down-chevron';
import SVG from 'app/components/svg';
import WordAnimation from 'app/components/word-animation';
import EntranceTransition from 'app/components/entrance-transition';
import Rimage from 'app/components/rimage';

import BoldHeader from 'app/components/bold-header';
import HomeTextBlock from 'app/components/home-text-block';
import ScreenBlock from 'app/components/screen-block';
import RelatedContent from 'app/components/related-content';

const page = {
  "id": 5731,
  "date": "2013-12-10T20:38:52",
  "guid": {
    "rendered": "http:\/\/dev.ustwo.com\/?page_id=5731"
  },
  "modified": "2015-11-25T13:43:27",
  "modified_gmt": "2015-11-25T13:43:27",
  "slug": "home",
  "type": "page",
  "link": "https:\/\/backend\/home\/",
  "title": {
    "rendered": "Home"
  },
  "excerpt": {
    "rendered": ""
  },
  "author": 53,
  "featured_image": 9175,
  "parent": 0,
  "menu_order": 0,
  "comment_status": "open",
  "ping_status": "open",
  "template": "",
  "seo": {
    "title": "ustwo | Digital product studio",
    "desc": "We work with big brands to solve the huge problems \u2013 launching new products, services and companies that are of strategic importance and reliant on innovation.",
    "keywords": "digital product studio, digital design, app development, ventures, development, engineering, product design, product development.",
    "image": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-640x480.png"
  },
  "hero": {
    "name": "header",
    "attr": {
      "heading": {
        "name": "heading",
        "value": "We're a digital product studio",
        "type": "text"
      },
      "subheading": {
        "name": "subheading",
        "value": "",
        "type": "textarea"
      }
    }
  },
  "page_builder": [{
    "name": "featured_block",
    "attr": {
      "heading": {
        "name": "heading",
        "value": "Creative client work",
        "type": "text"
      },
      "description": {
        "name": "description",
        "value": "<p>We work as partners with the biggest and smartest brands to make defining digital products, services and businesses.<\/p>",
        "type": "wysiwyg"
      },
      "image_png": {
        "name": "image_png",
        "value": [{
          "uploading": false,
          "date": 1448443295000,
          "filename": "Homepage_Harvey_Phone.png",
          "menuOrder": 0,
          "uploadedTo": 5731,
          "type": "image",
          "subtype": "png",
          "id": 9172,
          "title": "Homepage_Harvey_Phone",
          "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone.png",
          "link": "http:\/\/wp.ustwo.com\/home\/homepage_harvey_phone\/",
          "alt": "",
          "author": "3",
          "description": "",
          "caption": "",
          "name": "homepage_harvey_phone",
          "status": "inherit",
          "modified": 1448443295000,
          "mime": "image\/png",
          "icon": "https:\/\/wp.ustwo.com\/wordpress\/wp-includes\/images\/media\/default.png",
          "dateFormatted": "November 25, 2015",
          "nonces": {
            "update": "58225ed91a",
            "delete": "3dbffb9e82",
            "edit": "f33ca1771b"
          },
          "editLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=9172&action=edit",
          "meta": false,
          "authorName": "nick",
          "uploadedToLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=5731&action=edit",
          "uploadedToTitle": "Home",
          "filesizeInBytes": 349753,
          "filesizeHumanReadable": "342 kB",
          "sizes": {
            "thumbnail": {
              "height": 300,
              "width": 300,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone-300x300.png",
              "orientation": "landscape"
            },
            "small": {
              "height": 480,
              "width": 538,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone-538x480.png",
              "orientation": "landscape"
            },
            "small_crop": {
              "height": 480,
              "width": 640,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone-640x480.png",
              "orientation": "landscape"
            },
            "full": {
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone.png",
              "height": 624,
              "width": 700,
              "orientation": "landscape"
            }
          },
          "height": 624,
          "width": 700,
          "orientation": "landscape",
          "compat": {
            "item": "",
            "meta": ""
          }
        }],
        "type": "image"
      },
      "image_jpg": {
        "name": "image_jpg",
        "value": [{
          "uploading": false,
          "date": 1448443295000,
          "filename": "Homepage_Harvey_Phone.png",
          "menuOrder": 0,
          "uploadedTo": 5731,
          "type": "image",
          "subtype": "png",
          "id": 9172,
          "title": "Homepage_Harvey_Phone",
          "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone.png",
          "link": "http:\/\/wp.ustwo.com\/home\/homepage_harvey_phone\/",
          "alt": "",
          "author": "3",
          "description": "",
          "caption": "",
          "name": "homepage_harvey_phone",
          "status": "inherit",
          "modified": 1448443295000,
          "mime": "image\/png",
          "icon": "https:\/\/wp.ustwo.com\/wordpress\/wp-includes\/images\/media\/default.png",
          "dateFormatted": "November 25, 2015",
          "nonces": {
            "update": "58225ed91a",
            "delete": "3dbffb9e82",
            "edit": "f33ca1771b"
          },
          "editLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=9172&action=edit",
          "meta": false,
          "authorName": "nick",
          "uploadedToLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=5731&action=edit",
          "uploadedToTitle": "Home",
          "filesizeInBytes": 349753,
          "filesizeHumanReadable": "342 kB",
          "sizes": {
            "thumbnail": {
              "height": 300,
              "width": 300,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone-300x300.png",
              "orientation": "landscape"
            },
            "small": {
              "height": 480,
              "width": 538,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone-538x480.png",
              "orientation": "landscape"
            },
            "small_crop": {
              "height": 480,
              "width": 640,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone-640x480.png",
              "orientation": "landscape"
            },
            "full": {
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Harvey_Phone.png",
              "height": 624,
              "width": 700,
              "orientation": "landscape"
            }
          },
          "height": 624,
          "width": 700,
          "orientation": "landscape",
          "compat": {
            "item": "",
            "meta": ""
          }
        }],
        "type": "image"
      },
      "text_colour": {
        "name": "text_colour",
        "value": "#F8F8F8",
        "type": "text"
      },
      "background_colour": {
        "name": "background_colour",
        "value": "#009CF3",
        "type": "text"
      }
    }
  }, {
    "name": "featured_block",
    "attr": {
      "heading": {
        "name": "heading",
        "value": "Award-winning own products and games",
        "type": "text"
      },
      "description": {
        "name": "description",
        "value": "<p>We invest time, money and passion to learn by doing \u2013 creating products for ourselves and the world. Whether our iconic game\u00a0<a href=\"http:\/\/www.monumentvalleygame.com\/\" target=\"_blank\">Monument Valley<\/a>\u00a0or innovative technical platform\u00a0<a href=\"http:\/\/www.wayfindr.net\/\" target=\"_blank\">Wayfindr<\/a>, we create products with passion from conception to launch and beyond.<\/p>",
        "type": "wysiwyg"
      },
      "image_png": {
        "name": "image_png",
        "value": [{
          "uploading": false,
          "date": 1448443384000,
          "filename": "Homepage_Games_Ipad.png",
          "menuOrder": 0,
          "uploadedTo": 5731,
          "type": "image",
          "subtype": "png",
          "id": 9173,
          "title": "Homepage_Games_Ipad",
          "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad.png",
          "link": "http:\/\/wp.ustwo.com\/home\/homepage_games_ipad\/",
          "alt": "",
          "author": "3",
          "description": "",
          "caption": "",
          "name": "homepage_games_ipad",
          "status": "inherit",
          "modified": 1448443384000,
          "mime": "image\/png",
          "icon": "https:\/\/wp.ustwo.com\/wordpress\/wp-includes\/images\/media\/default.png",
          "dateFormatted": "November 25, 2015",
          "nonces": {
            "update": "2b2411b3c2",
            "delete": "8d0bb527bb",
            "edit": "dfbeb97ada"
          },
          "editLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=9173&action=edit",
          "meta": false,
          "authorName": "nick",
          "uploadedToLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=5731&action=edit",
          "uploadedToTitle": "Home",
          "filesizeInBytes": 483475,
          "filesizeHumanReadable": "472 kB",
          "sizes": {
            "thumbnail": {
              "height": 300,
              "width": 300,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad-300x300.png",
              "orientation": "landscape"
            },
            "small": {
              "height": 480,
              "width": 532,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad-532x480.png",
              "orientation": "landscape"
            },
            "small_crop": {
              "height": 480,
              "width": 640,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad-640x480.png",
              "orientation": "landscape"
            },
            "full": {
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad.png",
              "height": 758,
              "width": 840,
              "orientation": "landscape"
            }
          },
          "height": 758,
          "width": 840,
          "orientation": "landscape",
          "compat": {
            "item": "",
            "meta": ""
          }
        }],
        "type": "image"
      },
      "image_jpg": {
        "name": "image_jpg",
        "value": [{
          "uploading": false,
          "date": 1448443384000,
          "filename": "Homepage_Games_Ipad.png",
          "menuOrder": 0,
          "uploadedTo": 5731,
          "type": "image",
          "subtype": "png",
          "id": 9173,
          "title": "Homepage_Games_Ipad",
          "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad.png",
          "link": "http:\/\/wp.ustwo.com\/home\/homepage_games_ipad\/",
          "alt": "",
          "author": "3",
          "description": "",
          "caption": "",
          "name": "homepage_games_ipad",
          "status": "inherit",
          "modified": 1448443384000,
          "mime": "image\/png",
          "icon": "https:\/\/wp.ustwo.com\/wordpress\/wp-includes\/images\/media\/default.png",
          "dateFormatted": "November 25, 2015",
          "nonces": {
            "update": "2b2411b3c2",
            "delete": "8d0bb527bb",
            "edit": "dfbeb97ada"
          },
          "editLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=9173&action=edit",
          "meta": false,
          "authorName": "nick",
          "uploadedToLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=5731&action=edit",
          "uploadedToTitle": "Home",
          "filesizeInBytes": 483475,
          "filesizeHumanReadable": "472 kB",
          "sizes": {
            "thumbnail": {
              "height": 300,
              "width": 300,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad-300x300.png",
              "orientation": "landscape"
            },
            "small": {
              "height": 480,
              "width": 532,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad-532x480.png",
              "orientation": "landscape"
            },
            "small_crop": {
              "height": 480,
              "width": 640,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad-640x480.png",
              "orientation": "landscape"
            },
            "full": {
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Games_Ipad.png",
              "height": 758,
              "width": 840,
              "orientation": "landscape"
            }
          },
          "height": 758,
          "width": 840,
          "orientation": "landscape",
          "compat": {
            "item": "",
            "meta": ""
          }
        }],
        "type": "image"
      },
      "text_colour": {
        "name": "text_colour",
        "value": "#333333",
        "type": "text"
      },
      "background_colour": {
        "name": "background_colour",
        "value": "#FFBF02",
        "type": "text"
      }
    }
  }, {
    "name": "featured_block",
    "attr": {
      "heading": {
        "name": "heading",
        "value": "Launching new ventures",
        "type": "text"
      },
      "description": {
        "name": "description",
        "value": "<p>Working with people who know their industry inside-out gets us super excited. We partner with the world\u2019s leading experts and entrepreneurs, offering our expertise, technology or investment to create great new companies like live music discovery platform\u00a0<a href=\"https:\/\/dice.fm\/\" target=\"_blank\">DICE<\/a>, or relaxation and meditation iOS app\u00a0<a href=\"http:\/\/getpauseapp.com\/\" target=\"_blank\">PAUSE<\/a>.<\/p>",
        "type": "wysiwyg"
      },
      "image_png": {
        "name": "image_png",
        "value": [{
          "uploading": false,
          "date": 1448443438000,
          "filename": "Homepage_Dice_Mask.png",
          "menuOrder": 0,
          "uploadedTo": 5731,
          "type": "image",
          "subtype": "png",
          "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask.png",
          "title": "Homepage_Dice_Mask",
          "caption": "",
          "alt": "",
          "description": "",
          "id": 9174,
          "link": "http:\/\/wp.ustwo.com\/home\/homepage_dice_mask\/",
          "author": "3",
          "name": "homepage_dice_mask",
          "status": "inherit",
          "modified": 1448443438000,
          "mime": "image\/png",
          "icon": "https:\/\/wp.ustwo.com\/wordpress\/wp-includes\/images\/media\/default.png",
          "dateFormatted": "November 25, 2015",
          "nonces": {
            "update": "414e4f7b96",
            "delete": "4d649b4d83",
            "edit": "839013f091"
          },
          "editLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=9174&action=edit",
          "meta": false,
          "authorName": "nick",
          "uploadedToLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=5731&action=edit",
          "uploadedToTitle": "Home",
          "filesizeInBytes": 264342,
          "filesizeHumanReadable": "258 kB",
          "sizes": {
            "thumbnail": {
              "height": 300,
              "width": 300,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-300x300.png",
              "orientation": "landscape"
            },
            "small": {
              "height": 480,
              "width": 495,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-495x480.png",
              "orientation": "landscape"
            },
            "small_crop": {
              "height": 480,
              "width": 640,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-640x480.png",
              "orientation": "landscape"
            },
            "medium": {
              "height": 768,
              "width": 793,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-793x768.png",
              "orientation": "landscape"
            },
            "medium_crop": {
              "height": 768,
              "width": 840,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-840x768.png",
              "orientation": "landscape"
            },
            "full": {
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask.png",
              "height": 814,
              "width": 840,
              "orientation": "landscape"
            }
          },
          "height": 814,
          "width": 840,
          "orientation": "landscape",
          "compat": {
            "item": "",
            "meta": ""
          }
        }],
        "type": "image"
      },
      "image_jpg": {
        "name": "image_jpg",
        "value": [{
          "uploading": false,
          "date": 1448443438000,
          "filename": "Homepage_Dice_Mask.png",
          "menuOrder": 0,
          "uploadedTo": 5731,
          "type": "image",
          "subtype": "png",
          "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask.png",
          "title": "Homepage_Dice_Mask",
          "caption": "",
          "alt": "",
          "description": "",
          "id": 9174,
          "link": "http:\/\/wp.ustwo.com\/home\/homepage_dice_mask\/",
          "author": "3",
          "name": "homepage_dice_mask",
          "status": "inherit",
          "modified": 1448443438000,
          "mime": "image\/png",
          "icon": "https:\/\/wp.ustwo.com\/wordpress\/wp-includes\/images\/media\/default.png",
          "dateFormatted": "November 25, 2015",
          "nonces": {
            "update": "414e4f7b96",
            "delete": "4d649b4d83",
            "edit": "839013f091"
          },
          "editLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=9174&action=edit",
          "meta": false,
          "authorName": "nick",
          "uploadedToLink": "https:\/\/wp.ustwo.com\/wordpress\/wp-admin\/post.php?post=5731&action=edit",
          "uploadedToTitle": "Home",
          "filesizeInBytes": 264342,
          "filesizeHumanReadable": "258 kB",
          "sizes": {
            "thumbnail": {
              "height": 300,
              "width": 300,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-300x300.png",
              "orientation": "landscape"
            },
            "small": {
              "height": 480,
              "width": 495,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-495x480.png",
              "orientation": "landscape"
            },
            "small_crop": {
              "height": 480,
              "width": 640,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-640x480.png",
              "orientation": "landscape"
            },
            "medium": {
              "height": 768,
              "width": 793,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-793x768.png",
              "orientation": "landscape"
            },
            "medium_crop": {
              "height": 768,
              "width": 840,
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask-840x768.png",
              "orientation": "landscape"
            },
            "full": {
              "url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/Homepage_Dice_Mask.png",
              "height": 814,
              "width": 840,
              "orientation": "landscape"
            }
          },
          "height": 814,
          "width": 840,
          "orientation": "landscape",
          "compat": {
            "item": "",
            "meta": ""
          }
        }],
        "type": "image"
      },
      "text_colour": {
        "name": "text_colour",
        "value": "#F8F8F8",
        "type": "text"
      },
      "background_colour": {
        "name": "background_colour",
        "value": "#F9615B",
        "type": "text"
      }
    }
  }],
  "display_title": "Home",
  "colors": {
    "bg": "#6114cc",
    "primary": "#f8f8f8",
    "secondary": ""
  },
  "featured_video": null,
  "_embedded": {
    "author": [
      [{
        "code": "rest_user_cannot_view",
        "message": "Sorry, you cannot view this user",
        "data": {
          "status": 403
        }
      }]
    ],
    "wp:attachment": [
      [{
        "id": 9175,
        "date": "2015-11-25T11:38:44",
        "slug": "watches",
        "type": "attachment",
        "link": "https:\/\/backend\/home\/watches\/",
        "title": {
          "rendered": "watches"
        },
        "author": 3,
        "alt_text": "",
        "media_type": "image",
        "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches.png",
        "media_details": {
          "width": 1100,
          "height": 633,
          "file": "2013\/12\/watches.png",
          "sizes": {
            "thumbnail": {
              "file": "watches-300x300.png",
              "width": 300,
              "height": 300,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-300x300.png"
            },
            "medium": {
              "file": "watches-1024x589.png",
              "width": 1024,
              "height": 589,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-1024x589.png"
            },
            "small": {
              "file": "watches-640x368.png",
              "width": 640,
              "height": 368,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-640x368.png"
            },
            "small_crop": {
              "file": "watches-640x480.png",
              "width": 640,
              "height": 480,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-640x480.png"
            },
            "medium_crop": {
              "file": "watches-1024x633.png",
              "width": 1024,
              "height": 633,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-1024x633.png"
            }
          },
          "image_meta": {
            "aperture": 0,
            "credit": "",
            "camera": "",
            "caption": "",
            "created_timestamp": 0,
            "copyright": "",
            "focal_length": 0,
            "iso": 0,
            "shutter_speed": 0,
            "title": "",
            "orientation": 0
          }
        }
      }], {
        "id": 9175,
        "date": "2015-11-25T11:38:44",
        "slug": "watches",
        "type": "attachment",
        "link": "https:\/\/backend\/home\/watches\/",
        "title": {
          "rendered": "watches"
        },
        "author": 3,
        "alt_text": "",
        "media_type": "image",
        "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches.png",
        "media_details": {
          "width": 1100,
          "height": 633,
          "file": "2013\/12\/watches.png",
          "sizes": {
            "thumbnail": {
              "file": "watches-300x300.png",
              "width": 300,
              "height": 300,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-300x300.png"
            },
            "medium": {
              "file": "watches-1024x589.png",
              "width": 1024,
              "height": 589,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-1024x589.png"
            },
            "small": {
              "file": "watches-640x368.png",
              "width": 640,
              "height": 368,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-640x368.png"
            },
            "small_crop": {
              "file": "watches-640x480.png",
              "width": 640,
              "height": 480,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-640x480.png"
            },
            "medium_crop": {
              "file": "watches-1024x633.png",
              "width": 1024,
              "height": 633,
              "mime-type": "image\/png",
              "source_url": "https:\/\/usweb-cdn.ustwo.com\/ustwo-production\/uploads\/2013\/12\/watches-1024x633.png"
            }
          },
          "image_meta": {
            "aperture": 0,
            "credit": "",
            "camera": "",
            "caption": "",
            "created_timestamp": 0,
            "copyright": "",
            "focal_length": 0,
            "iso": 0,
            "shutter_speed": 0,
            "title": "",
            "orientation": 0
          }
        }
      }
    ]
  }
};

const PageHome = React.createClass({
  mixins: [getScrollTrackerMixin('home')],
  animateChevron(event) {
    if(this.refs.downChevron) {
      this.refs.downChevron.resetAnim();
      this.refs.downChevron.anim();
    }
  },
  setupScrollMagic() {
    // const { page } = this.props;
    const blocks = get(page, 'page_builder', []);
    let pageElement = React.findDOMNode(this);
    this.Tracking.addPageScrollTracking('home', pageElement);

    if (!env.Modernizr.touchevents && window.innerWidth > 480) {
      let scrollController = this.Tracking.scrollController;
      let blockWelcome = {
        attr: {
          background_colour: {
            value: get(page, 'colors.bg')
          }
        }
      };
      let blockWelcomeDom = React.findDOMNode(this.refs.blockWelcome);
      blockWelcomeDom.style.backgroundColor = 'transparent';
      // set initial colour – we need to do this due to having an offset
      pageElement.style.backgroundColor = get(page, 'colors.bg');

      this.scrollSceneChevron = new ScrollMagic.Scene({
          triggerElement: blockWelcomeDom,
          triggerHook: 'onLeave',
          duration: () => {return blockWelcomeDom.clientHeight * 0.7}
        })
        .addTo(scrollController);

      this.colourBlockScenes = [];
      blocks.forEach((block, index) => {
        const blockDom = React.findDOMNode(this.refs[`block${index}`]);
        const previousBlock = blocks[index - 1] || blockWelcome;
        blockDom.style.backgroundColor = 'transparent';
        this.colourBlockScenes.push(this.createColourBlockScene(scrollController, pageElement, blockDom, get(previousBlock, 'attr.background_colour.value'), get(block, 'attr.background_colour.value')));
      });
    }
  },
  teardownScrollMagic() {
    this.Tracking.removePageScrollTracking();

    if (!env.Modernizr.touchevents && window.innerWidth > 480) {
      this.scrollSceneChevron.remove();
      this.colourBlockScenes.forEach((scene) => {
        scene.remove();
      });
    }
  },
  createColourBlockScene(scrollController, pageElement, blockReference, hexColour1, hexColour2) {
    return new ScrollMagic.Scene({
        triggerElement: blockReference,
        triggerHook: 'onEnter',
        offset: blockReference.clientHeight * 0.25,
        duration: () => {return blockReference.clientHeight * 0.5}
      })
      .addTo(scrollController)
      // .addIndicators() // add indicators (requires plugin)
      .on('progress', (e) => {
        window.requestAnimationFrame(() => {
          pageElement.style.backgroundColor = '#' + this.blendColours(hexColour1, hexColour2, e.progress);
        });
    });
  },
  blendColours(colour1, colour2, percentage) {
    let rgbColour1 = hexRgb(colour1);
    let rgbColour2 = hexRgb(colour2);

    let rgbColour3 = [
      (1 - percentage) * rgbColour1[0] + percentage * rgbColour2[0],
      (1 - percentage) * rgbColour1[1] + percentage * rgbColour2[1],
      (1 - percentage) * rgbColour1[2] + percentage * rgbColour2[2]
    ];

    return rgbHex(rgbColour3[0], rgbColour3[1], rgbColour3[2]);
  },
  componentWillMount() {
    this.Tracking = new Tracking();
  },
  componentDidMount() {
    this.setupScrollMagic();
    this.animTimeout = setTimeout(() => {
      this.animateChevron();
    }, 2500);
  },
  componentWillUnmount() {
    this.teardownScrollMagic();
    clearTimeout(this.animTimeout);
  },
  render() {
    // const { page } = this.props;
    const classes = classnames('page-home', this.props.className);
    const featuredImage = getFeaturedImage(page);
    // Show only the final frame of the Chevron animation on mobile
    let Chevron;
    if (window.innerWidth <= 480) {
      Chevron = (<div className="down-chevron">
        <svg ref="animsvg" title="Down arrow" role="img" viewBox="0 0 400 200"><g>
        <path d="M195.864 143.667c19.556-14.667 39.556-28.89 59.11-43.556 2.224 2.67 6.224 8 8.446 10.67-22.222 16.89-45.778 32.45-67.556 50.67-21.778-17.78-44.89-33.33-67.11-50.22 2.22-2.66 6.22-8 8-11.11 20 14.67 39.555 29.33 59.11 43.56z"/>
      </g></svg></div>);
    } else {
      Chevron = <DownChevron ref="downChevron" onClick={this.onClickDownChevron} />;
    }
    // End Chevron
    return (
      <article className={classes}>
        <ScreenBlock ref="blockWelcome" customClass="welcome" textColour={get(page, 'colors.primary')} bgColour={get(page, 'colors.bg')}>
          <EntranceTransition className="image-entrance">
            <Rimage wrap="div" className="headline-image" sizes={get(featuredImage, 'media_details.sizes')} />
          </EntranceTransition>
          <EntranceTransition className="title-entrance">
            <div className="headline-text title">
              <BoldHeader colour="white">
                <WordAnimation delay={1} duration={0.4}>
                  {get(page, 'hero.attr.heading.value')}
                </WordAnimation>
              </BoldHeader>
            </div>
          </EntranceTransition>
          {Chevron}
        </ScreenBlock>
        {this.renderFeatureBlocks()}
        {this.renderRelatedContent()}
      </article>
    );
  },
  renderFeatureBlocks() {
    // const { page } = this.props;
    return get(page, 'page_builder').map((block, index) => {
      const blockAttrs = get(block, 'attr');
      return <ScreenBlock key={`block${index}`} ref={`block${index}`} textColour={get(blockAttrs, 'text_colour.value')} bgColour={get(blockAttrs, 'background_colour.value')}>
        <div className="block-parent">
          <div className="block-child">
            <MediaQuery maxWidth={480}>
              <Rimage wrap="div" className="image-container" sizes={get(blockAttrs, 'image_jpg.value.0.sizes')} />
            </MediaQuery>
            <MediaQuery minWidth={481}>
              <Rimage wrap="div" className="image-container" sizes={get(blockAttrs, 'image_png.value.0.sizes')} />
            </MediaQuery>
          </div>
        </div>
        <div className="text-block">
          <HomeTextBlock title={get(blockAttrs, 'heading.value')} colour={get(blockAttrs, 'text_colour.value')}>
            {get(block, 'attr.description.value')}
          </HomeTextBlock>
        </div>
      </ScreenBlock>;
    });
  },
  renderRelatedContent() {
    let relatedContent;
    if(this.props.relatedContent.length) {
      relatedContent = <RelatedContent content={this.props.relatedContent} />
    }
    return relatedContent;
  },
  onClickDownChevron() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_chevron',
      'eventLabel': 'home'
    });
  }
});

export default PageHome;
