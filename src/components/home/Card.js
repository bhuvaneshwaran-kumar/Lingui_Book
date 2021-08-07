import React from 'react'
import { CardHeader, Avatar, Divider, IconButton } from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useFireStore from '../../hooks/useFireStore'
import { useDispatch } from 'react-redux';
import { updateHomePageSavedList } from '../../actions/index'
import { serverTimeStamp } from '../../firebase'
function Card({ noteData, innerRef }) {


    const user = useSelector(store => store.user)
    const dispatch = useDispatch()

    const { updateSavedSetInNote, addUserSavedList, removeUserSavedList } = useFireStore()

    const [isSaved, setIsSaved] = useState(() => {
        if (noteData.savedSet) {
            return noteData.savedSet.includes(user.uid)
        } else {
            return false
        }
    })

    const addToSaveList = (noteData) => {
        noteData.savedListCretedAt = serverTimeStamp()

        addUserSavedList(noteData, user.uid)
            .then(() => console.log("added saved list"))
            .catch((err) => console.log("error", err))
    }

    const removeFromSaveList = (noteData) => {
        noteData.savedListCretedAt = serverTimeStamp()
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
                addToSaveList()
            }
        } else {
            // no body saved this Note yet.
            setIsSaved(true)
            noteData.savedSet = [user.uid]
            console.log('bookMarking')
            updateSavedSetInNote(noteData.id, noteData.savedSet)
            addToSaveList()

        }
        dispatch(updateHomePageSavedList(noteData))
    }

    return (
        <div ref={innerRef} className="home__card">
            <CardHeader className="home__cardHeader"
                avatar={
                    <Avatar src={`${noteData.createrPhotoURL}`} />
                }
                title={`${noteData.createrName}`}
                subheader={`${noteData.createdAtLocal}`}
            />


            <div className="home__cardRow">
                <p className="home__cardRow__heading one">Word</p>
                <p>{noteData.word.trim()}</p>
            </div>
            <Divider variant='middle' />
            <div className="home__cardRow">
                <p className="home__cardRow__heading two">Meaning</p>
                <pre >{noteData.meaning.trim()}</pre>
            </div>
            <Divider variant='middle' />

            <div className="home__cardRow">
                <p className="home__cardRow__heading three">Example</p>
                <pre>{noteData.example.trim().replaceAll('\n\n\n\n\n\n\n\n\n', '')}</pre>
            </div>
            <Divider />
            <div className="home__cardRow bottom">
                <IconButton>
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton onClick={handleBookmark}>
                    {isSaved ? <BookmarkIcon style={{ color: "black" }} /> : <BookmarkBorderIcon />}
                </IconButton>

            </div>
        </div>
    )
}

export default Card
