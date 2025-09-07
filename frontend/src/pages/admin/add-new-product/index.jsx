import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Admin, ImageTile } from '../../../components/admin'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import { imageTilesData } from '../../../services/utils/constants'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react'

const AddProduct = () => {
    const [images, setImages] = useState([]);
    console.log('Images => ', images);
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbRef = useRef(null);

    // const handleImageUpload = (e) => {
    //     const files = Array.from(e.target.files);
    //     if (files.length > 0) {
    //         const newImages = files.map((file) => ({
    //             file,
    //             preview: URL.createObjectURL(file),
    //             name: file.name,
    //             size: file.size,
    //             type: file.type,
    //             lastModified: file.lastModified,
    //         }));
    //         setImages(prev => [...prev, ...newImages]);
    //         setCurrentIndex(0);
    //     }
    // }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                progress: 0,          // start at 0
                status: 'uploading',  // default status
            }));
            setImages((prev) => [...prev, ...newImages]);
            setCurrentIndex(0);

            // 🚀 simulate upload progress (replace with Firebase/Server later)
            newImages.forEach((img, i) => {
                const interval = setInterval(() => {
                    setImages((prev) =>
                        prev.map((item) =>
                            item.name === img.name
                                ? {
                                    ...item,
                                    progress: Math.min(item.progress + 20, 100),
                                    status:
                                        item.progress + 20 >= 100
                                            ? 'uploaded'
                                            : 'uploading',
                                }
                                : item
                        )
                    );
                }, 500);

                // clear when done
                setTimeout(() => clearInterval(interval), 3000);
            });
        }
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));

        // adjust currentIndex if needed
        if (index === currentIndex && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (index === currentIndex && currentIndex === 0 && images.length > 1) {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
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
                                        border: images.length === 0 ? '2px dashed #00000080' : 'none'
                                    }}
                                >
                                    {images.length > 0 ? (
                                        <>
                                            <Box
                                                component='img'
                                                src={images[currentIndex].preview}
                                                alt='Uploaded'
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    borderRadius: '10px'
                                                }}
                                            />
                                            {/* Backward Arrow */}
                                            {images.length > 1 && (
                                                <ArrowBackIosNewIcon
                                                    onClick={handlePrev}
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: '#003F62',
                                                        fontSize: 30,
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: 0.5
                                                    }}
                                                />
                                            )}

                                            {/* Forward Arrow */}
                                            {images.length > 1 && (
                                                <ArrowForwardIosIcon
                                                    onClick={handleNext}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: '#003F62',
                                                        fontSize: 30,
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: 0.5
                                                    }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <Box component='label' htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                                {images.length > 0 && (
                                    <Box sx={{ position: 'relative', width: '100%' }}>
                                        {/* Scrollable Thumbnails */}
                                        <Box
                                            ref={thumbRef}
                                            sx={{
                                                display: 'flex',
                                                gap: { xs: 0.5, sm: 1 },
                                                mt: 1,
                                                overflowX: { xs: 'auto', sm: 'hidden' },
                                                scrollBehavior: 'smooth',
                                                p: 0.5,
                                                flexWrap: { xs: 'wrap', sm: 'nowrap' }, // wrap on small screens
                                            }}
                                        >
                                            {images.map((img, index) => (
                                                <Box
                                                    key={index}
                                                    component='img'
                                                    src={img.preview}
                                                    alt={`Thumbnail ${index}`}
                                                    onClick={() => setCurrentIndex(index)}
                                                    sx={{
                                                        width: { xs: '48px', sm: '60px' },
                                                        height: { xs: '48px', sm: '60px' },
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        border:
                                                            currentIndex === index
                                                                ? '2px solid #003F62'
                                                                : '2px solid transparent',
                                                        transition: '0.2s',
                                                    }}
                                                />
                                            ))}

                                            {/* Add More Button */}
                                            <Box
                                                component='label'
                                                htmlFor='upload-more'
                                                sx={{
                                                    cursor: 'pointer',
                                                    width: { xs: '48px', sm: '60px' },
                                                    height: { xs: '48px', sm: '60px' },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    border: '2px dashed #003F62',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <PhotoOutlinedIcon sx={{ fontSize: { xs: 22, sm: 30 }, color: '#003F62' }} />
                                                <input
                                                    id='upload-more'
                                                    type='file'
                                                    multiple
                                                    accept='image/*'
                                                    onChange={handleImageUpload}
                                                    style={{ display: 'none' }}
                                                />
                                            </Box>
                                        </Box>

                                        {/* Arrows (only on larger screens & if scrollable) */}
                                        {images.length > 5 && (
                                            <>
                                                <ArrowBackIosNewIcon
                                                    onClick={() =>
                                                        thumbRef.current.scrollBy({ left: -100, behavior: 'smooth' })
                                                    }
                                                    sx={{
                                                        display: { xs: 'none', sm: 'block' },
                                                        position: 'absolute',
                                                        left: -10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: '#003F62',
                                                        fontSize: 28,
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: 0.5,
                                                        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                                                    }}
                                                />

                                                <ArrowForwardIosIcon
                                                    onClick={() =>
                                                        thumbRef.current.scrollBy({ left: 100, behavior: 'smooth' })
                                                    }
                                                    sx={{
                                                        display: { xs: 'none', sm: 'block' },
                                                        position: 'absolute',
                                                        right: -10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: '#003F62',
                                                        fontSize: 28,
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: 0.5,
                                                        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            {/* Gallery Images */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', p: 2, overflowX: 'hidden', maxHeight: '500px', gap: 2 }}>
                                {images.length > 0 ? (
                                    images.map((image, index) => (
                                        <ImageTile key={index} imageTile={image} onDelete={() => handleRemoveImage(index)} />
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
