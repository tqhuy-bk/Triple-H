import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as MapPinSvg } from './icon/map-pin.svg'

export default function MapPinIcon(props) {

    return (
        <SvgIcon {...props}>
            <MapPinSvg />
        </SvgIcon>
    )
}
