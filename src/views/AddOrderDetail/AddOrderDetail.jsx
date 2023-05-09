import './styles.css'
import { useEffect, useState } from 'react'
import TextField from '../../components/textfield/TextField'
import ComboBox from '../../components/select/Select'
import BasicButtons from '../../components/button/Button';

const AddOrderDetail = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
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
    }, [])

    return(
        <div className='div-general'>
            <div className='div-titulo'>Adding Product</div>
            <ComboBox values={products}/>
            <TextField width={'33.5ch'} label={'Quantity'} type={'number'}/>
            <div className='div-buttons'>
                <BasicButtons text='Save'/>
                <BasicButtons text='Cancel'/>
            </div>
            
        </div>
    )
}

export default AddOrderDetail