// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { PrivateRoute } from './../../connected-components/';
import { PageLayout } from '../../containers';
import { Dashboard, Invoices, Venue } from './../../pages';
import { DASHBOARD, INVOICES, VENUE_INFO, ROOT } from '../../routes';

import type { Location } from 'react-router-dom';

type Props = { location: Location };

export function MembersRouter({ location }: Props) {
  const currentKey = location.pathname.split('/')[2] || '/';

  return (
    <PageLayout pathname={location.pathname}>
      <TransitionGroup>
        <CSSTransition
          key={currentKey}
          classNames="members-fade"
          timeout={300}
          appear
        >
          <Switch location={location}>
            <PrivateRoute path={INVOICES} exact component={Invoices} />
            <PrivateRoute path={DASHBOARD} exact component={Dashboard} />
            <PrivateRoute path={VENUE_INFO} exact component={Venue} />
            <Route path={ROOT} render={() => <Redirect to={DASHBOARD} />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </PageLayout>
  );
}

export default withRouter(MembersRouter);
