import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TextareaAutosize } from '@material-ui/core'

function AddVocabulary({ isAddVocabularyOpen, handleColseVocabulary }) {
    return (
        <form>


            <Dialog aria-labelledby="form-dialog-title"
                open={true}
                onClose={handleColseVocabulary}
            >
                <DialogTitle id="form-dialog-title">Add Vocabulary.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        imporve your vocabulary by publishing in Note Gram.
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter The Word"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Give a Tag"
                        type="text"
                        fullWidth
                    />
                    <TextareaAutosize
                        required
                        style={{ width: '100%', resize: 'none', minHeight: '3rem' }}
                        placeholder="Enter the meaning or reference"
                    />
                    <TextareaAutosize
                        required
                        style={{ width: '100%', resize: 'none', minHeight: '3rem' }}
                        placeholder="Enter the word in sentence"
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
            </Dialog>
        </form>
    )
}

export default AddVocabulary
