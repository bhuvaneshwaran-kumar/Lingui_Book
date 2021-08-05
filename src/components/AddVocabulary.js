import React, { useRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { serverTimeStamp } from '../firebase'
import { useSelector } from 'react-redux'
import useFireStore from '../hooks/useFireStore'

function AddVocabulary({ isAddVocabularyOpen, handleColseVocabulary }) {

    const formRef = useRef()

    const user = useSelector(store => store.user)

    const { addVocabulary } = useFireStore()

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
        addVocabulary(data)
            .then((docs) => {
                data.docId = docs.id
                console.table(data)
                // push to redux home page data store.
                handleColseVocabulary()
            })
            .catch(err => console.error(err.message))


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
                    <DialogContentText>
                        imporve your vocabulary by publishing in Note Gram.
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="word"
                        label="Enter The Word"
                        type="text"
                        helperText="the word"
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        name="tag"
                        label="Give a Tag"
                        type="text"
                        fullWidth
                        helperText="the tag"

                    />
                    <TextField
                        required
                        margin="dense"
                        name="meaning"
                        label="Enter the meaning of the word"
                        fullWidth
                        multiline
                        helperText="the meaning"
                    />

                    <TextField
                        required
                        fullWidth
                        name="example"
                        multiline
                        label="real time example"
                        helperText="Real time example."
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
