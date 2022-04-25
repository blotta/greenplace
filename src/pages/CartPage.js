import {useState, useEffect} from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableContainer, TableCell } from '@mui/material';
import getCart from '../services/cart';

export default function CartPage() {
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

    if (cart.products == null) {
        return <h1>Loading...</h1>
    }

    const columns = [
        {field: 'product', headerName: 'Produto'},
        {field: 'quantity', headerName: 'Qtd'},
        {field: 'price', headerName: 'Preço'},
    ];

    const rows = [
        {id: 1, product: 'Jaqueta de Couro', quantity: 1, price: 79.9},
        {id: 2, product: 'Camiseta GGG', quantity: 2, price: 179.9},
    ]

    return (
        <Container sx={{marginY: 5}}>
            <Typography variant='h4'>Carrinho</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell>Preço</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.product}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>R$ {(row.quantity * row.price).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>

                <Grid item xs={12} md={4}>

                    <Typography variant='body2'>Total: R$ {rows.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0).toFixed(2)}</Typography>

                </Grid>
            </Grid>
        </Container>
    )
}