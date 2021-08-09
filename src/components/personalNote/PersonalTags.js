import React from 'react'
import '../../css/PersonalNote.css'
function PersonalTags({ tags, setCurretTag, currentTag }) {
    const handleChageCurrentTag = (value) => setCurretTag(value)
    return (
        <div className="personalTags">

            {
                tags.map((tag, index) => (
                    <span
                        className={currentTag === tag ? 'PersonalTag__Value active' : 'PersonalTag__Value'}
                        onClick={() => handleChageCurrentTag(tag)}
                    >
                        {tag}
                    </span>
                ))
            }


        </div>
    )
}

export default PersonalTags
