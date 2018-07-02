import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import PaymentTypesCell from './';
import styles from './styles.css';

describe('<PaymentTypesCell />', () => {
  let wrapper;
  const paymentTypes = [
    {
      name: 'Cash'
    },
    {
      name: 'EC'
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<PaymentTypesCell paymentTypes={paymentTypes} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer
      .create(<PaymentTypesCell paymentTypes={paymentTypes} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with the right css class', () => {
    expect(wrapper.find(`.${styles.item}`)).toHaveLength(paymentTypes.length);
  });
});
