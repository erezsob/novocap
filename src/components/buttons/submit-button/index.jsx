// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import jss from './styles';

type Props = {
  classes: {
    submit: string
  }
};

function SubmitButton({ classes: { submit } }: Props) {
  return (
    <Button className={submit} type="submit">
      Save
    </Button>
  );
}

export default withStyles(jss)(SubmitButton);
