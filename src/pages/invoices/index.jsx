// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { INVOICES } from './../../routes';
import { WIDGETS_CONTAINER_ID } from './../../constants';
import { InvoicesGrid } from '../../containers';
import { updateInvoicesResult } from './../../actions/invoices';
import { Section, ItemsPerPage, Paginator } from './../../components';
import styles from './styles.css';

import type { Invoices as InvoicesType } from './../../common/types';

type Props = {
  pages: number,
  totalPages: number,
  size: number,
  page: number,
  invoices: InvoicesType,
  updateInvoicesResult: Function,
  location: {
    search: string
  }
};

export class Invoices extends Component<Props> {
  props: Props;
  document: Document;

  componentDidMount() {
    const { updateInvoicesResult, location } = this.props;
    updateInvoicesResult(location);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { updateInvoicesResult, location } = this.props;
    const nextLocation = nextProps.location;
    if (nextLocation.search !== location.search) {
      updateInvoicesResult(nextLocation);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.search !== prevProps.location.search) {
      this.scrollToTop();
    }
  }

  scrollToTop = () => {
    let widgetsContainer = document.getElementById(WIDGETS_CONTAINER_ID);
    if (widgetsContainer instanceof HTMLElement) {
      widgetsContainer.scrollTop = 0;
    }
  };

  renderPagination = (page: number, totalPages: number, size: number) => (
    <Paginator
      currentPage={page}
      totalPages={totalPages}
      pageSize={size}
      baseRoute={INVOICES}
    />
  );

  render() {
    const { invoices, page, totalPages, size } = this.props;
    return (
      <div>
        <Section title="Invoices">
          <Grid item xs={12}>
            <div className={styles.controlsTop}>
              {this.renderPagination(page, totalPages, size)}
            </div>
            <InvoicesGrid invoices={invoices} />
            <div className={styles.controls}>
              <ItemsPerPage size={size} route={INVOICES} />
              {this.renderPagination(page, totalPages, size)}
            </div>
          </Grid>
        </Section>
        {page > totalPages && (
          <Redirect to={`${INVOICES}?page=${totalPages}&size=${size}`} />
        )}
        {page < 1 && <Redirect to={`${INVOICES}?page=1&size=${size}`} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  invoices: state.invoices,
  page: state.invoices.page,
  totalPages: state.invoices.totalPages,
  size: state.invoices.size
});

const mapDispatchToProps = {
  updateInvoicesResult
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Invoices)
);
