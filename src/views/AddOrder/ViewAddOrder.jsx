import './styles.css'
import UsersData from "../../data/users.json"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import StickyHeadTable from '../../components/table/Table'
import BasicButtons from '../../components/button/Button'
import TextField from '../../components/textfield/TextField'

const getValueFromEvent = event => event.target.value

const ViewAddOrder = ({
}) => {
    const [orderDetails, setOrdersDetails] = useState([])
    const [{id}, setId] = useState(useParams())

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

    const getDate = () => {
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        return currentDate
    }

    const handleClickButtonNewOrder = () => {
        alert('New Product')
    }

    const handleInputOrderNumber = (event) => {
        setId(getValueFromEvent(event))
    }

    return(
        <div className="ViewAddOrders-Container">
            <div className="ViewAddOrders-title">{id != null ? 'Edit Order' : 'Add Order'}</div>
            <div className="ViewAddOrders-div-textfields1">
                <TextField label={"Order Number"} width={'20ch'} textInput={id} InputHandleOnChange={id == null ? handleInputOrderNumber : null} isDisabled={id != null}/>
                <TextField label={"Date"} width={'15ch'} textInput={getDate()}/>
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