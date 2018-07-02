import React from 'react';
import { shallow } from 'enzyme';
import AndroidIcon from 'material-ui-icons/Android';
import CustomListItemText from '../../../custom-list-item-text/index';
import { SidebarItemLink } from './index';
import styles from './styles.css';

describe('<SidebarItemLink />', () => {
  const myPath = '/my-path';
  const props = { pathname: myPath };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SidebarItemLink {...props} route="/" />);
  });

  it('renders with the css class `link`', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.hasClass(`${styles.link}`)).toBeTruthy();
  });

  it('renders a <CustomListItemText />', () => {
    expect(wrapper.find(CustomListItemText)).toHaveLength(1);
  });

  it('renders an `icon`', () => {
    expect(wrapper.find(`.${styles.icon}`)).toHaveLength(1);
  });

  it('renders an icon passed as prop', () => {
    wrapper.setProps({ icon: <AndroidIcon /> });
    expect(wrapper.find(AndroidIcon)).toHaveLength(1);
  });

  describe('if `pathname` is equal to `route`', () => {
    beforeEach(() => {
      wrapper.setProps({ route: myPath });
    });

    it('renders with the css class `selected`', () => {
      expect(
        wrapper.find(`.${styles.linkContent}`).hasClass(`${styles.selected}`)
      ).toBeTruthy();
    });
  });
});
