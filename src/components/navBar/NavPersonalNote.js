import React from 'react'
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import { IconButton, Tooltip } from '@material-ui/core'
import '../../css/NavPersonalNote.css'
function NavPersonalNote() {
    return (
        <div className="nav__personalNote">
            <div className="nav__personalNote__col active">
                <Tooltip title="Public" arrow placement="left-center">
                    <IconButton size="small"> <PublicIcon /> </IconButton>
                </Tooltip>
            </div>
            <div className="nav__personalNote__col">
                <Tooltip title="Private" arrow placement="right-center">
                    <IconButton size="small"> <LockIcon /> </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default NavPersonalNote
