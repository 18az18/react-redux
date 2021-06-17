import { useDispatch } from 'react-redux';
import { setCategory } from '../actions/categoryActions'

const Sidebar = ({ category, isSelected }) => {
    console.log('sidebar selected category is: ', isSelected);
    const dispatch = useDispatch();
    const onClick = () => {
        console.log("category: " + category + ' is being clicked in Sidebar.js');
        dispatch(setCategory(category));
    };
    return (
        <div>
            <h1 style={{ width: '200px' }} onClick={onClick}>This is {category}</h1>
        </div>
    )
}

export default Sidebar
