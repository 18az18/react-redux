import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setItemQuantity } from '../actions/itemActions'


const Item = ( { name, price, url } ) => {
    const dispatch = useDispatch();
    console.log('current item is: ', name);
    console.log('current url is: ', url);
    const cartItem1 = useSelector((state) => state.items.cart);
    const [itemCount, setItemCount] = useState(0);
    console.log('item count is, ', itemCount);
    const image = require.context('../assets/', true);
    const style = {
        width: '100px',
        height: '100px'
    };

    useEffect(() => {
        //console.log('cart item 1 is: ', cartItem1);
        const cartItem2 = cartItem1.filter((item) => item.name === name);
       // console.log('cart item 2 is: ', cartItem2);
        const cartItemCount = (cartItem2 && cartItem2.length) ? cartItem2[0].quantity : 0;
        //console.log('cart item count is:', cartItemCount);
        setItemCount(cartItemCount);
    }, [cartItem1, name]);
    // const style2 = {
    //     width: '100%',
    //     height: '100%'
    // };

    return (
        <div className="container flex">
            <img src={image(url).default} alt={name} style={style}/>
            <p>Price: {price}$</p>
            <input
                type='number'
                name='count'
                min='0'
                value={itemCount}
                onChange={(e) => {
                    console.log(e.target.value === '');
                    if (e.target.value === '') {
                        dispatch(setItemQuantity(name, 0, 0, url))
                        setItemCount(0);
                    } else {
                        dispatch(setItemQuantity(name, e.target.value, price * e.target.value, url));
                        setItemCount(e.target.value);
                    }
                }}
            />
            <div className="flex flex-v">
            <button type='button' onClick={() => {
                    dispatch(setItemQuantity(name, itemCount + 1, price * (itemCount + 1), url));
                    setItemCount(itemCount + 1);
                }}>+</button>
            <button type='button' onClick={() => {
                    if (itemCount > 0) {
                        dispatch(setItemQuantity(name, itemCount - 1, price * (itemCount - 1), url));
                        setItemCount(itemCount - 1);
                    }
                }}>-</button>
            <p>Actual item count is: {itemCount}</p>
            </div>
            
        </div>
    )
}

Item.defaultProps = {
    name: 'food',
    price: 2.0,
    url: './dog.png'
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
}

export default Item
