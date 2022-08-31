import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { eventStyles } from '../../style';

import EventItem from './EventItem';

function LeftArrow(props) {
  const classes = eventStyles();

  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <div disabled={isFirstItemVisible}>
      <IconButton
        className={classes.arrow}
        onClick={() => scrollPrev()}
        size="small"
      >
        <ChevronLeft />
      </IconButton>
    </div>
  );
}

function RightArrow(props) {
  const classes = eventStyles();

  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <div disabled={isLastItemVisible}>
      <IconButton
        className={classes.arrow}
        onClick={() => scrollNext()}
        size="small"
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
}

export default function Event(props) {
  const { events } = props;

  const classes = eventStyles();

  return (
    <div>
      {events.length > 0 ? (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {events.map(item => (
            <EventItem itemId={item._id} key={item._id} event={item} />
          ))}
        </ScrollMenu>
      ) : (
        <div className={classes.center}>
          <Typography>Không tìm thấy sự kiện</Typography>
        </div>
      )}
    </div>
  );
}
