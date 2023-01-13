import React, { useEffect, useReducer, useState } from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import axios from 'axios';
import Filter from './Filter';
import { logRoles } from '@testing-library/react';

const ProductList = () => {

    let productList: any = []
    const [product, setProduct]: any = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/products/all')
            .then(res => {
                const loadedProducts: any = [];
                productList = [...res.data];
                for (const key in productList) {
                    loadedProducts.push({
                        product_name: productList[key].productName,
                        product_type: productList[key].productType,
                        product_price: productList[key].productPrice,
                        product_image: productList[key].productImage,
                    });
                }
                setProduct(loadedProducts);
                
            })
    }, []);

    return (
        <Grid item xs={6} md={3} display="flex">
            {product.map((product: { product_image: string | undefined; product_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; product_type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; product_price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                <Box p={3}>
                    <Box height={'280px'} border={'1px solid #e8e8e8'}>
                        <Box component={'img'} src={product.product_image} width={'100%'} height={'100%'} sx={{ objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    <Box p={0} pb={0}>
                        <Box my={2}>
                            <Typography fontSize={'small'}>
                                {product.product_name} {product.product_type}
                            </Typography>
                        </Box>
                        <Box my={2}>
                            <Typography fontSize={'medium'} fontWeight={'bold'}>
                                ₹{product.product_price}
                            </Typography>
                        </Box>
                    </Box>
                    <Box px={2}>
                        <Button fullWidth variant={'outlined'}>Add Cart</Button>
                    </Box>
                </Box>
            ))}
        </Grid>
    )
}

export default ProductList
