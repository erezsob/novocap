import { connect } from 'react-redux';
import { Modal } from '../../components';
import CostsForm from '../forms/costs-form';
import { hideModal } from '../../actions/modal';

const MODAL_CONTENT_COMPONENTS = {
  COSTS_FORM: CostsForm
};

const mapDispatchToProps = {
  hideModal
};

const mapStateToProps = state => {
  const modalContentType = state.modal.modalConfig.modalContentType;
  return {
    modal: state.modal,
    ModalContent: MODAL_CONTENT_COMPONENTS[modalContentType]
  };
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(Modal);
