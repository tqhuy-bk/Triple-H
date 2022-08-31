import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import customAxios from '../../../utils/fetchData';
import { Container, IconButton, Paper } from '@material-ui/core';
import { Edit, Visibility } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { tableStyles } from '../../../style';

const columns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 300,
    sortable: false
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 200
  },
  {
    field: 'fullname',
    headerName: 'Tên đầy đủ',
    width: 300
  },
  {
    field: 'action',
    headerName: 'Chỉnh sửa',
    width: 180,
    sortable: false,
    renderCell: province => (
      <IconButton
        size="small"
        component={Link}
        to={`/admin/province/${province.row.name}`}
        title="Chỉnh sửa"
      >
        <Edit />
      </IconButton>
    )
  },
  {
    field: 'detail',
    headerName: 'Xem trang chi tiết',
    width: 250,
    sortable: false,
    renderCell: province => (
      <IconButton
        size="small"
        component={Link}
        to={`/province/${province.row.name}`}
        target="_blank"
        title="Chi tiết"
      >
        <Visibility />
      </IconButton>
    )
  }
];

function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function AdminProvinces() {
  const classes = tableStyles();

  const history = useHistory();

  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const getAllProvinces = async () => {
    setLoading(true);
    setError(null);
    await customAxios()
      .get('/province/provinces')
      .then(res => {
        setProvinces(res.data.provinces);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    getAllProvinces();
  }, []);

  return (
    <Container className={classes.container}>
      <div className={classes.admin_location_header}>
        <div>
          <Typography variant="h4">{provinces.length} tỉnh thành</Typography>
        </div>
        <div></div>
      </div>
      <div>
        <Paper className={classes.paper}>
          <DataGrid
            rows={provinces}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            pagination
            onRowDoubleClick={province => {
              history.push(`/admin/province/${province.row.name}`);
              // console.log(e);
            }}
            autoHeight
            loading={loading}
            error={error}
            getRowId={row => row._id}
            disableSelectionOnClick
            components={{
              Toolbar: ExportToolbar
            }}
            // style={{background:}}
          />
        </Paper>
      </div>
    </Container>
  );
}
