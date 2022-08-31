import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as HeartFillSvg } from './icon/heart-fill.svg'

export default function HeartFillIcon(props) {

    return (
        <SvgIcon {...props}>
            <HeartFillSvg />
        </SvgIcon>
    )
}
