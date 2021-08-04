import { auth, provider } from "../firebase"

const useFireStore = () => {

    const logIn = () => {
        console.log('hi')
        return auth.signInWithPopup(provider)
    }

    const logOut = () => {
        return auth.signOut()
    }

    return {
        logIn, logOut
    }

}

export default useFireStore