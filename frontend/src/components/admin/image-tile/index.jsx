import { Box, Icon, IconButton, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

const ImageTile = ({imageTile}) => {
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
                onClick={() => console.log('Delete clicked')}
            >
                <Icon component={CloseIcon} sx={{ fontSize: 20, color: '#FF4D4D' }} />
            </IconButton>

            <Box component='img' width={'64px'} height={'64px'}
                src={imageTile.src}
                sx={{
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#000000',
                    opacity: 0.2
                }}
            />
            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '0px 15px' }}>
                <Typography variant='body1' component='p' sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#232321'
                }}>{imageTile.name}</Typography>
                <LinearProgress variant="determinate" value={imageTile.progress} color='inherit' sx={{
                    color: '#003F62',
                    width: '300px',
                    background: '#4A69E2',
                    borderRadius: '8px'
                }} />
            </Box>
            {
                imageTile.status === 'uploaded'?
                <Icon component={CheckCircleIcon} sx={{ color: '#003F62', fontSize: '30px' }} />
                :
                <Icon component={CancelIcon} sx={{ color: '#FF4D4D', fontSize: '30px' }} />
            }
        </Box>
    )
}

export default ImageTile
