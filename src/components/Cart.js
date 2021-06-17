import { useSelector } from 'react-redux'

const Cart = () => {

    const cart = useSelector((state) => state.items.cart);
    let total = 0;
    cart.map((item) => {
    total += item.subtotal;
    return item;
    })
    const checkout = (e) => {
        e.preventDefault();
        console.log('checking out');
        // 
    }

    return (
        <div>
            {cart.map(({name, quantity, subtotal}, index) => (
                <h4 key={index}>Item name: {name} Quantity: {quantity} Subtotal: ${subtotal}</h4>
            ))}
            <h4>Total price: {total}</h4>
            {/* visa paymeng goes here */}
            {/* paypal button before submitting the visa payment */}
            <button type="button" onClick={checkout}>Check out</button>
        </div>
    )
}

export default Cart
