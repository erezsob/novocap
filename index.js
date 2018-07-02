import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'normalize.css';
import configureStore from './src/store/configureStore';
import App from './src/app';
import theme from './src/common/theme';
import './styles.css';
import './node_modules/react-vis/dist/style.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, {
    exclude: /^Animate|^TransitionGroup|^TouchRipple|^ButtonBase|^Link|^ListItem|^Curve|^Route|^WithStyles[(][a-zA-Z]*[)]/
  });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
