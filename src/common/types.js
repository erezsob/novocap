import { NOTIFICATION } from './../constants';
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Reducers } from '../reducers';
import type { Action } from './ActionFlowTypes';

// Redux types
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;
export type Store = ReduxStore<State, Action>;
export type GetState = () => State;
export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;
export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

// API data types
export type Credentials = {
  username: string,
  password: string
};

export type RevenueItem = {
  date: string,
  revenue: number
};

export type RawRevenue = Array<{
  superCategory: string,
  revenues: Array<RevenueItem>
}>;

export type RevenueItemReactVis = {
  x: string,
  y: number
};

export type Revenues = {
  drinks: Array<RevenueItem>,
  food: Array<RevenueItem>,
  other: Array<RevenueItem>
};

export type RevenuesReactVis = {
  drinks: Array<RevenueItemReactVis>,
  food: Array<RevenueItemReactVis>,
  other: Array<RevenueItemReactVis>
};

export type ReactTableColumn = {
  id: string,
  Header: string | React.Component<any>,
  accessor: Function,
  minWidth: number,
  maxWidth: number
};

export type ReactTableColumns = Array<ReactTableColumn>;

export type Oid = {
  uuid: string,
  version: number
};

export type PaymentType = {
  oid: Oid,
  name: string
};

export type PaymentTypes = Array<PaymentType>;

export type InvoiceElement = {
  uuid: string,
  createdAt: string,
  closedAt: string,
  totalAmount: number,
  invoiceNumber: string,
  table: {
    oid: Oid,
    name: string
  },
  user: {
    oid: Oid,
    name: string
  },
  paymentTypes: PaymentTypes
};

export type FetchInvoicesParams = {
  size: number,
  page: number
};

export type FetchRevenueParams = {
  startDate: string,
  endDate: string,
  periodType: string
};

export type InvoicesElements = Array<InvoiceElement>;

export type Invoices = {
  page: number,
  size: number,
  totalElements: number,
  totalPages: number,
  elements: InvoicesElements
};

export type SessionVenue = {
  currencyType: string,
  name: string,
  uuid: string
};

export type Venue = {
  address: {
    address1: string,
    address2: string,
    city: string,
    country: string,
    countryCode: string,
    latitude: number,
    longitude: number,
    state: string,
    streetNumber: string,
    zipCode: string
  },
  createdAt: string,
  currencyType: string,
  name: string,
  uuid: string
};

export type Venues = Array<Venue>;

export type ModalConfig = {
  title: string,
  content: string,
  input: {
    label: string
  }
};

export type LanguageLink = {
  to: string,
  text: string,
  code: string
};

export type RevenueParams = {
  setRevenueActionType: string,
  revenueType: string,
  action?: Function
};

export type NotificationType =
  | typeof NOTIFICATION.SUCCESS
  | typeof NOTIFICATION.WARNING
  | typeof NOTIFICATION.ERROR
  | undefined;

export type Notification = {
  isActive: boolean,
  type: NotificationType,
  message: string
};
