import { Select, MenuItem, InputLabel, Box, FormControl, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Welcome from './Welcome'

type Props = {}

function Filters({ }: Props) {
    let productList: any = []
    let newProductList: any = []
    const [product, setProduct]: any = useState([])
    const [newproductList, setNewProductList]: any = useState([])
    const [productType, setProductType]: any = useState()

    useEffect(() => {
        axios.get('http://localhost:8080/products/all')
            .then(res => {
                const loadedProducts: any = [];
                productList = [...res.data]
                for (const key in productList) {
                    loadedProducts.push(productList[key].productType
                    );
                    setProduct(loadedProducts);
                }
                newProductList = product.filter((val: any, id: any) => {
                    return product.indexOf(val) == id;
                });
                setNewProductList(newProductList);
            })
    });

    const producttype = (value: any) => {
        setProductType(value);
        <Welcome product={productType}/>
        console.log(productType);
    }

    return (
        <Fragment>
            <Box sx={{ minWidth: "200px",marginLeft:"1rem", marginRight: "1rem", marginTop: "2rem"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category" sx={{ minWidth: "200px",marginLeft:"0rem" }}
                    >
                        {newproductList.map((newproductList: any) => (
                            <MenuItem value={newproductList} onClick={() => producttype(newproductList)}>{newproductList}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box><br />
        </Fragment>
    )
}

export default Filters