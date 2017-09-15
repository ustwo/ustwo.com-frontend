import React, { Component } from 'react';
import firebase from 'firebase';
import ReactFire from 'reactfire';
import reactMixin from 'react-mixin';
import window from 'app/adaptors/server/window';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import Signup from 'app/components/signup';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function handleInputChange(component) {
  return (event) => {
    component.setState({ email: event.target.value });
  };
}

function handleClick(component) {
  return (event) => {
    event.preventDefault();

    component.setState({ status: 'sending' });

    setTimeout(() => {
      if (validateEmail(component.state.email)) {
        component.firebaseRefs.signup.push(component.state.email, (error) => {
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
    }, 750); /* Just add a bit of time to satiate my appetite for spinners! */
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

class AutoBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
    const { email, status, errorMessage } = this.state;

    let styles;
    if (documentScrollPosition > window.innerHeight + 100) {
      styles = { position: `relative` }
    }

    return (
      <div className="page-auto page-auto-book">
        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner" style={styles}>
            <ScrollWrapper
              component={
                <Hero
                  title={autoBookData.title}
                  subheading={autoBookData.subtitle}
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

          BOOK CONTENT

          <Signup
            onEmailInput={handleInputChange(this)}
            onSubmit={handleClick(this)}
            email={email}
            status={status}
            errorMessage={errorMessage}
          />

        </div>
      </div>
    )
  }
}

reactMixin(AutoBook.prototype, ReactFire);

export default AutoBook;

const autoBookData = {
  title: 'Auto Book',
  subtitle: 'Humanising Autonomy'
}
