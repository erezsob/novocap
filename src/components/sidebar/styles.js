import { fullVPHeight, sidebarGrey } from '../../common/variables.css';

export default {
  root: {
    maxWidth: 350,
    height: fullVPHeight,
    padding: 0,
    backgroundColor: sidebarGrey,
    position: 'absolute'
  },
  '@media (min-width: 1276px) and (min-device-width: 1276px)': {
    root: {
      position: 'static'
    }
  }
};
