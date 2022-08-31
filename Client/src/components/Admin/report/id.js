import { Paper, Typography, Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotFound } from '../../../page/404';
import customAxios from '../../../utils/fetchData';

import { tableStyles } from "../../../style"
import Loading from '../../Loading';

import PostReport from './post';

function formatTime(time) {
  var tmp = new Date(time);
  var dd = String(tmp.getDate()).padStart(2, '0');
  var mm = String(tmp.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = tmp.getFullYear();

  time = dd + '/' + mm + '/' + yyyy;
  return time;
}

function AdminPostReportDetail() {
  const classes = tableStyles();

  const { subpage } = useParams();

  const history = useHistory();

  const [report, setReport] = useState(null);
  const [post, setPost] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });

  const { token } = useSelector(state => state.auth);

  const getReport = useCallback(
    async (id, _token) => {
      setState({
        notFound: false,
        loading: true,
        error: false
      });
      await customAxios(token)
        .get(`/report/${id}`)
        .then(res => {
          setReport(res.data.report);
          setState({
            notFound: false,
            loading: false,
            error: false
          });
        })
        .catch(err => {
          setState({
            notFound: false,
            loading: false,
            error: true
          });
        });
    },
    [token]
  );

  const getPost = useCallback(
    async postId => {
      setState({
        notFound: false,
        loading: true,
        error: false
      });
      await customAxios(token)
        .get(`/post/${postId}`)
        .then(res => {
          setPost(res.data.post);
          setState({
            notFound: false,
            loading: false,
            error: false
          });
        })
        .catch(err => {
          setState({
            notFound: false,
            loading: false,
            error: true
          });
        });
    },
    [token]
  );

  const deletePost = async postId => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(token)
      .patch(`/report/delete/${report._id}`, {
        postId
      })
      .then(res => {
        setState({
          notFound: false,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          notFound: false,
          loading: false,
          error: true
        });
      });
    history.push('/admin/report')
  }

  const cancelReport = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(token)
      .patch(`/report/${id}`)
      .then(res => {
        setState({
          notFound: false,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          notFound: false,
          loading: false,
          error: true
        });
      });
    history.push('/admin/report')
  }

  useEffect(() => {
    getReport(subpage);
  }, [subpage, getReport]);

  useEffect(() => {
    if (report?.postId) {
      getPost(report.postId);
    }
  }, [report, getPost]);

  useEffect(() => {
    document.title = 'Admin - Bài viết được báo cáo';
  }, []);

  return (
    <Paper
      style={{
        marginTop: 120,
        marginInline: 50,
        marginBottom: 30,
        padding: 30
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton component={Link} to={`/admin/report`} title="Quay lại">
            <ArrowBack />
          </IconButton>
        </div>
      </div>
      {state.notFound ? (
        <NotFound />
      ) : state.loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          Có lỗi xảy ra
        </div>
      ) : (
        report &&
        <div className={classes.containerReport}>
          <div className={classes.cardPost}>
            <Typography variant='h4' gutterBottom>
              Chi tiết
            </Typography>
            <div>
              <PostReport
                post={post}
              />
            </div>
          </div>
          <div className={classes.cardReport}>
              <div>
                <Typography variant="h4" gutterBottom>
                  Thông tin report
                </Typography>
              </div>

              <div className={classes.textReport}>
                Người báo cáo: {report.userId.fullname}
              </div>

              <div className={classes.textReport}>
                Thời gian báo cáo: {formatTime(report.createdAt)}
              </div>

              <div className={classes.textReport}>
                Lý do báo cáo: {report.type}
              </div>

              <div className={classes.textReport}>
                Nội dung báo cáo: {report.content}
              </div>

              <div className={classes.textReport}>
                Trạng thái báo cáo:{' '}
                {report.state === 2 ? 'Đã xử lý' : 'Chưa xử lý'}
              </div>

              {report.state === 2 ? (
                <div></div>
              ) : (
                <div className={classes.btnReport}>
                  <div>
                    <Button
                      variant="contained"
                      className={classes.addBtn}
                      onClick={() => cancelReport(report._id)}
                    >
                      Hủy báo cáo
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className={classes.addBtn}
                      onClick={() => deletePost(post._id)}
                    >
                      Xóa bài viết
                    </Button>
                  </div>
                </div>
              )}
            </div>
        </div>
      )}
    </Paper>
  );
}

export default AdminPostReportDetail;
