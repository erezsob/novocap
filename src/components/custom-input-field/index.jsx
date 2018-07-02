// @flow
import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.css';

import type { FieldProps } from 'redux-form';

type Props = {
  input: Object,
  label: React.Node,
  placeholder: string,
  type: string
} & FieldProps;

function CustomInputField({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error }
}: Props) {
  const cx = classNames.bind(styles);
  const containerClasses = cx({
    container: true,
    error: touched && error
  });
  const inputClasses = cx({ input: true, inputError: touched && error });

  return (
    <div className={containerClasses}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <input
          {...input}
          placeholder={touched && error ? error : placeholder}
          className={inputClasses}
          type={type}
        />
      </div>
    </div>
  );
}

export default CustomInputField;
