
import {
    CircularProgress,
    Slider,
    Input,
    Popover,
    Button, 
    Typography,
} from '@material-ui/core';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { volunteerStyles } from '../../style';
import { getVolunteers } from '../../redux/callApi/volunteerCall';

function formatCost(cost) {
    if (parseInt(cost) === 0) return 'Min';
    if (parseInt(cost) === 100) return 'Max';
return cost * 100;
}

function valueText(value) {
    return `${100 * value} k`;
}

export default function FilterVolunteer(props) {
    
    const classes = volunteerStyles();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const {
        costParent,
        setCostParent,
        textParent,
        setTextParent,
        isFiltering,
        setIsFiltering
    } = props;
    const [cost, setCost] = useState(costParent);
    const [text, setText] = useState(textParent);

    const [loadingFilter, setLoadingFilter] = useState(false);

    const handleChangeCost = (e, value) => {
        setCost(value);
    };
    const handleChangeText = (e) => {
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
          getVolunteers({
            maxCost: maxCost * 10,
            minCost: minCost * 10,
            q: text
          })
        );
        setLoadingFilter(false);
    };
    const removeFilter = () => {
        setCostParent([0, 100]);
        setTextParent('');
        dispatch(getVolunteers());
        setIsFiltering(false);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? "cost-popover" : undefined;


    const [anchorEl_text, setAnchorEl_text] = useState(null);
    const handleClickText = (e) => {
        setAnchorEl_text(e.currentTarget);
    }

    const handleCloseText = () => {
        setAnchorEl_text(null);
    }

    const open_text = Boolean(anchorEl_text);
    const id_text = open ? "text-popover" : undefined;
    return (
        
        <div>
            {auth.token &&
                <Button
                component={Link}
                to={'/createvolunteer'}
                disabled={!(auth.user.confirmAccount && auth.user.confirmAccount.state === 1)}
                className={classes.buttonCreate}
                variant="contained"
                >
                    Hãy tạo hoạt động tình nguyện của bạn
                </Button>
            }
            <div className={classes.filterWrapper} >
                <Typography variant='body1'>Lọc theo: </Typography>
                <div className={classes.filterCost} aria-describedby={id} onClick={handleClick}>
                    {
                        cost[0] === 0 && cost[1]===100 ? 
                        <Typography variant='body1'  >
                            Chi phí 
                        </Typography>
                        :
                        <Typography
                            gutterBottom
                            variant='body1'
                        >
                            {cost[0] === 0
                                ? 'Tối thiểu'
                                : new Intl.NumberFormat().format(cost[0] * 100000) +
                                ' VND'}{' '}
                            -{' '}
                            {cost[1] === 100
                                ? 'Tối đa'
                                : new Intl.NumberFormat().format(cost[1] * 100000) + ' VND'}
                        </Typography>
                    }
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <div className={classes.sliderWrap}>
                        <Slider
                            value={cost}
                            onChange={handleChangeCost}
                            valueLabelDisplay="auto"
                            valueLabelFormat={formatCost}
                            aria-labelledby="range-cost-slider"
                            getAriaValueText={valueText}
                            // style={{ width: '90%', color: '#A5DEC8' }}
                        />
                    </div>
                </Popover>
                <div className={classes.filterCost} aria-describedby={id_text} onClick={handleClickText}>
                    {
                        text === '' ? 
                        <Typography variant='body1'  >
                            Từ khóa
                        </Typography>
                        :
                        <Typography variant='body1'  >
                            {text}
                        </Typography>
                    }
                </div>
                <Popover
                    id={id_text}
                    open={open_text}
                    anchorEl={anchorEl_text}
                    onClose={handleCloseText}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <div className={classes.sliderWrap}>
                        <Input
                            label="Từ khóa"
                            placeholder="Vd: Hà Nội..."
                            variant="outlined"
                            name="hashtag"
                            id="hashtag"
                            style={{ width: '300px', marginBlock: 10 }}
                            value={text}
                            onChange={handleChangeText}
                        />
                    </div>
                </Popover>
                {loadingFilter ? 
                    <CircularProgress color="inherit" />
                    :
                    <Button variant="outlined" onClick={handleSubmit} className={classes.buttonFilter}>
                        Lọc
                    </Button>
                }
                {isFiltering && 
                    <Button style={{ color: 'red', borderRadius: 15 }} onClick={removeFilter}>
                        Xoá bộ lọc
                    </Button>
                }
            </div>
        </div>
    );
  }
  