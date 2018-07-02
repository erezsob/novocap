// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UserIcon from 'material-ui-icons/Person';
import KeyIcon from 'material-ui-icons/VpnKey';
import { login } from './../../../actions/authentication';
import { MyOBButton, CustomInputField } from './../../../components';
import validate from './../../../util/form-validations';
import { FORMS } from './../../../constants';
import styles from './styles.css';

type Props = {
  handleSubmit: Function,
  login: Function
};

function LoginForm({ handleSubmit, login }: Props) {
  return (
    <form className={styles.form} onSubmit={handleSubmit(login)}>
      <Field
        name="username"
        component={CustomInputField}
        type="text"
        label={<UserIcon />}
        placeholder="Username"
      />
      <Field
        name="password"
        component={CustomInputField}
        type="password"
        label={<KeyIcon />}
        placeholder="Password"
      />
      <MyOBButton text="Login" bigger />
    </form>
  );
}

const mapDispatchToProps = {
  login
};

const withReduxForm = reduxForm({ form: FORMS.LOGIN, validate });

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(withReduxForm(LoginForm));
