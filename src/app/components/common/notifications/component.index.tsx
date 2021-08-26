import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styledComponents from 'styled-components';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import {
  getNotifications,
  viewNotification,
} from 'app/helpers/private.api.helper';
import { fetchNotifications } from './saga';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import { sagaMiddleware } from 'app/stores/configure.store';
import { buildTestRoute, isLoading } from 'app/helpers/comman.helper';

import NotificationList from './component.list';
import VirtualisedNotificationList from './component.virtualisedList';

const PER_PAGE_LIMIT = 5;

const Container = styledComponents.div`
  max-height: 60vh;
  overflow-y: auto;
  min-width: 200px;
`;

const NotificationHeading = styledComponents.div`
  font-size: 1.3em;
`;

const FullWidthButton = styled(Button)({
  display: 'block',
  width: '100%',
});

const FlexPaper = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '1em',
  marginBottom: '10px',
});

const AlignedIconButton = styled(IconButton)({
  alignSelf: 'flex-start',
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translateY(-50%)',
});

interface NotificationCenterProps {
  notifications: any;
  info?: { pageCount: number; totalCount: number };
  notificationViewed: any;
  conceptList: any[];
}

function fetchNotificationsByPage(pageNo: number) {
  const notificationParams = {
    pageNo,
    limit: PER_PAGE_LIMIT,
  };
  sagaMiddleware.run(
    fetchNotifications,
    getNotifications,
    notificationParams,
    (responseData: any) => {
      const extractedKeys = {
        info: responseData.data.info,
        list: responseData.data.list,
      };
      return extractedKeys;
    },
  );
}

function NotificationCenter(props: NotificationCenterProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { notifications, notificationViewed, conceptList } = props;
  const isNotificationsLoading: boolean = isLoading(notifications.apiState);

  const history = useHistory();

  useEffect(() => {
    // fetch first page of notifications
    const {
      data: { list = [] },
    } = notifications;
    if (list.length === 0) {
      fetchNotificationsByPage(1);
    }
  }, []);

  const setNotificationView = async (index: number) => {
    try {
      const notificationId = notifications.data.list[index]._id;
      const route = await buildTestRoute(
        notifications.data.list[index],
        conceptList,
      );
      if (route) {
        history.push(route);
      }

      if (!notifications.data.list[index].isViewed) {
        // Update isViewed boolean for notification in redux
        notificationViewed(index);
        // Hit viewNotification API
        await viewNotification({ notificationId });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      {drawerOpen ? (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <FlexPaper elevation={1}>
            <AlignedIconButton onClick={toggleDrawer(false)}>
              <ArrowBackIcon color="primary" />
            </AlignedIconButton>
            <NotificationHeading>Notification Center</NotificationHeading>
          </FlexPaper>
          <VirtualisedNotificationList
            notifications={notifications}
            toggleDrawer={toggleDrawer}
            fetchNotificationsByPage={fetchNotificationsByPage}
            perPageLimit={PER_PAGE_LIMIT}
            setNotificationView={setNotificationView}
          />
        </Drawer>
      ) : (
        <Paper>
          <Container>
            <LoaderWrapper isLoading={isNotificationsLoading}>
              <NotificationList
                notifications={notifications}
                toggleDrawer={toggleDrawer}
                fetchNotificationsByPage={fetchNotificationsByPage}
                perPageLimit={PER_PAGE_LIMIT}
                setNotificationView={setNotificationView}
              />
            </LoaderWrapper>
          </Container>
          <Paper elevation={3} style={{ marginTop: '10px' }}>
            <FullWidthButton
              color="primary"
              onClick={() => setDrawerOpen(true)}
            >
              View All Notifications
            </FullWidthButton>
          </Paper>
        </Paper>
      )}
    </>
  );
}

export default NotificationCenter;
