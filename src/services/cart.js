function getCart() {
    return fetch('https://fakestoreapi.com/carts/1')
        .then(res=>res.json());
}


export default getCart