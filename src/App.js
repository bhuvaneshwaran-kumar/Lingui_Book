import { useEffect, useState } from 'react';
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './actions/index'
import { LinearProgress } from '@material-ui/core'
import Nav from './components/navBar/Nav'
import Login from './components/Login'
import HomePage from './pages/HomePage'
import SavedPage from './pages/SavedPage'
import { Switch, Route } from 'react-router-dom'
function App() {

  const [loading, setLoading] = useState(true)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()


  // useEffect(() => {
  //   console.log(user?.name + ' is logged in')
  // }, [user])




  // will listen to user auth events.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true)
      if (user) {
        const data = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
        dispatch(setUser(data))
      } else {
        dispatch(setUser(null))
      }
      setLoading(false)
    })
    return unsubscribe
  }, [dispatch])

  return (
    <>
      {/* if loading is set true then show the progress bar.*/}
      {
        loading && <LinearProgress />
      }

      {/* if loading is set false and user is null then ask user to Login*/}
      {
        !loading && !user && <Login />
      }

      {/* if loading is set false and user is exist then show Navbar*/}
      {
        !loading && user && <Nav />
      }
      {/* Routing Starts */}
      {
        user && <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/saved" exact>
            <SavedPage />
          </Route>
        </Switch>
      }

    </>
  );
}
export default App;
