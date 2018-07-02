// @flow
import React from 'react';
import PublicRouter from './routes/public/';
import DevTools from './containers/DevTools';

export default function AppDev() {
  return (
    <div>
      <PublicRouter />
      <DevTools />
    </div>
  );
}
