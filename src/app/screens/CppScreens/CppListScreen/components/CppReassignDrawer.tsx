import React, { useState } from 'react';
import { Drawer } from '@material-ui/core';

interface IReassignDrawer {}

export default function ReassignDrawer({}: IReassignDrawer) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Drawer anchor="right" open={openDrawer}>
      Drawer body
    </Drawer>
  );
}
