// // ================= ADMIN BLOG PAGE (CREATE + DYNAMIC BLOCKS) =================
// import React, { useCallback, useRef, useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   IconButton,
//   Card
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'

// import { colors } from '../../../services';
// import { Admin, TiptapEditor } from '../../../components/admin';
// import { useDispatch, useSelector } from 'react-redux';
// import { createBlog } from '../../../store/slices/blogSlice';
// import toast from 'react-hot-toast';

// const initialState = {
//   title: '',
//   content: '',
//   images: [],
// };

// const AdminBlog = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.blog);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [formData, setFormData] = useState(initialState);
//   const thumbRef = useRef(null);

//   const handleImageUpload = useCallback((e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newImage = {
//       file,
//       preview: URL.createObjectURL(file),
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       lastModified: file.lastModified,
//       progress: 0,
//       status: 'uploading',
//     };
//     setFormData((prev) => ({
//       ...prev,
//       images: [newImage], // replace any previous image
//     }));
//     setCurrentIndex(0);

//     // Simulate upload progress
//     const interval = setInterval(() => {
//       setFormData((prev) => ({
//         ...prev,
//         images: prev.images.map((item) =>
//           item.name === newImage.name
//             ? {
//               ...item,
//               progress: Math.min(item.progress + 20, 100),
//               status: item.progress + 20 >= 100 ? 'uploaded' : 'uploading',
//             }
//             : item
//         ),
//       }));
//     }, 500);

//     setTimeout(() => clearInterval(interval), 3000);
//   }, [])


//   const handleSubmit = useCallback(async () => {
//     if (!formData.title || !formData.content) {
//       toast.error("Title and content are required");
//       return;
//     }

//     const data = new FormData();

//     data.append('title', formData.title);
//     data.append('content', formData.content);

//     formData.images.forEach((img) => {
//       data.append("images", img.file);  // 👈 actual File object
//     });

//     await dispatch(createBlog(data)).then((res) => {
//       if (res?.type === 'blog/createBlog/fulfilled') {
//         toast.success(res.payload?.message || "Blog created successfully");
//         setFormData(initialState);
//         setCurrentIndex(0);
//       } else {
//         toast.error(res.payload || "Failed to create blog");
//       }
//     })
//   }, [formData, dispatch]);



//   return (
//     <Box component='div' sx={{
//       width: '100%',
//       m: '15px 15px',
//       display: 'flex',
//       flexDirection: 'column',
//       // position: 'fixed'
//     }}>
//       <Box component='div' sx={{
//         width: '95%',
//         background: colors.white,
//         display: 'flex',
//         p: '20px 20px',
//         flexDirection: 'column',
//         borderRadius: '20px'
//       }}>
//         <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 2 }}>
//           {/* Title */}
//           <Admin.Inputs
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             style={{ maxWidth: '100%' }}
//             title='Blog Title'
//             placeholder='Lorem Ipsum' />

//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//             <Typography variant='body1' fontWeight='bold' color={colors.textColor_3} fontSize={20}>Product Gallery</Typography>

//             <Box
//               sx={{
//                 width: '100%',
//                 height: { xs: 180, sm: 220, md: 280 },
//                 display: 'flex',
//                 maxWidth: '500px',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 background: colors.grayLight_1,
//                 borderRadius: '10px',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 border: formData?.images?.length === 0 ? `2px dashed ${colors.blackLight_80}` : 'none'
//               }}
//             >
//               {formData.images.length > 0 ? (
//                 <>
//                   <Box
//                     component='img'
//                     src={formData.images[currentIndex].preview}
//                     alt='Uploaded'
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'contain',
//                       borderRadius: '10px'
//                     }}
//                   />
//                 </>
//               ) : (
//                 <Box component='label' htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                   <Box sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: 2
//                   }}>
//                     <PhotoOutlinedIcon sx={{ fontSize: 50, color: colors.iconColor_5 }} />
//                     <Typography textAlign='center' fontSize={16} fontWeight={500} color={colors.textColor_1}>
//                       Drop your image here, or browse<br />
//                       JPEG, PNG are allowed
//                     </Typography>
//                   </Box>
//                   <input
//                     id="upload-image"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     style={{ display: 'none' }}
//                   />
//                 </Box>
//               )}
//             </Box>
//             {formData.images.length > 0 && (
//               <Box sx={{ position: 'relative', width: '100%' }}>
//                 {/* Scrollable Thumbnails */}
//                 <Box
//                   ref={thumbRef}
//                   sx={{
//                     display: 'flex',
//                     gap: { xs: 0.5, sm: 1 },
//                     mt: 1,
//                     overflowX: { xs: 'auto', sm: 'hidden' },
//                     scrollBehavior: 'smooth',
//                     p: 0.5,
//                     flexWrap: { xs: 'wrap', sm: 'nowrap' }, // wrap on small screens
//                   }}
//                 >
//                   {formData.images.map((img, index) => (
//                     <Box
//                       key={index}
//                       component='img'
//                       src={img.preview}
//                       alt={`Thumbnail ${index}`}
//                       onClick={() => setCurrentIndex(index)}
//                       sx={{
//                         width: { xs: '48px', sm: '60px' },
//                         height: { xs: '48px', sm: '60px' },
//                         objectFit: 'cover',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                         border:
//                           currentIndex === index
//                             ? `2px solid ${colors.borderColor_2}`
//                             : `2px solid ${colors.transparent}`,
//                         transition: '0.2s',
//                       }}
//                     />
//                   ))}

