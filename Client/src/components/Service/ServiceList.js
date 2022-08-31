import { Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../redux/callApi/serviceCall';
import { serviceStyles } from '../../style';
import Loading from '../Loading';

import ServiceItem from './ServiceItem';

export default function ServiceList({ id }) {
  const { service } = useSelector(state => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const loadMore = useCallback(() => {
    setLoading(true);

    dispatch(
      getServices(id, service.page, () => {
        setLoading(false);
      })
    );
  }, [dispatch, id, service.page]);

  useEffect(() => {
    if (fetch && !loading) {
      if (service.hasMore) loadMore();
      setFetch(false);
    }
  }, [fetch, service.hasMore, loadMore, loading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading
    ) {
      setFetch(true);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const classes = serviceStyles();

  return (
    <div>
      <div className={classes.titleService}>
        <Typography variant="h4">Danh sách dịch vụ</Typography>
      </div>
      <div className={classes.listContainer}>
        {service.loading && (
          <div className={classes.centerMarginTop}>
            <Loading />
          </div>
        )}
        {service.services.map(item => (
          <ServiceItem key={item._id} service={item} />
        ))}
        {loading && (
          <div className={classes.centerMarginTop}>
            <Loading />
          </div>
        )}
        {service.error && (
          <div className={classes.centerMarginTop}>Có lỗi xảy ra</div>
        )}
      </div>
    </div>
  );
}
