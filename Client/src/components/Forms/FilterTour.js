import { Button, Paper, Slider, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getTours } from '../../redux/callApi/tourCall';
import { formStyles } from '../../style'

function formatCost(cost) {
    if (parseInt(cost) === 0) return 'Min';
    if (parseInt(cost) === 100) return 'Max';
    return cost * 100;
}

function valueText(value) {
    return `${100 * value} k`;
}

export default function FilterTour(props) {

    const { costParent, setCostParent, textParent, setTextParent, handleClose, setFilter } = props;
    const dispatch = useDispatch();

    const [cost, setCost] = useState(costParent);
    const [text, setText] = useState(textParent);
    // const { cost, handleChangeCost, text, setText } = props;


    const handleChangeCost = (e, value) => {
        setCost(value);
    }

    const handleChangeText = e => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCostParent(cost);
        setTextParent(text);
        var maxCost = cost[1], minCost = cost[0];
        if (minCost > maxCost) {
            minCost += maxCost;
            maxCost = minCost - maxCost;
            minCost -= maxCost;
        }
        dispatch(getTours({
            maxCost: maxCost * 10,
            minCost: minCost * 10,
            q: text
        }))
        setFilter(true);
        handleClose();

    }


    const classes = formStyles();
    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.center}>
                <Typography variant='h4'>Lọc tour</Typography>
            </div>
            <div>
                <div style={{ marginBlock: 20 }}>
                    <Typography gutterBottom>
                        Chọn khoảng chi phí (nghìn VND)
                    </Typography>
                    <div className={classes.center}>
                        <Slider
                            value={cost}
                            onChange={handleChangeCost}
                            valueLabelDisplay='auto'
                            valueLabelFormat={formatCost}
                            aria-labelledby='range-cost-slider'
                            getAriaValueText={valueText}
                            style={{ width: 400 }}
                        />
                    </div>
                </div>
                <div className={classes.center}>
                    <TextField
                        label="Từ khóa"
                        placeholder="Vd: Hà Nội..."
                        variant="outlined"
                        name="hashtag"
                        id="hashtag"
                        // className={classes.hashtag}
                        style={{ width: 400, marginBlock: 20 }}
                        value={text}
                        onChange={handleChangeText}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', margin: 10 }}>
                    <Button variant='outlined' color='primary' onClick={handleSubmit}>Xong</Button>
                </div>
            </div>
        </Paper>
    )
}
