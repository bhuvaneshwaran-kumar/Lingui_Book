import React from 'react'
import { CardHeader, Avatar, Divider } from '@material-ui/core'

function Card({ noteData, innerRef }) {
    return (
        <div ref={innerRef} className="home__card">
            <CardHeader className="home__cardHeader"
                avatar={
                    <Avatar src={`${noteData.createrPhotoURL}`} />
                }
                title={`${noteData?.createrName}`}
                subheader={noteData.createdAt.toDate().toString().slice(0, 10)}
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
        </div>
    )
}

export default Card
