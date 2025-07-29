import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Admin, ImageTile } from '../../../components/admin'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import { imageTilesData } from '../../../services/utils/constants'

const AddProduct = () => {
  const [image, setImage] = useState(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(URL.createObjectURL(file))
        }
    }

    return (
        <Box component='div' sx={{
            width: '100%',
            m: '15px 15px',
            display: 'flex',
            flexDirection: 'column',
            // position: 'fixed'
        }}>
            <Box component='div' sx={{
                width: '95%',
                background: '#FFFFFF',
                display: 'flex',
                p: '20px 20px',
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                <Grid container spacing={3}>
                    {/* Left Inputs */}
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Admin.Inputs title='Product Name' placeholder='Lorem Ipsum' />
                            <Admin.Inputs title='Description' placeholder='Lorem Ipsum Is A Dummy Text' multiline />
                            <Admin.Inputs title='Category' placeholder='Sneaker' />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs title='SKU' placeholder='#32A53' style={{ flex: 1 }} />
                                <Admin.Inputs title='Stock Quantity' placeholder='211' style={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs title='Regular Price' placeholder='₹110.40' style={{ flex: 1 }} />
                                <Admin.Inputs title='Sale Price' placeholder='₹450' style={{ flex: 1 }} />
                            </Box>
                            <Admin.Tags title='Tags' placeholder='Lorem' />
                        </Box>
                    </Grid>

                    {/* Right: Image Preview and Gallery */}
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#FAFAFA',
                                borderRadius: '10px',
                                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.20)'
                            }}>
                                <Box
                                    component='img'
                                    src='/watch.jpg'
                                    alt='Preview'
                                    sx={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '10px',
                                        opacity: 0.2
                                    }}
                                />
                            </Box>

                            {/* Product Gallery */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Typography variant='body1' fontWeight='bold' fontSize={20}>Product Gallery</Typography>

                                <Box
                                    sx={{
                                        width: '100%',
                                        height: { xs: 180, sm: 220 },
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background: '#FAFAFA',
                                        borderRadius: '10px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: !image ? '2px dashed #00000080' : 'none'
                                    }}
                                >
                                    {image ? (
                                        <Box
                                            component='img'
                                            src={image}
                                            alt='Uploaded'
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '10px'
                                            }}
                                        />
                                    ) : (
                                        <label htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 2
                                            }}>
                                                <PhotoOutlinedIcon sx={{ fontSize: 50, color: '#003F62' }} />
                                                <Typography textAlign='center' fontSize={16} fontWeight={500} color='#70706E'>
                                                    Drop your image here, or browse<br />
                                                    JPEG, PNG are allowed
                                                </Typography>
                                            </Box>
                                            <input
                                                id="upload-image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    )}
                                </Box>
                            </Box>

                            {/* Gallery Images */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {imageTilesData.length > 0 ? (
                                    imageTilesData.map(imageTile => (
                                        <ImageTile key={imageTile.id} imageTile={imageTile} />
                                    ))
                                ) : (
                                    <Typography fontSize={16} fontWeight={600} color='#232321'>No Images Found</Typography>
                                )}
                            </Box>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Button variant='contained' sx={{ minWidth: 200, background: '#003F62' }}>Create</Button>
                                <Button variant='outlined' sx={{ minWidth: 200, borderColor: '#232321', color: '#232321' }}>Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AddProduct
