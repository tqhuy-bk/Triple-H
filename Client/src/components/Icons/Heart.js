import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as HeartSvg } from './icon/heart.svg'

export default function HeartIcon(props) {

    return (
        <SvgIcon {...props}>
            <HeartSvg />
        </SvgIcon>
    )
}
