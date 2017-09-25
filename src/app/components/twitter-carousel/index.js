import React, {Component} from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';
import axios from 'axios';

class TwitterCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfItems: 3,
            currentItem: 0,
            testimonialsPosition: {},
            fixedHeighttestimonials: 0,
            tweets: [],
        }

        this.getTestimonialsPositionBound = this.getTestimonialsPosition.bind(this);
    }

    nextItem() {
        const {numberOfItems, currentItem} = this.state;

        if (currentItem === numberOfItems - 1) {
            this.setState({currentItem: 0})
        } else {
            this.setState({currentItem: currentItem + 1});
        }
    }

    getTestimonialsPosition() {
        const {documentScrollPosition, viewportDimensions, type} = this.props;

        // Here type denotes the auto colour on the twitter block, meaning it is
        // a lighter colour and therefore we don't want the navigation to know about it
        // as we don't want the nav colour to change when over it - getit?
        if (!type) {
            const testimonialsHeight = this.testimonialsWrapper.getBoundingClientRect().height;

            // Has been some problems relying on the following value.
            // So I've taken lead from the following to get a more robust solution:
            // http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
            const box = this.testimonialsWrapper.getBoundingClientRect();
            const body = document.body;
            const scrollTop = window.pageYOffset || body.scrollTop;
            const clientTop = body.clientTop || 0;
            const top = box.top + scrollTop - clientTop;
            const testimonialsPositionFromTop = Math.round(top);

            const testimonialsPosition = {
                from: testimonialsPositionFromTop,
                to: testimonialsPositionFromTop + testimonialsHeight
            }

            const fixedHeightTestimonials = testimonialsHeight;

            Flux.testimonialsPosition(testimonialsPosition);
        }
    }

    renderTestimonials() {
        const {type} = this.props;

        function ustwoauto_tweets_add_links(text) {
            var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return text.replace(urlRegex, function (url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            });
        }

        return this.state.tweets.map((testimonial, i) => {

            const classes = classnames('testimonial-item', {
                active: i === this.state.currentItem
            });

            function ustwoauto_html_tweets() {
                return {__html: ustwoauto_tweets_add_links(testimonial.text)};
            }

            let icon;
            if (type === 'twitter-auto') {
                icon = (
                    <div className="testimonial-icon">
                        <SVG
                            className="logo"
                            title="twitter logo"
                            spritemapID="twitter"
                        />
                    </div>
                );
            }

            return (
                <div key={`testimonial-${i}`} className={classes}>
                    {icon}
                    <p dangerouslySetInnerHTML={ustwoauto_html_tweets()}></p>
                    <div className="testimonial-smallprint">
                        <a href="https://twitter.com/ustwoauto" target="_blank">
                              <span className="testimonial-company">{testimonial.user.name}</span>
                        </a>
                    </div>
                </div>
            );
        });
    }

    componentDidMount() {

        axios.get(`https://wp-staging.ustwo.com/wordpress/wp-admin/admin-ajax.php?action=ustwo_auto_tweets`, {crossdomain: true})
            .then(res => {
                const tweets = res.data.map(obj => obj);
                this.setState({tweets});
            });

        this.getTestimonialsPosition();
        window.addEventListener('resize', this.getTestimonialsPositionBound);
    }

    componentWillUnmount() {
        Flux.testimonialsPosition({});
        window.removeEventListener('resize', this.getTestimonialsPositionBound);
    }

    render() {
        const {fixedHeight, type} = this.props;
        const classes = classnames('testimonial-carousel', {
            twitterAuto: type === 'twitter-auto'
        });

        let styles;
        if (fixedHeight) {
            styles = {height: `${fixedHeight * .9}px`}
        }

        return (
            <section className={classes} style={styles} ref={(ref) => this.testimonialsWrapper = ref }>
                <div className="testimonial-content">
                    {this.renderTestimonials()}
                </div>
                <button className="tesimonial-button-next" onClick={() => this.nextItem()}>
                    <SVG spritemapID="shuffle"/>
                </button>
            </section>
        );
    }
}
;

export default TwitterCarousel;