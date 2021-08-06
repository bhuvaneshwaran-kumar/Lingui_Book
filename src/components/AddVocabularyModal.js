import React, { useRef, useReducer } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControlLabel, Checkbox, Snackbar } from '@material-ui/core'
import { serverTimeStamp } from '../firebase'
import { useSelector } from 'react-redux'
import useFireStore from '../hooks/useFireStore'



function AddVocabulary({ isAddVocabularyOpen, handleColseVocabulary, setShowSuccessMessage }) {

    const formRef = useRef()

    // 1.Default Value 2.Reducer 3.useReducerHook.
    let errorDefaultValue = {
        word: false,
        tag: false,
        meaning: false,
        meaningLength: 0,
        example: false,
        exampleLength: 0,
    }
    function reducer(state = errorDefaultValue, action) {
        switch (action.type) {
            case 'ERROR_WORD':
                return {
                    ...state,
                    word: true
                }
            case 'ERROR_TAG':
                return {
                    ...state,
                    tag: true
                }
            case 'ERROR_MEANING':
                return {
                    ...state,
                    word: true
                }
            case 'ERROR_EXAMPLE':
                return {
                    ...state,
                    tag: true
                }
            case 'UPDATE_MEANING_LENGTH':
                return {
                    ...state,
                    meaningLength: action.payLoad
                }
            case 'UPDATE_EXAMPLE_LENGTH':
                return {
                    ...state,
                    exampleLength: action.payLoad
                }
            case 'RESET_ERROR':
                return errorDefaultValue

            default:
                return state

        }
    }
    const [errorState, dispatch] = useReducer(reducer, errorDefaultValue)

    //Redux state
    const user = useSelector(store => store.user)

    // Custom Hook
    const { addVocabulary } = useFireStore()

    //handle Reset ErrorState
    const handleOnChange = () => dispatch({ type: 'RESET_ERROR' })

    // handleFormSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        let privacy = formRef.current.privacy.checked ? formRef.current.privacy.value : 'private'
        const data = {
            word: formRef.current.word.value,
            tag: formRef.current.tag.value,
            meaning: formRef.current.meaning.value,
            example: formRef.current.example.value,
            createdAt: serverTimeStamp(),
            uid: user.uid,
            createrName: user.name,
            createrPhotoURL: user.photoURL,
            privacyType: privacy
        }

        if (data.word === '') return dispatch({ type: 'ERROR_WORD' })
        if (data.tag === '') return dispatch({ type: 'ERROR_TAG' })
        if (data.meaning === '') return dispatch({ type: 'ERROR_MEANING' })
        if (data.example === '') return dispatch({ type: 'ERROR_EXAMPLE' })


        addVocabulary(data)
            .then((docs) => {
                data.docId = docs.id
                console.table(data)
                // push to redux home page data store.
                handleColseVocabulary()
                setShowSuccessMessage(true)
            })
            .catch(err => console.error(err.message))


    }

    // of meaning and example TextFiels.
    const handleLengthUpdate = (event, type) => {
        const length = event.target.value.length
        dispatch({
            type: type,
            payLoad: length
        })
    }

    return (
        <Dialog aria-labelledby="form-dialog-title"
            open={true}
            onClose={handleColseVocabulary}
            disableBackdropClick
        >
            <DialogTitle id="form-dialog-title">Add Vocabulary 📑</DialogTitle>
            <form onSubmit={handleSubmit} autoComplete='off' ref={formRef} >
                <DialogContent>
                    <DialogContentText >
                        Imporve your vocabulary by publishing in Note Gram.
                    </DialogContentText>
                    <TextField
                        error={errorState.word}
                        autoFocus
                        margin="dense"
                        name="word"
                        label="Enter The Word"
                        type="text"
                        helperText="The word"
                        fullWidth
                        onFocus={handleOnChange}
                    />
                    <TextField
                        error={errorState.tag}
                        margin="dense"
                        name="tag"
                        label="Give a Tag"
                        type="text"
                        fullWidth
                        helperText={`where you heard the word, [ office, playground, travell,..etc]`}
                        onFocus={handleOnChange}
                    />
                    <TextField
                        error={errorState.meaning}
                        margin="dense"
                        name="meaning"
                        label="Enter the meaning of the word"
                        fullWidth
                        multiline
                        helperText={`${errorState.meaningLength} /  max of 200 characters`}
                        rowsMax='10'
                        inputProps={{ maxLength: 200 }}
                        onFocus={handleOnChange}
                        onChange={(e) => handleLengthUpdate(e, 'UPDATE_MEANING_LENGTH')}
                    />

                    <TextField
                        error={errorState.example}
                        fullWidth
                        name="example"
                        multiline
                        label="real time example"
                        helperText={`${errorState.exampleLength} /  max of 100 characters`}
                        inputProps={{ maxLength: 100 }}
                        onFocus={handleOnChange}
                        onChange={(e) => handleLengthUpdate(e, 'UPDATE_EXAMPLE_LENGTH')}
                    />
                    <FormControlLabel
                        value="public"
                        control={<Checkbox name="privacy" defaultChecked color="primary" />}
                        label="public"
                        labelPlacement="end"

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleColseVocabulary} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Post
                    </Button>
                </DialogActions>
            </form>


        </Dialog>

    )
}

export default AddVocabulary
