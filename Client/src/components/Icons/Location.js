import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as LocationSvg } from './icon/location.svg'

export default function LocationIcon(props) {

    return (
        <SvgIcon {...props}>
            <LocationSvg />
        </SvgIcon>
    )
}
