import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Admin, ImageTile } from '../../../components/admin'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct } from '../../../store/slices/productSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../services';

const initialState = {
    productName: '',
    productDescription: '',
    category: '',
    images: [],
    sku: '',
    stockQuantity: '',
    regularPrice: '',
    salePrice: '',
    tags: []
};

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.product);
    const [formData, setFormData] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbRef = useRef(null);

    const handleImageUpload = useCallback((e) => {
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
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));
            setCurrentIndex(0);

            // 🚀 simulate upload progress (replace with Firebase/Server later)
            newImages.forEach((img, i) => {
                const interval = setInterval(() => {
                    setFormData((prev) => ({
                        ...prev,
                        images: prev.images.map((item) =>
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
                        ),
                    }));
                }, 500);

                // clear when done
                setTimeout(() => clearInterval(interval), 3000);
            });
        }
    }, [])

    const handleRemoveImage = useCallback((index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

        // adjust currentIndex if needed
        if (index === currentIndex && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (index === currentIndex && currentIndex === 0 && formData.images.length > 1) {
            setCurrentIndex(0);
        }
    }, [currentIndex, formData.images.length])

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? formData.images.length - 1 : prevIndex - 1
        )
    }, [formData.images.length])

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === formData.images.length - 1 ? 0 : prevIndex + 1
        )
    }, [formData.images.length])

    const handleCreate = useCallback(async () => {
        const form = new FormData();
        form.append("productName", formData.productName);
        form.append("productDescription", formData.productDescription);
        form.append("category", formData.category);
        form.append("sku", formData.sku);
        form.append("stockQuantity", formData.stockQuantity);
        form.append("regularPrice", formData.regularPrice);
        form.append("salePrice", formData.salePrice);
        formData.tags.forEach(tag => form.append("tags[]", tag));

        // append files
        formData.images.forEach((img) => {
            form.append("images", img.file);  // 👈 actual File object
        });


        await dispatch(addNewProduct(form)).then((data) => {
            if (data?.type !== 'product/add-new-product/rejected') {
                toast.success(data?.payload?.message);
                setFormData(initialState);
                setCurrentIndex(0);
            } else {
                toast.error(data?.payload || 'Failed to add product');
            }
        }).catch((error) => {
            toast.error(error?.message || 'Failed to add product');
        });
    }, [dispatch, formData])

    const handleCancel = useCallback(() => {
        navigate('/admin/products');
    }, [navigate]);

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
                            <Admin.Inputs
                                value={formData.productName}
                                onChange={
                                    (e) => setFormData({ ...formData, productName: e.target.value })
                                }
                                title='Product Name'
                                placeholder='Lorem Ipsum' />
                            <Admin.Inputs
                                value={formData.productDescription}
                                onChange={
                                    (e) => setFormData({ ...formData, productDescription: e.target.value })
                                }
                                title='Description'
                                placeholder='Lorem Ipsum Is A Dummy Text'
                                multiline />
                            <Admin.Inputs
                                value={formData.category}
                                onChange={
                                    (e) => setFormData({ ...formData, category: e.target.value })
                                }
                                title='Category'
                                placeholder='Sneaker' />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs
                                    value={formData.sku}
                                    onChange={
                                        (e) => setFormData({ ...formData, sku: e.target.value })
                                    }
                                    title='SKU'
                                    placeholder='#32A53'
                                    style={{ flex: 1 }} />
                                <Admin.Inputs
                                    value={formData.stockQuantity}
                                    onChange={
                                        (e) => setFormData({ ...formData, stockQuantity: e.target.value })
                                    }
                                    title='Stock Quantity'
                                    placeholder='211'
                                    style={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs
                                    value={formData.regularPrice}
                                    onChange={
                                        (e) => setFormData({ ...formData, regularPrice: e.target.value })
                                    }
                                    title='Regular Price'
                                    placeholder='₹110.40'
                                    style={{ flex: 1 }} />
                                <Admin.Inputs
                                    value={formData.salePrice}
                                    onChange={
                                        (e) => setFormData({ ...formData, salePrice: e.target.value })
                                    }
                                    title='Sale Price'
                                    placeholder='₹450'
                                    style={{ flex: 1 }} />
                            </Box>
                            <Admin.Tags
                                value={formData.tags}
                                onChange={
                                    (newTags) => setFormData({ ...formData, tags: newTags })
                                }
                                title='Tags'
                                placeholder='Lorem' />
                        </Box>
                    </Grid>

                    {/* Right: Image Preview and Gallery */}
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                display: 'flex',
                                position: 'relative',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#FAFAFA',
                                borderRadius: '10px',
                                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.20)'
                            }}>
                                <Box
                                    component='img'
                                    src={formData.images.length > 0 ? formData.images[currentIndex].preview : '/watch.jpg'} // Placeholder if no image
                                    alt='Preview'
                                    sx={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '10px',
                                        opacity: 1
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
                                        border: formData.images.length === 0 ? '2px dashed #00000080' : 'none'
                                    }}
                                >
                                    {formData.images.length > 0 ? (
                                        <>
                                            <Box
                                                component='img'
                                                src={formData.images[currentIndex].preview}
                                                alt='Uploaded'
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    borderRadius: '10px'
                                                }}
                                            />
                                            {/* Backward Arrow */}
                                            {formData.images.length > 1 && (
                                                <ArrowBackIosNewIcon
                                                    onClick={handlePrev}
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: colors.primary,
                                                        fontSize: 30,
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: 0.5
                                                    }}
                                                />
                                            )}

                                            {/* Forward Arrow */}
                                            {formData.images.length > 1 && (
                                                <ArrowForwardIosIcon
                                                    onClick={handleNext}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: colors.primary,
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
                                                <PhotoOutlinedIcon sx={{ fontSize: 50, color: colors.primary }} />
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
                                {formData.images.length > 0 && (
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
                                            {formData.images.map((img, index) => (
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
                                                                ? `2px solid ${colors.primary}`
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
                                                    border: `2px dashed ${colors.primary}`,
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <PhotoOutlinedIcon sx={{ fontSize: { xs: 22, sm: 30 }, color: colors.primary }} />
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
                                        {formData.images.length > 5 && (
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
                                                        color: colors.primary,
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
                                                        color: colors.primary,
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
                                {formData.images.length > 0 ? (
                                    formData.images.map((image, index) => (
                                        <ImageTile key={index} imageTile={image} onDelete={() => handleRemoveImage(index)} />
                                    ))
                                ) : (
                                    <Typography fontSize={16} fontWeight={600} color='#232321'>No Images Found</Typography>
                                )}
                            </Box>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Button variant='contained' loading={isLoading} disabled={isLoading} onClick={handleCreate} sx={{
                                    minWidth: 200, background: colors.primary,
                                    '& .MuiCircularProgress-root': {
                                        color: colors.primary, // 👈 your custom loader color
                                    },
                                }}>Create</Button>
                                <Button variant='outlined' disabled={isLoading} onClick={handleCancel} sx={{ minWidth: 200, borderColor: '#232321', color: '#232321' }}>Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AddProduct
