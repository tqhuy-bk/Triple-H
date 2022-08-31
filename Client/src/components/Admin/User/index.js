import React, { useEffect, useState } from 'react';
import { Container, IconButton } from '@material-ui/core';
import { Card, Grid, Typography, Box, CardHeader } from '@material-ui/core';
import { Paper, Avatar, Tooltip } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import {
  CheckCircle,
  Remove,
  Edit,
  Cancel,
  HourglassFull,
  Lock,
  LockOpen
} from '@material-ui/icons';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid';
import customAxios from '../../../utils/fetchData';
import { useSelector } from 'react-redux';
import { tableStyles } from '../../../style';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function handling(arr) {
  const newusers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const users = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
    users[mon] += 1;
    if (d.getFullYear() === new Date().getFullYear()) {
      newusers[mon] += 1;
    }
  });
  return { newusers: newusers, users: users };
}

function getData(users) {
  const data = [
    { month: 'Tháng 1', newuser: 0, user: 0 },
    { month: 'Tháng 2', newuser: 0, user: 0 },
    { month: 'Tháng 3', newuser: 0, user: 0 },
    { month: 'Tháng 4', newuser: 0, user: 0 },
    { month: 'Tháng 5', newuser: 0, user: 0 },
    { month: 'Tháng 6', newuser: 0, user: 0 },
    { month: 'Tháng 7', newuser: 0, user: 0 },
    { month: 'Tháng 8', newuser: 0, user: 0 },
    { month: 'Tháng 9', newuser: 0, user: 0 },
    { month: 'Tháng 10', newuser: 0, user: 0 },
    { month: 'Tháng 11', newuser: 0, user: 0 },
    { month: 'Tháng 12', newuser: 0, user: 0 }
  ];
  let tmp = handling(users);
  for (let i = 0; i < 12; i++) {
    data.at(i).newuser = tmp.newusers[i];
    data.at(i).user = tmp.users[i];
  }
  return data;
}

function AdminUsers(props) {
  const classes = tableStyles();
  const history = useHistory();
  const { token } = useSelector(state => state.auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 130,
      sortable: false,
      renderCell: user => (
        <Avatar alt={user.row.username} src={user.row.avatar} />
      )
    },
    {
      field: 'fullname',
      headerName: 'Tên đầy đủ',
      width: 220
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'join',
      headerName: 'Ngày tham gia',
      width: 170,
      valueGetter: user =>
        new Date(user.row.createdAt).toLocaleDateString('vi-VN')
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      valueGetter: user =>
        user.row.role === 0
          ? 'Bt'
          : user.row.role === 1
          ? 'Co-op'
          : user.row.role === 2
          ? 'Admin'
          : 'Unknown'
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      sortable: false,
      renderCell: user =>
        user.row.confirmAccount ? (
          user.row.confirmAccount.state === 0 ? (
            <Tooltip title="Đang đợi xác thực">
              <HourglassFull style={{ color: '#ffc107' }} />
            </Tooltip>
          ) : user.row.confirmAccount.state === 1 ? (
            <Tooltip title="Đã xác thực">
              <CheckCircle style={{ color: '#357a38' }} />
            </Tooltip>
          ) : (
            <Tooltip title="Đã từ chối">
              <Cancel style={{ color: '#ba000d' }} />
            </Tooltip>
          )
        ) : (
          <Tooltip title="Chưa xác thực">
            <Remove />
          </Tooltip>
        )
    },
    {
      field: 'state',
      headerName: 'Tình trạng',
      with: 150,
      sortable: false,
      renderCell: user =>
        user.row.state ? (
          <IconButton
            size="small"
            title="Bỏ cấm tài khoản"
            onClick={() => banUser(user.row._id, false)}
          >
            <LockOpen />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            title="Cấm tài khoản"
            onClick={() => banUser(user.row._id, true)}
          >
            <Lock />
          </IconButton>
        )
    },
    {
      field: 'action',
      headerName: 'Chi tiết',
      width: 150,
      sortable: false,
      renderCell: user => (
        <IconButton
          size="small"
          component={Link}
          to={`/admin/user/${user.row._id}`}
          title="Chi tiết"
        >
          <Edit />
        </IconButton>
      )
    }
  ];

  const getAllUsers = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get(`/user/list`)
      .then(res => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Có lỗi xảy ra');
      });
  };

  const banUser = async (userId, state) => {
    console.log(state);
    setError(null);
    await customAxios(token)
      .patch(`/user/ban/${userId}`, {
        state
      })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Có lỗi xảy ra');
      });
    history.push('/admin/user');
  };

  useEffect(() => {
    getAllUsers(token);
  }, [token]);

  return (
    <Container className={classes.container}>
      {users && (
        <div
          className={classes.admin_location_header}
          style={{
            display: 'flex',
            paddingLeft: '50px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            {users.length} Người dùng
          </Typography>
        </div>
      )}

      <Grid>
        <Card>
          <CardHeader
            title="Người tham gia"
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
                <ResponsiveContainer className="chart" height={300}>
                  <LineChart
                    width={400}
                    height={300}
                    data={getData(users)}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="newuser"
                      stroke="#8884d8"
                      name={new Date().getFullYear().toString()}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="user"
                      stroke="#ECCC68"
                      name="Tổng thể"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Box>
        </Card>
      </Grid>

      <Paper className={classes.paper}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          pagination
          onRowDoubleClick={e => {
            history.push(`/admin/user/${e.row._id}`);
          }}
          autoHeight
          loading={loading}
          error={error}
          getRowId={row => row._id}
          disableSelectionOnClick
          components={{
            Toolbar: ExportToolbar
          }}
        />
      </Paper>
    </Container>
  );
}

export default AdminUsers;
