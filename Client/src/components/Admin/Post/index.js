import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  Grid,
  Box,
  CardHeader
} from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';
import { tableStyles } from '../../../style';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useSelector } from 'react-redux';
import customAxios from '../../../utils/fetchData';

function filterPostReview(arr) {
  let postReview = arr.filter(element => {
    return element.isPostReview === true;
  });
  return postReview;
}

function filterPost(arr) {
  let postReview = arr.filter(element => {
    return element.isPostReview === false;
  });
  return postReview;
}

function handling(arr) {
  const post = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
    if (d.getFullYear() === new Date().getFullYear()) {
      post[mon] += 1;
    }
  });
  return post;
}

function getData(arr) {
  console.log(arr);
  const data = [
    {
      name: 'Tháng 1',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 2',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 3',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 4',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 5',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 6',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 7',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 8',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 9',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 10',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 11',
      post: 0,
      review: 0
    },
    {
      name: 'Tháng 12',
      post: 0,
      review: 0
    }
  ];
  let post = filterPost(arr);
  let postReview = filterPostReview(arr);
  let statisticalPost = handling(post);
  let statisticalPostReview = handling(postReview);
  for (let i = 0; i < 12; i++) {
    data.at(i).post = statisticalPost.at(i);
    data.at(i).review = statisticalPostReview.at(i);
  }
  return data;
}

function AdminPosts(props) {
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllPosts = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get(`/post/admin`)
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Có lỗi xảy ra');
      });
  };

  useEffect(() => {
    getAllPosts(token);
  }, [token]);

  return (
    <Container className={classes.container}>
      <div>
        <Grid container>
          <Grid item md={6}>
            <Card className={classes.cardInfo}>
              <Typography variant="h5">Tổng số bài viết</Typography>
              <Typography variant="h3" className={classes.cardValue}>
                <PostAdd className={classes.cardIcon} />
                {filterPost(posts).length}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card className={classes.cardInfo}>
              <Typography variant="h5">Tổng số review</Typography>
              <Typography variant="h3" className={classes.cardValue}>
                <PostAdd className={classes.cardIcon} />
                {filterPostReview(posts).length}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <Card>
          <CardHeader
            title="Thống kê"
            subheader={'Biến động năm ' + new Date().getFullYear().toString()}
          />
          <Box>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingTop: '20px',
                  borderRadius: '15px',
                  width: '90%',
                  justifyContent: 'center',
                  display: 'flex'
                }}
              >
                <BarChart
                  width={1000}
                  height={500}
                  data={getData(posts)}
                  loading={loading}
                  error={error}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="post"
                    stackId="a"
                    fill="#8884d8"
                    name="Bài viết"
                  />
                  <Bar
                    dataKey="review"
                    stackId="a"
                    fill="#82ca9d"
                    name="Bài review"
                  />
                </BarChart>
              </div>
            </div>
          </Box>
        </Card>
      </div>
    </Container>
  );
}

export default AdminPosts;
