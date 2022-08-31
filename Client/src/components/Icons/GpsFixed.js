import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as GpsFixed } from './icon/gpsfixed.svg'

export default function GpsFixedIcon(props) {

    return (
        <SvgIcon {...props}>
            <GpsFixed />
        </SvgIcon>
    )
}
