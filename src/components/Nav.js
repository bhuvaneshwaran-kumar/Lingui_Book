import React from 'react'
import { Tooltip, Avatar, IconButton,Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import '../css/Nav.css'
import imageLogo from './Bhuvan_Logo.png'


function Nav() {
    return (
        <div className="nav">
            <div className="nav__left">
                 <IconButton>
                        <Avatar src={imageLogo}/>
                </IconButton>          
                <Typography variant="h6" className="nav__logoText">
                    <span style={{ color: "#4285F4" }}>N</span>
                    <span style={{ color: "#DB4437" }}>o</span>
                    <span style={{ color: "#F4B400" }}>t</span>
                    <span style={{ color: "#4285F4" }}>e</span>
                    &nbsp;
                    <span className="nav__logoText2">Gram</span>
                </Typography>
            </div>
        
            <div className="nav__middle">
                <input type="text" className="nav__searchInput" placeholder="Search for the words" />
                <SearchIcon />

            </div>
            <div className="nav__right">
                <Tooltip title="Logout?" arrow="true">
                    <IconButton>
                        <Avatar />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Nav
