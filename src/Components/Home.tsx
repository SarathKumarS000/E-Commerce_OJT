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

  const [productList, setProductList] = useState<Product[]>([]);
  const [newproductList, setNewProductList]: any = useState([])
  const [filterStatus, setFilterStatus] = React.useState(true)
  const [sortStatus, setSortStatus] = React.useState(true);
  const [sort, setSort] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    async function ProductList() {
      axios.get('http://localhost:8080/products/all')
        .then(response => {
          setProductList(response.data);
        })
    }
    ProductList();
  }, []);

  useEffect(() => {
    productList.map((item: any) => {
      if (!newproductList.includes(item.productType)) {
        setNewProductList([...newproductList, item.productType]);
      }
    });
  });

  console.log(newproductList);

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSort('asc');
    if (type == '') {
      axios.get('http://localhost:8080/products/all?sort=asc')
        .then(response => {
          setProductList(response.data);
        })
    }
    else {
      axios.get('http://localhost:8080/products/all?sort=asc&type=' + type)
        .then(response => {
          setProductList(response.data);
        })
    }
  };

  const changeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSort('desc');
    if (type == '') {
      axios.get('http://localhost:8080/products/all?sort=desc')
        .then(response => {
          setProductList(response.data);
        })
    }
    else {
      axios.get('http://localhost:8080/products/all?sort=desc&type=' + type)
        .then(response => {
          setProductList(response.data);
        })
    }
  };

  const handleChange = (value: any) => {
    if (value != null) {
      setType(value)
      axios.get('http://localhost:8080/products/all?type=' + value)
        .then(response => {
          setProductList(response.data);
        })
    } else {
      setType('')
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
              options={newproductList.map((item: any) => (item))}
              onChange={(event, value) => handleChange(value)}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Select Product Type" />}
            />
          </Container>}
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
          <Container sx={{ display: "flex" }}>
            <IconButton
              onClick={() => {
                setSortStatus(!sortStatus);
              }}
            >
              <SortIcon />
            </IconButton>
            {
              sortStatus && (
                <Grid sx={{ display: "flex" }}>
                  <Grid marginLeft="9rem">
                    <Button onClick={handleSort}>
                      <CurrencyRupeeIcon />
                      Low to High
                    </Button>
                  </Grid>
                  <Grid marginLeft="10rem">
                    <Button onClick={changeSort}>
                      <CurrencyRupeeIcon />
                      High to Low
                    </Button>
                  </Grid>
                </Grid>
              )
            }
          </Container>
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

