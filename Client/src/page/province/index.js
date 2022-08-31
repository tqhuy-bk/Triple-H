import {
  Button,
  Grid,
  Input,
  InputAdornment,
  Typography
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProvinceCard from '../../components/Card/ProvinceCard';
import LeftBar from '../../components/Leftbar';
import Loading from '../../components/Loading';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';
import { getAllProvince } from '../../redux/callApi/locationCall';
import useStyles from '../../style';

export default function ProvincePage() {
  // const [provincesCon, setProvincesCon] = useState([]);
  const { allProvince, loadingProvinces, error } = useSelector(
    state => state.location
  );
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const classes = useStyles();
  const [provinces, setProvinces] = useState([]);

  const getProvince = dispatch => {
    dispatch(getAllProvince());
  };

  useEffect(() => {
    if (loadingProvinces || error || allProvince) return;
    getProvince(dispatch);
  }, [dispatch, loadingProvinces, error, allProvince]);

  useEffect(() => {
    if (allProvince) {
      setProvinces(allProvince);
    }
  }, [allProvince]);

  const handleChangeSearch = e => {
    let temp = e.target.value;
    setSearch(temp);
    if (e.target.value === '') {
      setProvinces(allProvince);
      return;
    }
  };

  useEffect(() => {
    if (search !== '') {
      let pros = allProvince.filter(item =>
        item.fullname.toLowerCase().match(search.toLowerCase())
      );
      setProvinces(pros);
    }
  }, [search, allProvince]);

  useEffect(() => {
    document.title = 'Tỉnh thành | Triple H';
  }, []);

  return (
    <Grid container className={classes.container}>
      <SpeedDialButton />
      <Grid container className={classes.containerProvince}>
        <Grid item md={3} sm={2} xs={2} className={classes.leftbar}>
          <LeftBar menuList={homeMenu} />
        </Grid>
        <Grid item md={9} sm={10} xs={10}>
          {loadingProvinces ? (
            <div className={classes.center}>
              <Loading />
            </div>
          ) : error ? (
            <div className={classes.center}>
              <Button onClick={getProvince}>Thử lại</Button>
            </div>
          ) : (
            <Grid container className={classes.wrapperProvinces}>
              <Grid item md={12} sm={12} xs={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginRight: 50,
                    marginBottom: 20
                  }}
                >
                  <Input
                    type="search"
                    name="search"
                    id="search-province"
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder="Tìm kiếm ..."
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </div>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                {provinces.length === 0 && (
                  <div className={classes.center}>
                    <Typography variant="h5">Không tìm thấy tỉnh.</Typography>
                  </div>
                )}
              </Grid>
              {provinces.map(province => (
                <Grid item md={4} sm={6} xs={12} key={province._id}>
                  <ProvinceCard province={province} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
