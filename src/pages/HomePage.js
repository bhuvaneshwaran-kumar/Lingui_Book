import React, { useCallback, useRef } from 'react'
import { useEffect, useState } from 'react'
import useFireStore from '../hooks/useFireStore'
import '../css/HomePage.css'
import Card from '../components/card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { updateHomePageByAppend } from '../actions/index'
import Loader from '../components/Loader'
function HomePage() {

    const { getPublicNotes, getPublicNotesAfter } = useFireStore()

    const homePageState = useSelector(store => store.homePage)

    const dispatch = useDispatch()

    const [hasMore, setHasMore] = useState(true)

    // fetch the data from fireStore based on cursor data passed as a argument.
    function getPaginateddata(doc) {
        getPublicNotesAfter(doc)
            .then((docs) => {
                if (docs.docs.length <= 0) return setHasMore(false)
                let data = docs.docs.map(data => ({ id: data.id, ...data.data() }))
                dispatch(updateHomePageByAppend(data))
            })
    }



    //intersection Observer for the lastNoteVocabularyElement.
    const observer = useRef();
    const lastNoteVocabularyElmRef = useCallback((Node) => {
        if (observer.current) observer.current.disconnect() // removes the previous elm listener
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                getPaginateddata(homePageState[homePageState.length - 1])
                // console.log('fetching data....')
            } else {
                // console.log('no more data to fetch || not Intersecting')
                // console.log(homePageState.length)
            }
        })
        if (Node) observer.current.observe(Node)
        // eslint-disable-next-line
    }, [homePageState.length, hasMore])


    useEffect(() => {
        if (homePageState.length === 0) {
            getPublicNotes()
                .then((docs) => {
                    if (docs.docs.length <= 0) return setHasMore(false)
                    let data = docs.docs.map(data => ({ id: data.id, ...data.data() }))
                    dispatch(updateHomePageByAppend(data))
                })
                .catch(err => alert(err.message))
        }

        // eslint-disable-next-line
    }, [])



    return (
        <div className="home">
            {
                homePageState.map((noteData, index) => {
                    if (homePageState.length === index + 1) {
                        return < Card
                            innerRef={lastNoteVocabularyElmRef} key={noteData.id} id={noteData.id} noteData={noteData} />
                    } else {
                        return <Card key={noteData.id} id={noteData.id} noteData={noteData} />
                    }
                }

                )
            }
            {
                hasMore && <Loader />
            }
        </div>
    )
}

export default HomePage
