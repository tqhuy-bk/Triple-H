import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useMemo, useState } from 'react';
import { serviceStyles } from '../../style';
import { getStar } from '../../utils/utils';
import { SeeMoreText } from '../SeeMoreText';
import ImageList from '../Modal/ImageList';
import { deleteService } from '../../redux/callApi/serviceCall';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { error, success } from '../../redux/actions/alertAction';
import { ServiceDetail } from './ServiceDetail';

export default function ServiceItem({ service }) {
  const { user, token } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  // const [state, setState] = useState({
  //   loading: false,
  //   error: false
  // });
  const [showDelete, setShowDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    setOpen(open);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    dispatch(
      deleteService(
        token,
        service._id,
        () => {
          dispatch(success({ message: 'Xóa thành công' }));
          setLoadingDelete(false);
          handleCloseDelete();
        },
        () => {
          dispatch(error({ message: 'Có lỗi xảy ra' }));
          setLoadingDelete(false);
          handleCloseDelete();
        }
      )
    );
  };

  const isOwn = useMemo(() => {
    return user?._id === service?.cooperator._id;
  }, [user, service]);

  const classes = serviceStyles();

  return (
    <>
      <Card className={classes.container} id={service._id}>
        <CardMedia>
          <ImageList
            imageList={service.images}
            show2Image={false}
            defaultHeight={500}
            isPost={false}
          />
        </CardMedia>
        <div>
          <CardContent>
            <Typography
              variant="h5"
              className={classes.serviceName}
              onClick={toggleDrawer(true)}
            >
              {service.name}
            </Typography>
            <Typography>{service.andress}</Typography>
            <Typography>{service.cost}</Typography>
            <SeeMoreText
              maxText={100}
              text={service.description}
              variant={'body1'}
            />
            <div className={classes.rate}>
              <Rating
                name="read-only"
                value={getStar(service.star)}
                readOnly
                size="medium"
              />
            </div>
            <ul className={classes.discount}>
              {service.discount.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className={classes.seeReview} onClick={toggleDrawer(true)}>
              Xem chi tiết
            </Button>
            {isOwn && (
              <>
                <Button
                  className={classes.seeReview}
                  component={Link}
                  to={`/editservice?id=${service._id}`}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  className={classes.seeReview}
                  onClick={handleShowDelete}
                >
                  Xóa dịch vụ
                </Button>
                <Dialog
                  open={showDelete}
                  onClose={handleCloseDelete}
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
                    <Button onClick={handleCloseDelete}>Hủy</Button>
                    <Button
                      onClick={handleDelete}
                      className={classes.delete}
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
              </>
            )}
          </div>
        </div>
      </Card>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
        style={{ zIndex: 10 }}
      >
        <ServiceDetail service={service} handleClose={toggleDrawer} />
      </Drawer>
    </>
  );
}
