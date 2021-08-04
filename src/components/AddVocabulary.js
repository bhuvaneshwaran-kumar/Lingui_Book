import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'

function AddVocabulary({ isAddVocabularyOpen, handleColseVocabulary }) {
    return (
        <Dialog aria-labelledby="form-dialog-title"
            open={isAddVocabularyOpen}
            onClose={handleColseVocabulary}
        >
            <DialogTitle id="form-dialog-title">Add Vocabulary.</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    imporve your vocabulary by publishing in Note Gram.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleColseVocabulary} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleColseVocabulary} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddVocabulary
