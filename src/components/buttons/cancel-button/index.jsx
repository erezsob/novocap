// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import jss from './styles';

type Props = {
  classes: {
    cancel: string
  },
  action: Function
};

function CancelButton({ classes: { cancel }, action }: Props) {
  return (
    <Button className={cancel} onClick={action}>
      Cancel
    </Button>
  );
}

export default withStyles(jss)(CancelButton);
