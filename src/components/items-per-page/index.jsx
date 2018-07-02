// @flow
import React, { PureComponent } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import { ITEMS_PER_PAGE } from '../../constants';

type Props = {
  size: number,
  route: string
};

type State = {
  anchorEl: HTMLElement | null,
  selectedIndex: number
};

class ItemsPerPage extends PureComponent<Props, State> {
  props: Props;
  state: State;

  state = {
    anchorEl: null,
    selectedIndex: ITEMS_PER_PAGE.indexOf(this.props.size)
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.size !== this.props.size) {
      this.setState({
        selectedIndex: ITEMS_PER_PAGE.indexOf(nextProps.size)
      });
    }
  }

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event: SyntheticEvent<MenuItem>, index: number) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, selectedIndex } = this.state;
    const { route } = this.props;
    return (
      <div className={styles.container}>
        <span>Show</span>
        <button className={styles.button} onClick={this.handleClick}>
          {ITEMS_PER_PAGE[selectedIndex]}
        </button>
        <span>items per page</span>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {ITEMS_PER_PAGE.map((option, idx) => (
            <Link
              to={`${route}?page=1&size=${option}`}
              key={idx}
              className={styles.link}
            >
              <MenuItem
                selected={idx === selectedIndex}
                onClick={event => this.handleMenuItemClick(event, idx)}
              >
                {option}
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ItemsPerPage;
