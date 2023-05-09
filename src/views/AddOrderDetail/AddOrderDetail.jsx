import './styles.css'
import SelectSmall from '../../components/select/Select'
import TextField from '../../components/textfield/TextField'

const AddOrderDetail = () => {
    return(
        <div className='div-general'>
            <SelectSmall />
            <TextField width={'33.5ch'} label={'Quantity'} />
        </div>
        
    )
}

export default AddOrderDetail