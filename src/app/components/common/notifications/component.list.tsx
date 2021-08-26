import React, { Fragment, useMemo } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Notification } from 'app/types/notification.types';
import { isLoading } from 'app/helpers/comman.helper';

export interface NotificationListProps {
  notifications: {
    apiState: number;
    data: {
      info: any;
      list: Notification[];
    };
  };
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  info?: { pageCount: number; totalCount: number };
  fetchNotificationsByPage: (pageNo: number) => void;
  perPageLimit: number;
  setNotificationView: (index: number) => void;
}

const listStyles = {
  width: '20em',
  lineHeight: 'normal',
};

function NotificationList(props: NotificationListProps) {
  const {
    notifications: {
      apiState,
      data: { list = [] },
    },
    toggleDrawer,
    perPageLimit,
    setNotificationView,
  } = props;
  const items = useMemo(() => list.slice(0, perPageLimit), [
    list,
    perPageLimit,
  ]);
  return (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List style={listStyles}>
        {items.map(({ _id, body, isViewed, updatedAt }, index) => (
          <Fragment key={_id}>
            <ListItem
              button
              onClick={() => setNotificationView(index)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: !isViewed ? '#f1f8ff' : '#fff',
              }}
            >
              <ListItemText primary={body} />
              <ListItemText secondary={new Date(updatedAt).toDateString()} />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
      {isLoading(apiState) && <p>Loading...</p>}
    </div>
  );
}

export default NotificationList;
