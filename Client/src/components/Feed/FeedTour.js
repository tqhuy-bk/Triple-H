import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid
} from '@material-ui/core';
import Tour from '../Tour';
import Feed from './index';
import { feedStyles } from '../../style';

import { useSelector, useDispatch } from 'react-redux';
import { getMoreTours } from '../../redux/callApi/tourCall';
import { Timeline, Favorite } from '@material-ui/icons';
import FilterTour from '../../components/Tour/FilterTour';
import FilterTourHot from '../../components/Tour/FilterTourHot';
import Loading from '../Loading';

export default function FeedTour(props) {
  const dispatch = useDispatch();
  const { tour } = useSelector(state => state);

  const [cost, setCost] = useState([0, 100]);
  const [text, setText] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [costHot, setCostHot] = useState([0, 100]);
  const [textHot, setTextHot] = useState('');
  const [isFilteringHot, setIsFilteringHot] = useState(false);
  const classes = feedStyles();
  const loadTour = () => {
    if (tour.hasMore) {
      var maxCost = cost[1],
        minCost = cost[0];
      if (minCost > maxCost) {
        minCost += maxCost;
        maxCost = minCost - maxCost;
        minCost -= maxCost;
      }
      dispatch(
        getMoreTours(tour.page, {
          maxCost: maxCost * 10,
          minCost: minCost * 10,
          q: text
        })
      );
    }
  };
  const tryAgain = () => {
    loadTour(tour.page, dispatch, tour.hasMore);
  };

  const refFilter = React.createRef();
  const refFilterHot = React.createRef();

  const FilterTourRef = React.forwardRef((props, ref) => (
    <FilterTour innerRef={ref} {...props} />
  ));
  const FilterTourHotRef = React.forwardRef((props, ref) => (
    <FilterTourHot innerRef={ref} {...props} />
  ));

  const [value, setValue] = useState(0);
  return (
    <Grid container className={classes.container}>
      <Grid item md={8} sm={12} xs={12}>
        <div className={classes.content}>
          <div className={classes.contentSubNav}>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
                setValue(newValue);
              }}
              showLabels
              className={classes.contentSubNavList}
            >
              <BottomNavigationAction
                label="Hành trình của bạn"
                icon={<Timeline />}
              />
              <BottomNavigationAction
                label="Hành trình nổi bật"
                icon={<Favorite />}
              />
            </BottomNavigation>
          </div>
          <div className={classes.feedContent}>
            {tour.loadingFirst ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 150
                }}
              >
                <Loading />
              </div>
            ) : value === 0 ? (
              <Feed
                loadMore={loadTour}
                tryAgain={tryAgain}
                loading={tour.loading}
                error={tour.error}
                hasMore={tour.hasMore}
              >
                {tour.tours &&
                  tour.tours.map(tour => <Tour tour={tour} key={tour._id} />)}
              </Feed>
            ) : (
              tour.tourHot &&
              tour.tourHot.map(tour => <Tour tour={tour} key={tour._id} />)
            )}
          </div>
        </div>
      </Grid>
      {value === 0 ? (
        <Grid item md={4} className={classes.filterTour}>
          <FilterTourRef
            ref={refFilter}
            costParent={cost}
            setCostParent={setCost}
            textParent={text}
            setTextParent={setText}
            isFiltering={isFiltering}
            setIsFiltering={setIsFiltering}
          />
        </Grid>
      ) : (
        <Grid item md={4} className={classes.filterTour}>
          <FilterTourHotRef
            ref={refFilterHot}
            costParent={costHot}
            setCostParent={setCostHot}
            textParent={textHot}
            setTextParent={setTextHot}
            isFiltering={isFilteringHot}
            setIsFiltering={setIsFilteringHot}
          />
        </Grid>
      )}
    </Grid>
  );
}
