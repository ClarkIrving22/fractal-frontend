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

const ViewAddOrder = ({
}) => {
    const [orderDetails, setOrdersDetails] = useState([])
    const {id} = useParams()
    const [ordernumber, setOrderNumber] = useState('')
    const [date, setDate] = useState('')
    const [productsnumber, setProductsNumber] = useState(0)
    const [finalprice, setFinalPrice] = useState(0)
    const [btnCreateDisabled, setbtnCreateDisabled] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false);
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
    },[isAlertOpen, isModalOpen])

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

    const handleInputOrderNumber = (value) => {
        setOrderNumber(value)
        setbtnCreateDisabled(false)
    }

    const [isForEditing, setIsForEditing] = useState(false)
    const [orderSelectedForEdit, setOrderSelectedForEdit] = useState(null)
    const handleEditButton = (item) => {
        setOrderSelectedForEdit(item)
        setIsForEditing(true)
        setIsModalOpen(true)
    }   

    function handleAcceptDeleteAlert(){
        fetch(`http://localhost:8080/api/order_details/${id}/${productIdSelectedForDelete}`, {
            method: 'DELETE',
        })
        .then(setIsAlertOpen(false), navigate(`/add-order/${id}`))
        .catch(error => {console.error(error)})    
    }

    function handleCloseAlert() {
        setIsAlertOpen(false);
    }

    const handleDeleteButton = (item) => {
        setIsAlertOpen(true)
        setProductIdSelectedForDelete(item.product_id)
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    const handleOpenModal = () => {
        setIsForEditing(false)
        setIsModalOpen(true)
    }

    const handleBackButton = () => {
        navigate(`/my-orders`)
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
                <BasicButtons text={'Back to My Orders'} handleClick={handleBackButton}/>
                <BasicButtons text={'Add Product'} handleClick={handleOpenModal} isDisabled={id == null}/>
                <BasicButtons text={id==null ? 'Create Order' : 'Update order number'} handleClick={id==null ? handleClickButtonNewOrder : handleClickButtonUpdateOrderNumber} isDisabled={btnCreateDisabled}/>
            </div>
            {isAlertOpen && <AlertDialog onClose={handleCloseAlert} onDelete={handleAcceptDeleteAlert} />}
            {isModalOpen && <BasicModal onClose={handleCloseModal} order_id={id} isForEditing={isForEditing} orderSelectedForEdit={orderSelectedForEdit} />}
        </div>
    )
}

export default ViewAddOrder