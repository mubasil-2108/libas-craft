import { Box, Dialog, DialogContent } from '@mui/material'
import React from 'react'

const ImageDialog = ({ openDialog, handleCloseDialog, ImageId }) => {
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
                    src={`https://www.googleapis.com/drive/v3/files/${ImageId}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
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
