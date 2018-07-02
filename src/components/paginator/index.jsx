// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ArrowForward from 'material-ui-icons/ArrowForward';
import ArrowBack from 'material-ui-icons/ArrowBack';
import classnames from 'classnames/bind';
import styles from './styles.css';
import { DEFAULT_PAGER_SIZE } from './../../constants';

const cx = classnames.bind(styles);

type Props = {
  pagerSize?: number,
  pageSize: number,
  currentPage: number,
  totalPages: number,
  baseRoute: string,
  className?: string
};

type State = {
  pages: Array<number>
};

export default class Paginator extends PureComponent<Props, State> {
  props: Props;
  state: State;
  pagerSize: number;
  updatePagesArray: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      pages: []
    };

    this.updatePagesArray = this.updatePagesArray.bind(this);

    this.pagerSize = props.pagerSize || DEFAULT_PAGER_SIZE;
  }

  componentDidMount() {
    this.updatePagesArray(this.props.currentPage);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { currentPage, totalPages } = nextProps;
    const { pages } = this.state;

    if (currentPage < pages[0] || currentPage > pages[pages.length - 1]) {
      this.updatePagesArray(currentPage, totalPages);
    }
  }

  updatePagesArray(currentPage: number, totalPages: number) {
    const pages = [];
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage + this.pagerSize > totalPages) {
      currentPage = totalPages - (this.pagerSize - 1);
    }

    for (let i = 0; i < this.pagerSize; i++) {
      pages[i] = currentPage + i;
    }
    this.setState({ pages });
  }

  render() {
    const {
      totalPages,
      baseRoute,
      pageSize,
      currentPage,
      className = ''
    } = this.props;

    const { pages } = this.state;

    const paginatorClasses = cx({
      pages: true,
      [`${className}`]: Boolean(className)
    });

    const renderPageNumber = page => {
      const classes = cx({ selected: page === currentPage, number: true });
      return (
        <Link
          to={`${baseRoute}?page=${page}&size=${pageSize}`}
          className={classes}
        >
          {page}
        </Link>
      );
    };

    const renderArrow = (icon, page, isDisabled) => {
      const classes = cx({ link: true, disabled: isDisabled });
      return (
        <Link
          to={`${baseRoute}?page=${page}&size=${pageSize}`}
          className={classes}
        >
          {icon}
        </Link>
      );
    };

    return (
      <ul className={paginatorClasses}>
        <li>
          {renderArrow(
            <ArrowBack className={styles.icon} />,
            currentPage - 1,
            currentPage <= 1
          )}
        </li>

        {pages.map((page, idx) => <li key={idx}>{renderPageNumber(page)}</li>)}

        <li>
          {renderArrow(
            <ArrowForward className={styles.icon} />,
            currentPage + 1,
            currentPage >= totalPages
          )}
        </li>
      </ul>
    );
  }
}
