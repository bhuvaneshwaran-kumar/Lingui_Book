import React, { useCallback, useRef } from 'react'
import { useEffect, useState } from 'react'
import useFireStore from '../hooks/useFireStore'
import '../css/HomePage.css'
import Card from '../components/card/Card'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
function SavedPage() {

    const { getUserSavedList, getUserSavedListAfter } = useFireStore()

    const user = useSelector(store => store.user)

    const [loadingPageState, setLoadingPageState] = useState([])


    const [hasMore, setHasMore] = useState(true)

    // convert firebase timeStamp to readable format
    const convertTimeStamp = (data) => data.map(data => ({
        ...data,
        createdAtLocal: data.createdAt.toDate()?.toString()?.slice(0, 16)
    }))

    // fetch the data from fireStore based on cursor data passed as a argument.
    function getPaginateddata(doc) {
        getUserSavedListAfter(user.uid, doc)
            .then((docs) => {
                if (docs.docs.length <= 0) return setHasMore(false)
                let data = docs.docs.map(data => ({ id: data.id, ...data.data(), savedSet: [user.uid] }))
                // data = convertTimeStamp(data)
                setLoadingPageState(prev => [...prev, ...data])
            })
            .catch(err => console.error(err))
    }



    //intersection Observer for the lastNoteVocabularyElement.
    const observer = useRef();
    const lastNoteVocabularyElmRef = useCallback((Node) => {
        if (observer.current) observer.current.disconnect() // removes the previous elm listener
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                getPaginateddata(loadingPageState[loadingPageState.length - 1])
                // console.log('fetching data....')
            } else {
                // console.log('no more data to fetch || not Intersecting')
                // console.log(loadingPageState.length)
            }
        })
        if (Node) observer.current.observe(Node)
        // eslint-disable-next-line
    }, [loadingPageState.length, hasMore])



    useEffect(() => {
        getUserSavedList(user.uid)
            .then((docs) => {
                // console.log(docs.docs)
                if (docs.docs.length <= 0) return setHasMore(false)
                let data = docs.docs.map(data => ({ id: data.id, ...data.data(), savedSet: [user.uid] }))
                // data = convertTimeStamp(data)

                setLoadingPageState(prev => [...prev, ...data])

            })
            .catch(err => console.error(err))
        // eslint-disable-next-line
    }, [])



    return (
        <div className="home">
            {
                loadingPageState.map((noteData, index) => {
                    if (loadingPageState.length === index + 1) {
                        return < Card innerRef={lastNoteVocabularyElmRef} key={noteData.id} id={noteData.id} noteData={noteData} isSavedPage={true} />
                    } else {
                        return <Card key={noteData.id} id={noteData.id} noteData={noteData} isSavedPage={true} />;
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

export default SavedPage
