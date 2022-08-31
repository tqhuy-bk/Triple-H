import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Paper,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tableStyles } from '../../../style';
import { getStar, totalNumRate } from '../../../utils/utils';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import customAxios from '../../../utils/fetchData';

const columns = [
  {
    field: 'name',
    headerName: 'Tên',
    width: 300
  },
  {
    field: 'type',
    headerName: 'Loại',
    width: 200
  },
  {
    field: 'provice',
    headerName: 'Tỉnh',
    width: 250,
    valueGetter: service => service.row.province.fullname
  },
  {
    field: 'rate',
    headerName: 'Đánh giá (/5)',
    width: 250,
    valueGetter: service => getStar(service.row.star)
  },
  {
    field: 'numRate',
    headerName: 'Lượt đánh giá',
    width: 250,
    valueGetter: service => totalNumRate(service.row.star)
  }
];

function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function AdminServices(props) {
  const history = useHistory();
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const [province, setProvince] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [isContribute, setContribute] = useState(false);

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

  const getAllServices = (token, page, pageSize) => {
    setLoading(true);
    setError(null);
    console.log(province);
    console.log(isContribute);

    let query = '';
    if (pageSize) query += `limit=${pageSize}&`;
    if (page) query += `page=${page}&`;
    if (province) query += `province=${province._id}&`;
    if (isContribute) query += `isContribute=true`;

    customAxios(token)
      .get(`/service/all?${query}`)
      .then(res => {
        setServices(res.data.services);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  const handleChange = event => {
    setContribute(event.target.checked);
  };

  const handlePageChange = page => {
    setPage(page);
    getAllServices(token, page, pageSize);
  };

  const handlePageSizeChange = pageSize => {
    setPageSize(pageSize);
    getAllServices(token, page, pageSize);
  };

  const handleSearch = event => {
    setPage(0);
    getAllServices(token);
  };

  useEffect(() => {
    getAllProvinces(token);
  }, [token]);

  useEffect(() => {
    customAxios(token)
      .get(`/service/all`)
      .then(res => {
        setServices(res.data.services);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, [token]);

  useEffect(() => {
    document.title = 'Admin - Dịch vụ';
  }, []);

  return (
    <Container className={classes.container}>
      {/* <div
        className={classes.admin_location_header}
        style={{
          display: 'flex',
          paddingLeft: '50px'
        }}
      >
        <Typography variant="h4" gutterBottom>
          {services.length} dịch vụ
        </Typography>
      </div> */}
      <div className={classes.formSearch}>
        <div>
          <Autocomplete
            id="choose-province"
            options={provinces}
            loading={loading}
            getOptionLabel={option => option?.fullname}
            className={classes.autocompleteProvince}
            onChange={(e, value) => setProvince(value)}
            value={province}
            renderInput={params => (
              <TextField
                {...params}
                name="provinces"
                label="Chọn tỉnh thành"
                variant="outlined"
              />
            )}
          />
        </div>
        <div>
          <FormControlLabel
            value={isContribute}
            control={
              <Checkbox
                checked={isContribute}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Được đóng góp"
            labelPlacement="end"
          />
        </div>
        <div>
          <Button
            variant="contained"
            className={classes.sreachBtn}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div>
        <Paper className={classes.paper}>
          <DataGrid
            rows={services}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onPageChange={newPage => handlePageChange(newPage)}
            rowsPerPageOptions={[5, 10, 25]}
            onPageSizeChange={newPageSize => handlePageSizeChange(newPageSize)}
            pagination
            onRowDoubleClick={e => {
              history.push(`/u/${e.row.cooperator._id}`);
            }}
            paginationMode="server"
            autoHeight
            loading={loading}
            error={error}
            getRowId={row => row._id}
            disableSelectionOnClick
            components={{
              Toolbar: ExportToolbar
            }}
            rowCount={total}
          />
        </Paper>
      </div>
    </Container>
  );
}

export default AdminServices;
