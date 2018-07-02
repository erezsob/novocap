// @flow
import React, { Component } from 'react';
import { MenuList } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames/bind';
import TrendingUp from 'material-ui-icons/TrendingUp';
import InfoIcon from 'material-ui-icons/InfoOutline';
import Receipt from 'material-ui-icons/Receipt';
import { VenueLogo } from '../../components';
import SidebarItem from './sidebar-item';
import { DASHBOARD, INVOICES, VENUE_INFO } from '../../routes';
import jss from './styles';
import styles from './styles.css';

type Props = {
  hideSidebar: Function,
  pathname: string,
  classes: {
    root: string
  },
  isResponsiveSidebarOpen: boolean,
  venueName: string
};

class Sidebar extends Component<Props> {
  props: Props;

  render() {
    const {
      classes: { root },
      isResponsiveSidebarOpen,
      venueName,
      pathname,
      hideSidebar
    }: Props = this.props;
    const cx = classNames.bind(styles);
    const classes = cx({
      active: isResponsiveSidebarOpen,
      sidebar: true
    });

    const items = [
      {
        route: DASHBOARD,
        icon: <TrendingUp />,
        text: 'Dashboard',
        isSpecial: true
      },
      {
        route: INVOICES,
        icon: <Receipt />,
        text: 'Invoices',
        isSpecial: false
      },
      {
        route: VENUE_INFO,
        icon: <InfoIcon />,
        text: 'Venue Information',
        isSpecial: false
      }
    ];

    return (
      <MenuList classes={{ root }} className={classes}>
        <VenueLogo venueName={venueName} />
        {items.map((item, idx) => (
          <SidebarItem
            key={idx}
            route={item.route}
            icon={item.icon}
            text={item.text}
            pathname={pathname}
            handleClick={hideSidebar}
          />
        ))}
      </MenuList>
    );
  }
}

export default withStyles(jss)(Sidebar);
