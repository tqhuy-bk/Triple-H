import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import PropTypes from 'prop-types';
import Loading from '../Loading';

export default function TabPanel(props) {
  const { value, index, item, q, ...other } = props;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [fetch, setFetch] = useState(false);

  const handleSearch = async (query, item, page, hasMore) => {
    if (hasMore) {
      setLoading(true);
      try {
        if (item === 'location') {
          var province =
            page === 0
              ? await customAxios().get(`/province/search?q=${query}`)
              : [];
          var location = await customAxios().get(
            `/location/search?q=${query}&offset=${page}`
          );
          var results =
            page === 0
              ? [...province.data.results, ...location.data.results].sort(
                  (a, b) => b.score - a.score
                )
              : location;
          if (page === 0) {
            setResult({
              query: province.data.query,
              data: results
            });
          } else {
            setResult(state => ({
              ...state,
              data: [...state.data, ...location.data.results]
            }));
          }

          if (location.data.results.length < 10) {
            setHasMore(false);
          }
        } else {
          const res = await customAxios().get(
            `/${item}/search?q=${query}&offset=${page}`
          );
          // console.log(res);
          if (page === 0) {
            setResult({
              query: res.data.query,
              data: res.data.results
            });
          } else {
            setResult(state => ({
              ...state,
              data: [...state.data, ...res.data.results]
            }));
          }
          if (res.data.results.length < 10) setHasMore(false);
        }
        setLoading(false);
        setPage(oldPage => oldPage + 1);
      } catch (err) {
        setError(true);
      }
    }
    setFetch(false);
  };

  useEffect(() => {
    if (result && result.query !== q) {
      setResult(null);
    }
  }, [q, result]);

  useEffect(() => {
    if (!result) {
      handleSearch(q, item, 0, hasMore);
    }
  }, [result, q, item, hasMore]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setFetch(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (fetch && !error && !loading) {
      handleSearch(q, item, page, hasMore);
    }
  }, [fetch, q, item, hasMore, page, error, loading]);

  const classes = searchStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {/* <SpeedDialButton /> */}
      {value === index && (
        <Box p={3}>
          <List className={classes.listSearch}>
            {result &&
              result.data.map(item => (
                <ListItem
                  className={classes.itemSearch}
                  component={Link}
                  to={item.link}
                  key={item._id}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="avatar"
                      src={item.image}
                      className={classes.avatarItem}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6">{item.fullname}</Typography>
                    }
                    secondary={
                      <Typography variant="body1" color="textPrimary">
                        {item.description
                          ? item.description.length > 150
                            ? item.description.slice(0, 150) + ' ...'
                            : item.description
                          : ''}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            {result && result.data.length === 0 && (
              <div className={classes.centerMarginTop}>
                <Typography>Không tìm thấy kết quả</Typography>
              </div>
            )}
            {loading && (
              <div className={classes.centerMarginTop}>
                <Loading />
              </div>
            )}
            {error && (
              <div className={classes.centerMarginTop}>
                <div>
                  <Typography>Có lỗi xảy ra</Typography>
                </div>
              </div>
            )}
          </List>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
