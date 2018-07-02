import * as actionTypes from './ActionTypes';
import { Venues, Revenues, Invoices } from './types';

type ToggleSidebarAction = {
  type: actionTypes.TOGGLE_SIDEBAR,
  payload: boolean
};

type HideSidebarAction = {
  type: actionTypes.HIDE_SIDEBAR,
  payload: boolean
};

type HandleResizeAction = {
  type: actionTypes.HANDLE_RESIZE,
  payload?: any
};

type InitDashboardAction = {
  type: actionTypes.INIT_DASHBOARD,
  payload?: any
};

type SetTimeFrameBreakEvenAction = {
  type: actionTypes.SET_TIME_FRAME_BREAK_EVEN,
  payload: string
};

type SetTimeFrameDashboardAction = {
  type: actionTypes.SET_TIME_FRAME_DASHBOARD,
  payload: string
};

type SetRevenueDashboardAction = {
  type: actionTypes.SET_REVENUE_DASHBOARD,
  payload: number
};

type SetRevenueBreakEvenAction = {
  type: actionTypes.SET_REVENUE_BREAK_EVEN,
  payload: number
};

type SetMonthlyCostsAction = {
  type: actionTypes.SET_MONTHLY_COSTS,
  payload: number
};

type SetCostsPerTimeFrameAction = {
  type: actionTypes.SET_COSTS_PER_TIME_FRAME,
  payload: number
};

type CalculateBreakEvenAction = {
  type: actionTypes.CALCULATE_BREAK_EVEN,
  payload?: any
};

type SetBreakEvenAction = {
  type: actionTypes.SET_BREAK_EVEN,
  payload: number
};

type ShowModalAction = {
  type: actionTypes.SHOW_MODAL,
  payload: boolean
};

type HideModalAction = {
  type: actionTypes.HIDE_MODAL,
  payload: boolean
};

type LoadingAction = {
  type: actionTypes.LOADING,
  payload: boolean
};

type ErroredAction = {
  type: actionTypes.ERRORED,
  payload: boolean
};

type FetchVenuesSuccessAction = {
  type: actionTypes.FETCH_VENUES_SUCCESS,
  payload: Venues
};

type FetchingRevenueAction = {
  type: actionTypes.FETCHING_REVENUE,
  payload: boolean
};

type FetchRevenueDashboardSuccessAction = {
  type: actionTypes.FETCH_REVENUE_DASHBOARD_SUCCESS,
  payload: Revenues
};
type FetchRevenueBreakEvenSuccessAction = {
  type: actionTypes.FETCH_REVENUE_BREAK_EVEN_SUCCESS,
  payload: Revenues
};

type FetchingInvoicesAction = {
  type: actionTypes.FETCHING_INVOICES,
  payload: boolean
};

type FetchInvoicesSuccessAction = {
  type: actionTypes.FETCH_INVOICES_SUCCESS,
  payload: Invoices
};

type IsAuthenticatedAction = {
  type: actionTypes.IS_AUTHENTICATED,
  payload: boolean
};

type WrongCredentialsAction = {
  type: actionTypes.WRONG_CREDENTIALS,
  payload: boolean
};

type CredentialsExpiredAction = {
  type: actionTypes.CREDENTIALS_EXPIRED,
  payload: boolean
};

export type Action =
  | ToggleSidebarAction
  | HideSidebarAction
  | HandleResizeAction
  | InitDashboardAction
  | SetTimeFrameDashboardAction
  | SetTimeFrameBreakEvenAction
  | SetRevenueDashboardAction
  | SetRevenueBreakEvenAction
  | SetMonthlyCostsAction
  | SetCostsPerTimeFrameAction
  | CalculateBreakEvenAction
  | SetBreakEvenAction
  | ShowModalAction
  | HideModalAction
  | LoadingAction
  | ErroredAction
  | FetchVenuesSuccessAction
  | FetchingRevenueAction
  | FetchRevenueDashboardSuccessAction
  | FetchRevenueBreakEvenSuccessAction
  | FetchingInvoicesAction
  | FetchInvoicesSuccessAction
  | IsAuthenticatedAction
  | WrongCredentialsAction
  | CredentialsExpiredAction;
