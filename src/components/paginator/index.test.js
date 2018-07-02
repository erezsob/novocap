import React from 'react';
import { HashRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ArrowForward from 'material-ui-icons/ArrowForward';
import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Paginator from './';
import styles from './styles.css';
import { DEFAULT_PAGER_SIZE } from './../../constants';

const props = {
  totalPages: 100,
  baseRoute: 'foo',
  pageSize: 20,
  currentPage: 3,
  className: 'bar',
  pagerSize: undefined
};

describe('<Paginator />', () => {
  let wrapper;
  let spyUpdatePagesArray;
  let spyComponentDidMount;
  let spyComponentWillReceiveProps;

  beforeEach(() => {
    spyComponentDidMount = jest.spyOn(Paginator.prototype, 'componentDidMount');
    spyComponentWillReceiveProps = jest.spyOn(
      Paginator.prototype,
      'componentWillReceiveProps'
    );
    spyUpdatePagesArray = jest.spyOn(Paginator.prototype, 'updatePagesArray');
    wrapper = shallow(<Paginator {...props} />);
  });

  afterEach(() => {
    spyUpdatePagesArray.mockClear();
    spyComponentDidMount.mockClear();
    spyComponentWillReceiveProps.mockClear();
  });

  it('renders', () => {
    expect(wrapper.find(`.${styles.pages}`)).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer
      .create(
        <HashRouter>
          <Paginator {...props} />
        </HashRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with the class passed as className', () => {
    wrapper.setProps({ className: 'fooBar' });
    expect(wrapper.hasClass('fooBar')).toBeTruthy();
  });

  it('renders the right quantity of page numbers', () => {
    expect(wrapper.find(`.${styles.number}`)).toHaveLength(
      wrapper.state().pages.length
    );
  });

  describe('<ArrowBack />', () => {
    let previousPageLink;

    beforeEach(() => {
      previousPageLink = wrapper.childAt(0).find(Link);
    });

    it('renders', () => {
      wrapper.setProps({ currentPage: 2 });
      expect(wrapper.find(ArrowBack)).toHaveLength(1);
    });

    it('links to the right url', () => {
      expect(previousPageLink.prop('to')).toBe(
        `${props.baseRoute}?page=${props.currentPage - 1}&size=${
          props.pageSize
        }`
      );
    });

    it('has a `disabled` class if current page equals 1', () => {
      wrapper.setProps({ currentPage: 1 });
      previousPageLink = wrapper.childAt(0).find(Link);
      expect(previousPageLink.hasClass(`${styles.disabled}`)).toBeTruthy();
    });
  });

  describe('<ArrowForward />', () => {
    let nextPageLink;

    beforeEach(() => {
      nextPageLink = wrapper.childAt(7).find(Link);
    });

    it('renders', () => {
      expect(wrapper.find(ArrowForward)).toHaveLength(1);
    });

    it('links to the right url', () => {
      expect(nextPageLink.prop('to')).toBe(
        `${props.baseRoute}?page=${props.currentPage + 1}&size=${
          props.pageSize
        }`
      );
    });

    it('has a `disabled` class if current page equals last page', () => {
      wrapper.setProps({ currentPage: props.totalPages });
      nextPageLink = wrapper.childAt(7).find(Link);
      expect(nextPageLink.hasClass(`${styles.disabled}`)).toBeTruthy();
    });
  });

  it('assigns the default value of `DEFAULT_PAGER_SIZE` to pagerSize if it is undefined', () => {
    expect(wrapper.state().pages.length).toBe(DEFAULT_PAGER_SIZE);
  });

  it('assigns an array with the size of pagerSize to `pages`', () => {
    const wrapper = shallow(<Paginator {...props} pagerSize={12} />);
    expect(wrapper.state().pages.length).toBe(12);
  });

  it('creates an array with the right page numbers', () => {
    expect(wrapper.state().pages).toEqual([3, 4, 5, 6, 7, 8]);
    wrapper.setProps({ currentPage: 20 });
    expect(wrapper.state().pages).toEqual([20, 21, 22, 23, 24, 25]);
  });

  it('creates an array with the right page numbers if current page < 1', () => {
    wrapper.setProps({ currentPage: 0 });
    expect(wrapper.state().pages).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('creates an array with the right page numbers if current page > totalPages', () => {
    wrapper.setProps({ currentPage: 101 });
    expect(wrapper.state().pages).toEqual([95, 96, 97, 98, 99, 100]);
  });

  it('invokes updatePagesArray() with prop `currentPage`', () => {
    expect(spyUpdatePagesArray).toHaveBeenCalledWith(props.currentPage);
  });

  describe('Lifecycle methods', () => {
    describe('componentDidMount()', () => {
      it('is called when receiving new props', () => {
        expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
      });
    });

    describe('componentWillReceiveProps()', () => {
      it('is called when receiving new props', () => {
        expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(0);
        wrapper.setProps({ currentPage: 5 });
        expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(1);
      });
    });
  });
});
