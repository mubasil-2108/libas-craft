import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Admin, ImageTile } from '../../../components/admin'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { imageTilesData } from '../../../services/utils/constants';

const ProductDetail = () => {
    const [image, setImage] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
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
                <Grid container spacing={2}>
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6} >
                        <Box component='div' sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                            <Admin.Inputs title={'Product Name'} placeholder={'Lorem Ipsum'} />
                            <Admin.Inputs title={'Description'} placeholder={'Lorem Ipsum Is A Dummy Text'} multiline />
                            <Admin.Inputs title={'Category'} placeholder={'Sneaker'} />
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Admin.Inputs title={'SKU'} placeholder={'#32A53'} style={{ width: '220px' }} />
                                <Admin.Inputs title={'Stock Quantity'} placeholder={'211'} style={{ width: '220px' }} />
                            </Box>
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Admin.Inputs title={'Regular Price'} placeholder={'₹110.40'} style={{ width: '220px' }} />
                                <Admin.Inputs title={'Sale Price'} placeholder={'₹450'} style={{ width: '220px' }} />
                            </Box>
                            <Admin.Tags title={'Tags'} placeholder={'Lorem'} />
                        </Box>
                    </Grid>
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6} >
                        <Box component='div' sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: '7px 10px',
                            gap: 3,
                        }}>
                            <Box component='div' sx={{
                                minWidth: '457px',
                                minHeight: '444px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#FAFAFA',
                                borderRadius: '10px',
                                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.20)'
                            }} >
                                {/* <Box component='div' sx={{ m: '7px 7px', width: '457px', minHeight: '444px', background: '#000000', borderRadius: '10px', display: 'flex', opacity: 0.2, justifyContent: 'center', alignItems: 'center' }} /> */}
                                <Box component='img' src='/watch.jpg' sx={{ objectFit: 'cover', m: '7px 7px', width: '457px', minHeight: '444px', background: '#000000', borderRadius: '10px', display: 'flex', opacity: 0.2, justifyContent: 'center', alignItems: 'center' }} />

                            </Box>
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Typography variant='body1' component='p' sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>Product Gallery</Typography>

                                <Box
                                    component="div"
                                    sx={{
                                        minWidth: '457px',
                                        minHeight: '164px',
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
                                            component="img"
                                            src={image}
                                            alt="Uploaded"
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '10px'
                                            }}
                                        />
                                    ) : (
                                        <label htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box component='div' sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 3
                                            }}>
                                                <PhotoOutlinedIcon sx={{ fontSize: 50, color: '#003F62' }} />
                                                <Typography component='p' sx={{ fontSize: '16px', textAlign: 'center', fontWeight: 500, color: '#70706E' }}>
                                                    Drop your imager here, or browse <br />
                                                    Jpeg, png are allowed
                                                </Typography>
                                            </Box>
                                            <Box component='input'
                                                id="upload-image"
                                                type="file"
                                                accept="image/*"
                                                // onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    )}
                                </Box>
                            </Box>
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {
                                    imageTilesData.length > 0 ?
                                        imageTilesData.map((imageTile) => (
                                            <ImageTile key={imageTile.id} imageTile={imageTile} />
                                        ))
                                        :
                                        <Typography variant='body1' component='p' sx={{
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#232321',
                                        }}>No Images Found</Typography>
                                }
                            </Box>

                            <Box component='div' sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Button variant='contained' sx={{
                                    minWidth: '150px',
                                    background:'#232321'
                                }} >Update</Button>
                                <Button variant='contained' sx={{
                                    minWidth: '150px',
                                    background:'#003F62'
                                }} >Delete</Button>
                                <Button variant='outlined' sx={{
                                    minWidth: '150px',
                                    borderColor: '#232321',
                                    color:'#232321'
                                }} >Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductDetail
