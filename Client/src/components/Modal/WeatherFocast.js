import { IconButton, Link, Paper, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { WeatherFocastItem } from '../Card/WeatherCard';
import { modalStyles } from '../../style';

export default function WeatherFocast({ weather, handleClose, nameShow, alert }) {

    const classes = modalStyles();

    return (
        <Paper className={classes.weatherContainer}>
            <div className={classes.header}>
                <div />
                <IconButton onClick={handleClose} size='small'>
                    <Close />
                </IconButton>
            </div>
            <div style={{ marginBottom: 30 }} className={classes.center}>
                <Typography variant={"h4"} className={classes.title}>Dự báo thời tiết {nameShow}</Typography>
            </div>
            {alert &&
                <div className={classes.center}>
                    <div>
                        <Typography>
                            ⚠️⚠️⚠️ Cảnh báo ⚠️⚠️⚠️
                        </Typography>
                        <Typography>{alert.event}</Typography>
                        <Typography>Từ {alert.start} đến {alert.end}</Typography>
                        <Typography>{alert.description}</Typography>
                    </div>
                </div>
            }
            {
                weather &&
                <ScrollMenu>
                    {weather.map((item, index) =>
                        <WeatherFocastItem weather={item} key={index} />
                    )}
                </ScrollMenu>
            }
            <div style={{ display: "flex", justifyContent: "right", margin: 10 }}>
                <Typography variant="subtitle2">Dữ liệu được lấy từ <Link href="https://openweathermap.org/" target='_blank'>OpenWeatherMap</Link></Typography>
            </div>
        </Paper>
    )
}
