import { Box, Icon, IconButton, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { colors } from '../../../services';

const ImageTile = ({ imageTile,apiData, onDelete, }) => {
    return (
        <Box component='div' sx={{
            background: '#FAFAFA',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'space-between',
            p: '15px 15px',
            borderRadius: '10px'
        }}>
            <IconButton
                size="small"
                sx={{
                    position: 'absolute',
                    top: -10,
                    right: -1,
                    zIndex: 1,
                    background: '#ffffff',
                    boxShadow: '0px 1px 4px rgba(0,0,0,0.2)',
                    '&:hover': {
                        background: '#f5f5f5',
                    },
                }}
            >
                <Icon component={CloseIcon} onClick={() => onDelete()} sx={{ fontSize: 20, color: '#FF4D4D' }} />
            </IconButton>

            <Box component='img' width={'70px'} height={'70px'}
                src={imageTile ? imageTile.preview : `https://www.googleapis.com/drive/v3/files/${apiData?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                sx={{
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#000000',
                    opacity: imageTile && imageTile.progress < 100 ? 0.5 : 1, 
                    transition: 'opacity 0.3s ease',
                }}
            />
            <Box component='div' sx={{ display: 'flex', width: '300px', flexDirection: 'column', gap: 2, p: '0px 15px' }}>
                <Typography variant='body1' component='p' sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#232321'
                }}>{imageTile ? imageTile.name : apiData?.name}</Typography>
                <LinearProgress variant="determinate" value={imageTile ? imageTile.progress : 100} color='inherit' sx={{
                    color: colors.primary,
                    // width: '300px',
                    // minWidth:'200px',
                    background: '#4A69E2',
                    borderRadius: '8px'
                }} />
            </Box>
            {
                 imageTile?.status || apiData?.status === 'uploaded' ?
                    <Icon component={CheckCircleIcon} sx={{ color: colors.primary, fontSize: '30px' }} />
                    :
                    <Icon component={CancelIcon} sx={{ color: '#FF4D4D', fontSize: '30px' }} />
            }
        </Box>
    )
}

export default ImageTile
