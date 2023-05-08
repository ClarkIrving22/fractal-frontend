import './styles.css'
import UsersData from "../../data/users.json"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StickyHeadTable from '../../components/table/Table'
import BasicButtons from '../../components/button/Button'
import TextField from '../../components/textfield/TextField'
import AlertDialog from '../../components/dialog/AlertDialog';
import BasicModal from '../../components/modal/Modal';

const getValueFromEvent = event => event.target.value

const ViewAddOrder = ({
}) => {
    const [orderDetails, setOrdersDetails] = useState([])
    const {id} = useParams()
    const [ordernumber, setOrderNumber] = useState('')
    const [date, setDate] = useState('')
    const [productsnumber, setProductsNumber] = useState(0)
    const [finalprice, setFinalPrice] = useState(0)
    const [btnCreateDisabled, setbtnCreateDisabled] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productIdSelectedForDelete, setProductIdSelectedForDelete] = useState(0)

    useEffect(() => {
            if(id){
                setbtnCreateDisabled(true)
                const getOrders = async() => {
                    const response = await fetch(`http://localhost:8080/api/order_details/${id}`)
                    const details = await response.json()
                    setOrdersDetails(details)
                }

                const getOrderInfo = async() => {
                    const response = await fetch(`http://localhost:8080/api/orders/${id}`)
                    const info = await response.json()
                    setOrderNumber(info.ordernumber)
                    setDate(info.date)
                    setProductsNumber(info.productsnumber)
                    setFinalPrice(info.finalprice)
                    getOrders()
                }
                getOrderInfo()
            }
            else{
                setDate(getCurrentDate())
            }               
    },[isModalOpen])

    const getCurrentDate = () => {
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        return currentDate
    }

    const navigate = useNavigate();

    const handleClickButtonNewOrder = () => {
            if(ordernumber.trim() !== ''){
                fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ordernumber: ordernumber,
                    date: date
                })
                })
                .then(response => response.json())
                .then(data => {
                    navigate(`/add-order/${data.id}`)
                    setbtnCreateDisabled(true)
                })
                .catch(error => {console.error(error)})
            }
            else{
                alert("Please fill Order Number field first")
            }
    }

    const handleClickButtonUpdateOrderNumber = () => {
        if(ordernumber.trim() !== ''){
            fetch(`http://localhost:8080/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ordernumber: ordernumber
            })
            })
            .then(response => response.json())
            .then(data => {
                navigate(`/add-order/${data.id}`)
                setbtnCreateDisabled(true)
            })
            .catch(error => {console.error(error)})
        }
        else{
            alert("Please fill Order Number field first")
        }
    }

    const handleInputOrderNumber = (event) => {
        setOrderNumber(getValueFromEvent(event))
        setbtnCreateDisabled(false)
    }

    const handleEditButton = (item) => {
        //navigate(`/add-order/${item.id}`);
    }   

    function handleAcceptDeleteModal(){
        fetch(`http://localhost:8080/api/order_details/${id}/${productIdSelectedForDelete}`, {
            method: 'DELETE',
        })
        .then(setIsModalOpen(false), navigate(`/add-order/${id}`))
        .catch(error => {console.error(error)})    
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    const handleDeleteButton = (item) => {
        setIsModalOpen(true)
        setProductIdSelectedForDelete(item.product_id)
    }

    return(
        <div className="ViewAddOrders-Container">
            <div className="ViewAddOrders-title">{id != null ? 'Edit Order' : 'Add Order'}</div>
            <div className="ViewAddOrders-div-textfields1">
                <TextField label={"Order Number"} width={'15ch'} textInput={ordernumber} InputHandleOnChange={handleInputOrderNumber}/>
                <TextField label={"Date"} width={'15ch'} textInput={date} isDisabled={true}/>
                <TextField label={"Products #"} width={'15ch'} textInput={id == null ? 0 : productsnumber} isDisabled={true}/>
                <TextField label={"Final Price"} width={'15ch'} textInput={id == null ? 0: finalprice} isDisabled={true}/>
            </div>
            
            <div className="ViewAddOrders-table-contenedor">
                <StickyHeadTable
                    data={orderDetails}
                    columnheaders={['Product ID', 'Product Name', 'Unit Price', 'Quantity', 'Total Price', 'Options']}
                    keysToDelete={['id', 'order_id']}
                    handleDeleteButton={handleDeleteButton}
                    handleEditButton={handleEditButton}
                />
            </div>
            <div className="ViewAddOrders-button-neworder">
                <BasicButtons text={'Add Product'} handleClick={handleClickButtonNewOrder} isDisabled={id == null}/>
                <BasicButtons text={id==null ? 'Create Order' : 'Update order number'} handleClick={id==null ? handleClickButtonNewOrder : handleClickButtonUpdateOrderNumber} isDisabled={btnCreateDisabled}/>
            </div>
            <BasicModal></BasicModal>
            {isModalOpen && <AlertDialog onClose={handleCloseModal} onDelete={handleAcceptDeleteModal} />}
        </div>
    )
}

export default ViewAddOrder