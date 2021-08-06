import { auth, provider, db } from "../firebase"

const useFireStore = () => {

    const logIn = () => auth.signInWithPopup(provider)

    const logOut = () => auth.signOut()

    const addVocabulary = (data) => db.collection(`${data.privacyType}`).add(data)

    const getPublicNotes = () => {
        return db.collection('public').orderBy('createdAt', 'desc').limit(10).get()
    }

    const getPublicNotesAfter = (doc) => {
        console.log(doc)
        return db.collection('public').orderBy('createdAt', 'desc').startAfter(doc.createdAt).limit(10).get()
    }

    db.collection('public').get()
        .then(docs => console.log(`length  + ${docs.size}`))
    return {
        logIn, logOut, addVocabulary,
        getPublicNotes, getPublicNotesAfter
    }

}

export default useFireStore