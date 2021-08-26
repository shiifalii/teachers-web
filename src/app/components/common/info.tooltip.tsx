import React, { useState } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const CustomToolTip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#FFFFFF',
    maxWidth: 300,
    color: '#333',
    border: '1px solid #E7E7E7',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 'normal',
  },
  arrow: {
    color: '#E7E7E7',
  },
}))(Tooltip);

function InfoToolTip(props: { title: JSX.Element; style?: any }) {
  const [showToolTip, setShowToolTip] = useState(false);

  const handleTooltipClose = () => {
    setShowToolTip(false);
  };

  const handleTooltipOpen = () => {
    setShowToolTip(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <CustomToolTip
        arrow
        onClose={handleTooltipClose}
        open={showToolTip}
        title={props.title}
      >
        <IconButton
          style={props.style}
          aria-label="info"
          className="infoicon"
          onClick={handleTooltipOpen}
          onMouseEnter={handleTooltipOpen}
          onMouseLeave={handleTooltipClose}
        >
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </CustomToolTip>
    </ClickAwayListener>
  );
}

export default InfoToolTip;
