// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PrivateRoute } from './../../connected-components/';
import { Login, NotFoundPage } from './../../pages';
import MembersRouter from './../members';
import { ROOT, MEMBERS, LOG_IN } from '../../routes';

function PublicRouter() {
  return (
    <Switch>
      <Route path={LOG_IN} exact component={Login} />
      <Route path={ROOT} exact render={() => <Redirect to={MEMBERS} />} />
      <PrivateRoute path={MEMBERS} component={MembersRouter} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default withRouter(PublicRouter);
