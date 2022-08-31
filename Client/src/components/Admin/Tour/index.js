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
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { useSelector } from 'react-redux';
import customAxios from '../../../utils/fetchData';

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};

const TriangleBar = props => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

function handling(arr) {
  const tour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
    if (d.getFullYear() === new Date().getFullYear()) {
      tour[mon] += 1;
    }
  });
  return tour;
}

function getData(arr) {
  const data = [
    {
      name: 'Tháng 1',
      tour: 0
    },
    {
      name: 'Tháng 2',
      tour: 0
    },
    {
      name: 'Tháng 3',
      tour: 0
    },
    {
      name: 'Tháng 4',
      tour: 0
    },
    {
      name: 'Tháng 5',
      tour: 0
    },
    {
      name: 'Tháng 6',
      tour: 0
    },
    {
      name: 'Tháng 7',
      tour: 0
    },
    {
      name: 'Tháng 8',
      tour: 0
    },
    {
      name: 'Tháng 9',
      tour: 0
    },
    {
      name: 'Tháng 10',
      tour: 0
    },
    {
      name: 'Tháng 11',
      tour: 0
    },
    {
      name: 'Tháng 12',
      tour: 0
    }
  ];

  let tour = handling(arr);
  for (let i = 0; i < 12; i++) {
    data.at(i).tour = tour.at(i);
  }
  return data;
}

export default function AdminTour() {
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    getAllTours(token);
  }, [token]);

  return (
    <Container className={classes.container}>
      <div>
        <Grid container>
          <Grid item md={6}>
            <Card className={classes.cardInfo}>
              <Typography variant="h5">Tổng số tour</Typography>
              <Typography variant="h3" className={classes.cardValue}>
                <PostAdd className={classes.cardIcon} />
                {tours.length}
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
                  loading={loading}
                  error={error}
                  data={getData(tours)}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar
                    dataKey="tour"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: 'top' }}
                  >
                    {getData(tours).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
          </Box>
        </Card>
      </div>
    </Container>
  );
}
