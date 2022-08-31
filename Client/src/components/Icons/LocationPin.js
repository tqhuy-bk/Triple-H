import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as LocationPinSvg } from './icon/location-pin.svg'

export default function LocationPinIcon(props) {

    return (
        <SvgIcon {...props}>
            <LocationPinSvg />
        </SvgIcon>
    )
}
