import { auth, provider } from "../firebase"

const useFireStore = () => {

    const logIn = () => {
        return auth.signInWithPopup(provider)
    }


}

export default useFireStore