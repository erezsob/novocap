import React from 'react';
import { shallow } from 'enzyme';
import { ListItemText } from 'material-ui/List';
import { CustomListItemText } from '../../components';

describe('<CustomListItemText />', () => {
  const txt = 'djdfghdfghdfgh';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomListItemText primary={txt} />).dive();
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders a <ListItemText /> with the text passed as prop', () => {
    expect(wrapper.find(ListItemText)).toHaveLength(1);
    expect(wrapper.find(ListItemText).prop('primary')).toBe(txt);
  });

  it('has disableTypography as prop', () => {
    expect(wrapper.prop('disableTypography')).toBeTruthy();
  });
});
