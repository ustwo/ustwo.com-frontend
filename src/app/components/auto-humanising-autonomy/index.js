import React, { Component } from 'react';
import firebase from 'firebase';
import ReactFire from 'reactfire';
import reactMixin from 'react-mixin';
import window from 'app/adaptors/server/window';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import Signup from 'app/components/signup';
import ContactBlockAuto from 'app/components/contact-block-auto';
import Footer from 'app/components/footer';

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

    return (
      <div className="page-auto page-auto-humanising-autonomy">
        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner" style={styles}>
            <ScrollWrapper
              component={
                <Hero
                  title={autoHumanisingAutonomyData.title}
                  subheading={autoHumanisingAutonomyData.subtitle}
                  transitionImage={true}
                  showDownIndicator={true}
                  eventLabel=''
                  fixedHeight={fixedHeight}
                  isMobile={isMobile}
                  scrollProgress={scrollProgress}
                  heroImage={true}
                />
              }
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
            />
          </div>
        </div>

        <div className="home-main-content-wrapper">

          <div className="auto-book-intro">
            <div className="auto-book-content-inner">

              <h1>Lorem ipsum dolor sit amet consecteuteur lorem ipsum dolor sit amet</h1>

            </div>
          </div>

          <div className="auto-book-form">
            <div className="auto-book-content-inner">

              <div className="auto-book-form-wrapper">
                <p>Get the book here! Read all about it and all the sumptious reasons to get it. And all that. etc.</p>

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

            </div>
          </div>

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
  subtitle: 'Humanising Autonomy'
}
