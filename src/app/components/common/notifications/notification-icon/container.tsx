import { connect } from 'react-redux';

import NotificationIcon from './component.icon';
import { notificationActions } from '../reducer';

// TODO - add state type later
const mapState = (state: any) => {
  return {
    unreadCount: state.notifications.notifications.data.unreadCount,
  };
};
//@ts-ignore
const mapDispatch = {
  unreadCountLoaded: notificationActions.unreadCountLoaded,
};

const conector = connect(mapState, mapDispatch);

export default conector(NotificationIcon);
