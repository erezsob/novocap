import { connect } from 'react-redux';
import { Notification } from '../../components';
import { hideNotification } from '../../actions/ui';

const mapDispatchToProps = {
  hideNotification
};

const mapStateToProps = state => ({
  notification: state.notification
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(Notification);
