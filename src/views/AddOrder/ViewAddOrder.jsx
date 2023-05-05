import './styles.css'
import UsersData from "../../data/users.json"
import { useEffect, useState } from 'react'
import StickyHeadTable from '../../components/table/Table'
import BasicButtons from '../../components/button/Button'

const ViewAddOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async() => {
            const response = await fetch('http://localhost:8080/api/orders')
            const orders = await response.json()
            setOrders(orders)
        }
        getOrders()
    }, [])

    const handleClickButtonNewOrder = () => {
        alert('Nueva tarea')
    }

    return(
        <div className="ViewAddOrders-Container">
            <div className="title">Add Order</div>
            <div className="table-contenedor">
                <StickyHeadTable data={orders} columnheaders={['ID', 'Order #', 'Date', '# Products', 'Final Price', 'Options']}/>
            </div>
            <div className="button-neworder">
                <BasicButtons text={'New order'} handleClick={handleClickButtonNewOrder}/>
            </div>            
        </div>
    )
}

export default ViewAddOrder