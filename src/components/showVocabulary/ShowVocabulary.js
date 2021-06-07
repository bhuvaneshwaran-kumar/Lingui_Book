import React, { useRef, useState } from 'react'
import './ShowVocabulary.css'
import {useHistory} from 'react-router-dom'


function ShowVocabulary({vocabCollection}) {
    const history = useHistory()
    const ref = useRef()


    const sohwSpecificVocabulary = (index)=>{

        history.push(`/show-specific-vocab/${index}`)

    }

    return (
        <div id="vocab-grid">
            {
                 vocabCollection && (
                     vocabCollection.map((vocabDoc,index)=>(
                    <div className={(vocabDoc.data().words.length > 3 )?"vocab-card grid-toll":"vocab-card"} key={vocabDoc.id} onClick={()=>sohwSpecificVocabulary(index)} key={index}>

                        <div className="label" ref={ref}>
                            {vocabDoc.data().label}
                        </div>

                        <div className="words">
                            { vocabDoc.data().words.map((data,index)=>(
                                <li key={index}>{data}</li>
                            ))
                            }
                        </div>

                    </div>
                     ))
                 )
            
            }

            
        </div>
    )
}

export default ShowVocabulary
