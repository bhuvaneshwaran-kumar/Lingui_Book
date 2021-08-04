import React, { useState } from 'react'
import { Tooltip, Avatar, IconButton, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import SettingsPowerOutlinedIcon from '@material-ui/icons/SettingsPowerOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import MenuIcon from '@material-ui/icons/Menu';
import MenuCloseIcon from '@material-ui/icons/MenuOpen';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


import '../css/Nav.css'

import { useSelector } from 'react-redux'
import useFireStore from '../hooks/useFireStore'


function Nav() {

    const [drawerOpen, setDrawerOpen] = useState(false)



    const user = useSelector(store => store.user)
    const { logOut } = useFireStore()


    const handleShowProfile = () => setDrawerOpen(prev => !prev)

    const handleLogOut = () => {
        console.log('logging out the user')
        logOut()
    }

    return (
        <div className="nav">

            {/* Left Nav */}
            <div className="nav__left">
                {/* Profile */}
                <Tooltip title="Profile" arrow onClick={handleShowProfile}>
                    <IconButton>
                        <MenuIcon style={{ color: 'black' }} />
                    </IconButton>
                </Tooltip>

                <Typography variant="h6" className="nav__logoText">
                    <span style={{ color: "#4285F4" }}>N</span>
                    <span style={{ color: "#DB4437" }}>o</span>
                    <span style={{ color: "#F4B400" }}>t</span>
                    <span style={{ color: "#4285F4" }}>e</span>
                    &nbsp;
                    <span className="nav__logoText2">Gram</span>
                </Typography>
            </div>

            {/* Middle Nav */}
            <div className="nav__middle">
                <input type="text" className="nav__searchInput" placeholder="Search for the words" />
                <SearchIcon />
            </div>


            {/* Right side Nav */}
            <div className="nav__right">
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
                <Tooltip title="Home" arrow>
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
            </div>

            {/* Drawer Container. */}

            <SwipeableDrawer
                open={drawerOpen}
                onClose={handleShowProfile}
                onOpen={() => setDrawerOpen(true)}
            >
                <div className="nav__drawer">
                    <Tooltip title="close" arrow onClick={handleShowProfile} >
                        <IconButton>
                            <MenuCloseIcon style={{ color: 'black' }} />
                        </IconButton>
                    </Tooltip>
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
                    <Tooltip title="Add" arrow>
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
                </div>

            </SwipeableDrawer>
        </div>
    )
}

export default Nav


