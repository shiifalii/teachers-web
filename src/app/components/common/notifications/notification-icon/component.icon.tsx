import React, { useEffect } from 'react';
import Icon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { getUnreadNotificationCount } from 'app/helpers/private.api.helper';
import {
  setHideUnreadNotificationCountFlag,
  getHideUnreadNotificationCountFlag,
} from 'app/helpers/local.storage.helper';
import classes from '*.module.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    NotificationColor: {
      color: '#1d7dea',
      '@media screen and (max-width: 768px)': {
        color: '#fff',
        width: '1.3em',
        height: '1.3em',
      },
    },
  }),
);

interface NotificationIconProps {
  unreadCount: number;
  unreadCountLoaded: any;
}

async function fetchUnreadNotificationsCount(action: any) {
  try {
    const response = await getUnreadNotificationCount();
    const {
      data: { count },
    } = response.data;
    action(count);
  } catch (error) {
    console.log(error);
  }
}

function NotificationIcon(props: NotificationIconProps) {
  const classes = useStyles();
  useEffect(() => {
    if (!getHideUnreadNotificationCountFlag()) {
      fetchUnreadNotificationsCount(props.unreadCountLoaded);
    }
  }, []);

  return (
    <IconButton
      onMouseEnter={() => {
        setHideUnreadNotificationCountFlag();
        props.unreadCountLoaded(0);
      }}
    >
      <Badge badgeContent={props.unreadCount} color="error">
        <Icon className={classes.NotificationColor} fontSize="default" />
      </Badge>
    </IconButton>
  );
}

export default NotificationIcon;
