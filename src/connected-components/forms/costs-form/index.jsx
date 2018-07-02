// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { saveCostsFromModal } from '../../../actions/costs';
import { hideModal } from '../../../actions/modal';
import {
  CancelButton,
  SubmitButton,
  TextFieldWrapper
} from '../../../components';
import { FORMS } from './../../../constants';
import validate from '../../../util/form-validations';
import styles from './styles.css';

type Props = {
  label: Object | string,
  content: string,
  handleSubmit: Function,
  saveCostsFromModal: Function,
  hideModal: Function
};

export function CostsForm({
  label,
  content,
  handleSubmit,
  saveCostsFromModal,
  hideModal
}: Props) {
  return (
    <form onSubmit={handleSubmit(saveCostsFromModal)}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentText}>{content}</div>
        <Field
          className={styles.textField}
          name="costs"
          component={TextFieldWrapper}
          type="number"
          label={label}
          margin="dense"
          fullWidth
        />
      </div>
      <div className={styles.buttons}>
        <CancelButton action={hideModal} />
        <SubmitButton />
      </div>
    </form>
  );
}

const mapDispatchToProps = {
  saveCostsFromModal,
  hideModal
};

const withReduxForm = reduxForm({ form: FORMS.COSTS, validate });

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(withReduxForm(CostsForm));
