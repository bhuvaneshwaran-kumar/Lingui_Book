import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../css/HomePage.css'
import useFireStore from '../../hooks/useFireStore'
import Card from '../card/Card'
import NavBarPersonalNote from '../navBar/NavPersonalNote'
import PersonalTags from './PersonalTags'
import Loader from '../Loader'
function PersonalNote() {

    const { getUsersTagPost, getUsersTagPostAfter } = useFireStore()
    const user = useSelector(store => store.user)




    const [isPublic, setIsPublic] = useState(true)
    const [personalTag, setPersonalTag] = useState([])
    const [currentTag, setCurretTag] = useState('')
    const [notesData, setNotesData] = useState([])


    const [hasMore, setHasMore] = useState(true)



    // fetch the data from fireStore based on cursor data passed as a argument.
    function getPaginateddata(doc) {
        getUsersTagPostAfter(isPublic, user.uid, doc)
            .then((docs) => {
                if (docs.docs.length <= 0) return setHasMore(false)
                let data = docs.docs.map(data => ({ id: data.id, ...data.data(), savedSet: [user.uid] }))
                setNotesData(prev => [...prev, ...data])
            })
            .catch(err => console.error(err))
    }



    // intersection Observer for the lastNoteVocabularyElement.
    const observer = useRef();
    const lastNoteVocabularyElmRef = useCallback((Node) => {
        if (observer.current) observer.current.disconnect() // removes the previous elm listener
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                getPaginateddata(notesData[notesData.length - 1])
                // console.log('fetching data....')
            } else {
                // console.log('no more data to fetch || not Intersecting')
                // console.log(loadingPageState.length)
            }
        })
        if (Node) observer.current.observe(Node)
        // eslint-disable-next-line
    }, [notesData.length, hasMore])





    useEffect(() => {
        const getPublicTag = () => {
            // console.log(Object.keys(user)) //Mani fixed it❤🔥.
            setPersonalTag(user.tags)
            setCurretTag(user?.tags[0])
        }
        const getPrivateTag = async () => {
            setPersonalTag(user.privateTags)
            setCurretTag(user.privateTags[0])
        }
        if (user) {
            if (isPublic) {
                getPublicTag()
            } else {
                getPrivateTag()
            }
        }
        // eslint-disable-next-line
    }, [isPublic, user])

    useEffect(() => {
        setNotesData([])
        setHasMore(true)
        if (currentTag !== '') {
            getUsersTagPost(isPublic, user.uid, currentTag).then((docs) => {
                if (docs.docs.length <= 0) return setHasMore(false)
                let data = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                setNotesData(data)
            }).catch(err => console.log(err))
        }

        // eslint-disable-next-line
    }, [currentTag])

    return (
        <div className="PersonalPost">
            <NavBarPersonalNote isPublic={isPublic} setIsPublic={setIsPublic} />
            <PersonalTags tags={personalTag} setCurretTag={setCurretTag} currentTag={currentTag} />
            <div className="home">
                {
                    notesData.map((noteData, index) => {
                        if (notesData.length === index + 1) {
                            return < Card
                                innerRef={lastNoteVocabularyElmRef}
                                key={noteData.id} id={noteData.id} noteData={noteData} isPersonal={true} />
                        } else {
                            return <Card key={noteData.id} id={noteData.id} noteData={noteData} />;
                        }
                    }

                    )
                }
                {
                    hasMore && <Loader />
                }
            </div>
        </div>
    )
}

export default PersonalNote
