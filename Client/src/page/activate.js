import { Button, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import customAxios from '../utils/fetchData';

export default function ActivatePage() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [state, setState] = useState({
    error: false,
    loading: false
  });
  useEffect(() => {
    document.title = 'Kích hoạt';
  }, []);

  const activateToken = async token => {
    setState({
      error: false,
      loading: true
    });
    await customAxios()
      .post('/user/activate_email', {
        activation_token: token
      })
      .then(res => {
        setState({
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          loading: false,
          error: true
        });
      });
  };

  useEffect(() => {
    if (token) {
      activateToken(token);
    } else {
      setState({
        loading: false,
        error: true
      });
    }
  }, [token]);

  return (
    <Container style={{ marginTop: 70 }}>
      {state.loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 50
          }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 50
          }}
        >
          <Button onClick={activateToken}>Thử lại</Button>
        </div>
      ) : (
        <div
          style={{
            marginTop: 80,
            fontSize: 25,
            textAlign: 'center'
          }}
        >
          <p>Tài khoản của bạn đã được kích hoạt.</p>
          <p>Hãy đăng nhập và cùng trải nghiệm Tripple H nào!</p>
          <Link to="/login" style={{ color: 'green' }}>
            Đăng nhập
          </Link>
        </div>
      )}
    </Container>
  );
}
