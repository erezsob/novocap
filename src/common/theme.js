import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7ac0f8',
      dark: '#767676',
      light: '#6bb8e9'
    },
    secondary: {
      main: '#767676',
      dark: '#000a12'
    },
    text: {
      main: '#ffffff'
    },
    background: {
      main: '#f0f0f0',
      light: '#f9f9f9'
    },
    divider: {
      main: '#bdbdbd'
    }
  }
});

export default theme;
