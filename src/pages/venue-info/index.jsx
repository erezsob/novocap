// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import { fetchVenues } from './../../actions/venues';
import { Section } from './../../components';
import { GOOGLE_MAPS_API_KEY } from './../../constants';
import VenueItem from './venue-item';
import LogoUploader from './logo-uploader';
import styles from './styles.css';

import type { Venue } from './../../common/types';

type Props = {
  venue: Venue,
  fetchVenues: Function
};

export class VenuePage extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchVenues } = this.props;
    fetchVenues();
  }

  render() {
    const { venue } = this.props;
    const { address } = venue;
    return (
      <div>
        <Section title="General Information">
          <div className={styles.wrapper}>
            <div className={styles.container50}>
              <div className={styles.container100}>
                <VenueItem label="Venue Name" value={venue.name} />
              </div>
              <div className={styles.container100}>
                <VenueItem
                  label="Created at"
                  value={moment.parseZone(venue.createdAt).format('llll')}
                />
              </div>
              <div className={styles.container100}>
                <VenueItem label="ID" value={venue.uuid} />
              </div>
            </div>
            <div className={styles.container50}>
              <LogoUploader />
            </div>
          </div>
        </Section>
        <Section title="Address">
          <div className={styles.wrapper}>
            <div className={styles.container50}>
              <div className={styles.container50}>
                <VenueItem label="Address (Line 1)" value={address.address1} />
              </div>
              <div className={styles.container50}>
                <VenueItem label="Address (Line 2)" value={address.address2} />
              </div>
              <div className={styles.container50}>
                <VenueItem label="Zip Code" value={address.zipCode} />
              </div>
              <div className={styles.container50}>
                <VenueItem label="City" value={address.city} />
              </div>
              <div className={styles.container50}>
                <VenueItem label="State" value={address.state} />
              </div>
              <div className={styles.container50}>
                <VenueItem label="Country" value={address.country} />
              </div>
            </div>
            <div className={styles.container50}>
              <div className={styles.extraPadding}>
                <div className={styles.roundedWhiteBox}>
                  <iframe
                    className={styles.map}
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${
                      address.latitude
                    },${address.longitude}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Currency">
          <div className={styles.wrapper}>
            <div className={styles.container50}>
              <VenueItem label="Country" value={venue.currencyType} />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  venue: state.venues[0]
});

const mapDispatchToProps = {
  fetchVenues
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VenuePage)
);
