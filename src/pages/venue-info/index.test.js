import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { VenuePage } from './';
import LogoUploader from './logo-uploader';
import { GOOGLE_MAPS_API_KEY } from './../../constants';
import venues from './../../../mockdata/venues.json';
import styles from './styles.css';

describe('<VenuePage />', () => {
  let wrapper;
  let spyComponentDidMount;
  let spyFetchVenues;

  beforeEach(() => {
    spyComponentDidMount = jest.spyOn(VenuePage.prototype, 'componentDidMount');
    spyFetchVenues = jest.fn();

    wrapper = shallow(
      <VenuePage venue={venues[0]} fetchVenues={spyFetchVenues} />
    );
  });

  afterEach(() => {
    spyComponentDidMount.mockClear();
    spyFetchVenues.mockClear();
  });

  it('renders properly', () => {
    const tree = renderer.create(
      <VenuePage venue={venues[0]} fetchVenues={spyFetchVenues} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });

  describe('Lifecycle methods', () => {
    test('componentDidMount()', () => {
      expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
      expect(spyFetchVenues).toHaveBeenCalled();
    });
  });

  it('renders a <LogoUploader />', () => {
    expect(wrapper.find(LogoUploader)).toHaveLength(1);
  });

  it('renders a map with the right attributes', () => {
    const { address } = venues[0];
    expect(wrapper.find(`.${styles.map}`).props().src).toBe(
      `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${
        address.latitude
      },${address.longitude}`
    );
  });
});
