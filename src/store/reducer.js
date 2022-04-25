const initialState = {
    cart : [
        {
            id: 1,
            itemImg : 'images/product1.png',
            Name: 'body cleanser',
            Size: '(250ml)',
            Price: 250.00,
            qty: 1
        },
        {
            id: 2,
            itemImg : 'images/product2.png',
            Name: 'body cleanser',
            Size: '(250ml)',
            Price: 250.00,
            qty: 1
        },
        {
            id: 3,
            itemImg : 'images/product3.png',
            Name: 'body cleanser',
            Size: '(250ml)',
            Price: 250.00,
            qty: 1
        },
    ]
}

const reducer = (state = initialState, action) => {
    return state;
}

export default reducer;