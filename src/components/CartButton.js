import {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

import {ShoppingCart} from '@mui/icons-material';
import { Grid, Badge, IconButton} from '@mui/material';
import getCart from '../services/cart';

function CartButton() {
    const [cart, setCart] = useState({});

    useEffect(() => {
        let mounted = true;
        console.log('fetching cart');
        getCart()
            .then(item => {
                console.log(item);
                if (mounted) {
                    setCart(item);
                }
        })
        return () => mounted = false;
    }, [])
    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <IconButton component={Link} to="cart">
                    <Badge badgeContent={cart.products == null ? 0 : cart.products.length} color="primary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default CartButton;