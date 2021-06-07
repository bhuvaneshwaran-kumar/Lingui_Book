import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import "../addVocabulary/AddVocabulary.css"
import {UserContext} from '../../context/UserContext'

function EditVocabulary({vocabCollection,index,setEditStatus}) {
    // const history = useHistory()
    // const [user]= useContext(UserContext)
    const [existLabel,setExistLabel] = useState(null)
    const [loader,setLoader] = useState(false)
    const form = useRef()
    return (
        <div >
            {
                // loader && <LinearIndeterminate/>
            }
            <form id="form-add-vocab" ref={form}  autoComplete="off">
             
                <input type="text" autoComplete="off" placeholder="Enter Your Label" list="labels" name="label"  required value = {vocabCollection.data().label}/>
                
                <datalist id="labels" style={{width:'100px'}}>
                        {
                            existLabel && 
                            existLabel.map((value,indes)=> <option  id="label"  value={value} key={indes}/>)
                        }
                       
                        
                </datalist>

                <input autoComplete="off" type="text" placeholder="Enter The Word" name="word" required/>
                <textarea name='meaning' autoComplete="off" type="text" placeholder="Enter The Meaning and reference" required/>
                <button>
                    Submit
                </button>
                
            </form>
        </div>
    )
}

export default EditVocabulary
