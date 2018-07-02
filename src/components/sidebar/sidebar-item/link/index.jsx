// @flow
import * as React from 'react';
import classNames from 'classnames/bind';
import { ListItemIcon } from 'material-ui/List';
import { NavLink } from 'react-router-dom';
import CustomListItemText from '../../../custom-list-item-text/index';
import styles from './styles.css';

type Props = {
  icon: React.Element<any>,
  text: string,
  route: string,
  pathname: string,
  handleClick: Function
};

export function SidebarItemLink({
  icon,
  text,
  route,
  pathname,
  handleClick
}: Props) {
  const isSelected = pathname === route;
  const cx = classNames.bind(styles);
  const linkClasses = cx({
    link: true,
    inactive: isSelected
  });
  const linkContentClasses = cx({
    linkContent: true,
    selected: isSelected
  });

  return (
    <NavLink
      to={route}
      className={linkClasses}
      activeClassName="selected"
      onClick={handleClick}
    >
      <div className={linkContentClasses}>
        <ListItemIcon className={styles.icon}>{icon}</ListItemIcon>
        <CustomListItemText primary={text} />
      </div>
    </NavLink>
  );
}

export default SidebarItemLink;
