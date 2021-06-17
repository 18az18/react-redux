import { NavLink } from 'react-router-dom'
const PersonalPage = () => {

    return (
        <div className='container grid grid1-3'>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/user/address'> Address </NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/payment'> Payment information </NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/orderhistory'> Order History </NavLink>
                    </li>
                </ul>
            </nav>   
        </div>
    )
}

export default PersonalPage
