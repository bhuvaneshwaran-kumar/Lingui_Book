import { Avatar, CardHeader, Divider, Tooltip } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomePageNote } from '../../actions/index';
import LikeIcon from './Like';
import SaveIcon from './Save';


function Card({ noteData, innerRef, isSavedPage }) {

    console.log(typeof noteData.createdAt)

    let createdAtLocal = noteData?.createdAt?.toDate()?.toString()?.slice(0, 16) || noteData.createdAtLocal


    const user = useSelector(store => store.user)
    const dispatch = useDispatch()


    return (
        <div ref={innerRef} className="home__card">
            <CardHeader className="home__cardHeader"
                avatar={
                    <Tooltip title={noteData.tag} arrow>
                        <Avatar src={`${noteData.createrPhotoURL}`} />
                    </Tooltip>
                }
                title={`${noteData.createrName}`}
                subheader={`${createdAtLocal}`}
            />


            <div className="home__cardRow">
                <p className="home__cardRow__heading one">Word</p>
                <p>{noteData.word}</p>
            </div>
            <Divider variant='middle' />
            <div className="home__cardRow">
                <p className="home__cardRow__heading two">Meaning</p>
                <pre >{noteData.meaning}</pre>
            </div>
            <Divider variant='middle' />

            <div className="home__cardRow">
                <p className="home__cardRow__heading three">Example</p>
                <pre>{noteData.example}</pre>
            </div>
            <Divider />
            <div className="home__cardRow bottom" style={{ justifyContent: isSavedPage && 'flex-end' }}>
                {!isSavedPage && <LikeIcon noteData={noteData} user={user} dispatch={dispatch} updateHomePageNote={updateHomePageNote} />}
                <SaveIcon noteData={noteData} user={user} dispatch={dispatch} updateHomePageNote={updateHomePageNote} />
            </div>
        </div>
    )
}

export default Card
