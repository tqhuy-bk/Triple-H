import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as SuccessSvg } from './icon/success.svg'

export default function SuccessIcon(props) {

    return (
        <SvgIcon {...props}>
            <SuccessSvg />
        </SvgIcon>
    )
}
