import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Switch, { SwitchProps } from '@material-ui/core/Switch';

const styles = makeStyles({
  root: {
    width: 52,
    height: 28,
    padding: 1,
    '@media (max-width: 380px)': {
      transform: 'scale(.7)',
    },
  },
  switchBase: {
    color: '#fff',
    padding: 1,
    '&$checked': {
      color: '#fff',
      transform: 'translateX(27px)',
    },
    '&$checked + $track': {
      // backgroundColor: (props: any) => props.background,
      opacity: 1,
    },
    '& + $track': {
      opacity: 1,
      backgroundColor: '#ececec',
      borderRadius: '20px',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: (props: any) => props.background,
    },
  },

  thumb: {
    width: 22,
    height: 22,
    marginTop: '2px',
  },

  checked: {},
  track: {},
});

interface IToggleButton extends SwitchProps {
  background?: string;
}
export const ToggleButton = ({
  background = '#1D7DEA',
  ...restProps
}: IToggleButton) => {
  const classes = styles({ background });

  return <Switch {...restProps} classes={classes} />;
};
