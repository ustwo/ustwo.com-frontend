import React, { Component } from 'react';
import firebase from 'firebase';
import ReactFire from 'reactfire';
import reactMixin from 'react-mixin';
import window from 'app/adaptors/server/window';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import Signup from 'app/components/signup';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';
import AutoWhatwedo from 'app/components/auto-whatwedo';
import VideoBlock from 'app/components/video-block';
import ArticlePreview from 'app/components/article-preview';
import kebabCase from 'lodash/string/kebabCase';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function handleInputChange(component, input) {
  return (event) => {
    const payload = Object.assign({}, component.state.payload);
    payload[input] = event.target.value;
    component.setState({ payload });
  };
}

function handleClick(component) {
  return (event) => {
    event.preventDefault();

    component.setState({ status: 'sending' });

    if (validateEmail(component.state.payload.email)) {
      component.firebaseRefs.signup.push(component.state.payload, (error) => {
        if (error) {
          component.setState({
            status: 'error',
            errorMessage: error,
          });
          return;
        }
        component.setState({ status: 'success' });
      });
    } else {
      component.setState({
        status: 'error',
        errorMessage: 'You must enter a valid email address',
      });
    }
  };
}

const config = {
  apiKey: "AIzaSyDkme6lbAz0ITTeY463TR5J9XLn6XqK7hI",
  authDomain: "auto-book-2.firebaseapp.com",
  databaseURL: "https://auto-book-2.firebaseio.com",
  projectId: "auto-book-2",
  storageBucket: "auto-book-2.appspot.com",
  messagingSenderId: "415950089629"
};

firebase.initializeApp(config);

