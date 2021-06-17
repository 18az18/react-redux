import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const Sidebars = () => {
    const currentSelectedCategory = useSelector((state) => state.category.selectedCategory);
    console.log('current selected category is: ', currentSelectedCategory);
    const categories = useSelector( state => state.category.category );
    console.log('categories is: ', categories);

    return (
        <div>
            {categories.map((category, index) => (
                <Sidebar key={index} category={category} isSelected={currentSelectedCategory}/>
            ))}
        </div>
    )
}

export default Sidebars
