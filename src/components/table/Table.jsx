import './styles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const Table = ({
    UsersData
}) => {
    const renderRow = (UsersData) => {
        const birthDate = UsersData.fechanac || '----'
        const phoneNumber = UsersData.telefono || '----'

        return (
          <tr key={UsersData.dni} className="tabla-root-tbody-tr">
            <td className="tabla-root-td">{UsersData.apellidosynombres}</td>
            <td className="tabla-root-td">{UsersData.dni}</td>
            <td className="tabla-root-td">{birthDate}</td>
            <td className="tabla-root-td">{phoneNumber}</td>
            <td className="tabla-root-td">{UsersData.direccion}</td>
            <td className="tabla-root-td">
                {/*<Tooltip title="Editar" placement="top-end" arrow>*/}
                    <IconButton className="IconButton">
                        <EditIcon className="Icon" sx={{color: "#FB8C00"}}/>
                    </IconButton>
                {/*</Tooltip>*/}
                {/*<Tooltip title="Eliminar" placement="top-end" arrow>*/}
                    <IconButton className="IconButton">
                        <DeleteIcon className="Icon" sx={{color: "#FF5722"}}/>
                    </IconButton>                    
                {/*</Tooltip>*/}
            </td>
          </tr>
        )
    }

    return(
        <div id="div-tabla-root" className="div-tabla-root">
            <table id="tabla-root" className="tabla-root">
                <thead>
                    <tr>                            
                        <th className="tabla-root-th">Apellidos y Nombres</th>
                        <th className="tabla-root-th">DNI</th>
                        <th className="tabla-root-th">Fecha Nac.</th>
                        <th className="tabla-root-th">Teléfono</th>
                        <th className="tabla-root-th">Dirección</th>
                        <th className="tabla-root-th">Acciones</th>
                    </tr>
                </thead>
                    <tbody>
                        { UsersData.map(UsersData => renderRow(UsersData)) }
                    </tbody>
            </table>
        </div>
    )
}

export default Table