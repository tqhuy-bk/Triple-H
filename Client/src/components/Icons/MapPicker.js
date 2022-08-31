import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as MapPickerSvg } from './icon/map-picker.svg'

export default function MapPickerIcon(props) {

    return (
        <SvgIcon {...props}>
            <MapPickerSvg />
        </SvgIcon>
    )
}
