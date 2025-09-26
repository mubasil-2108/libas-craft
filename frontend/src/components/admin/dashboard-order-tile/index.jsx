import { Box, Icon, IconButton, Typography } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import React from 'react'

const DashboardOrderTile = ({ title, amount, percentage, lastMonth }) => {
    return (
        <Box component='div' sx={{
            // width: '100%',
            minWidth: '220px',
            padding: '20px',
            backgroundColor: '#FAFAFA',
            borderRadius: '15px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Box component='div' sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography component='h3' sx={{
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}>{title}</Typography>
                        <IconButton  sx={{ color: '#000000' }}><Icon fontSize='small' component={MoreVertOutlinedIcon} /></IconButton>

                </Box>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
                        <Box component='div' sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40px',
                            width: '40px',
                            borderRadius: '10px',
                            background: '#003F62'
                        }}>
                            <Icon fontSize='medium' sx={{ color: '#FFFFFF' }} component={LocalMallOutlinedIcon} />
                        </Box>
                        <Typography variant='h4' sx={{ color: '#000000', fontSize: '16px', fontWeight: 'bold', ml: 1 }}>Rs.{amount}</Typography>
                    </Box>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                        <Icon fontSize='inherit' sx={{ color: '#232321', fontSize: '14px' }} component={ArrowUpwardOutlinedIcon} />
                        <Typography variant='body1' sx={{ color: '#000000', fontSize: '14px', fontWeight: 600 }}>{percentage}%</Typography>
                    </Box>
                </Box>
                <Typography component='p' sx={{ color: '#000000', alignSelf: 'end', opacity: 0.7, fontSize: '12px' }}>{lastMonth}</Typography>
            </Box>
        </Box>
    )
}

export default DashboardOrderTile
