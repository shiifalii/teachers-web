import React from 'react';
import {} from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
interface IEmptyScreen {
  type: string;
}
const useStyles = makeStyles({
  emptyScreen: {
    textAlign: 'center',
    '& p': {
      color: '#999',
    },
  },
});
export default function EmptyScreenGridView(props: IEmptyScreen) {
  const classes = useStyles();
  return (
    <>
      {/* average */}
      {props.type === 'average' && (
        <div className={classes.emptyScreen}>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/average-emptyScreen.svg" />
          <p>No average areas to display.</p>
        </div>
      )}

      {/* strong */}
      {props.type === 'strong' && (
        <div className={classes.emptyScreen}>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/strong-emptyScreen.svg" />
          <p>
            No strong areas to display. Seems your students need to work harder!
          </p>
        </div>
      )}

      {/* weak */}
      {props.type === 'weak' && (
        <div className={classes.emptyScreen}>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/weak-emptyScreen.svg" />
          <p>
            Your students are acing it! Currently there are no weak areas to
            work upon
          </p>
        </div>
      )}

      {/* unattempted */}
      {props.type === 'unattempted' && (
        <div className={classes.emptyScreen}>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/unattempted-emptyScreen.svg" />
          <p>All covered! Nothing left to attempt.</p>
        </div>
      )}
    </>
  );
}
