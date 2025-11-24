import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Admin, ImageTile } from '../../../components/admin'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { deleteProduct, deleteProductImage, getProductById, updateProduct } from '../../../store/slices/productSlice';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { colors } from '../../../services';

const initialState = {
    productName: '',
    productDescription: '',
    productExtraDetails: '',
    productDetails: [],
    productBenefits: [],
    category: '',
    images: [],
    sku: '',
    stockQuantity: '',
    regularPrice: '',
    salePrice: '',
    sizes: [],
    tags: []
};

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, selectedProduct } = useSelector((state) => state.product);
    const [formData, setFormData] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isImageDeleting, setIsImageDeleting] = useState(false);

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
    };

    useEffect(() => {
        const fetchProductById = async () => {
            // Dispatch an action to fetch product by ID
            await dispatch(getProductById(id))
                .catch((error) => {
                    console.error(error?.message || 'Failed to fetch product by ID');
                });
        }
        fetchProductById();
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                productName: selectedProduct?.productName || '',
                productDescription: selectedProduct?.productDescription || '',
                productExtraDetails: selectedProduct?.productExtraDetails || '',
                category: selectedProduct?.category || '',
                sku: selectedProduct?.sku || '',
                stockQuantity: selectedProduct?.stockQuantity?.toString() || '',
                regularPrice: selectedProduct?.regularPrice?.toString() || '',
                salePrice: selectedProduct?.salePrice?.toString() || '',
                tags: selectedProduct?.tags || [],
                productDetails: selectedProduct?.productDetails || [],
                productBenefits: selectedProduct?.productBenefits || [],
                sizes: selectedProduct?.sizes || [],
                images: [],
            });
        }
    }, [selectedProduct]);

    const allImages = useMemo(() => [
        ...(selectedProduct?.productPhoto || []),
        ...(formData.images || []),
    ], [selectedProduct?.productPhoto, formData.images])

    const handleUpdate = async () => {
        // Implement update logic here
        setIsUpdating(true);
        const form = new FormData();
        form.append("productName", formData.productName);
        form.append("productDescription", formData.productDescription);
        form.append("productExtraDetails", formData.productExtraDetails);
        formData.productDetails.forEach(detail => form.append("productDetails[]", detail));
        formData.productBenefits.forEach(benefit => form.append("productBenefits[]", benefit));
        form.append("category", formData.category);
        form.append("sku", formData.sku);
        form.append("stockQuantity", formData.stockQuantity);
        form.append("regularPrice", formData.regularPrice);
        form.append("salePrice", formData.salePrice);
        formData.sizes.forEach(size => form.append("sizes[]", size));
        formData.tags.forEach(tag => form.append("tags[]", tag));

        // append files
        formData.images.forEach((img) => {
            form.append("images", img.file);  // 👈 actual File object
        });
        await dispatch(updateProduct({ id, formData: form })).then(async (data) => {
            if (data?.type === 'product/update-product/fulfilled') {
                toast.success('Product updated successfully!');
                await dispatch(getProductById(id));
                setIsUpdating(false);
            }
        }).catch((error) => {
            console.error(error?.message || 'Failed to update product');
            setIsUpdating(false);
        });
    }

    const handleApiDelete = async (fileId) => {
        if (!fileId) return;
        setIsImageDeleting(true);
        await dispatch(deleteProductImage({ productId: id, fileId })).then(async (data) => {
            if (data?.type === 'product/delete-product-image/fulfilled') {
                toast.success(data?.payload?.message);
                await dispatch(getProductById(id));
                setIsImageDeleting(false);
            }
        }).catch((error) => {
            console.error(error?.message || 'Failed to delete product image');
            setIsImageDeleting(false);
        });
    };

    const handleRemoveImage = useCallback((index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

        // adjust currentIndex if needed
        if (index === currentIndex && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (index === currentIndex && currentIndex === 0 && selectedProduct?.productPhoto.length > 1) {
            setCurrentIndex(0);
        }
    }, [currentIndex, selectedProduct?.productPhoto.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
        )
    }, [allImages.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
        )
    }, [allImages.length]);

    const handleProductDelete = async () => {
        setIsDeleting(true);
        await dispatch(deleteProduct(id)).then((data) => {
            if (data?.type === 'product/delete-product/fulfilled') {
                toast.success(data?.payload?.message);
                setIsDeleting(false);
                navigate('/admin/products');
            }
        }).catch((error) => {
            console.error(error?.message || 'Failed to delete product');
            setIsDeleting(false);
        });
    }

    const handleCancel = useCallback(() => {
        if (selectedProduct) {
            setFormData({
                productName: selectedProduct.productName || '',
                productDescription: selectedProduct.productDescription || '',
                category: selectedProduct.category || '',
                sku: selectedProduct.sku || '',
                stockQuantity: selectedProduct.stockQuantity?.toString() || '',
                regularPrice: selectedProduct.regularPrice?.toString() || '',
                salePrice: selectedProduct.salePrice?.toString() || '',
                tags: selectedProduct.tags || [],
                images: [], // reset new uploads
            });
        }
        navigate('/admin/products');
    }, [selectedProduct, navigate]);

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
                background: colors.white,
                display: 'flex',
                p: '20px 20px',
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                <Grid container spacing={3}>
                    {/* Left Inputs */}
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Admin.Inputs title='Product Name'
                                value={formData.productName}
                                onChange={(e) =>
                                    setFormData({ ...formData, productName: e.target.value })
                                }
                                placeholder='Lorem Ipsum' />
                            <Admin.Inputs title='Category'
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                placeholder='Sneaker' />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs title='SKU'
                                    value={formData.sku}
                                    onChange={
                                        (e) => setFormData({ ...formData, sku: e.target.value })
                                    }
                                    placeholder='#32A53' style={{ flex: 1 }} />
                                <Admin.Inputs title='Stock Quantity'
                                    value={formData.stockQuantity}
                                    onChange={
                                        (e) => setFormData({ ...formData, stockQuantity: e.target.value })
                                    }
                                    placeholder='211' style={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs title='Regular Price'
                                    value={formData.regularPrice}
                                    onChange={
                                        (e) => setFormData({ ...formData, regularPrice: e.target.value })
                                    }
                                    placeholder='Rs.110.40' style={{ flex: 1 }} />
                                <Admin.Inputs title='Sale Price'
                                    value={formData.salePrice}
                                    onChange={
                                        (e) => setFormData({ ...formData, salePrice: e.target.value })
                                    }
                                    placeholder='Rs.450' style={{ flex: 1 }} />
                            </Box>
                            <Admin.Tags title='Sizes' placeholder='Small, Medium, Large'
                                value={formData.sizes}
                                onChange={
                                    (newTags) => setFormData({ ...formData, sizes: newTags })
                                } />
                            <Admin.Tags
                                value={formData.tags}
                                onChange={
                                    (newTags) => setFormData({ ...formData, tags: newTags })
                                }
                                title='Tags'
                                placeholder='Lorem Ipsum' />
                            {/* Product Details */}
                            <Admin.Inputs title='Description'
                                value={formData.productDescription}
                                onChange={(e) =>
                                    setFormData({ ...formData, productDescription: e.target.value })
                                }
                                placeholder='Lorem Ipsum Is A Dummy Text' multiline />
                            {/* Benefits */}
                            <Admin.Tags
                                value={formData.productBenefits}
                                onChange={
                                    (newTags) => setFormData({ ...formData, productBenefits: newTags })
                                }
                                title='Benefits'
                                placeholder='Lorem Ipsum' />
                            {/* Product Details */}
                            <Admin.Tags
                                value={formData.productDetails}
                                onChange={
                                    (newTags) => setFormData({ ...formData, productDetails: newTags })
                                }
                                title='Product Details'
                                placeholder='Lorem Ipsum' />
                            {/* More Details */}
                            <Admin.Inputs
                                value={formData.productExtraDetails}
                                onChange={
                                    (e) => setFormData({ ...formData, productExtraDetails: e.target.value })
                                }
                                title='Extra Detail'
                                placeholder='Lorem Ipsum Is A Dummy Text'
                                multiline />
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
                                background: colors.grayLight_1,
                                borderRadius: '10px',
                                boxShadow: `0px 2px 2px ${colors.blackLight_20}`,
                            }}>
                                <Box
                                    component='img'
                                    src={`https://www.googleapis.com/drive/v3/files/${selectedProduct?.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
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
                                <Typography variant='body1' fontWeight='bold' color={colors.textColor_3} fontSize={20}>Product Gallery</Typography>

                                <Box
                                    sx={{
                                        width: '100%',
                                        height: { xs: 180, sm: 220 },
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background: colors.grayLight_1,
                                        borderRadius: '10px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: allImages.length === 0 ? `2px dashed ${colors.blackLight_80}` : 'none'
                                    }}
                                >
                                    {allImages.length > 0 ? (
                                        <>
                                            <Box
                                                component='img'
                                                src={
                                                    allImages[currentIndex]?.preview ?
                                                        allImages[currentIndex].preview
                                                        :
                                                        `https://www.googleapis.com/drive/v3/files/${allImages[currentIndex]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                                                alt='Uploaded'
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    borderRadius: '10px'
                                                }}
                                            />
                                            {/* Backward Arrow */}
                                            {allImages.length > 1 && (
                                                <ArrowBackIosNewIcon
                                                    onClick={handlePrev}
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: colors.iconColor_5,
                                                        fontSize: 30,
                                                        bgcolor: colors.iconBgColor_2,
                                                        borderRadius: '50%',
                                                        p: 0.5
                                                    }}
                                                />
                                            )}

                                            {/* Forward Arrow */}
                                            {allImages.length > 1 && (
                                                <ArrowForwardIosIcon
                                                    onClick={handleNext}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 10,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: colors.iconColor_5,
                                                        fontSize: 30,
                                                        bgcolor: colors.iconBgColor_2,
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
                                                <PhotoOutlinedIcon sx={{ fontSize: 50, color: colors.iconColor_5 }} />
                                                <Typography textAlign='center' fontSize={16} fontWeight={500} color={colors.textColor_1}>
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
                                {allImages.length > 0 && (
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
                                            {allImages.map((img, index) => (
                                                <Box
                                                    key={img?.id}
                                                    component='img'
                                                    src={
                                                        img.preview ?
                                                            img.preview
                                                            :
                                                            `https://www.googleapis.com/drive/v3/files/${img?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                                                    alt={img.name}
                                                    onClick={() => setCurrentIndex(index)}
                                                    sx={{
                                                        width: { xs: '48px', sm: '60px' },
                                                        height: { xs: '48px', sm: '60px' },
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        border:
                                                            currentIndex === index
                                                                ? `2px solid ${colors.borderColor_2}`
                                                                : `2px solid ${colors.transparent}`,
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
                                                <PhotoOutlinedIcon sx={{ fontSize: { xs: 22, sm: 30 }, color: colors.iconColor_5 }} />
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
                                        {allImages.length > 5 && (
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
                                                        color: colors.iconColor_5,
                                                        fontSize: 28,
                                                        bgcolor: colors.iconBgColor_2,
                                                        borderRadius: '50%',
                                                        p: 0.5,
                                                        boxShadow: `0px 2px 4px ${colors.blackLight_20}`,
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
                                                        color: colors.iconColor_5,
                                                        fontSize: 28,
                                                        bgcolor: colors.iconBgColor_2,
                                                        borderRadius: '50%',
                                                        p: 0.5,
                                                        boxShadow: `0px 2px 4px ${colors.blackLight_20}`,
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            {/* Gallery Images */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {selectedProduct?.productPhoto.length > 0 ? (
                                    selectedProduct?.productPhoto.map((imageTile) => (
                                        <ImageTile key={imageTile.id} apiData={imageTile} onDelete={() => handleApiDelete(imageTile.id)} />
                                    ))
                                ) : (
                                    <Typography fontSize={16} fontWeight={600} color={colors.textColor_3}>No Images Found</Typography>
                                )}
                                {
                                    formData.images.length > 0 && (
                                        <Typography fontSize={16} fontWeight={600} color={colors.textColor_3}>New Images</Typography>
                                    )
                                }
                                {formData.images.length > 0 && (
                                    formData.images.map((image, index) => (
                                        <ImageTile key={index} imageTile={image} onDelete={() => handleRemoveImage(index)} />
                                    ))
                                )}

                            </Box>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Button variant='contained' disabled={isLoading || isDeleting || isUpdating || isImageDeleting} loading={isUpdating} onClick={handleUpdate} sx={{ minWidth: 150, background: colors.grayDark_1 }}>Update</Button>
                                <Button variant='contained' disabled={isLoading || isDeleting || isUpdating || isImageDeleting} loading={isDeleting} sx={{ minWidth: 150, background: colors.primary }} onClick={handleProductDelete}>Delete</Button>
                                <Button variant='outlined' disabled={isLoading || isDeleting || isUpdating || isImageDeleting} onClick={handleCancel} sx={{ minWidth: 150, borderColor: colors.borderColor_4, color: colors.grayDark_1 }}>Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductDetail
