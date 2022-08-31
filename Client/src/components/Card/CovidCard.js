import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Fade,
  Link,
  Modal,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { cardStyles } from '../../style';
import Loading from '../Loading';
import CovidModal from '../Modal/Covid';

export default function CovidCard(props) {
  const { name } = props;
  const [covid, setCovid] = useState(null);
  const [data, setData] = useState(null);
  const [updateDate, setUpdateDate] = useState('');
  const [show, setShow] = useState(false);

  const classes = cardStyles();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const getData = async () => {
      await fetch('https://static.pipezero.com/covid/data.json')
        .then(res => res.json())
        .then(data => {
          setCovid(data);
          // console.log(data);
          for (var loc of data.locations) {
            if (loc.name === name) {
              setData(loc);
              break;
            }
          }
          setUpdateDate(data.overview[data.overview.length - 1].date);
        });
    };
    if (name) {
      getData();
    }
  }, [name]);

  const ref = React.createRef();

  const CovidRef = React.forwardRef((props, ref) => (
    <CovidModal {...props} innerRef={ref} />
  ));

  return (
    <Card className={classes.covidCardContainer}>
      <div className={classes.title}>
        <Typography variant="h6">Tình hình Covid-19</Typography>
      </div>

      <CardContent>
        {data ? (
          <div className={classes.detailInfoCovid}>
            <div className={classes.center}>
              <Typography variant="h6">{data.name}</Typography>
            </div>
            <div style={{ marginBottom: 10 }} className={classes.center}>
              <Typography>Cập nhật ngày {updateDate}</Typography>
            </div>
            <div className={classes.itemInfo}>
              <Typography>Tổng ca nhiễm:</Typography>
              <Typography className={classes.value}>{data.cases}</Typography>
            </div>
            <div className={classes.itemInfo}>
              <Typography>Số ca nhiễm mới:</Typography>
              <Typography className={classes.value}>
                {data.casesToday}
              </Typography>
            </div>
            <div className={classes.itemInfo}>
              <Typography>Tử vong:</Typography>
              <Typography className={classes.value}>{data.death}</Typography>
            </div>
            <div className={classes.center}>
              <Button onClick={handleShow} className={classes.button}>
                Xem tổng quát
              </Button>
            </div>
            <div style={{ marginTop: 10 }} className={classes.center}>
              <Typography variant="subtitle2">
                Dữ liệu được lấy từ{' '}
                <Link href="https://covid19.gov.vn/" target="_blank">
                  Bộ y tế
                </Link>
              </Typography>
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={show}
              onClose={handleShow}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={show}>
                <CovidRef
                  ref={ref}
                  covid={covid}
                  handleClose={handleClose}
                  updateDate={updateDate}
                />
              </Fade>
            </Modal>
          </div>
        ) : (
          <div className={classes.centerMarginTop}>
            <Loading />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
