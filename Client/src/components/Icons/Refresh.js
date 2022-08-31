import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as RefreshSvg } from './icon/refresh.svg'

export default function RefreshIcon(props) {

    return (
        <SvgIcon {...props}>
            <RefreshSvg />
        </SvgIcon>
    )
}
