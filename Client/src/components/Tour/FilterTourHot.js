import React, { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Chip,
  Card,
  List,
  Fade,
  Typography,
  ListItem,
  ListItemText,
  Collapse,
  Button,
  Slider,
  TextField,
  Modal
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { feedStyles } from '../../style';
import { useSelector, useDispatch } from 'react-redux';
import { getTourHot, searchTourHot} from '../../redux/callApi/tourCall';
import CreateTourForm from '../Forms/CreateTour';
function formatCost(cost) {
  if (parseInt(cost) === 0) return 'Min';
  if (parseInt(cost) === 100) return 'Max';
  return cost * 100;
}

function valueText(value) {
  return `${100 * value} k`;
}
export default function FilterTourHot(props) {
  const { auth } = useSelector(state => state);
  const classes = feedStyles();
  const dispatch = useDispatch();
  const {
    costParent,
    setCostParent,
    textParent,
    setTextParent,
    isFiltering,
    setIsFiltering
  } = props;

  const [openCost, setOpenCost] = useState(true);
  const [openText, setOpenText] = useState(true);
  const [cost, setCost] = useState(costParent);
  const [text, setText] = useState(textParent);
  //   const [isFiltering, setIsFiltering] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);

  const handleClickCost = () => {
    setOpenCost(!openCost);
  };
  const handleClickText = () => {
    setOpenText(!openText);
  };
  const handleChangeCost = (e, value) => {
    setCost(value);
  };
  const handleChangeText = e => {
    setText(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setLoadingFilter(true);
    setCostParent(cost);
    setTextParent(text);
    setIsFiltering(true);
    var maxCost = cost[1],
      minCost = cost[0];
    if (minCost > maxCost) {
      minCost += maxCost;
      maxCost = minCost - maxCost;
      minCost -= maxCost;
    }
    dispatch(
      searchTourHot({
        maxCost: maxCost * 10,
        minCost: minCost * 10,
        q: text
      })
    );
    setLoadingFilter(false);
  };
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const removeFilter = () => {
    setCostParent([0, 100]);
    setTextParent('');
    dispatch(getTourHot());
    setIsFiltering(false);
  };
  const removeFilterText = () => {
    setLoadingFilter(true);
    setText('');
    setTextParent('');
    setIsFiltering(true);
    var maxCost = cost[1],
      minCost = cost[0];
    if (minCost > maxCost) {
      minCost += maxCost;
      maxCost = minCost - maxCost;
      minCost -= maxCost;
    }
    dispatch(
      searchTourHot({
        maxCost: maxCost * 10,
        minCost: minCost * 10
      })
    );
    setLoadingFilter(false);
  };

  const ref = React.createRef();
  const CreateTourRef = React.forwardRef((props, ref) => (
    <CreateTourForm innerRef={ref} {...props} />
  ));
  return (
    <div style={{ position: 'sticky', top: 2 }}>
      <div className={classes.createTourContainer}>
        <Button
          className={classes.createTour}
          onClick={handleShow}
          disabled={!auth.token}
        >
          Lên lịch trình ngay!
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={show}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={show}>
            <CreateTourRef ref={ref} handleClose={handleClose} />
          </Fade>
        </Modal>
      </div>
      <Card className={classes.filterContainer}>
        <div className={classes.filterHeader}>
          <Typography style={{ fontSize: 18, fontWeight: 500 }}>
            Lọc hành trình
          </Typography>
        </div>
        <div className={classes.filterBody}>
          {isFiltering && (
            <div>
              {
                text !== '' && 
                <Chip
                  label={text}
                  onDelete={() => removeFilterText()}
                  style={{ marginInline: 5 }}
                />
              }
              <Button style={{ color: 'red' }} onClick={removeFilter}>
                Xoá bộ lọc
              </Button>
            </div>
          )}
          <List component="nav" className={classes.filterOptions}>
            <ListItem button onClick={handleClickCost}>
              <ListItemText style={{ fontWeight: 500 }} primary="Khoảng chi phí" />
              {openCost ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCost} timeout="auto" unmountOnExit>
              <div style={{ marginBlock: 10, color: '#A5DEC8' }}>
                <Typography
                  gutterBottom
                  style={{
                    fontWeight: 500,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {/* {cost[0]}00.000VND ~ {cost[1]}00.000VND */}
                  {cost[0] === 0
                    ? 'Tối thiểu'
                    : new Intl.NumberFormat().format(cost[0] * 100000) +
                      ' VND'}{' '}
                  -{' '}
                  {cost[1] === 100
                    ? 'Tối đa'
                    : new Intl.NumberFormat().format(cost[1] * 100000) + ' VND'}
                </Typography>
                <div className={classes.center}>
                  <Slider
                    value={cost}
                    onChange={handleChangeCost}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatCost}
                    aria-labelledby="range-cost-slider"
                    getAriaValueText={valueText}
                    style={{ width: '90%', color: '#A5DEC8' }}
                  />
                </div>
              </div>
            </Collapse>
            <ListItem button onClick={handleClickText}>
              <ListItemText style={{ fontWeight: 500 }} primary="Tiêu chí" />
              {openText ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openText} timeout="auto" unmountOnExit>
              <div className={classes.filterInput}>
                <TextField
                  label="Từ khóa"
                  placeholder="Vd: Hà Nội..."
                  variant="outlined"
                  name="hashtag"
                  id="hashtag"
                  style={{ width: '100%', marginBlock: 10 }}
                  value={text}
                  onChange={handleChangeText}
                />
              </div>
            </Collapse>
          </List>
          <div style={{ display: 'flex', justifyContent: 'right', margin: 10 }}>
            {loadingFilter ? (
              <CircularProgress color="inherit" />
            ) : (
              <Button variant="outlined" onClick={handleSubmit}>
                Lọc
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
