import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TextField from 'material-ui/TextField';
import TextFieldWrapper from './';
import styles from './styles.css';

describe('<TextFieldWrapper />', () => {
  let wrapper;
  const props = {
    label: 'Text Field Label',
    meta: {
      touched: false,
      error: undefined
    }
  };

  beforeEach(() => {
    wrapper = shallow(<TextFieldWrapper {...props} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer.create(<TextFieldWrapper {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders by default <TextField /> element with the type of text', () => {
    expect(wrapper.find(TextField).props().type).toBe('text');
  });

  it('renders <TextField /> element with the given type', () => {
    wrapper.setProps({ type: 'fooType' });
    expect(wrapper.find(TextField).props().type).toBe('fooType');
  });

  it('renders a <TextField /> element with the given label', () => {
    expect(wrapper.find(TextField).props().label).toBe(props.label);
  });

  describe('Text Field Error', () => {
    it('renders properly with error message', () => {
      const errorProps = {
        ...props,
        meta: { touched: true, error: 'Required' }
      };
      const tree = renderer
        .create(<TextFieldWrapper {...errorProps} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders an error label', () => {
      wrapper.setProps({ meta: { touched: true, error: 'Required' } });
      const errorLabel = wrapper.find(`.${styles.error}`);
      expect(errorLabel).toHaveLength(1);
      expect(errorLabel.text()).toBe('Required');
    });
  });
});
