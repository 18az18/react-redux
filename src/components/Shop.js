import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchItems } from '../actions/itemActions'
import { fetchCategories } from '../actions/categoryActions'
import Sidebars from './Sidebars'
import Items from './Items'
import { Link } from 'react-router-dom'

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <div className='container grid grid1-3'>
            <Sidebars/>
            <Items />
            <Link to='/user/address'>Go to address</Link>
        </div>
    )
}

export default Shop
