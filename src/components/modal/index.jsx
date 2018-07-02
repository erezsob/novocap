// @flow
import * as React from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import jss from './styles';
import styles from './styles.css';

type Props = {
  classes: {
    paper: string
  },
  modal: {
    open: boolean,
    modalConfig: {
      title: string,
      content: any,
      label: string
    }
  },
  ModalContent: React.StatelessFunctionalComponent<any>,
  hideModal: Function
};

function Modal({
  classes: { paper },
  modal: { open, modalConfig: { title, content, label } },
  ModalContent,
  hideModal
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={hideModal}
      aria-labelledby="dialog-title"
      classes={{ paper }}
    >
      <DialogTitle className={styles.title} id="dialog-title">
        {title}
      </DialogTitle>
      {ModalContent ? <ModalContent label={label} content={content} /> : null}
    </Dialog>
  );
}

export default withStyles(jss)(Modal);
