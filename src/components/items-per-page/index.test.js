import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Menu, { MenuItem } from 'material-ui/Menu';
import ItemsPerPage from './index';
import { ITEMS_PER_PAGE } from '../../constants';
import styles from './styles.css';

describe('<ItemsPerPage />', () => {
  const ROUTE = '/foo';
  let wrapper;
  let spyComponentWillReceiveProps;

  beforeEach(() => {
    spyComponentWillReceiveProps = jest.spyOn(
      ItemsPerPage.prototype,
      'componentWillReceiveProps'
    );
    wrapper = shallow(<ItemsPerPage size={20} route={ROUTE} />);
  });

  afterEach(() => {
    spyComponentWillReceiveProps.mockClear();
  });

  test('renders with the required props', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('renders correctly', () => {
    const tree = renderer
      .create(<ItemsPerPage size={20} route={ROUTE} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Lifecycle methods', () => {
    test('componentWillReceiveProps()', () => {
      const newWrapper = shallow(<ItemsPerPage size={50} route={ROUTE} />);
      expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(0);
      expect(newWrapper.state().selectedIndex).toBe(ITEMS_PER_PAGE.indexOf(50));

      newWrapper.setProps({ size: 75 });
      expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(1);
      expect(newWrapper.state().selectedIndex).toBe(ITEMS_PER_PAGE.indexOf(75));
    });
  });

  describe('<button />', () => {
    const buttonSelector = `.${styles.button}`;

    it('renders a <button />', () => {
      expect(wrapper.find(buttonSelector)).toHaveLength(1);
    });

    it('sets the anchorEl in the state on click event', () => {
      expect(wrapper.state().anchorEl).toBe(null);
      wrapper
        .find(buttonSelector)
        .simulate('click', { currentTarget: 'myTarget' });
      expect(wrapper.state().anchorEl).toBe('myTarget');
    });

    it('renders the right text as text node', () => {
      const selectedIndex = wrapper.state().selectedIndex;
      expect(wrapper.find(buttonSelector).text()).toBe(
        `${ITEMS_PER_PAGE[selectedIndex]}`
      );
    });

    describe('<Menu />', () => {
      it('renders a <Menu /> component', () => {
        expect(wrapper.find(Menu)).toHaveLength(1);
      });

      describe('<Link />', () => {
        it('renders as many <Link> components as available options', () => {
          expect(wrapper.find(Menu).children()).toHaveLength(
            ITEMS_PER_PAGE.length
          );
        });

        it('links to the right route and has the right className', () => {
          const firstLink = wrapper.find(Menu).childAt(0);
          expect(firstLink.prop('to')).toBe(
            `${ROUTE}?page=1&size=${ITEMS_PER_PAGE[0]}`
          );
          expect(firstLink.hasClass(`${styles.link}`)).toBeTruthy();
        });

        it('renders a <MenuItem /> as only child', () => {
          const firstLink = wrapper.find(Menu).childAt(0);
          expect(firstLink.find(MenuItem)).toHaveLength(1);
        });

        describe('<MenuItem />', () => {
          it('properly handles click events', () => {
            const target = wrapper
              .find(Menu)
              .childAt(2)
              .find(MenuItem);
            wrapper
              .find(`.${styles.button}`)
              .simulate('click', { currentTarget: 'targetThis' });

            expect(wrapper.state()).toEqual({
              anchorEl: 'targetThis',
              selectedIndex: 0
            });

            target.simulate('click', null, 2);

            expect(wrapper.state()).toEqual({
              anchorEl: null,
              selectedIndex: 2
            });
          });
        });
      });
    });
  });
});
