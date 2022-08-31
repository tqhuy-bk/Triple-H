import { Container, Grid } from '@material-ui/core';
// import { Tune } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HelpCard from '../../components/Help/HelpCard';
import Loading from '../../components/Loading';
import customAxios from '../../utils/fetchData';
import { getToken } from '../../utils/token';

export default function MyHelpPage() {
  const { token } = useSelector(state => state.auth);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getList = token => {
    setLoading(true);
    customAxios(token)
      .get('/help/my')
      .then(res => {
        console.log(res.data);
        setList(res.data.helps);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const handleRemove = id => {
    setList(list => list.filter(item => item._id !== id));
  };

  useEffect(() => {
    if (token) {
      getList(token);
    }
  }, [token]);

  useEffect(() => {
    document.title = 'Trợ giúp của tôi';
  }, []);

  const rfToken = getToken();
  if (!rfToken) return <Redirect to="/login" />;

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <Loading />
      </div>
    );

  return (
    <Container style={{ marginTop: 150 }}>
      <Grid container spacing={5}>
        {list.map(item => (
          <Grid item md={4} sm={6} xs={12} key={item._id} id={item._id}>
            <HelpCard help={item} handleRemove={handleRemove} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
