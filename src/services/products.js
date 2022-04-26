export function getProducts() {
    return fetch('https://fakestoreapi.com/products')
        .then(data => data.json());
}

export function getProduct(id) {
    return fetch(`https://fakestoreapi.com/products/${id}`)
        .then(data => data.json());
}