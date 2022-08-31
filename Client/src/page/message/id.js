import { Grid, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Conversations from '../../components/Message/Conversations';
import Chat from '../../components/Message/Chat';
import { NotFound } from '../404';
import Loading from '../../components/Loading';
import customAxios from '../../utils/fetchData';
import LoginModal from '../../components/Modal/Login';

export default function Conversation(props) {
  const { auth } = useSelector(state => state);

  const { id } = useParams();
  const [conversation, setConversation] = useState();

  const [state, setState] = useState({
    loading: false,
    notFound: false,
    error: false
  });

  const getConversation = (id, token) => {
    setState({
      loading: true,
      notFound: false,
      error: false
    });
    customAxios(token)
      .get(`/message/${id}`)
      .then(res => {
        setConversation(res.data.conversation);
        setState({
          loading: false,
          notFound: false,
          error: false
        });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 404)
          setState({
            loading: false,
            error: true,
            notFound: true
          });
        else
          setState({
            loading: false,
            error: true,
            notFound: false
          });
      });
  };

  useEffect(() => {
    if (auth.token) {
      getConversation(id, auth.token);
    }
  }, [id, auth.token]);

  useEffect(() => {
    document.title = 'Tin nhắn';
  }, []);

  const tryAgain = () => {
    getConversation(id, auth.token);
  };
  return (
    <div>
      {auth.token ? (
        state.notFound ? (
          <NotFound />
        ) : state.loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 150
            }}
          >
            <Loading />
          </div>
        ) : state.error ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 150
            }}
          >
            <>
              <Typography>Có lỗi xảy ra</Typography>
              <Button onClick={tryAgain}>Thử lại</Button>
            </>
          </div>
        ) : (
          <Grid container style={{ margin: 0, padding: 0 }}>
            <Conversations />
            {conversation && <Chat />}
          </Grid>
        )
      ) : (
        <LoginModal />
      )}
    </div>
  );
}
