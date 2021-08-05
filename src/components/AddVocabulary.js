import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'

function AddVocabulary({ isAddVocabularyOpen, handleColseVocabulary }) {


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hiii")
    }


    return (
        <Dialog aria-labelledby="form-dialog-title"
            open={true}
            onClose={handleColseVocabulary}
        >
            <DialogTitle id="form-dialog-title">Add Vocabulary 📑</DialogTitle>
            <form onSubmit={handleSubmit} autoComplete='off' >
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
