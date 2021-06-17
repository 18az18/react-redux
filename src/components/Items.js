import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItemsInCategory } from '../actions/itemActions'
import Item from './Item';

const Items = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category.selectedCategory);
    console.log("Items' category is: " + category + ' in Items.js');
    const itemList = useSelector(state => state.items.itemsInCategory);
    console.log('item list from redux is: ', itemList);
    //const [itemList, setItemList] = useState([]);
    
    useEffect(() => {
        dispatch(fetchItemsInCategory(category));
    }, [category, dispatch])

    return (
        <div>
            {itemList.map(({name, price, url}, index) => (
                <Item key={index} name={name} price={price} url={url}/>
            ))}
        </div>
    )
}

export default Items
