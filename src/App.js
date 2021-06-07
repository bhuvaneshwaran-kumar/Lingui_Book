import './App.css';
import {useContext, useState} from 'react'
import {UserContext} from './context/UserContext'
import NavBar from '../src/components/navBar/NavBar'
import LinearIndeterminate from './components/loader/LinearIndeterminate'
import {auth} from './firebase.js'
import {Switch,Route, Redirect} from 'react-router-dom'
import AddVocabulary from './components/addVocabulary/AddVocabulary'
import { useEffect } from 'react';

function App() {

  const [loader,setLoader] = useState(true)
  const [checked,setChecked] = useState(false)

  const [user,setUser] = useContext(UserContext)

  


  useEffect(()=>{

    auth.onAuthStateChanged((userLogged)=>{
     
      if(userLogged){
           let {uid,photoURL,email,displayName} = userLogged
           let data = {uid,photoURL,email,displayName} 
           setUser(data)
      }else{
        
           setUser(null)

      }

      setChecked(true)
      setLoader(false)
    })



  },[setUser])



  return (
    <>
    {
      loader && <LinearIndeterminate/>
    }
      {
        !checked && loader && <LinearIndeterminate/> 
      }
      {
        checked && <NavBar/>
      }
      {
        user && (
                <div>
                  <h1>Wellcome {user.displayName}</h1>
                </div>
        )
      }
      <Switch>
        <Route exact path="/add-vocabulary">
            { user ?
              <AddVocabulary/> :
              <Redirect to="/"/>
            }
        </Route>
      </Switch>
    </>
  );
}
export default App;

/*
<Navbar>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />
</Navbar>
function Navbar(props){
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        { props.children }
      </ul>
    </nav>
  )
}

function NavItem(props){
  return(
    <li className="nav-item">
      <a href="#" className="icon-button">
        {props.icon}
      </a>
    </li>
  )
}
*/
