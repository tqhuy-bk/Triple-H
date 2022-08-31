import React from 'react';
import { Container } from '@material-ui/core';

import { leftbarStyles } from '../../style';
import Menu from './Menu';
import SwipeableViewHelp from '../Help/SwipeableViewHelp';

export default function LeftBar({ menuList, showHelp = true }) {
  const classes = leftbarStyles();

  return (
    <Container className={classes.container} elevation={15}>
      <Menu menuList={menuList} />
      {showHelp && <SwipeableViewHelp />}
    </Container>
  );
}
