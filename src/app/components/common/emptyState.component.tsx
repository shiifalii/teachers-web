import React from 'react';
import { Center } from '../../components';

interface Props {
  emptyViaSearch?: boolean;
}

export const EmptyState = ({ emptyViaSearch }: Props) => (
  <div>
    <Center>
      <br />
      <img
        src={
          emptyViaSearch
            ? 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/no-data-found.svg'
            : 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/empty-data.png'
        }
        alt="no-data-available"
      />
      {emptyViaSearch ? (
        <p>
          We are sorry, but your search didn’t have any result.
          <br /> Please try again.
        </p>
      ) : (
        <p>
          It seems that no data is available for now. Please refresh/get <br />
          in touch with your Account Manager if problem still persists.
        </p>
      )}
      <br />
    </Center>
  </div>
);
