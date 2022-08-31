import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as CommentSvg } from './icon/comment.svg'

export default function CommentIcon(props) {

    return (
        <SvgIcon {...props}>
            <CommentSvg />
        </SvgIcon>
    )
}
