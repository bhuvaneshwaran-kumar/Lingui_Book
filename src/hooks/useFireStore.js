import { auth, provider, db, increment, decrement } from "../firebase"

const useFireStore = () => {

    const logIn = () => auth.signInWithPopup(provider)

    const logOut = () => auth.signOut()

    // add Note to the fireStore based on the privacy Type.
    const addVocabulary = (data) => db.collection(`${data.privacyType}`).add(data)

    // initial call to fetch Data in Home page
    const getPublicNotes = () => db.collection('public').orderBy('createdAt', 'desc').limit(10).get()

    // paginated query based on last elm createdAt as a cursor in redux homePage store.
    const getPublicNotesAfter = (doc) => db.collection('public').orderBy('createdAt', 'desc').startAfter(doc.createdAt).limit(10).get()

    const getPublicNotesAfterListener = (doc) => db.collection('public').orderBy('createdAt', 'desc').limit(1).get()

    // update savedSet in public notes.
    const updateSavedSetInNote = (docId, data) => db.collection('public').doc(docId).update({ savedSet: data });

    // update likeList in public notes.
    const updateLikeListInNote = (docId, data) => {
        return db.collection('public').doc(docId).update(data)
    }

    // Increase likeCount of Public Note by +1.
    const incrementLikeCountInNote = (docId) => {
        return db.collection('public').doc(docId).update({ likeCount: increment(1) })
    }

    // decrease likeCount of Public Note by -1 .
    const decrementLikeCountInNote = (docId) => {
        return db.collection('public').doc(docId).update({ likeCount: decrement(-1) })
    }

    //Add Users saved List 
    const addUserSavedList = (publicNotedoc, uid) => {
        const userSavedListRef = db.collection('users').doc(uid)
        return userSavedListRef.collection('savedList').doc(publicNotedoc.id).set(publicNotedoc)
    }

    //remove Users saved List
    const removeUserSavedList = (publicNotedoc, uid) => {
        return db.collection('users').doc(uid).collection('savedList').doc(publicNotedoc.id).delete()
    }

    // fetch Users saved List.
    const getUserSavedList = (uid) => {
        return db.collection('users').doc(uid).collection('savedList').orderBy('savedListCreatedAt', "desc").limit(10).get()
    }

    const getUserSavedListAfter = (uid, doc) => {
        return db.collection('users').doc(uid).collection('savedList').orderBy('savedListCreatedAt', "desc").startAfter(doc.savedListCreatedAt).limit(10).get()

    }

    const getUsersTag = (uid) => {
        return db.collection('users').doc(uid).get()
    }

    const updateUserTagInFireStore = (uid, data) => {
        return db.collection('users').doc(uid).set({ 'tags': data }, { merge: true })
    }
    const updateUserTagInFireStorePrivate = (uid, data) => {
        return db.collection('users').doc(uid).set({ 'privateTags': data }, { merge: true })
    }


    // get PersonalPost
    const getUsersTagPost = (isPublic, uid, tagName) => {
        console.log(isPublic, uid, tagName)
        return db.collection(isPublic ? 'public' : 'private').where('uid', '==', uid).where('tag', '==', tagName).orderBy('createdAt', 'desc').get()
    }

    const getUsersTagPostAfter = (isPublic, uid, doc) => {
        return db.collection(isPublic ? 'public' : 'private').where('uid', '==', uid).where('tag', '==', doc.tag).orderBy('createdAt', 'desc').startAfter(doc.createdAt).limit(10).get()
    }

    // db.collection('public').get()
    //     .then(docs => console.log(`length  + ${docs.size}`))
    return {
        logIn, logOut, addVocabulary,
        getPublicNotes, getPublicNotesAfter,
        updateSavedSetInNote, addUserSavedList, removeUserSavedList,
        getUserSavedList, getUserSavedListAfter, updateLikeListInNote,
        incrementLikeCountInNote, decrementLikeCountInNote, getUsersTag, updateUserTagInFireStore, getUsersTagPost, getUsersTagPostAfter, updateUserTagInFireStorePrivate, getPublicNotesAfterListener
    }

}

export default useFireStore