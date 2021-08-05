import React, { useState } from 'react'
import { Tooltip, IconButton, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import NavList from './NavList'

import '../css/Nav.css'

import { useSelector } from 'react-redux'
import useFireStore from '../hooks/useFireStore'

import AddVocabulary from './AddVocabulary'

function Nav() {

    const [drawerOpen, setDrawerOpen] = useState(false)

    const [isAddVocabularyOpen, setIsAddVocabularyOpen] = useState(false)

    const user = useSelector(store => store.user)
    const { logOut } = useFireStore()


    const handleToggleSideNav = () => setDrawerOpen(prev => !prev)

    const handleLogOut = () => {
        console.log('logging out the user')
        logOut()
    }

    const handleToggleAddVocabulary = () => {
        setDrawerOpen(false)
        setIsAddVocabularyOpen(prev => !prev)
    }
    return (
        <div className="nav">

            {/* Left Nav */}
            <div className="nav__left">
                {/* Profile */}
                <Tooltip title="Profile" arrow onClick={handleToggleSideNav}>
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
                <NavList handleLogOut={handleLogOut} user={user} handleToggleAddVocabulary={handleToggleAddVocabulary} />
            </div>

            {/* Drawer Container. */}

            <SwipeableDrawer
                open={drawerOpen}
                onClose={handleToggleSideNav}
                onOpen={() => setDrawerOpen(true)}
            >
                <div className="nav__drawer">
                    <NavList handleLogOut={handleLogOut} user={user} column={true} handleToggleAddVocabulary={handleToggleAddVocabulary} />
                </div>

            </SwipeableDrawer>

            {/* Add Vocabulary Modal. */}
            {
                isAddVocabularyOpen && <AddVocabulary isAddVocabularyOpen={isAddVocabularyOpen} handleColseVocabulary={handleToggleAddVocabulary} />
            }
        </div>
    )
}

export default Nav


