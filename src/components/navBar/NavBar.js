import {useContext,useRef} from 'react'
import {UserContext} from '../../context/UserContext'
import { auth, provider } from '../../firebase'
import './NavBar.css'
import {Link} from 'react-router-dom'




function NavBar() {
    const [user,setUser] = useContext(UserContext)
    // console.log(user,'from navbar')
    const bottomNavBar = useRef()



    const displayBottom = ()=>{
        bottomNavBar.current.style.display = bottomNavBar.current.style.display === 'flex' ? 'none' : 'flex'
    }

    const logOut = ()=>{
        auth.signOut()
    }

    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            const user = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            }
            console.log(user)
            setUser(user)
            console.log(`Logged in as ${user.displayName}`)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <>
        {
        user ? (
            <nav className="navbar">
            <ul className="navbar-nav ">
             <img onClick={()=>displayBottom()} className="icon-button" src={user.photoURL} style={{borderRadius:'50%' }} alt=""/>
             <ul  ref={bottomNavBar} className="navbar-nav-icon-bottom bottom-Nav">
                 
                 <li className="navbar-btom-btn"   style={{fontWeight:'500'}} onClick={displayBottom}>
                    <Link to="/"> Home 🔥</Link> 
                 </li>
                 <li className="navbar-btom-btn"   style={{fontWeight:'500'}} onClick={displayBottom} >
                    <Link to="/add-vocabulary"> Add Vocabulary 🖊</Link> 
                 </li>
                 <li className="navbar-btom-btn" onClick={logOut}  style={{fontWeight:'500'}}>
                     Logout 🥌 
                 </li>
             </ul>
            </ul>
            </nav>        
           ) : (
               
           <nav className="navbar">
            <ul className="navbar-nav">
             <li className="navbar-btom-btn" onClick={signIn} style={{fontWeight:'500',padding:'10px 0px'}}>SignIn 🚀</li>
            </ul>
           </nav>
           )
        }
        </>
    
    )
}

export default NavBar

    // <nav className="navbar">
    //      <ul className="navbar-nav">
    //       <li  className="nav-item">LogIn</li>
    //       <li  className="nav-item">LogOut</li>
    //       <li  className="nav-item"></li>
    //      </ul>
    //     </nav>