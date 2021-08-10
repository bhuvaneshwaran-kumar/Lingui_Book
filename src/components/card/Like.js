import React from 'react'
import { useState } from 'react';
import useFireStore from '../../hooks/useFireStore'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core'

function Like({ noteData, user, dispatch, updateHomePageNote }) {


    const [isLiked, setIsLiked] = useState(() => {
        if (noteData.likeSet) {
            return noteData.likeSet.includes(user.uid)
        } else {
            return false
        }
    })

    const { updateLikeListInNote, incrementLikeCountInNote, decrementLikeCountInNote } = useFireStore()


    const handleLikes = () => {
        if (Array.isArray(noteData.likeSet)) {
            if (isLiked) {
                // decrement && remove the user from Likeset.
                setIsLiked(false);
                let index = noteData.likeSet.indexOf(user.uid);
                if (index > -1) {
                    noteData.likeSet.splice(index, 1);
                    updateLikeListInNote(noteData.id, { likeSet: noteData.likeSet })
                    decrementLikeCountInNote(noteData.id)
                    noteData.likeCount = noteData.likeCount - 1;

                }

            } else {
                // increment and add the user from Likeset.
                setIsLiked(true);
                noteData.likeSet.push(user.uid);
                updateLikeListInNote(noteData.id, { likeSet: noteData.likeSet })
                incrementLikeCountInNote(noteData.id);
                noteData.likeCount = noteData.likeCount + 1;
            }
        } else {
            // nobody liked this Note Yet.
            setIsLiked(true);
            noteData.likeSet = [user.uid];
            updateLikeListInNote(noteData.id, { likeSet: noteData.likeSet }).catch(err => {
                console.log(noteData.id)
                console.log(err.message);
            })
            incrementLikeCountInNote(noteData.id);
            noteData.likeCount = 1;
        }
        dispatch(updateHomePageNote(noteData))
    }


    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLikes}>
                {isLiked ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
            </IconButton> <span style={{ opacity: '0.8', userSelect: "none" }}>{noteData?.likeCount || 0}</span>
        </div>
    )

}

export default Like
