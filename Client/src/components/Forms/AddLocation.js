import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';
import { AddCircle } from "@material-ui/icons";


export default function AddLocationForm(props) {

    const classes = formStyles();

    const [loc, setLoc] = useState(null);

    const dispatch = useDispatch();
    const { location } = useSelector(state => state);
    const { currentProvince, setCurrentProvince, handleClose, indexDate } = props;
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(location.loadingLocations);


    useEffect(() => {
        setLoading(true);
        if (currentProvince) {
            setLocations(location.locations.filter((item) => item.province._id === currentProvince._id))
        }
        setLoading(false);
    }, [currentProvince, location.locations]);



    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc)
            dispatch(tourAction.addLocation({ location: loc, indexDate: indexDate }))
        handleClose();
    }

    const setProvince = (province) => {
        setCurrentProvince(province);
    }


    return (
        <Paper className={`${classes.paperContainer} ${classes.addFormContainer}`}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Thêm địa điểm
                </Typography>
            </div>
            <form
                className={classes.addLocationForm}
            >
                <div className={classes.center}>
                    <Autocomplete
                        value={currentProvince}
                        id="choose-province"
                        options={location.provinces}
                        loading={location.loadingProvinces}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocomplete}
                        onChange={(e, value) => setProvince(value)}
                        defaultValue={props.provinceCache}
                        renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                    />
                </div>
                <div className={classes.center}>
                    <Autocomplete
                        value={loc}
                        id="choose-location"
                        options={locations}
                        loading={loading}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocomplete}
                        onChange={(e, value) => setLoc(value)}
                        renderInput={(params) => <TextField {...params} name="location" label="Chọn địa điểm" variant="outlined" />}
                    />
                </div>
                <div>
                    <Button
                        className={classes.button}
                        type="submit"
                        onClick={handleSubmit}
                        startIcon={(<AddCircle />)}
                        disabled={!loc}
                    >
                        Thêm
                    </Button>
                </div>
            </form>
        </ Paper >
    )
}