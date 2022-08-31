
import { Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import React, { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { modalStyles } from '../../style';

export default function CovidModal(props) {

    const { covid, handleClose, updateDate } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const classes = modalStyles();

    return (
        <Paper className={classes.container}>
            <div className={classes.header}>
                <div />
                <IconButton onClick={handleClose} size='small'>
                    <Close />
                </IconButton>
            </div>
            <Box
                display="flex"
                flexDirection="column"
                // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                height="750px" // fixed the height
                className={classes.boxScroll}

            >
                <div className={classes.center}>
                    <Typography variant="h4">
                        Tình hình Covid-19
                    </Typography>

                </div>
                <div className={classes.center}>
                    <Typography variant="subtitle2">Dữ liệu được lấy từ <Link href="https://covid19.gov.vn/" target='_blank'>Bộ y tế</Link></Typography>
                </div>
                <div className={classes.center}>
                    <Typography variant="h6">Tất cả</Typography>
                </div>
                <div className={classes.contentCovid}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">Tổng ca nhiễm</TableCell>
                                <TableCell align="center">Phục hồi</TableCell>
                                <TableCell align="center">Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Thế giới</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.total.world.cases)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.total.world.recovered)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.total.world.death)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Việt Nam</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.total.internal.cases)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.total.internal.recovered)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.total.internal.death)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={classes.center}>
                    <Typography variant="h6">Hôm nay (ngày cập nhật {updateDate})</Typography>
                </div>
                <div className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">Tổng ca nhiễm</TableCell>
                                <TableCell align="center">Phục hồi</TableCell>
                                <TableCell align="center">Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Thế giới</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.today.world.cases)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.today.world.recovered)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.today.world.death)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Việt Nam</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.today.internal.cases)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.today.internal.recovered)}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(covid.today.internal.death)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={classes.center}>
                    <Typography variant="h6">Gần đây:</Typography>
                </div>
                <div className={classes.tableContainer}>
                    <ResponsiveContainer height={500}>
                        <LineChart
                            width={700}
                            height={500}
                            data={covid.overview}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="cases" stroke="#00f" activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="recovered" stroke="#0f0" />
                            <Line type="monotone" dataKey="death" stroke="#f00" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Ngày</TableCell>
                                <TableCell align="center">Số ca nhiễm</TableCell>
                                <TableCell align="center">Phục hồi</TableCell>
                                <TableCell align="center">Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {covid.overview.map((item, index) =>
                                <TableRow key={index}>
                                    <TableCell align="center">{item.date}</TableCell>
                                    <TableCell align="center">{new Intl.NumberFormat().format(item.cases)}</TableCell>
                                    <TableCell align="center">{new Intl.NumberFormat().format(item.recovered)}</TableCell>
                                    <TableCell align="center">{new Intl.NumberFormat().format(item.death)}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className={classes.center}>
                    <Typography variant="h6">Chi tiết</Typography>
                </div>
                <div className={classes.tableContainer}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tỉnh/Thành phố</TableCell>
                                    <TableCell align="center">Tổng ca nhiễm</TableCell>
                                    <TableCell align="center">Ca nhiễm mới</TableCell>
                                    <TableCell align="center">Tử vong</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    covid.locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow key={index + page * rowsPerPage}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell align="center">{new Intl.NumberFormat().format(row.cases)}</TableCell>
                                                <TableCell align="center">{new Intl.NumberFormat().format(row.casesToday)}</TableCell>
                                                <TableCell align="center">{new Intl.NumberFormat().format(row.death)}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={covid.locations.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </div>
            </Box>
        </Paper>
    )
}
