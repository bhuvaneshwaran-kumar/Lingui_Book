import React from 'react'
import { Tooltip, Avatar, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import SettingsPowerOutlinedIcon from '@material-ui/icons/SettingsPowerOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

function NavList({ handleShowProfile, handleLogOut, user, column, handleAddVocabulary }) {
    const flexDirection = column ? 'column' : 'row'
    return (
        <div style={{ display: 'flex', flexDirection: flexDirection }}>
            <Tooltip title="Profile" arrow onClick={handleShowProfile}>
                <IconButton>
                    <Avatar src={user?.photoURL} style={{ width: '1.7rem', height: '1.7rem' }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Home" arrow>
                <IconButton style={{ color: 'black' }}>
                    <HomeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add" arrow onClick={handleAddVocabulary}>
                <IconButton style={{ color: 'black' }}>
                    <AddCircleOutlineSharpIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Saved" arrow>
                <IconButton style={{ color: 'black' }}>
                    <BookmarkOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Logout?" arrow onClick={handleLogOut}>
                <IconButton style={{ color: 'black' }}>
                    <SettingsPowerOutlinedIcon />
                </IconButton>
            </Tooltip>

        </div >
    )
}

export default NavList
