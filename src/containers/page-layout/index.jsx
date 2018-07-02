// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import { handleResize, hideSidebar, toggleSidebar } from '../../actions/ui';
import { logout } from './../../actions/authentication';
import { ConnectedModal, Notification } from '../../connected-components';
import {
  Header,
  RightContainer,
  Sidebar,
  Tint,
  Footer
} from './../../components';
import { getVenueFromStorage } from './../../util/venue';
import styles from './styles.css';

type Props = {
  handleResize: Function,
  hideSidebar: Function,
  toggleSidebar: Function,
  logout: Function,
  children: React.Node,
  isResponsiveSidebarOpen: boolean,
  loading: boolean,
  venueName: string,
  pathname: string
};

export class PageLayout extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { handleResize } = this.props;
    handleResize(window.innerWidth);
  };

  render() {
    const {
      children,
      isResponsiveSidebarOpen,
      hideSidebar,
      toggleSidebar,
      logout,
      venueName,
      pathname,
      loading
    } = this.props;
    return (
      <div className={styles.page}>
        <Notification />
        <Sidebar
          isResponsiveSidebarOpen={isResponsiveSidebarOpen}
          hideSidebar={hideSidebar}
          venueName={venueName}
          pathname={pathname}
        />
        <div className={styles.rightContainer}>
          {loading && (
            <div className={styles.progress}>
              <LinearProgress />
            </div>
          )}
          <Header toggleSidebar={toggleSidebar} logout={logout} />
          <RightContainer>
            {children}
            <Footer />
          </RightContainer>
        </div>
        {isResponsiveSidebarOpen && <Tint hideSidebar={hideSidebar} />}
        <ConnectedModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isResponsiveSidebarOpen: state.isSidebarOpen,
  venueName: state.venues[0].name || getVenueFromStorage().name,
  loading: state.loading
});

const mapDispatchToProps = {
  handleResize,
  hideSidebar,
  toggleSidebar,
  logout
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(PageLayout);
