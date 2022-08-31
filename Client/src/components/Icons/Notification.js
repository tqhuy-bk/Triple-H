import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as NotificationSvg } from './icon/notification.svg'

export default function NotificationIcon(props) {

    return (
        <SvgIcon {...props}>
            <NotificationSvg />
        </SvgIcon>
    )
}
