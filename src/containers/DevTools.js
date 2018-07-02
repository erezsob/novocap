import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

const shouldShow = !!localStorage.getItem('devtools');

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={shouldShow}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
