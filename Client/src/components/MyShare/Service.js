import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Typography
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from '../../redux/actions/alertAction';
import { formStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import Loading from '../Loading';
import EditService from './EditService';

function ServiceSharedItem({ service, getData }) {
  const classes = formStyles();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const closeEdit = () => setShowEdit(false);

  const closeDelete = () => setShowDelete(false);

  const handleDelete = () => {
    setLoadingDelete(true);
    customAxios(token)
      .delete(`/service/contribute/${service._id}`)
      .then(() => {
        dispatch(success({ message: 'Xóa thành công' }));
        setLoadingDelete(false);
        closeDelete();
        getData();
      })
      .catch(() => {
        setLoadingDelete(false);
        closeDelete();
        dispatch(error({ message: 'Có lỗi xảy ra' }));
      });
  };

  const ref = React.createRef();
  const ServiceSharedEditRef = React.forwardRef((props, ref) => (
    <EditService {...props} innerRef={ref} />
  ));

  return (
    <Card style={{ maxWidth: 345 }}>
      <CardMedia
        style={{ height: 200 }}
        image={service.images[0] || ''}
        title={service.fullname}
      />
      <CardContent>
        <Typography>{service.fullname}</Typography>
        <Typography variant="body2">{service.information}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => setShowEdit(true)}>
          Chỉnh sửa
        </Button>
        <Modal
          aria-labelledby="create-post"
          aria-describedby="create-post-modal"
          className={classes.modal}
          open={showEdit}
          onClose={closeEdit}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <ServiceSharedEditRef
            ref={ref}
            handleClose={closeEdit}
            service={service}
          />
        </Modal>
        <Button
          size="small"
          color="secondary"
          onClick={() => setShowDelete(true)}
        >
          Xóa
        </Button>
        <Dialog
          open={showDelete}
          onClose={closeDelete}
          aria-labelledby="show-delete-dialog"
          aria-describedby="show-delete-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Bạn có chắc chắn muốn xóa?'}
          </DialogTitle>

          <DialogContent>
            Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDelete}>Hủy</Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="secondary"
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                'Xóa'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}

export default function ServiceShared() {
  const { token } = useSelector(state => state.auth);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    customAxios(token)
      .get('/service/myshare')
      .then(res => {
        setServices(res.data.services);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) return <Loading />;

  if (services?.length === 0)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        Không có thông tin
      </div>
    );

  return (
    <Grid container spacing={3}>
      {services.map(item => (
        <Grid key={item._id} item md={3}>
          <ServiceSharedItem service={item} getData={getData} />
        </Grid>
      ))}
    </Grid>
  );
}
