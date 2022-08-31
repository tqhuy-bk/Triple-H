import { Button, Typography } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { feedStyles } from '../../style';
import Loading from '../Loading';

export default function Feed(props) {
  const { loadMore, tryAgain, loading, error, hasMore, children, type } = props;
  const classes = feedStyles();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (fetch && !loading) {
      if (hasMore) loadMore();
      setFetch(false);
    }
  }, [fetch, hasMore, loadMore, loading]);

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

  return (
    <>
      {type && type === 'review' ? (
        <div>
          {children}
          {loading && (
            <div className={classes.centerMarginTop}>
              <Loading />
            </div>
          )}
          {error && (
            <div className={classes.centerMarginTop}>
              <Button onClick={tryAgain}>Thử lại</Button>
            </div>
          )}
        </div>
      ) : (
        <div className={classes.content}>
          <div className={classes.feedContent}>
            {children}
            {loading && (
              <div className={classes.centerMarginTop}>
                <Loading />
              </div>
            )}
            {error && (
              <div className={classes.centerMarginTop}>
                <Button onClick={tryAgain}>Thử lại</Button>
              </div>
            )}
          </div>
        </div>
      )}
      {!hasMore && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 40
          }}
        >
          <CheckCircleOutline style={{ marginRight: 10 }} />
          <Typography>Hết bảng tin</Typography>
        </div>
      )}
    </>
  );
}
