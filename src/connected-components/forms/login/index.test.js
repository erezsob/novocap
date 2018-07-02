import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import LoginForm from './';

const mockStore = configureStore([thunk]);
const initialState = {};
const store = mockStore(initialState);

describe('<LoginForm />', () => {
  it('renders', () => {
    const wrapper = shallow(<LoginForm store={store} />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
