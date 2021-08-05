import React from 'react'
import { Tooltip, Avatar, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import SettingsPowerOutlinedIcon from '@material-ui/icons/SettingsPowerOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

import { Link, useHistory } from 'react-router-dom'


function NavList({ handleLogOut, user, column, handleToggleAddVocabulary }) {
    const history = useHistory()

    const changeRoute = (route) => history.push(`${route}`)


    const flexDirection = column ? 'column' : 'row'
    return (
        <div style={{ display: 'flex', flexDirection: flexDirection }}>
            <Tooltip title="Profile" arrow>
                <IconButton>
                    <Avatar src={user?.photoURL} style={{ width: '1.7rem', height: '1.7rem' }} component={Link} to="/" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Home" arrow onClick={() => changeRoute('/')}>
                <IconButton style={{ color: 'black' }}>
                    <HomeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add" arrow onClick={handleToggleAddVocabulary}>
                <IconButton style={{ color: 'black' }}>
                    <AddCircleOutlineSharpIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Saved" arrow onClick={() => changeRoute('/saved')}>
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
