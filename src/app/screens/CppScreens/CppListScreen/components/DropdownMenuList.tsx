import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import { useStyles } from '../styles';

export function DropdownMenuList(props: any) {
  const classes = useStyles();
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
      classes={{ paper: classes.dropdownMenuList }}
    />
  );
}
