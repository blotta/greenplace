import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import '../App.css';

import ProductCard from '../components/ProductCard';

import { getProducts } from '../services/products';
import CartButton from '../components/CartButton';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    console.log('fetching products');
    getProducts()
      .then(items => {
        if (mounted) {
          setProducts(items);
        }
      })
    return () => mounted = false;
  }, [])

  return (
    <>
      <Container sx={{marginY: 5}}>
        <CartButton  />
        <Typography variant='h4' component='h2'>Produtos</Typography>
        <Grid container spacing={5} alignItems="stretch">
          {products.map(product => <ProductCard product={product} key={product.id} />)}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
