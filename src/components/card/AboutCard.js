import { Avatar, CardHeader, Divider, Tooltip } from '@material-ui/core';
import React from 'react';


function AboutCard({ noteData }) {

    let createdAtLocal = noteData.createdAtLocal

    return (
        <div className="home__card">
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
                <p className="home__cardRow__heading one">Why Lungui Book.</p>
                <pre>{noteData.word}</pre>
            </div>
            <Divider variant='middle' />
        </div>
    )
}

export default AboutCard
