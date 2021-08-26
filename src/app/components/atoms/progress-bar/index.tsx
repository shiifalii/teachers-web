import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';

const styles = makeStyles(theme => ({
  root: (props: any) => ({
    height: props.height,
    borderRadius: 5,
  }),
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: (props: any) => ({
    borderRadius: 5,
    backgroundColor: props.color,
  }),
}));

interface IProgressBar {
  height?: number;
  color: string;
  variant: any;
  value: number;
  valueBuffer?: number;
}

export const ProgressBar = ({
  height = 10,
  color,
  ...restProps
}: IProgressBar) => {
  const classes = styles({ height, color });
  return <LinearProgress {...restProps} classes={classes} />;
};
