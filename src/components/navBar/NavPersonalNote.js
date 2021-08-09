import React from 'react'
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import { IconButton, Tooltip } from '@material-ui/core'
import '../../css/NavPersonalNote.css'
function NavPersonalNote({ isPublic, setIsPublic }) {

    const handleChangeToPrivate = () => setIsPublic(false)
    const handleChangeToPublic = () => setIsPublic(true)

    return (
        <div className="nav__personalNote">
            <div className="nav__personalNote__col active" onClick={handleChangeToPublic}>
                <Tooltip title="Public" arrow placement="left-center">
                    <IconButton size="small" style={{ color: isPublic && 'teal' }}> <PublicIcon /> </IconButton>
                </Tooltip>
            </div>
            <div className="nav__personalNote__col" onClick={handleChangeToPrivate}>
                <Tooltip title="Private" arrow placement="right-center">
                    <IconButton size="small"
                        style={{ color: !isPublic && 'teal' }}
                    > <LockIcon /> </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default NavPersonalNote
