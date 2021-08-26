import ClevertapReact from 'clevertap-react';
import {
  LoginEventProperties,
  ClickedClassEventProperties,
  ClickedViewDetailsEventProperties,
  TopicUnlockEventProperties,
  SearchEventProperties,
  ViewStudentsEventProperties,
} from 'app/types/analytics.types';
import {
  CLEVERTAP_CREDENTIALS,
  GTM_CREDENTIALS,
} from 'app/constants/config.constant';
import debounce from 'app/helpers/debounce.helper';
import { gtmInitialise } from 'app/helpers/gtm.helper';

let gtmDataLayer = [];

export function initializeAnalytics() {
  ClevertapReact.initialize(CLEVERTAP_CREDENTIALS.accountId);
  gtmInitialise(window, document, 'script', 'dataLayer', GTM_CREDENTIALS.id);
  gtmDataLayer = (window as any).dataLayer;
}

function pushAnalyticEvent(
  eventName: string,
  eventProperties: any,
  categoryName: string,
) {
  ClevertapReact.event(eventName, eventProperties);
  gtmDataLayer.push({ event: eventName, properties: eventProperties });
}

export function LoginAnalyticEvent(eventProperties: LoginEventProperties) {
  // Send an event with name = Login
  pushAnalyticEvent('Login', eventProperties, 'Login');
}

export function ClickedClassAnalyticEvent(
  eventProperties: ClickedClassEventProperties,
) {
  // Send an event with name = clicked_Class
  pushAnalyticEvent('clicked_Class', eventProperties, 'Class explore');
}

export function ViewStudentsAnalyticEvent(
  eventProperties: ViewStudentsEventProperties,
) {
  // Send an event with name = viewed_Students
  pushAnalyticEvent('viewed_Students', eventProperties, 'Class explore');
}

export function TopicUnlockAnalyticEvent(
  eventProperties: TopicUnlockEventProperties,
) {
  // Send an event with name = topic_unlock
  pushAnalyticEvent('topic_unlock', eventProperties, 'Test unlock');
}

export function ClickedViewDetailsAnalyticEvent(
  eventProperties: ClickedViewDetailsEventProperties,
) {
  // Send an event with name = clicked_ViewDetail
  pushAnalyticEvent('clicked_ViewDetail', eventProperties, 'Test unlock');
}

function SearchEvent(eventProperties: SearchEventProperties) {
  // Send an event with name = Search
  if (eventProperties.searchText.length > 0) {
    pushAnalyticEvent('Search', eventProperties, 'Search');
  }
}

export const SearchAnalyticEvent = debounce(SearchEvent, 250);