//                   {/* Add More Button */}
//                   <Box
//                     component='label'
//                     htmlFor='upload-more'
//                     sx={{
//                       cursor: 'pointer',
//                       width: { xs: '48px', sm: '60px' },
//                       height: { xs: '48px', sm: '60px' },
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       border: `2px dashed ${colors.primary}`,
//                       borderRadius: '8px',
//                     }}
//                   >
//                     <PhotoOutlinedIcon sx={{ fontSize: { xs: 22, sm: 30 }, color: colors.iconColor_5 }} />
//                     <input
//                       id='upload-more'
//                       type='file'
//                       multiple
//                       accept='image/*'
//                       onChange={handleImageUpload}
//                       style={{ display: 'none' }}
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//             )}
//           </Box>

//           {/* Add Content */}
//           <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 2 }}>
//             <Typography variant='body1' color={colors.textColor_3} component='p' sx={{
//               fontSize: '20px',
//               fontWeight: 'bold'
//             }}>
//               Blog Content
//             </Typography>

//             <TiptapEditor content={formData.content}
//               setContent={(value) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   content: value,
//                 }))
//               }
//             />
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
//             <Button variant="contained" onClick={handleSubmit}
//               sx={{
//                 minWidth: 200, background: colors.primary,
//                 '& .MuiCircularProgress-root': {
//                   color: colors.primary, // 👈 your custom loader color
//                 },
//               }}
//               disabled={loading}
//             >
//               {loading ? "Publishing..." : "Publish Blog"}
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box >
//   );
// };

// export default AdminBlog;


// // ================= ADD ROUTE =================
// // <Route path="/admin/blog" element={<AdminBlog />} />


import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { Button, Typography, Box } from '@mui/material';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { colors } from '../../../services';
import { Admin, TiptapEditor } from '../../../components/admin';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, getBlogById, updateBlog, deleteBlog } from '../../../store/slices/blogSlice';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const initialState = {
    title: '',
    content: '',
    images: [],
};

const AdminBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, createLoading, updateLoading, deleteLoading, blog } = useSelector((state) => state.blog);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState(initialState);
    const thumbRef = useRef(null);

    const isEditMode = Boolean(id);

    // ─── Fetch blog if editing ───────────────────────────────────────────────
    useEffect(() => {
        if (isEditMode) {
            dispatch(getBlogById(id)).catch((err) => {
                console.error(err?.message || 'Failed to fetch blog');
            });
        }
    }, [dispatch, id, isEditMode]);

    // ─── Populate form when blog loads ──────────────────────────────────────
    useEffect(() => {
        if (blog && isEditMode) {
            setFormData({
                title: blog?.title || '',
                content: blog?.content || '',
                images: [],
            });
        }
    }, [blog, isEditMode]);

    // ─── Displayed image (existing from Drive or new preview) ───────────────
    const displayedImage = useMemo(() => {
        if (formData.images?.length > 0) {
            return formData.images[0].preview; // new upload takes priority
        }
        if (blog?.blogImage?.id) {
            return `https://www.googleapis.com/drive/v3/files/${blog.blogImage.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
        }
        return null;
    }, [blog?.blogImage, formData.images]);

    // ─── Image upload ────────────────────────────────────────────────────────
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

        setFormData((prev) => ({ ...prev, images: [newImage] }));
        setCurrentIndex(0);

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
    }, []);

    // ─── Submit (create or update) ───────────────────────────────────────────
    const handleSubmit = useCallback(async () => {
        if (!formData.title || !formData.content) {
            toast.error("Title and content are required");
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        formData.images.forEach((img) => data.append("images", img.file));

        if (isEditMode) {
            // ── UPDATE ──
            await dispatch(updateBlog({ id, formData: data })).then((res) => {
                if (res?.type === 'blog/updateBlog/fulfilled') {
                    toast.success(res.payload?.message || "Blog updated successfully");
                } else {
                    toast.error(res.payload || "Failed to update blog");
                }
            });
        } else {
            // ── CREATE ──
            await dispatch(createBlog(data)).then((res) => {
                if (res?.type === 'blog/createBlog/fulfilled') {
                    toast.success(res.payload?.message || "Blog created successfully");
                    setFormData(initialState);
                    setCurrentIndex(0);
                } else {
                    toast.error(res.payload || "Failed to create blog");
                }
            });
        }
    }, [formData, dispatch, id, isEditMode]);

    // ─── Delete ──────────────────────────────────────────────────────────────
    const handleDelete = useCallback(async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        await dispatch(deleteBlog(id)).then((res) => {
            if (res?.type === 'blog/deleteBlog/fulfilled') {
                toast.success("Blog deleted successfully");
                navigate('/admin/blogs'); // 👈 redirect after delete
            } else {
                toast.error(res.payload || "Failed to delete blog");
            }
        });
    }, [dispatch, id, navigate]);

    // ─── Cancel ──────────────────────────────────────────────────────────────
    const handleCancel = useCallback(() => {
        navigate('/admin/blogs'); // 👈 go back to blog list
    }, [navigate]);

    // ─── Busy flag for disabling all buttons ─────────────────────────────────
    const isBusy = loading || createLoading || updateLoading || deleteLoading;

    return (
        <Box component='div' sx={{ width: '100%', m: '15px 15px', display: 'flex', flexDirection: 'column' }}>
            <Box component='div' sx={{ width: '95%', background: colors.white, display: 'flex', p: '20px 20px', flexDirection: 'column', borderRadius: '20px' }}>
                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 2 }}>

                    {/* Title */}
                    <Admin.Inputs
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        style={{ maxWidth: '100%' }}
                        title='Blog Title'
                        placeholder='Lorem Ipsum'
                    />

                    {/* Image Upload */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography variant='body1' fontWeight='bold' color={colors.textColor_3} fontSize={20}>
                            Blog Image
                        </Typography>

                        <Box sx={{
                            width: '100%',
                            height: { xs: 180, sm: 220, md: 280 },
                            display: 'flex',
                            maxWidth: '500px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: colors.grayLight_1,
                            borderRadius: '10px',
                            position: 'relative',
                            overflow: 'hidden',
                            border: !displayedImage ? `2px dashed ${colors.blackLight_80}` : 'none'
                        }}>
                            {displayedImage ? (
                                <Box
                                    component='img'
                                    src={displayedImage}
                                    alt='Blog'
                                    sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
                                />
                            ) : (
                                <Box component='label' htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                        <PhotoOutlinedIcon sx={{ fontSize: 50, color: colors.iconColor_5 }} />
                                        <Typography textAlign='center' fontSize={16} fontWeight={500} color={colors.textColor_1}>
                                            Drop your image here, or browse<br />JPEG, PNG are allowed
                                        </Typography>
                                    </Box>
                                    <input id="upload-image" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </Box>
                            )}
                        </Box>

                        {formData.images.length > 0 && (
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <Box ref={thumbRef} sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, mt: 1, overflowX: { xs: 'auto', sm: 'hidden' }, scrollBehavior: 'smooth', p: 0.5, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
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
                                                border: currentIndex === index ? `2px solid ${colors.borderColor_2}` : `2px solid ${colors.transparent}`,
                                                transition: '0.2s',
                                            }}
                                        />
                                    ))}

                                    {/* Add More */}
                                    <Box component='label' htmlFor='upload-more' sx={{ cursor: 'pointer', width: { xs: '48px', sm: '60px' }, height: { xs: '48px', sm: '60px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', border: `2px dashed ${colors.primary}`, borderRadius: '8px' }}>
                                        <PhotoOutlinedIcon sx={{ fontSize: { xs: 22, sm: 30 }, color: colors.iconColor_5 }} />
                                        <input id='upload-more' type='file' multiple accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }} />
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Blog Content */}
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='body1' color={colors.textColor_3} sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Blog Content
                        </Typography>
                        {(!isEditMode || blog) && (
                            <TiptapEditor
                                key={blog?._id || 'new'}
                                content={formData?.content}
                                setContent={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                            />
                        )}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>

                        {/* Publish / Update */}
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isBusy}
                            sx={{ minWidth: 200, background: colors.primary }}
                        >
                            {createLoading || updateLoading
                                ? (isEditMode ? "Updating..." : "Publishing...")
                                : (isEditMode ? "Update Blog" : "Publish Blog")
                            }
                        </Button>

                        {/* Delete — only in edit mode */}
                        {isEditMode && (
                            <Button
                                variant="contained"
                                onClick={handleDelete}
                                disabled={isBusy}
                                sx={{ minWidth: 150, background: colors.error || '#d32f2f' }}
                            >
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </Button>
                        )}

                        {/* Cancel */}
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            disabled={isBusy}
                            sx={{ minWidth: 150, borderColor: colors.borderColor_4, color: colors.grayDark_1 }}
                        >
                            Cancel
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default AdminBlog;