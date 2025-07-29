import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Typography } from '@mui/material'

import React from 'react'
import { dummyProducts } from '../../../services/utils/constants';
import { ProductTile } from '../../../components/admin';

const AllProducts = () => {

    return (
        <Box component='div' sx={{
            width: '100%',
            m: '15px 15px',
            // position: 'fixed'
        }}>
            <Grid container spacing={3}>
                {
                    dummyProducts.length > 0 ?
                        dummyProducts.map((product) => (
                            <ProductTile key={product.id} product={product} />
                        ))
                        :
                        <Typography variant='body1' component='p' sx={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#232321',
                        }}>No Products Found</Typography>
                }

            </Grid>
        </Box>
    )
}

export default AllProducts
