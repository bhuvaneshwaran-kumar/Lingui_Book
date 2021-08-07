import { auth, provider, db } from "../firebase"

const useFireStore = () => {

    const logIn = () => auth.signInWithPopup(provider)

    const logOut = () => auth.signOut()

    // add Note to the fireStore based on the privacy Type.
    const addVocabulary = (data) => db.collection(`${data.privacyType}`).add(data)

    // initial call to fetch Data in Home page
    const getPublicNotes = () => db.collection('public').orderBy('createdAt', 'desc').limit(10).get()

    // paginated query based on last elm createdAt as a cursor in redux homePage store.
    const getPublicNotesAfter = (doc) => db.collection('public').orderBy('createdAt', 'desc').startAfter(doc.createdAt).limit(10).get()

    // update savedSet in public notes.
    const updateSavedSetInNote = (docId, data) => db.collection('public').doc(docId).update({ savedSet: data });

    //Add Users saved List 
    const addUserSavedList = (publicNotedoc, uid) => {
        return db.collection('users').doc(uid).collection('savedList').doc(publicNotedoc.id).set(publicNotedoc)
    }

    //remove Users saved List
    const removeUserSavedList = (publicNotedoc, uid) => {
        return db.collection('users').doc(uid).collection('savedList').doc(publicNotedoc.id).delete()
    }



    // db.collection('public').get()
    //     .then(docs => console.log(`length  + ${docs.size}`))
    return {
        logIn, logOut, addVocabulary,
        getPublicNotes, getPublicNotesAfter,
        updateSavedSetInNote, addUserSavedList, removeUserSavedList
    }

}

export default useFireStore