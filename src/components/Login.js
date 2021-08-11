import React, { useEffect, useRef } from 'react'
import '../css/Login.css'
import imageLogo from './Bhuvan_Logo.png'
import { Button, Typography } from '@material-ui/core'
import useFireStore from '../hooks/useFireStore'
function Login() {

    const welcomeTextRef = useRef()
    const { logIn } = useFireStore()

    const handleLogin = () => {
        logIn()
    }




    useEffect(() => {
        const timer = setTimeout(() => {
            welcomeTextRef.current.classList.add('active')
        }, 200)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="login">
            <div className="login__main">
                <img src={imageLogo} alt="logo" />
                <Typography variant="h5" className="login__welcomeText" ref={welcomeTextRef}>
                    Welcome&nbsp;to
                    &nbsp;
                    <span style={{ color: "#4285F4" }}>L</span>
                    <span style={{ color: "#DB4437" }}>i</span>
                    <span style={{ color: "#4285F4" }}>n</span>
                    <span style={{ color: "#F4B400" }}>g</span>
                    <span style={{ color: "#4285F4" }}>u</span>
                    <span style={{ color: "#DB4437" }}>i</span>
                    &nbsp;
                    <span className="nav__logoText2">Book</span>
                </Typography>
                <Button variant="contained" color="primary" className="" onClick={handleLogin}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
