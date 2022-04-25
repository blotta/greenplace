import { Paper, Grid, Typography, Box, Rating, Button } from "@mui/material";
import { Category } from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material"

import { Link } from 'react-router-dom';

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2"
                    },
                    style: {
                        fontSize: 11,
                    }
                },
                {
                    props: {
                        variant: "body3"
                    },
                    style: {
                        fontSize: 9,
                    }
                }
            ]
        }
    }
})

const ProductCard = ({product}) => {
    // const history = useHistory();

    return (
        <Grid item xs={12} sm={4} md={3}>
            <ThemeProvider theme={theme}>

                <Paper elevation={3}>
                    <img className="img" src={product.image} alt="" />
                    <Box paddingX={1} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Typography component="h2" variant="subtitle1">
                            {product.title}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1
                            }}
                        >
                            <Category sx={{width: 12.5}} />
                            <Typography variant="body2" component="p" marginLeft={0.5}>
                                {product.category}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            marginTop={5}
                        >
                            <Rating name="read-only" value={product.rating.rate} readOnly precision={0.5} size="small" />
                            <Typography variant="body2" component="p" marginLeft={0.5}>
                                {product.rating.rate}
                            </Typography>
                            <Typography variant="body3" component="p" marginLeft={0.5}>
                                ({product.rating.count} reviews)
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" component="h6">
                                R$ {product.price.toFixed(2)}
                            </Typography>

                        </Box>

                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{borderRadius: 0}}
                        component={Link}
                        to="/cart"
                        // onClick={() => history.push('/cart')}
                        >COMPRAR</Button>
                </Paper>
            </ThemeProvider>
        </Grid>
    )
}

export default ProductCard;