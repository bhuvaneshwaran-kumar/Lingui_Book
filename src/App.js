import { useEffect } from 'react';
import {auth} from './firebase'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from './actions/index'


function App() {

  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    console.log(user?.name+' is logged in')
  },[user])


  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if(user){
        console.log('user is successfully loggedIn')
        const data = {
          uid : user.uid,
          name : user.displayName,
          email : user.email,
          photoURL : user.photoURL,
        }
        dispatch(setUser(data))
      } 
    })
    return unsubscribe
  },[dispatch])

  return (
    <>
      Hello World
    </>
  );
}
export default App;
