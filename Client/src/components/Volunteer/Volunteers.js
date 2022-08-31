import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { useSelector} from 'react-redux';
import FilterVolunteer from '../../components/Volunteer/FilterVolunteer';
import VolunteerCard from '../../components/Volunteer/VolunteerCard';
import useStyles from '../../style'

export default function Volunteers(props) {

    const { volunteer } = useSelector(state => state);
    const classes = useStyles(); 
    const [cost, setCost] = useState([0, 100]);
    const [text, setText] = useState('');
    const [isFiltering, setIsFiltering] = useState(false);


    const refFilter = React.createRef();

    const FilterVolunteerRef = React.forwardRef((props, ref) => (
        <FilterVolunteer innerRef={ref} {...props} />
    ));

    return (
        <Grid container className={classes.wrapperProvinces}>
            <Grid item md={12} sm={12} xs={12}>
                <FilterVolunteerRef
                    ref={refFilter}
                    costParent={cost}
                    setCostParent={setCost}
                    textParent={text}
                    setTextParent={setText}
                    isFiltering={isFiltering}
                    setIsFiltering={setIsFiltering}
                />
            </Grid>
            {volunteer.volunteers &&
                volunteer.volunteers.map(item => (
                    <Grid item md={4} sm={6} xs={12} key={item._id}>
                        <VolunteerCard volunteer={item} />
                    </Grid>
            ))}
        </Grid>
    );
}
