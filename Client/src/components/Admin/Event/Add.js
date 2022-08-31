import React, { useState } from "react";
import { IconButton, Paper } from "@material-ui/core";

import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import FormEventAdmin from "./Form";


export default function AdminEventAdd() {
    const [event, setEvent] = useState({
        name: '',
        fullname: '',
        provinceId: null,
        time: null,
        calendarType: false,
        timedes: '',
        description: '',
        images: []
    })


    return (
        <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>

            <IconButton component={Link} to={`/admin/event`} title="Quay lại">
                <ArrowBack />
            </IconButton>

            <FormEventAdmin event={event} setEvent={setEvent} mode='add' />
        </Paper>
    );
}
