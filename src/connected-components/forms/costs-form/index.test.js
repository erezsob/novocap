import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CancelButton, SubmitButton } from '../../../components';
import ConnectedCostsForm, { CostsForm } from './index';
import styles from './styles.css';

const mockStore = configureStore([thunk]);
const initialState = {
  saveCostsFromModal: jest.fn(),
  hideModal: jest.fn()
};
const store = mockStore(initialState);

describe('<CostsForm />', () => {
  let wrapper;
  const props = {
    label: 'LabelText',
    content: 'Check all this content',
    handleSubmit: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<CostsForm {...props} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders connected component properly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedCostsForm {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a given label', () => {
    expect(wrapper.find(`.${styles.textField}`).props().label).toBe(
      'LabelText'
    );
  });

  it('renders with a given content', () => {
    expect(wrapper.find(`.${styles.contentText}`).props().children).toBe(
      'Check all this content'
    );
  });

  it('renders buttons', () => {
    expect(wrapper.find(`.${styles.buttons}`)).toHaveLength(1);
    expect(wrapper.find(CancelButton)).toHaveLength(1);
    expect(wrapper.find(SubmitButton)).toHaveLength(1);
  });
});
