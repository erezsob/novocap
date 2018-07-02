import { grey, headerHeight, bottomShadow } from '../../common/variables.css';

export default {
  root: {
    display: 'flex',
    flex: 'auto',
    justifyContent: 'center',
    boxShadow: bottomShadow,
    backgroundColor: grey,
    height: headerHeight
  },
  '@media (min-width: 1276px) and (min-device-width: 1276px)': {
    menuIcon: {
      display: 'none'
    }
  }
};
