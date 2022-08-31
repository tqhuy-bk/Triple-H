import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Card,
  Grid,
  Box,
  CardHeader
} from '@material-ui/core';
import { tableStyles } from '../../style';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Explore, Person, PostAdd } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import customAxios from '../../utils/fetchData';

function handling(arr) {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
    if (d.getFullYear() === new Date().getFullYear()) {
      data[mon] += 1;
    }
  });
  return data;
}

function getData(posts, tours, users) {
  const data = [
    { month: 'Tháng 1', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 2', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 3', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 4', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 5', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 6', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 7', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 8', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 9', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 10', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 11', user: 0, tour: 0, post: 0 },
    { month: 'Tháng 12', user: 0, tour: 0, post: 0 }
  ];
  let tour = handling(tours);
  let user = handling(users);
  let post = handling(posts);
  for (let i = 0; i < 12; i++) {
    data.at(i).tour = tour.at(i);
    data.at(i).user = user.at(i);
    data.at(i).post = post.at(i);
  }
  return data;
}

function AdminHome(props) {
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllUsers = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get(`/user/admin`)
      .then(res => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Có lỗi xảy ra');
      });
  };

  const getAllTours = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get(`/tour/admin`)
      .then(res => {
        setTours(res.data.tours);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Có lỗi xảy ra');
      });
  };

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
    getAllUsers(token);
    getAllTours(token);
    getAllPosts(token);
  }, [token]);

  return (
    <Container className={classes.container}>
      <div>
        <Grid container>
          <Grid item md={4}>
            <Card className={classes.cardInfo}>
              <Typography variant="h5">Tổng số người dùng</Typography>
              <Typography variant="h3" className={classes.cardValue}>
                <Person className={classes.cardIcon} />
                {users.length}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card className={classes.cardInfo}>
              <Typography variant="h5">Tổng số hành trình</Typography>
              <Typography variant="h3" className={classes.cardValue}>
                <Explore className={classes.cardIcon} />
                {tours.length}
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card className={classes.cardInfo}>
              <Typography variant="h5">Tổng số bài viết / review</Typography>
              <Typography variant="h3" className={classes.cardValue}>
                <PostAdd className={classes.cardIcon} />
                {posts.length}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Paper className={classes.paper}>
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
                  <ResponsiveContainer
                    className="chart"
                    height={500}
                    width={1200}
                  >
                    <LineChart
                      width={1000}
                      height={500}
                      loading={loading}
                      error={error}
                      data={getData(posts, tours, users)}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="user"
                        stroke="#8884d8"
                        name="Người dùng"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="tour"
                        stroke="#82ca9d"
                        name="Hành trình"
                      />
                      <Line
                        type="monotone"
                        dataKey="post"
                        stroke="#ECCC68"
                        name="Bài viết/review"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Box>
          </Card>
        </div>
      </Paper>
    </Container>
  );
}

export default AdminHome;