class HumanisingAutonomy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      payload: {
        email: '',
        name: '',
        company: '',
      },
      status: 'ready',
      errorMessage: '',
    };
  }

  componentWillMount() {
    firebase.auth().signInAnonymously().catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    this.firebaseRef = firebase.database().ref('signup');
    this.bindAsArray(this.firebaseRef, 'signup');
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  renderAuthors(authors) {
    return authors.map(author => {
      return (
        <li key={kebabCase(author.name)}>
          <div className="author-image">
            <img src={author.imageUri} alt={`Photo of ${author.name}`} />
          </div>
          <div className="author-details">
            <h5>{author.name}</h5>
            <p>{author.occupation}</p>
          </div>
        </li>
      )
    });
  }

  render() {
    const { page, documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress } = this.props;
    const { payload, status, errorMessage } = this.state;

    let styles;
    if (documentScrollPosition > window.innerHeight + 100) {
      styles = { position: `relative` }
    }

    let showcaseVideoSrc;
    if (window.innerWidth < 600) {
      showcaseVideoSrc = 'https://player.vimeo.com/external/235923198.sd.mp4?s=810f877f1133af83ddcd75dfe46c5702f15b4c14&profile_id=164';
    } else {
      showcaseVideoSrc = 'https://player.vimeo.com/external/235923198.sd.mp4?s=810f877f1133af83ddcd75dfe46c5702f15b4c14&profile_id=165';
    }
    const showcaseVideoPoster = 'https://i.vimeocdn.com/video/657875722.jpg?mw=960&mh=540';

    const renderArticles = autoHumanisingAutonomyContent.articles.map((article, i) => {
      let content;
      if (i % 2 == 0) {
        content = <ArticlePreview data={article} alignright />;
      } else {
        content = <ArticlePreview data={article} />
      }

      return (
        <section className="humanising-autonomy-article">
          <div className="wrapper">
            {content}
          </div>
        </section>
      );
    });

    return (
      <div className="page-auto page-auto-humanising-autonomy page-case-study">

        <div className="page-content-wrapper">

          <section className="single-column intro">
            <div className="wrapper">
              <div className="section-title">Research Project</div>
              <h1 className="title">
                Humanising Autonomy
                <div className="subtitle">Where are we going?</div>
              </h1>
              <div className="content">
                <p>In our latest book, we argue the auto industry's approach to autonomy is imbalanced – we need to focus on the human factors involved rather than the technical challenges alone.</p>
              </div>
            </div>
          </section>

          <img src="/images/auto/humanising-autonomy-book-cover.jpg" className="rimage showcase-image" />

          <section className="single-column humanising-autonomy-form">
            <div className="wrapper">

              <h4>The Book is out now!</h4>

              <Signup
                onNameInput={handleInputChange(this, 'name')}
                onCompanyInput={handleInputChange(this, 'company')}
                onEmailInput={handleInputChange(this, 'email')}
                onSubmit={handleClick(this)}
                payload={payload}
                status={status}
                errorMessage={errorMessage}
              />
            </div>
          </section>

          <div className="showcase-video video">
            <VideoBlock
              videoPoster={showcaseVideoPoster}
              src={showcaseVideoSrc}
            />
          </div>

          {renderArticles}

          <div className="auto-team">
            <div className="auto-team-inner">

              <div className="section-title">Speak to the people behind the book</div>

              <ul className="auto-team-profiles">
                <li>
                  <section className="profile">
                    <div className="profile-photo"><img src="/images/auto/tim-smith.jpg" /></div>
                    <div className="profile-details">
                      <h3 className="profile-name">Tim Smith</h3>
                      <p className="profile-title">Design Principal</p>
                      <p className="profile-contact"><a href="https://www.linkedin.com/in/mypoorbrain/">Find Tim on linkedin</a></p>
                    </div>
                  </section>
                </li>
                <li>
                  <section className="profile">
                    <div className="profile-photo"><img src="/images/auto/harsha-vardhan.jpg" /></div>
                    <div className="profile-details">
                      <h3 className="profile-name">Harsha Vardhan</h3>
                      <p className="profile-title">Interaction Lead</p>
                      <p className="profile-contact"><a href="https://www.linkedin.com/in/harsha-vardhan-r-b7737810/">Find Harsha on linkedin</a></p>
                    </div>
                  </section>
                </li>
                <li>
                  <section className="profile">
                    <div className="profile-photo"><img src="/images/auto/lexi-cherniavsky.jpg" /></div>
                    <div className="profile-details">
                      <h3 className="profile-name">Lexi Cherniavsky</h3>
                      <p className="profile-title">Client Partner</p>
                      <p className="profile-contact"><a href="https://www.linkedin.com/in/lexi-cherniavsky-2765a525/">Find Lexi on linkedin</a></p>
                    </div>
                  </section>
                </li>
              </ul>

            </div>
          </div>

          <ScrollWrapper
            component={<ContactBlock page={page.slug} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-contact-block"
          />
          <Footer data={footer} studios={studios} currentPage={currentPage}/>

        </div>
      </div>
    )
  }
}

reactMixin(HumanisingAutonomy.prototype, ReactFire);

export default HumanisingAutonomy;

const autoHumanisingAutonomyContent = {
  title: 'Auto',
  subtitle: 'Humanising Autonomy',
  intro: "The auto industry's approach to autonomy is imbalanced – there is too much focus on discrete technologies, with little regard for the powerful human factors involved. In our latest book, we explore creating a human approach to autonomy that actually works.",
  articles: [{
    title: 'Introduction',
    subtitle: 'Humanising Autonomy',
    author: 'Book Chapter 1',
    excerpt: 'Autonomous vehicles promise to make a meaningful difference to the world, enabling a new level of mobility, independence and safety for all. Yet discussions continue to focus on topics such as technological feasibility and its impact to our roads, rather than the needs of the user.',
    uri: '/blog/ustwo-auto-humanising-autonomy',
    image: '/images/auto/article-humanising-autonomy.jpg'
  },{
    title: 'People and Driverless Vehicles',
    subtitle: 'What Does Autonomy Mean to You?',
    author: 'Book Chapter 2',
    excerpt: 'In order to overcome the barriers to autonomous vehicle adoption, they need to be truly accessible to everyone. The way to do this? Observe what people’s mobility wants and needs are. This is the key to creating a human approach to autonomy that actually works.',
    uri: '/blog/people-and-driverless-vehicles-what-does-autonomy-mean-to-you',
    image: '/images/auto/article-driverless-vehicles.jpg'
  },{
    title: 'Hailing a Driverless Taxi',
    subtitle: 'What roles will we miss when there is no longer a driver?',
    author: 'Book Chapter 15a',
    excerpt: 'In a driverless future, how will we hail a taxi? We argue that you need to look beyond app-based solutions to make these interactions as inclusive as possible.',
    uri: '/blog/hailing-a-driverless-taxi',
    image: '/images/auto/article-driverless-taxis.jpg'
  },{
    title: 'A glance at the future of external vehicular sound',
    subtitle: 'Increasing pedestrian safety through smart tones.',
    author: 'Book Chaper 15b',
    excerpt: "We explore different auditory concepts to communicate risk to pedestrians, with the goal of creating a safer relationship between them and Electronic Vehicles.",
    uri: '/blog/a-glance-at-the-future-of-external-vehicular-sound',
    image: '/images/auto/article-ev-sound.jpg'
  },{
    title: 'Introducing the ustwo Roo',
    subtitle: 'Our autonomous car concept',
    author: 'Book Chapter 15c',
    excerpt: 'Looking beyond opportunities to optimise, ustwo’s AV concept is built on the foundational idea that there’s more to people’s mobility needs than simply the vehicle and its technology.',
    uri: '/blog/introducing-ustwo-av-concept',
    image: '/images/auto/auto-roo.jpg'
  },{
    title: '9 things we learned at web summit',
    subtitle: 'ustwo Auto talk user-centred design for driverless cars.',
    author: '',
    excerpt: "Didn't make it to Web Summit 2017? Here's what ustwo got up to on stage – and what we learned off it.",
    uri: '/blog/9-things-we-learned-web-summit',
    image: '/images/auto/article-web-summit.jpg'
  }]
}
