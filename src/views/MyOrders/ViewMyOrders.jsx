import './styles.css'
import UsersData from "../../data/users.json"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import StickyHeadTable from '../../components/table/Table'
import BasicButtons from '../../components/button/Button'

const ViewMyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async() => {
            const response = (await fetch('http://localhost:8080/api/orders'))
            const orders = await response.json()
            setOrders(orders)
        }
        getOrders()
    }, [])

    const navigate = useNavigate();

    const handleClickButtonNewOrder = () => {
        navigate('/add-order');
    }

    const handleEditButton = (item) => {
        navigate(`/add-order/${item.id}`);
    }

    const handleDeleteButton = (item) => {
        console.log(item)
    }

    return(
        <div className="ViewMyOrders-Container">
            <div className="ViewMyOrders-title">My Orders</div>
            <div className="ViewMyOrders-table-contenedor">
                <StickyHeadTable handleDeleteButton={handleDeleteButton} handleEditButton={handleEditButton} data={orders} columnheaders={['ID', 'Order #', 'Date', '# Products', 'Final Price', 'Options']}/>
            </div>
            <div className="ViewMyOrders-button-neworder">
                <BasicButtons text={'New order'} handleClick={handleClickButtonNewOrder}/>
            </div>
        </div>
    )
}

export default ViewMyOrders