import './ShowSpecificVocabulary.css'
import React, { useRef, useState } from 'react'
import {Route, useHistory, useParams} from 'react-router-dom'
import {Edit,Delete} from '@material-ui/icons'
import EditVocabulary from '../editVocabulary/EditVocabulary'
import { Link } from '@material-ui/core'

function ShowSpecificVocabulary({vocabCollection}) {
    const history = useHistory()
    const {vocabIndex} = useParams()
    const [datas,setDatas] = useState(vocabCollection[vocabIndex].data())
    const [editStatus,setEditStatus] = useState(false)
    const [editIndex,setEditIndex] = useState(null)
    console.log(datas)
    const view = useRef()


    const borderColor = ['#ff6363','#e94560','#ff0000','#ffd700','#b55400','#a7d129','#ff6c00','#14ffec','#17b794','#f6c90e','#bef992','#ff004d']

    const bgColor = ['#353941','#343434','#055e68','#4c5f7a','#254b62','#414141','#353941','#343434','#055e68','#4c5f7a','#254b62','#414141','#353941','#343434','#055e68','#4c5f7a','#254b62','#414141','#353941','#343434','#055e68','#4c5f7a','#254b62','#414141','#353941','#343434','#055e68','#4c5f7a','#254b62','#414141','#353941','#343434','#055e68','#4c5f7a','#254b62','#414141']

    const scrollToView = (index)=>{
        console.log(index)
        console.log(view.current.children)
       view.current.children[index].scrollIntoView()
    }

    let bc,bg;
    const returnBorderColor = ()=>{
        let randomIndex = Math.floor(Math.random() * (borderColor.length-1));

        if(bc === randomIndex){
            randomIndex = (randomIndex === (bgColor.length-1))? 0 : randomIndex + 1
        }
    
        bc = randomIndex
        return borderColor[randomIndex] 
    }

    const returnBgColor = ()=>{
    let randomIndex = Math.floor(Math.random() * (bgColor.length-1));

    if(bg === randomIndex){
        randomIndex = (randomIndex === (bgColor.length-1))? 0 : randomIndex + 1
    }

    bg = randomIndex
    return bgColor[randomIndex]
    }


    const editVocabulary = (index)=>{
        setEditStatus(true)
        setEditIndex(index)
        history.push(`/show-specific-vocab/${vocabIndex}/edit-vocab`)
    }
    // console.log(datas.meaning[3].split('\n'))


    return (
      <div className="ShowSpecificVocabulary">
                <h3>{datas.label}</h3>
                <div className="specific-words">
                    {
                        datas.words.map((data,index)=>(
                            <li
                            key={index}
                            onClick={
                                ()=>scrollToView(index)
                            }
                            style={{
                                border : `1px solid ${returnBorderColor()}`
                            }}

                            >{data}</li>
                        ))
                    }
                </div>

{ !editStatus ? (                 
                <div className="specific-word-meaning" ref={view}>
                    { 
                    datas.meaning.map((data,index)=>(
                    <div className={(data.split('\n').length > 3)?"row span-inc":"row"} key={index}
                        style={{
                            backgroundColor : `${returnBgColor()}`
                        }}
                    >
                        <div className="top">
                        <li >{datas.words[index]}</li>
                        <div className="alter-voc">
                            <Edit className="edit"
                            // onClick={()=>editVocabulary(index)}
                            />
                            <Delete className="delete"/>
                        </div>
                        </div>
                        
                        {
                            data.split('\n').map((individualLine)=>(
                                <p>{individualLine}</p>
                            ))
                        }
                       
                        {/* <pre>{data}</pre> */}
                        
                    </div>
                    ))
                    
                    }
                </div>
    
    ):
            <Route path="/edit-vocab">
              <EditVocabulary vocabCollection={vocabCollection[vocabIndex]} 
              setEditStatus={setEditStatus}
              index = {editIndex}
              />
            </Route>
                }
              </div>
    )
}

export default ShowSpecificVocabulary
