import { connect } from 'react-redux';

import NotificationCenter from './component.index';
import { notificationActions } from './reducer';

// TODO - add state type later
const mapState = (state: any) => {
  return {
    notifications: state.notifications.notifications,
    conceptList: state.concept.concepts.data,
  };
};
//@ts-ignore
const mapDispatch = {
  notificationViewed: notificationActions.notificationViewed,
};

const conector = connect(mapState, mapDispatch);

export default conector(NotificationCenter);
