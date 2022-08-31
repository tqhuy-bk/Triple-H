import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as ShareSvg } from './icon/share.svg'

export default function ShareIcon(props) {

    return (
        <SvgIcon {...props}>
            <ShareSvg />
        </SvgIcon>
    )
}
