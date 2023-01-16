import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import sizeConfig from '../Config/SizeConfig';
import ColorConfig from '../Config/ColorConfig';
import { Container } from '@mui/system';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Autocomplete from '@mui/material/Autocomplete';
import SortIcon from "@mui/icons-material/Sort";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Navbar from './Navbar';

export default function Home() {
  type Product = {
    productId: number;
    productImage: string;
    productName: string;
    productPrice: number;
    productType: string;
  }

  let newProductList: any = [];
  const [productList, setProductList] = useState<Product[]>([]);
  const [newproductList, setNewProductList]: any = useState([])
  const [filterStatus, setFilterStatus] = React.useState(false)
  const [sortStatus, setSortStatus] = React.useState(false);

  useEffect(() => {
    async function ProductList() {
      axios.get('http://localhost:8080/products/all')
        .then(response => {
          setProductList(response.data);
        })
        .then(()=>{
          newProductList = productList.filter((val: any, id: any) => {
            return productList.indexOf(val) == id;
          });
          setNewProductList(newProductList);
          console.log(newProductList);
          
        })
    }
    ProductList();
  }, []);

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.get('http://localhost:8080/products/productPrice/asc')
      .then(response => {
        setProductList(response.data);
      })
  };

  const changeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.get('http://localhost:8080/products/productPrice/desc')
      .then(response => {
        setProductList(response.data);
      })
  };

  const handleChange = (value: any) => {
    if (value != null) {
      axios.get('http://localhost:8080/products/all?productType=' + value)
        .then(response => {
          setProductList(response.data);
        })
    } else {
      axios.get('http://localhost:8080/products/all')
        .then(response => {
          setProductList(response.data);
        })
    }
  };

  return (
    <Container sx={{ width: 1400 }}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            width: sizeConfig.sidebar.width,
            flexShrink: 0,
            backgroundColor: ColorConfig.sidebar.color
          }}
        >
          <IconButton onClick={() => { setFilterStatus(!filterStatus) }}>
            <FilterAltIcon />
          </IconButton>
          {filterStatus && <Container>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={productList.map((item: any) => (
                item.productType
              ))}
              onChange={(event, value) => handleChange(value)}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Select Product Type" />}
            />
          </Container>}
          <IconButton
            onClick={() => {
              setSortStatus(!sortStatus);
            }}
          >
            <SortIcon />
          </IconButton>
          {
            sortStatus && (
              <Container>
                <Grid>
                  <Button onClick={handleSort}>
                    <CurrencyRupeeIcon />
                    Low to High
                    <Grid></Grid>
                  </Button>
                </Grid>
                <Grid>
                  <Button onClick={changeSort}>
                    <CurrencyRupeeIcon />
                    High to Low
                    <Grid></Grid>
                  </Button>
                </Grid>
              </Container>
            )
          }
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% -${sizeConfig.sidebar.width})`,
            minHeight: "100vh",
            backgroundColor: ColorConfig.mainBg
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, width: 850 }}>
            <ImageList sx={{ width: 1600 }} cols={3} rowHeight={160}>
              {productList.map((product: any) => (
                <Box p={3}>
                  <Box height={'280px'} border={'1px solid #e8e8e8'}>
                    <Box component={'img'} src={product.productImage} width={'100%'} height={'100%'} sx={{ objectFit: 'contain', objectPosition: 'center' }} />
                  </Box>
                  <Box p={0} pb={0}>
                    <Box my={2}>
                      <Typography fontSize={'small'}>
                        {product.productName} {product.productType}
                      </Typography>
                    </Box>
                    <Box my={2}>
                      <Typography fontSize={'medium'} fontWeight={'bold'}>
                        ₹{product.productPrice}
                      </Typography>
                    </Box>
                  </Box>
                  <Box px={2}>
                    <Button fullWidth variant={'outlined'}>Add Cart</Button>
                  </Box>
                </Box>
              ))}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Container >
  );
}

