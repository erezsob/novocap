// @flow
import * as React from 'react';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import SidebarItemLink from './link/index';
import jss from './styles';
import styles from './styles.css';

type Props = {
  classes: { root: string },
  icon: React.Element<any>,
  text: string,
  route: string,
  pathname: string,
  handleClick: Function
};

function SidebarItem({
  classes: { root },
  icon,
  text,
  route,
  pathname,
  handleClick
}: Props) {
  return (
    <MenuItem classes={{ root }} className={styles.item}>
      <SidebarItemLink
        icon={icon}
        text={text}
        pathname={pathname}
        route={route}
        handleClick={handleClick}
      />
    </MenuItem>
  );
}

export default withStyles(jss)(SidebarItem);
