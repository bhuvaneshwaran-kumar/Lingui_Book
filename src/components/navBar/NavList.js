import React, { useEffect, useState } from 'react'
import { Tooltip, Avatar, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import SettingsPowerOutlinedIcon from '@material-ui/icons/SettingsPowerOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

import { Link, useHistory, useLocation } from 'react-router-dom'


function NavList({ handleLogOut, user, column, handleToggleAddVocabulary, handleToggleSideNav }) {
    const history = useHistory()
    const location = useLocation()

    const [currentPath, setCurrentPath] = useState(location.pathname)

    useEffect(() => {
        const unsubscribe = history.listen((location) => setCurrentPath(location.pathname))
        return unsubscribe
    })


    const changeRoute = (route) => {
        column && handleToggleSideNav()
        history.push(`${route}`)
    }


    const flexDirection = column ? 'column' : 'row'
    return (
        <div style={{ display: 'flex', flexDirection: flexDirection }}>
            <Tooltip title="Personal Note!" arrow onClick={() => changeRoute('/personal-note')}>
                <IconButton>
                    <Avatar src={user?.photoURL} style={{ width: '1.7rem', height: '1.7rem' }} component={Link} to="/" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Home" arrow onClick={() => changeRoute('/')}>
                <IconButton style={{ color: currentPath === '/' ? 'teal' : 'black' }}>
                    <HomeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add" arrow onClick={handleToggleAddVocabulary}>
                <IconButton style={{ color: 'black' }}>
                    <AddCircleOutlineSharpIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Saved" arrow onClick={() => changeRoute('/saved')}>
                <IconButton style={{ color: currentPath === '/saved' ? 'teal' : 'black' }}>
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
