// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LOG_IN } from './../../routes';

type Props = {
  component: any,
  isAuthenticated: boolean,
  rest: Object
};

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  ...rest
}: Props) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LOG_IN,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

const withRedux = connect(mapStateToProps);

export default withRedux(PrivateRoute);
