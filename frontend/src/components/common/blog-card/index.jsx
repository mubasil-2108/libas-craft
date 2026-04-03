import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

// ─── Single Card ─────────────────────────────────────────────────────────────
const BlogCard = ({
    title = 'Material UI Card',
    buttonText,
    blog
}) => {
    const navigate = useNavigate();
    const theme = useTheme();

    // Breakpoint flags
    const isXs = useMediaQuery(theme.breakpoints.only('xs')); // 0–599px   phones portrait
    const isSm = useMediaQuery(theme.breakpoints.only('sm')); // 600–899px phones landscape / small tablets
    const isMd = useMediaQuery(theme.breakpoints.only('md')); // 900–1199px tablets / small laptops
    // lg (1200–1535px) and xl (1536px+) use default desktop values

    const cardWidth = isXs ? '100%' : isSm ? 340 : isMd ? 360 : 320;
    const mediaHeight = isXs ? 140 : isSm ? 160 : isMd ? 180 : 160;
    const titleVariant = isXs ? 'subtitle1' : 'h6';

    return (
        <Card
            sx={{
                width: cardWidth,
                maxWidth: '100%',
                borderRadius: { xs: 2, sm: 3, md: 3 },
                boxShadow: { xs: 2, sm: 3, md: 4 },
                overflow: 'visible',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-4px)',
                },
            }}
        >
            {/* ── Floating gradient banner ── */}
            <Box sx={{ px: { xs: 1.5, sm: 2 }, mt: { xs: -2.5, sm: -3 } }}>
                <CardMedia
                    component={'img'}
                    src={`https://www.googleapis.com/drive/v3/files/${blog?.blogImage?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                    sx={{
                        height: mediaHeight,
                        borderRadius: { xs: 1.5, sm: 2 },
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                    }}
                />
            </Box>

            {/* ── Content ── */}
            <CardContent sx={{ pt: { xs: 1.5, sm: 2 }, px: { xs: 1.5, sm: 2, md: 3 } }}>
                <Typography
                    variant={titleVariant}
                    component="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                        color: 'grey.900',
                        letterSpacing: '-0.3px',
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.15rem' },
                    }}
                >
                    {blog?.title || title}
                </Typography>
            </CardContent>

            {/* ── Actions ── */}
            <CardActions sx={{ px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2 } }}>
                <Button
                    variant="contained"
                    fullWidth={isXs}         // full-width CTA on phones
                    size={isXs ? 'medium' : 'small'}
                    onClick={()=> navigate(`/admin/blogs/${blog?._id}`)}
                    sx={{
                        bgcolor: '#3b82f6',
                        fontWeight: 700,
                        fontSize: { xs: '0.72rem', sm: '0.7rem', md: '0.75rem' },
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        borderRadius: 2,
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1.2, sm: 1.2, md: 1.4 },
                        boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
                        '&:hover': {
                            bgcolor: '#2563eb',
                            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
                        },
                    }}
                >
                    {buttonText ? buttonText : 'See Details'}
                </Button>
            </CardActions>
        </Card>
    );
};

// ─── Responsive Grid Layout ───────────────────────────────────────────────────
// Drop <BlogCardGrid /> anywhere in your app to see the card at every breakpoint.
const BlogCardGrid = () => {
    const cards = [
        {
            title: 'Getting Started',
            description: 'Learn how to set up your project with Material UI and React in minutes.',
        },
        {
            title: 'Responsive Design',
            description: 'Build layouts that look great on every screen, from phones to 4K displays.',
        },
        {
            title: 'MUI Theming',
            description: "Customize your entire design system with MUI's powerful theming engine.",
        },
        {
            title: 'MERN Stack Tips',
            description: 'Best practices for building full-stack apps with MongoDB, Express, React & Node.',
        },
    ];

    return (
        <Container
            maxWidth="xl"
            sx={{ py: { xs: 5, sm: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
            <Grid
                container
                spacing={{ xs: 4, sm: 4, md: 5, lg: 4 }}
                justifyContent="center"
                alignItems="flex-start"
            >
                {cards.map((card, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}   // 1 column  — phones portrait   (< 600px)
                        sm={6}    // 2 columns — phones landscape / small tablets (600–899px)
                        md={6}    // 2 columns — tablets (900–1199px)
                        lg={3}    // 4 columns — desktop (1200–1535px)
                        xl={3}    // 4 columns — wide screens (≥ 1536px)
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: { xs: 4, sm: 5 }, // extra top padding for the floating banner overhang
                        }}
                    >
                        <BlogCard title={card.title} description={card.description} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export { BlogCard, BlogCardGrid };
export default BlogCard;
