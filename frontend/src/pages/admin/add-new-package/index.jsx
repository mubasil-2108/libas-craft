import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Checkbox, Grid, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { colors } from '../../../services';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Admin, ImageTile } from '../../../components/admin';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProducts } from '../../../store/slices/productSlice';
import { createPackage } from '../../../store/slices/packageSlice';

const initialState = {
    packageName: '',
    packageDescription: '',
    packageExtraDetails: '',
    packageDetails: [],
    packageBenefits: [],
    images: [],
    sku: '',
    regularPrice: '',
    salePrice: '',
    tags: [],
    selectedProducts: []
};

const AddPackage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProducts = async () => {
            await dispatch(getAllProducts());
        }
        fetchAllProducts();
    }, [dispatch])
    const { isLoading, products = [] } = useSelector((state) => state.product);
    const { isPackageLoading } = useSelector((state) => state.packages);
    const [formData, setFormData] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbRef = useRef(null);
    const categories = [...new Set(products.map(p => p.category))];
    const [pagination, setPagination] = useState({});
    const handleChangePage = (category, newPage) => {
        setPagination((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                page: newPage,
            },
        }));
    };
    const handleChangeRowsPerPage = (category, event) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        setPagination((prev) => ({
            ...prev,
            [category]: {
                page: 0, // reset to first page
                rowsPerPage,
            },
        }));
    };
    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImage = {
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            progress: 0,
            status: 'uploading',
        };
        setFormData((prev) => ({
            ...prev,
            images: [newImage], // replace any previous image
        }));
        setCurrentIndex(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setFormData((prev) => ({
                ...prev,
                images: prev.images.map((item) =>
                    item.name === newImage.name
                        ? {
                            ...item,
                            progress: Math.min(item.progress + 20, 100),
                            status: item.progress + 20 >= 100 ? 'uploaded' : 'uploading',
                        }
                        : item
                ),
            }));
        }, 500);

        setTimeout(() => clearInterval(interval), 3000);
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

    const handleCreate = useCallback(async () => {
        const allSelectedProductIds = Object.values(formData.selectedProducts)
            .flatMap(cat => cat.ids || [])
            .filter(Boolean); // now contains MongoDB product _id's

         const form = new FormData();
        form.append("packageName", formData.packageName);
        form.append("packageDescription", formData.packageDescription);
        form.append("packageExtraDetails", formData.packageExtraDetails);
        formData.packageDetails.forEach(detail => form.append("packageDetails[]", detail));
        formData.packageBenefits.forEach(benefit => form.append("packageBenefits[]", benefit));
        form.append("sku", formData.sku);
        form.append("packageRegularPrice", formData.regularPrice);
        form.append("packageSalePrice", formData.salePrice);
        allSelectedProductIds.forEach(id => form.append("packageProducts[]", id));
        formData.tags.forEach(tag => form.append("tags[]", tag));

        // append files
        formData.images.forEach((img) => {
            form.append("images", img.file);  // 👈 actual File object
        });

        await dispatch(createPackage(form)).then((data) => {
            if (data?.type !== 'package/create-package/rejected') {
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
        navigate('/admin/packages');
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
                            <Admin.Inputs
                                value={formData.packageName}
                                onChange={
                                    (e) => setFormData({ ...formData, packageName: e.target.value })
                                }
                                title='Package Name'
                                placeholder='Lorem Ipsum' />
                            <Admin.Inputs
                                value={formData.sku}
                                onChange={
                                    (e) => setFormData({ ...formData, sku: e.target.value })
                                }
                                title='SKU'
                                placeholder='#32A53'
                                style={{ flex: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Admin.Inputs
                                    value={formData.regularPrice}
                                    onChange={
                                        (e) => setFormData({ ...formData, regularPrice: e.target.value })
                                    }
                                    title='Regular Price'
                                    placeholder='Rs.110.40'
                                    style={{ flex: 1 }} />
                                <Admin.Inputs
                                    value={formData.salePrice}
                                    onChange={
                                        (e) => setFormData({ ...formData, salePrice: e.target.value })
                                    }
                                    title='Sale Price'
                                    placeholder='Rs.450'
                                    style={{ flex: 1 }} />
                            </Box>
                            <Admin.Tags
                                value={formData.tags}
                                onChange={
                                    (newTags) => setFormData({ ...formData, tags: newTags })
                                }
                                title='Tags'
                                placeholder='Lorem Ipsum' />
                            {/* Product Details */}
                            {/* Description */}
                            <Admin.Inputs
                                value={formData.packageDescription}
                                onChange={
                                    (e) => setFormData({ ...formData, packageDescription: e.target.value })
                                }
                                title='Description'
                                placeholder='Lorem Ipsum Is A Dummy Text'
                                multiline />
                            {/* Benefits */}
                            <Admin.Tags
                                value={formData.packageBenefits}
                                onChange={
                                    (newTags) => setFormData({ ...formData, packageBenefits: newTags })
                                }
                                title='Benefits'
                                placeholder='Lorem Ipsum' />
                            {/* Product Details */}
                            <Admin.Tags
                                value={formData.packageDetails}
                                onChange={
                                    (newTags) => setFormData({ ...formData, packageDetails: newTags })
                                }
                                title='Package Details'
                                placeholder='Lorem Ipsum' />
                            {/* More Details */}
                            <Admin.Inputs
                                value={formData.packageExtraDetails}
                                onChange={
                                    (e) => setFormData({ ...formData, packageExtraDetails: e.target.value })
                                }
                                title='Extra Detail'
                                placeholder='Lorem Ipsum Is A Dummy Text'
                                multiline />
                        </Box>
                    </Grid>

                    {/* Right: Image Preview and Gallery */}
                    <Grid item size={6} xs={12} sm={6} md={6} lg={6} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Products  For Packages*/}
                            {/* Products For Packages */}
                            {/* Products For Packages */}
                            <Box component='div' sx={{ width: '100%' }}>
                                {products && products.length > 0 ? (
                                    categories.map((cat) => {
                                        const catRows = products.filter((r) => r.category === cat);
                                        const { page = 0, rowsPerPage = 5 } = pagination[cat] || {};

                                        const paginatedRows = catRows.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        );

                                        return (
                                            <Accordion key={cat}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreOutlinedIcon sx={{ color: colors.iconColor_7 }} />}
                                                >
                                                    <Typography component='p' sx={{ fontWeight: 'bold' }}>{cat}</Typography>
                                                </AccordionSummary>

                                                <AccordionDetails>
                                                    <TableContainer component={Paper} sx={{ maxWidth: 500, margin: '0 auto' }}>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell sx={{ fontWeight: 'bold', width: '1px' }}>
                                                                        <Checkbox
                                                                            checked={
                                                                                paginatedRows.every(row =>
                                                                                    formData.selectedProducts[cat]?.ids?.includes(row?._id)
                                                                                ) && paginatedRows.length > 0
                                                                            }
                                                                            indeterminate={
                                                                                paginatedRows.some(row =>
                                                                                    formData.selectedProducts[cat]?.ids?.includes(row?._id)
                                                                                ) && !paginatedRows.every(row =>
                                                                                    formData.selectedProducts[cat]?.ids?.includes(row?._id)
                                                                                )
                                                                            }
                                                                            onChange={(e) => {
                                                                                setFormData((prev) => {
                                                                                    const updatedSelected = { ...prev.selectedProducts };
                                                                                    const ids = new Set(updatedSelected[cat]?.ids || []);
                                                                                    if (e.target.checked) {
                                                                                        paginatedRows.forEach(row => ids.add(row?._id)); // ✅ use _id
                                                                                    } else {
                                                                                        paginatedRows.forEach(row => ids.delete(row?._id)); // ✅ use _id
                                                                                    }
                                                                                    if (ids.size > 0) updatedSelected[cat] = { ids: Array.from(ids) };
                                                                                    else delete updatedSelected[cat];
                                                                                    return { ...prev, selectedProducts: updatedSelected };
                                                                                });
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell sx={{ fontWeight: 'bold', width: '45px' }}>Sr no.</TableCell>
                                                                    <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                                                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                                                    <TableCell align='right' sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                                                </TableRow>
                                                            </TableHead>

                                                            <TableBody>
                                                                {paginatedRows.map((row, index) => {
                                                                    const isSelected = formData.selectedProducts[cat]?.ids?.includes(row?._id);
                                                                    return (
                                                                        <TableRow key={row?._id}>
                                                                            <TableCell>
                                                                                <Checkbox
                                                                                    checked={!!isSelected}
                                                                                    onChange={(e) => {
                                                                                        setFormData((prev) => {
                                                                                            const updatedSelected = { ...prev.selectedProducts };
                                                                                            const ids = new Set(updatedSelected[cat]?.ids || []);
                                                                                            if (e.target.checked) ids.add(row?._id);   // ✅ use row._id
                                                                                            else ids.delete(row?._id);
                                                                                            if (ids.size > 0) updatedSelected[cat] = { ids: Array.from(ids) };
                                                                                            else delete updatedSelected[cat];
                                                                                            return { ...prev, selectedProducts: updatedSelected };
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                                            <TableCell>
                                                                                <img
                                                                                    src={`https://www.googleapis.com/drive/v3/files/${row?.productPhoto[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                                                                                    alt={row.productName}
                                                                                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell>{row.productName}</TableCell>
                                                                            <TableCell align='right'>
                                                                                <Typography component='span' sx={{ fontWeight: 'bold' }}>
                                                                                    Rs. {row?.salePrice ? row.salePrice : row.regularPrice}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            </TableBody>
                                                        </Table>

                                                        <TablePagination
                                                            component="div"
                                                            count={catRows.length}
                                                            page={page}
                                                            onPageChange={(e, newPage) => handleChangePage(cat, newPage)}
                                                            rowsPerPage={rowsPerPage}
                                                            onRowsPerPageChange={(e) => handleChangeRowsPerPage(cat, e)}
                                                            rowsPerPageOptions={[5, 10, 20]}
                                                            labelRowsPerPage="Rows"
                                                        />
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                        );
                                    })
                                ) : (
                                    <Typography variant='h5'>No Products Found</Typography>
                                )}
                            </Box>



                            {/* Image Preview */}
                            <Box sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                display: 'flex',
                                position: 'relative',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: colors.grayLight_1,
                                borderRadius: '10px',
                                boxShadow: `0px 2px 2px ${colors.blackLight_20}`,
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
                                        border: formData.images.length === 0 ? `2px dashed ${colors.blackLight_80}` : 'none'
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
                            <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', p: 2, overflowX: 'hidden', maxHeight: '500px', gap: 2 }}>
                                {formData.images.length > 0 ? (
                                    formData.images.map((image, index) => (
                                        <ImageTile key={index} imageTile={image} onDelete={() => handleRemoveImage(index)} />
                                    ))
                                ) : (
                                    <Typography fontSize={16} fontWeight={600} color={colors.textColor_3}>No Images Found</Typography>
                                )}
                            </Box>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <Button variant='contained' loading={isPackageLoading} disabled={isPackageLoading || isLoading} onClick={handleCreate} sx={{
                                    minWidth: 200, background: colors.primary,
                                    '& .MuiCircularProgress-root': {
                                        color: colors.primary, // 👈 your custom loader color
                                    },
                                }}>Create</Button>
                                <Button variant='outlined' disabled={isPackageLoading || isLoading} onClick={handleCancel} sx={{ minWidth: 200, borderColor: colors.borderColor_4, color: colors.grayDark_1 }}>Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AddPackage
