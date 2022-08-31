import { SvgIcon } from '@material-ui/core'
import React from 'react'

import { ReactComponent as ChatSvg } from './icon/chat.svg'

export default function ChatIcon(props) {

    return (
        <SvgIcon {...props}>
            <ChatSvg />
        </SvgIcon>
    )
}
