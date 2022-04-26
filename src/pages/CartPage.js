import {useState, useEffect} from 'react';
import { Container, Grid, Typography, Paper, Button } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableContainer, TableCell } from '@mui/material';
import getCart from '../services/cart';
import { getProduct } from '../services/products';

export default function CartPage() {
    const [data, setData] = useState({cart: {}, products: [], isFetching: false});

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data');
            try {
                setData({...data, isFetching: true});
                let apiCart = await getCart();
                const products = await Promise.all(
                    apiCart.products.map(p => getProduct(p.productId))
                );
                const cp = apiCart.products.map(ap => {
                    let deets = products.filter(p => p.id == ap.productId);
                    deets = deets[0];
                    const ret = {
                        ...deets,
                        quantity: ap.quantity
                    }
                    return ret;
                });
                apiCart.products = cp;
                setData({...data, cart: apiCart, products: products, isFetching: false});
                console.log(data);
            } catch (e) {
                console.log(e);
                setData({...data, isFetching: false});
            }
        }
        fetchData();

    }, [])

    if (data.isFetching || data.cart.products == null ) {
        return <h1>Loading...</h1>
    }

    // const rows = [
    //     {id: 1, product: 'Jaqueta de Couro', quantity: 1, price: 79.9},
    //     {id: 2, product: 'Camiseta GGG', quantity: 2, price: 179.9},
    // ]

   const rows = data.cart.products.map(p => {
       return ({id: p.id, title: p.title, quantity: p.quantity, price: p.price })
   });

    return (
        <Container sx={{marginY: 5}}>
            <Typography variant='h4' mb={3}>Carrinho</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell>Preço Unitário</TableCell>
                                    <TableCell>Preço</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.cart.products.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>R$ {row.price.toFixed(2)}</TableCell>
                                        <TableCell>R$ {(row.quantity * row.price).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>

                <Grid item xs={12} md={4}>

                    <Paper sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>

                        <Typography variant='h6' align='center' sx={{padding: 2}}>
                            Total: R$ {data.cart.products.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0).toFixed(2)}
                        </Typography>


                        <Button
                            variant="contained"
                            fullWidth
                            sx={{borderRadius: 0}}
                            disabled
                            to="/cart"
                            // onClick={() => history.push('/cart')}
                        >
                            Finalizar Compra
                        </Button>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    )
}