import { SHOW_MODAL, HIDE_MODAL } from '../common/ActionTypes';

const initialState = {
  open: false,
  modalConfig: {
    modalContentType: '',
    title: '',
    content: '',
    label: ''
  }
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        open: action.open,
        modalConfig: action.modalConfig
      };
    }
    case HIDE_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
}
