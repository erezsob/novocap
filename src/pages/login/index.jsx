// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import Transition from 'react-transition-group/Transition';
import { LoginForm, Notification } from './../../connected-components';
import { Footer } from './../../components';
import { checkIfLoggedIn } from './../../actions/authentication';
import obLogo from './../../img/ob_logo.svg';
import styles from './styles.css';

import type { Location } from 'react-router-dom';

type Props = {
  isAuthenticated: boolean,
  location: Location,
  checkIfLoggedIn: Function
};

type State = {
  redirectToReferrer: boolean,
  mounted: boolean
};

export class Login extends Component<Props, State> {
  props: Props;
  state: State;

  state = {
    redirectToReferrer: this.props.isAuthenticated,
    mounted: false
  };

  componentDidMount() {
    this.props.checkIfLoggedIn();
    this.setState({ mounted: true });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ redirectToReferrer: nextProps.isAuthenticated });
  }

  render() {
    const cx = classNames.bind(styles);
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, mounted } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Notification />
        <div className={styles.container}>
          <Transition in={mounted} timeout={300}>
            {status => {
              const boxClasses = cx({
                loginBox: true,
                boxEntering: status === 'entering',
                boxEntered: status === 'entered'
              });
              return (
                <div className={boxClasses}>
                  <img className={styles.logo} src={obLogo} />
                  <LoginForm />
                </div>
              );
            }}
          </Transition>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = {
  checkIfLoggedIn
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withRedux(Login));
