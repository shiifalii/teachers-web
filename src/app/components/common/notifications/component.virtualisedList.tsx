import React, { useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NotificationListProps } from './component.list';
import { isLoading } from 'app/helpers/comman.helper';

const LIST_HEIGHT = 0.9 * window.innerHeight;
const LIST_WIDTH = 0.3 * window.innerWidth;
const ITEM_HEIGHT = Math.min(0.2 * LIST_HEIGHT, 130);

function NotificationList(props: NotificationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    notifications: {
      apiState,
      data: { list = [], info },
    },
    toggleDrawer,
    fetchNotificationsByPage,
    perPageLimit,
    setNotificationView,
  } = props;

  useEffect(() => {
    if (info && info.totalCount) {
      setTotalPages(Math.ceil(info.totalCount / perPageLimit));
    }
  }, []);
  const loadNextPage = () => {
    fetchNotificationsByPage(currentPage + 1);
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const isNextPageLoading = isLoading(apiState);
  const hasNextPage = currentPage < totalPages;
  const itemCount = hasNextPage ? list.length + 1 : list.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index: number) => !hasNextPage || index < list.length;

  const Item = (props: any) => {
    const { index, style } = props;
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading....</div>;
    }
    return (
      <div
        style={{
          ...style,
          lineHeight: 'normal',
        }}
      >
        <ListItem
          button
          onClick={() => setNotificationView(index)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: !list[index].isViewed ? '#f1f8ff' : '#fff',
          }}
        >
          <ListItemText primary={list[index].body} />
          <ListItemText
            secondary={new Date(list[index].updatedAt).toDateString()}
          />
        </ListItem>
        <Divider />
      </div>
    );
  };

  return (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={() => {
          loadMoreItems();
          return null;
        }}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            height={LIST_HEIGHT}
            itemCount={itemCount}
            itemSize={ITEM_HEIGHT}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={LIST_WIDTH}
          >
            {Item}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default NotificationList;
