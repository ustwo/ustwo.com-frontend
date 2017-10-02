import React, { Component } from 'react';
import Meta from "react-helmet";
import firebase from 'firebase';
import ReactFire from 'reactfire';
import reactMixin from 'react-mixin';
import window from 'app/adaptors/server/window';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import Signup from 'app/components/signup';
import ContactBlockAuto from 'app/components/contact-block-auto';
import Footer from 'app/components/footer';
import AutoWhatwedo from 'app/components/auto-whatwedo';
import VideoBlock from 'app/components/video-block';

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
        errorMessage: 'Invalid email address',
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

  render() {
    const { page, documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress } = this.props;
    const { payload, status, errorMessage } = this.state;

    let styles;
    if (documentScrollPosition > window.innerHeight + 100) {
      styles = { position: `relative` }
    }

    const showcaseVideo = (
      <video>
        <source src="https://player.vimeo.com/external/233813909.sd.mp4?s=618cf0486ee0a0f5b972f352421f7f36a27beca8&profile_id=165" type="video/mp4" data-reactid="116" />
      </video>
    );

    let src;
    if (window.innerWidth < 600) {
      src= 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=164';
    } else {
      src= 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=165';
    }
    const videoPoster = '/images/ustwo-roadshow-first-frame.jpg';

    return (
      <div className="page-auto page-auto-humanising-autonomy page-case-study">

        <Meta
          meta={[{
            name: 'robots',
            content: 'noindex'
          }]}
        />

        <div className="page-content-wrapper">

          <section className="single-column intro">
            <div className="wrapper">
              <div className="section-title">Research Project</div>
              <h1 className="title">
                Humanising Autonomy:
                <div className="subtitle">Where are we going?</div>
              </h1>
              <div className="content">In our latest book, we explore creating a human approach to autonomy that actually works.</div>
            </div>
          </section>

          <img src="/images/auto/humanising-autonomy-book-cover.jpg" className="rimage" />

          <section className="single-column humanising-autonomy-form">
            <div className="wrapper">
              <h4>Humanising Autonomy is out now – get your free copy</h4>
              <p>The auto industry’s approach to autonomy is imbalanced – there is too much focus on discrete technologies, with little regard for the powerful human factors involved.</p>
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

          <div className="video">
            {showcaseVideo}
          </div>

          <section className="single-column">
            <div className="wrapper">
              <h2>Articles</h2>
              <VideoBlock title="What we do" videoPoster={videoPoster} src={src} />
              <h2>Another Article</h2>
            </div>
          </section>

          <ScrollWrapper
            component={<ContactBlockAuto />}
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

const autoHumanisingAutonomyData = {
  title: 'Auto',
  subtitle: 'Humanising Autonomy',
  intro: "The auto industry's approach to autonomy is imbalanced – there is too much focus on discrete technologies, with little regard for the powerful human factors involved. In our latest book, we explore creating a human approach to autonomy that actually works."
}
