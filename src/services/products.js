export function getProducts() {
    return fetch('https://fakestoreapi.com/products')
        .then(data => data.json());
}