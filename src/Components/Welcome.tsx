import React, { Fragment, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import sizeConfig from '../Config/SizeConfig';
import Sortbar from './Sortbar';
import SideBar from './Sidebar';
import ColorConfig from '../Config/ColorConfig';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import ProductList from './ProductList';
import Filter from './Filter';


function Welcome(props: any) {

  return (
    <>
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
          <Filter />
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
          <Box sx={{ width: "100px" }}>
            <Sortbar />
          </Box>
          <ProductList />
        </Box>
      </Box>
    </>
  )
}

export default Welcome;