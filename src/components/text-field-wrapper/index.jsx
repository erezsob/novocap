// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles.css';

import type { FieldProps } from 'redux-form';

type Props = {
  label: string,
  type: string
} & FieldProps;

export default function TextFieldWrapper({
  input,
  label,
  meta: { touched, error },
  type = 'text',
  ...props
}: Props) {
  return (
    <div>
      <TextField
        type={type}
        label={label}
        error={touched && Boolean(error)}
        {...props}
        {...input}
      />
      {touched && (error && <span className={styles.error}>{error}</span>)}
    </div>
  );
}
