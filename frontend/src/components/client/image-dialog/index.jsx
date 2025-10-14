import { Box, Dialog, DialogContent } from '@mui/material'
import React from 'react'

const ImageDialog = ({ openDialog, handleCloseDialog, selectedImage }) => {
    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    overflow: "hidden",
                    height: "100%",
                },
            }}
        >
            <DialogContent sx={{ p: 0, overflow: "hidden" }}>
                <Box
                    component="img"
                    src={selectedImage}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}

export default ImageDialog
