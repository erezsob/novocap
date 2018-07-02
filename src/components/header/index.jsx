// @flow
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LogoutIcon from 'material-ui-icons/PowerSettingsNew';
import { MyOBButton } from './../';
import { withStyles } from 'material-ui/styles';
import Clock from './../clock';
import jss from './styles';

type Props = {
  classes: {
    root: string,
    menuIcon: string
  },
  toggleSidebar: Function,
  logout: Function
};

function Header({ classes: { root, menuIcon }, toggleSidebar, logout }: Props) {
  return (
    <AppBar position="static" classes={{ root }}>
      <Toolbar>
        <IconButton
          onClick={toggleSidebar}
          aria-label="Menu icon"
          className={menuIcon}
        >
          <MenuIcon />
        </IconButton>
        <Clock />
        <MyOBButton icon={<LogoutIcon />} text="Log out" action={logout} />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(jss)(Header);
