import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import useFireStore from '../hooks/useFireStore'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { IconButton } from '@material-ui/core'
import { serverTimeStamp } from '../firebase'

function Save({ noteData, user, dispatch, updateHomePageNote }) {

    const [isSaved, setIsSaved] = useState(() => {
        if (noteData.savedSet) {
            return noteData.savedSet.includes(user.uid)
        } else {
            return false
        }
    })


    const { updateSavedSetInNote, addUserSavedList, removeUserSavedList } = useFireStore()


    const addToSaveList = () => {
        noteData.savedListCreatedAt = serverTimeStamp()
        const tempData = { ...noteData }
        // deleting unwanted entries in savedStore.
        delete tempData['createdAtLocal']
        delete tempData['savedSet']
        addUserSavedList(tempData, user.uid)
            .then(() => console.log("added saved list"))
            .catch((err) => console.log("error", err))
    }

    const removeFromSaveList = () => {
        removeUserSavedList(noteData, user.uid)
            .then(() => console.log("removed saved list"))
            .catch((err) => console.log("error", err))
    }

    const handleBookmark = () => {
        if (Array.isArray(noteData.savedSet)) {
            if (isSaved) {
                // remove the user from saveList
                setIsSaved(false)
                let index = noteData.savedSet.indexOf(user.uid)
                if (index > -1) {
                    noteData.savedSet.splice(index, 1)
                    updateSavedSetInNote(noteData.id, noteData.savedSet)
                    removeFromSaveList()
                }
            } else {
                setIsSaved(true)
                noteData.savedSet.push(user.uid) //pushing the userId
                updateSavedSetInNote(noteData.id, noteData.savedSet) //Updating the saved User List in note document in public.
                addToSaveList() // add to users save list.
            }
        } else {
            // no body saved this Note yet.
            setIsSaved(true)
            noteData.savedSet = [user.uid]
            console.log('bookMarking')
            updateSavedSetInNote(noteData.id, noteData.savedSet)
            addToSaveList()

        }
        dispatch(updateHomePageNote(noteData))
    }


    return (
        <IconButton onClick={handleBookmark}>
            {isSaved ? <BookmarkIcon style={{ color: "black" }} /> : <BookmarkBorderIcon />}
        </IconButton>
    )

}

export default Save
