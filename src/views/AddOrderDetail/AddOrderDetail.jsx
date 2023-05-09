import './styles.css'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '../../components/textfield/TextField'
import ComboBox from '../../components/select/Select'
import BasicButtons from '../../components/button/Button';

const AddOrderDetail = ({
    isForEditing,
    orderSelectedForEdit,
    handleCloseModal,
    order_id,
}) => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    
    useEffect(() => {
        if(!isForEditing){
            const getProducts = async() => {
                const response = (await fetch('http://localhost:8080/api/products'))
                const products = await response.json()
                const udpatedProducts = products.map((product) => {
                    product = { ...product, label: product.name }
                    delete product.name
                    return product
                })
                setProducts(udpatedProducts)
            }
            getProducts()
        }
        else{
            setQuantity(orderSelectedForEdit.quantity)
            setProducts([{
                label: orderSelectedForEdit.product_name 
            }])
            setSelectedProduct({
                label: orderSelectedForEdit.product_name 
            })
        }
        
    }, [])

    const handleSelectOnChange = (product) => {
        setSelectedProduct(product)
    }

    const handleTextFieldOnChange = (quantity) => {
        setQuantity(quantity)
    }

    const navigate = useNavigate();
    const addProduct = () => {
        fetch('http://localhost:8080/api/order_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: order_id,
                product_id: selectedProduct.id,
                product_name: selectedProduct.label,
                product_price: selectedProduct.price,
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            handleCloseModal()
            navigate(`/add-order/${data.order_id}`)
        })
        .catch(error => {console.error(error)})
    }

    const editProduct = () => {
        fetch(`http://localhost:8080/api/order_details/${order_id}/${orderSelectedForEdit.product_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: order_id,
                product_id: orderSelectedForEdit.product_id,
                product_name: orderSelectedForEdit.product_name,
                product_price: orderSelectedForEdit.product_price,
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            handleCloseModal()
            navigate(`/add-order/${data.order_id}`)
        })
        .catch(error => {console.error(error)})
    }

    const handleSaveButton = () => {
        if(selectedProduct!==null && quantity!==null && quantity!=0){
            !isForEditing ? addProduct() : editProduct()
        }
        else{
            alert("Please fill in the fields properly")
        }
    }

    return(
        <div className='div-general'>
            <div className='div-titulo'>{!isForEditing ? 'Adding Product' : 'Editing Product'}</div>
            <ComboBox values={products} value={selectedProduct} onChange={handleSelectOnChange} isDisabled={isForEditing} />
            <TextField width={'33.5ch'} label={'Quantity'} type={'number'} textInput={quantity} InputHandleOnChange={handleTextFieldOnChange}/>
            <div className='div-buttons'>
                <BasicButtons text={!isForEditing ? 'Save' : 'Update'} handleClick={handleSaveButton} />
                <BasicButtons text='Cancel' handleClick={handleCloseModal} />
            </div>
        </div>
    )
}

export default AddOrderDetail