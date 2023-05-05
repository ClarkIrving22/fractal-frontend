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
    const [ordernumber, setOrderNumber] = useState('')
    const [date, setDate] = useState('')
    const [productsnumber, setProductsNumber] = useState(0)
    const [finalprice, setFinalPrice] = useState(0)

    useEffect(() => {                 
            if(id){
                const getOrderInfo = async() => {
                    const response = await fetch(`http://localhost:8080/api/orders/${id}`)
                    const info = await response.json()
                    setOrderNumber(info.ordernumber)
                    setDate(info.date)
                    setProductsNumber(info.productsnumber)
                    setFinalPrice(info.finalprice)
                }
                getOrderInfo()

                const getOrders = async() => {
                    const response = await fetch(`http://localhost:8080/api/order_details/${id}`)
                    const details = await response.json()
                    setOrdersDetails(details)
                }
                getOrders()
            }               
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
        setOrderNumber(getValueFromEvent(event))
    }

    return(
        <div className="ViewAddOrders-Container">
            <div className="ViewAddOrders-title">{id != null ? 'Edit Order' : 'Add Order'}</div>
            <div className="ViewAddOrders-div-textfields1">
                <TextField label={"Order Number"} width={'15ch'} textInput={ordernumber} InputHandleOnChange={handleInputOrderNumber}/>
                <TextField label={"Date"} width={'15ch'} textInput={id == null ? getDate() : date} isDisabled={true}/>
                <TextField label={"Products #"} width={'15ch'} textInput={id == null ? 0 : productsnumber} isDisabled={true}/>
                <TextField label={"Final Price"} width={'15ch'} textInput={id == null ? 0: finalprice} isDisabled={true}/>
            </div>
            
            <div className="ViewAddOrders-table-contenedor">
                <StickyHeadTable
                    data={orderDetails}
                    columnheaders={['Product ID', 'Product Name', 'Unit Price', 'Quantity', 'Total Price', 'Options']}
                    keysToDelete={['id', 'order_id']}
                />
            </div>
            <div className="ViewAddOrders-button-neworder">
                <BasicButtons text={'Add Product'} handleClick={handleClickButtonNewOrder} isDisabled={id==null}/>
                <BasicButtons text={'Save Order'} handleClick={handleClickButtonNewOrder}/>
            </div>            
        </div>
    )
}

export default ViewAddOrder