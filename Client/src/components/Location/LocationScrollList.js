import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import LocationCard from '.';
import { eventStyles } from '../../style';

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

export function LocationHotScrollList(props) {
  const { locations } = props;

  const classes = eventStyles();

  return (
    <div>
      {locations.length > 0 ? (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {locations.map(item => (
            <LocationCard
              location={item.location[0]}
              key={item._id}
              itemId={item._id}
            />
          ))}
        </ScrollMenu>
      ) : (
        <div className={classes.center}>
          <Typography>Không tìm thấy địa điểm hot</Typography>
        </div>
      )}
    </div>
  );
}

export function LocationRecommendScrollList(props) {
  const { locations } = props;

  const classes = eventStyles();

  return (
    <div style={{ marginBottom: 30 }}>
      {locations.length > 0 ? (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {locations.map(item => (
            <LocationCard location={item} key={item._id} itemId={item._id} />
          ))}
        </ScrollMenu>
      ) : (
        <div className={classes.center}>
          <Typography>Không tìm thấy địa điểm gợi ý</Typography>
        </div>
      )}
    </div>
  );
}
