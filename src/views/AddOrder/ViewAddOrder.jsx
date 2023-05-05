import './styles.css'
import UsersData from "../../data/users.json"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import StickyHeadTable from '../../components/table/Table'
import BasicButtons from '../../components/button/Button'
import TextField from '../../components/textfield/TextField'

const ViewAddOrder = ({
    
}) => {
    const { id } = useParams();
    const [orderDetails, setOrdersDetails] = useState([])

    useEffect(() => {
        const getOrders = async() => {
            if(id) {
                const response = await fetch(`http://localhost:8080/api/order_details/${id}`)
                const details = await response.json()
                setOrdersDetails(details)
            }
        }
        getOrders()
    }, [id])

    const handleClickButtonNewOrder = () => {
        alert('New Product')
    }

    return(
        <div className="ViewAddOrders-Container">
            <div className="ViewAddOrders-title">{id != null ? 'Edit Order' : 'Add Order'}</div>
            <div className="ViewAddOrders-div-textfields1">
                <TextField label={"Order Number"} text={'Order Number'} width={'20ch'} textInput={id}/>
                <TextField label={"Date"} text={'Date'} width={'15ch'}/>
            </div>
            
            <div className="ViewAddOrders-table-contenedor">
                <StickyHeadTable
                    data={orderDetails}
                    columnheaders={['Product ID', 'Product Name', 'Unit Price', 'Quantity', 'Total Price', 'Options']}
                    keysToDelete={['id', 'order_id']}/>
            </div>
            <div className="ViewAddOrders-button-neworder">
                <BasicButtons text={'New Product'} handleClick={handleClickButtonNewOrder}/>
            </div>            
        </div>
    )
}

export default ViewAddOrder