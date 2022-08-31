import React, { useEffect, useState } from "react";
import { Container, Button, IconButton } from "@material-ui/core";
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Link, useHistory } from "react-router-dom";
import { AddCircle, Edit } from "@material-ui/icons";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import customAxios from "../../../utils/fetchData";
import { tableStyles } from "../../../style";


const columns = [
    {
        field: '_id',
        headerName: 'ID',
        width: 230,
        sortable: false,
    },
    {
        field: 'fullname',
        headerName: 'Tên đầy đủ',
        width: 350
    },
    {
        field: 'province',
        headerName: 'Tỉnh',
        width: 200,
        valueGetter: (event) => event.row.provinceId?.fullname || 'All'
    },
    {
        field: 'time',
        headerName: 'Thời gian',
        width: 150,
    },
    {
        field: 'calendar',
        headerName: 'Lịch',
        width: 150,
        valueGetter: (event) => event.row.calendarType ? 'DL' : 'AL'
    },
    {
        field: 'action',
        headerName: 'Chỉnh sửa',
        width: 150,
        sortable: false,
        renderCell: (event) => (
            <IconButton size='small' component={Link} to={`/admin/event/${event.row.name}`} title='Chỉnh sửa'>
                <Edit />
            </IconButton>
        )
    }
]

function ExportToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}


export default function AdminEvent() {
    const history = useHistory();
    const classes = tableStyles();
    const { token } = useSelector(state => state.auth);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    // const [stateEvent, setStateEvent] = useState({
    //     loading: false,
    //     error: false
    // })

    // const getCurrentEvent = async () => {
    //     setStateEvent({
    //         loading: true,
    //         error: false
    //     })
    //     await customAxios().get('/event/get_events').then(res => {
    //         setEvents(res.data.events);
    //         setStateEvent({
    //             loading: false,
    //             error: false
    //         })
    //     }).catch(err => {
    //         setStateEvent({
    //             loading: false,
    //             error: true
    //         })
    //     })
    // }

    const getAllEvents = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get('/event/all').then(res => {
            setEvents(res.data.events);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    useEffect(() => {
        getAllEvents(token);
    }, [token])

    useEffect(() => {
        document.title = 'Admin - Sự kiện'
    }, [])

    return (
        <Container className={classes.container}>
            <div className={classes.admin_location_header}>
                <div>
                    <Typography variant="h4">{events.length} sự kiện</Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        className={classes.addBtn}
                        startIcon={(
                            <AddCircle />
                        )}
                        component={Link}
                        to={`/admin/event/add`}
                    >
                        Thêm sự kiện
                    </Button>
                </div>
            </div>
            {/* 
            <div className={classes.event}>
                <div className={classes.title}>
                    <Typography variant="h4">Sự kiện sắp diễn ra</Typography>
                </div>
                {
                    stateEvent.loading ?
                        <div className={classes.centerMarginTop}>
                            <CircularProgress color="inherit" />
                        </div> :
                        stateEvent.error ?
                            <div className={classes.centerMarginTop}>
                                <Button onClick={getCurrentEvent}>Thử lại</Button>
                            </div> :
                            <Event events={events} />
                }

            </div> */}


            <Paper className={classes.paper}>
                <DataGrid
                    rows={events}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 25]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pagination
                    onRowDoubleClick={(event) => {
                        history.push(`/admin/event/${event.row.name}`)
                    }}
                    autoHeight
                    loading={loading}
                    error={error}
                    getRowId={row => row._id}
                    disableSelectionOnClick
                    components={{
                        Toolbar: ExportToolbar
                    }}
                />
            </Paper>
        </Container>
    );
}
