import { auth, provider, db } from "../firebase"

const useFireStore = () => {

    const logIn = () => auth.signInWithPopup(provider)

    const logOut = () => auth.signOut()

    const addVocabulary = (data) => {
        return db.collection(`${data.privacyType}`).add(data)
    }


    return {
        logIn, logOut, addVocabulary
    }

}

export default useFireStore