import React,{useContext, useEffect, useState,useRef} from 'react'
import './AddVocabulary.css'
import firebase from 'firebase'
import {db} from '../../firebase'
import {UserContext} from '../../context/UserContext'
 

function AddVocabulary() {
    const [user]= useContext(UserContext)
    const [existLabel,setExistLabel] = useState(null)
    const form = useRef()
  

    useEffect(()=>{
        // const ref = db.collection(`user`)

        
        // const data = {
        //     userId:user.uid,
        //     name:'bhuvi',
        //     regNo:'18BCS0034',
         //     createdAt : firebase.firestore.FieldValue.serverTimestamp()
        // }
        // ref.add(data)
       
        // let unsubscribe = ref.where('name','==','bhuvan').orderBy('createdAt','desc').onSnapshot((snapshot)=>{
        //     // console.log(snapshot)
        //     let data = snapshot.docs.map((doc)=>doc.data());

        //     console.log(data)
        // })

      
        // ref.doc("1ApQkzrTU4OtQ0bzNm5N")
        // .delete({
        //     regNos : '18BCS0034'
        // })



        // ref.where('userId','==',user.uid)
        //     .get().then((snapshot)=>{
        //         console.log(snapshot.docs.length)
        //     })
        //         // console.log(check)
            
        
        // return ()=> {unsubscribe && unsubscribe();
        // console.log("unsubscribed....")
        // }
    },[])

    // ----> Fetch the exist label of the user 👷‍♂️👷‍♂️
    const fetchExistLabel = (e)=>{
    // ----> Only makes the request if the state of existLabel is 0 💡💡 
    console.log("you Clicked...")
        if(!existLabel){
        db.collection('user').doc(user.uid).get().then((snapshot)=>{
            const data = snapshot.data()
            console.log(data)

            if(JSON.stringify(data) !== '{}'){
                setExistLabel(data.labelName)
            }else{
                setExistLabel([])
            }

            // setExistLabel(data.labelName)
        })
        console.log(existLabel)
        }

    }

    // ----> Add the Data to the firestore 🔥🔥
    const formSubmit = async(e)=>{
        e.preventDefault() // stops the default execution of submit form.

        let formLabel = form.current.label.value
        let formWord = form.current.word.value
        let formMeaning = form.current.meaning.value

        if( existLabel && existLabel.includes( formLabel )){
            // label is already exist need to update the data

            const vocabularyRef = db.collection('add-vocabulary')

            try{
                // get the previous doc
                const result = await vocabularyRef.where('label','==',formLabel).where('uid','==',user.uid).get()

                const Id = result.docs[0].id
                const data = result.docs[0].data()
                
                //push the new data to the previous data.
                data.words.push(formWord)
                data.meaning.push(formMeaning)

                //update the doc
                vocabularyRef.doc(Id).update(data)
                .then(()=>{
                    form.current.label.value = ''
                    form.current.word.value = ''
                    form.current.meaning.value = ''
                })
                .catch((err)=>console.log(err))

            }
            catch(err){
                console.log(err)
            }
            
        }else{
            // label is not already exist
            let ref = db.collection('add-vocabulary') // Reference to add-vocabulary collections.
            let data = {
                uid : user.uid,
                label : formLabel,
                words : [formWord],
                meaning : [formMeaning]
            }
            // adding the data || Doc to the add-vocabulary collections.
            ref.add(data)
            .then((data)=>{
                console.log("added doc id :",data.id)
                //  the data is successfully added in the add-vocabulary collections.
                // Now we need to update the user's LabelName array list😎😎😎.

                // 🚀🚀🚀🚀 I created a document with user id in user collection inside it has the user label data
                const existUserLabel = db.collection(`user`).doc(user.uid)

                existUserLabel.update({
                    labelName: firebase.firestore.FieldValue.arrayUnion(form.current.label.value)
                }).then((data)=>{
                    form.current.label.value = ''
                    form.current.word.value = ''
                    form.current.meaning.value = ''
                    setExistLabel((prev)=>[...prev,formLabel])
                })
                .catch((err)=>console.log(err))

            })
            .catch((err)=>console.log(err))

        }
    }

    return (
        <div >
            <form id="form-add-vocab" ref={form} onSubmit={formSubmit}>
             
                <input type="text" autoComplete="off" placeholder="Enter Your Label" list="labels" name="label" onChange={fetchExistLabel} required/>
                
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

export default AddVocabulary
