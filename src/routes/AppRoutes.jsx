import { Routes, Route, Navigate } from "react-router-dom"
import ViewAddOrder from "../views/AddOrder/ViewAddOrder"
import ViewMyOrders from "../views/MyOrders/ViewMyOrders"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="my-orders" element={<ViewMyOrders />}/>
                <Route path="add-order" element={<ViewAddOrder />} />
                <Route path="add-order/:id/:ordernumber/:date" element={<ViewAddOrder />} />
                <Route path="/" element={<Navigate to="/my-orders" />}/>
                
            </Routes>
        </>
    )
}