
const CartItem = ({ name, quantity, subtotal, url }) => {
    const image = require.context('../assets/', true);
    const style = {
        width: '100px',
        height: '100px'
    };
    return (
        <div>
            <img src={image(url).default} alt={name} style={style}/>
            <p>Quantity: { quantity }$</p>
            <p>Subtotal: { subtotal }</p>
        </div>
    )
}

export default CartItem
