// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItemText } from 'material-ui/List';
import jss from './styles';

type Props = {
  classes: {
    root: string
  },
  primary: string
};

function CustomListItemText({ classes: { root }, primary }: Props) {
  return (
    <ListItemText classes={{ root }} disableTypography primary={primary} />
  );
}

export default withStyles(jss)(CustomListItemText);
