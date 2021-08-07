import React from 'react'
import { CardHeader, Avatar, Divider, IconButton } from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
function Card({ noteData, innerRef }) {
    if (typeof noteData.createdAt !== 'String ')

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
                    <IconButton>
                        <BookmarkBorderIcon />
                    </IconButton>

                </div>
            </div>
        )
}

export default Card
