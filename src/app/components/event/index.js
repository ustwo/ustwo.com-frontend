import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import renderModules from 'app/lib/module-renderer';
import getAuthor from 'app/lib/get-author';
import getFeaturedImage from 'app/lib/get-featured-image';
import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';
import BlogPostMetaInformation from 'app/components/blog-post-meta-information';
import BlogCategoryTag from 'app/components/blog-category-tag';
import SocialMediaSharing from 'app/components/social-media-sharing';
import RelatedContent from 'app/components/related-content';

const PageEvent = React.createClass({
  mixins: [getScrollTrackerMixin('post')],
  render() {
    const {post} = this.props;
    const category = get(post, '_embedded.wp:term.0.0', []);
    const image = getFeaturedImage(post);
    const classes = classnames('page-event', this.props.className);
    return <article className={classes}>
      <style>{`
        .page-event .content-container a {
          border-bottom-color: #14C04D;
        }
      `}</style>
      <Rimage
        wrap='div'
        className='hero-image'
        sizes={get(image, 'media_details.sizes')}
        altText={get(image, 'alt_text')}
      />
      <div className='content-container'>
        <p className="date-time"><span className="date">02 January</span> <span className="time">6:45pm–10pm</span></p>
        {this.renderSocialMediaSharing('side')}
        <h1 className='title'>UX IS GOOD</h1>
        <p className="location"><span><a href="/events?studio=malmo">Malmo</a></span></p>
        <p className="im-in"><a href="#">I'm in</a></p>
        <section className="single-column">
          <div className="wrapper">
            <p>Lorem ipsum dolor sit amet, vitae eu nam adipiscing quis sapien, justo do ut orci, semper scelerisque scelerisque in donec, odio vestibulum arcu ac neque et lectus, aliquet porttitor non erat. Aute molestie mauris cras, quam et, eu cursus ac nullam cursus vestibulum. Urna nunc lacinia, donec urna, sed rutrum potenti. Lorem eget non arcu ipsum, pede praesent dui aliquam placerat dapibus pede, vestibulum et vel, libero etiam sit, in conubia ridiculus eu. Libero scelerisque, semper id nostrud in, ac eleifend vel, ipsum praesent tristique sociosqu quis nulla sit, in habitasse ridiculus lacus. Urna sed dui maecenas semper amet, mauris dolor sed ac.</p>
            <p>Lorem ipsum dolor sit amet, vitae eu nam adipiscing quis sapien, justo do ut orci, semper scelerisque scelerisque in donec, odio vestibulum arcu ac neque et lectus, aliquet porttitor non erat. Aute molestie mauris cras, quam et, eu cursus ac nullam cursus vestibulum. Urna nunc lacinia, donec urna, sed rutrum potenti. Lorem eget non arcu i</p>
          </div>
        </section>
        <p className="im-in"><a href="#">I'm in</a></p>
      </div>
    </article>
  },
  renderSocialMediaSharing(position) {
    const { post } = this.props;
    return (
      <SocialMediaSharing
        className={position}
        title={he.decode(get(post, 'title.rendered', ''))}
        uri={`http://ustwo.com/blog/${get(post, 'slug')}`}
      />
    );
  }
});

export default PageEvent;
