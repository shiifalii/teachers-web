import React from 'react';
import { Center } from 'app/components';
import { Heading, useStyles } from '../styles';
interface IEmptyState {
  emptyViaSearch?: boolean;
  query: string;
}

export const EmptyState = ({ emptyViaSearch, query }: IEmptyState) => {
  const classes = useStyles();
  return (
    <div className={classes.emptyStateContainer}>
      <Center>
        <br />
        <img
          src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/noSearchResultFound.svg"
          alt="no-data-available"
        />

        <p className={classes.emptyText}>
          <b>No Results Found for "{query}" </b>
          <br />
          We couldn’t find what you were looking for. You can always retry
        </p>

        <br />
      </Center>
    </div>
  );
};
