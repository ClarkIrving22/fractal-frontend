import './styles.css'
import UsersData from "../../data/users.json"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import StickyHeadTable from '../../components/table/Table'
import BasicButtons from '../../components/button/Button'
import AlertDialog from '../../components/dialog/AlertDialog';

const ViewMyOrders = () => {
    const [orders, setOrders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idSelectedForDelete, setIdSelectedForDelete] = useState(0)

    useEffect(() => {
        const getOrders = async() => {
            const response = (await fetch('http://localhost:8080/api/orders'))
            const orders = await response.json()
            setOrders(orders)
        }
        getOrders()
    }, [isModalOpen])

    const navigate = useNavigate();

    const handleClickButtonNewOrder = () => {
        navigate('/add-order');
    }

    const handleEditButton = (item) => {
        navigate(`/add-order/${item.id}`);
    }   

    function handleAcceptDeleteModal(){
        fetch(`http://localhost:8080/api/orders/${idSelectedForDelete}`, {
            method: 'DELETE',
        })
        .then(setIsModalOpen(false))
        .catch(error => {console.error(error)})    
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    const handleDeleteButton = (item) => {
        setIsModalOpen(true)
        setIdSelectedForDelete(item.id)
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
            {isModalOpen && <AlertDialog onClose={handleCloseModal} onDelete={handleAcceptDeleteModal} />}
        </div>
    )
}

export default ViewMyOrders