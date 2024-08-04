import { useState } from "react"
import {  updateSingleOrder } from "../api/orderApi"
import { toast } from "sonner"
import { reloadTheOrders } from "../redux/userSlice";
import { useDispatch } from "react-redux";

type orderItem = {
    name: string,
    quantity: string,
    menuItemId: string,
    _id? : string
}

const OrderCardRes = ({name, cartItems, status, total, address, orderId} : { name: string, orderId: string, cartItems: orderItem[], status: string, total: number, address: string}) => {
    const [orderStatus, setOrderStatus] = useState<string>(status == "inProgress" ? "In Progress" : status == "outForDelivery" ? "Out For Delivery" : "Completed")
    const [menu, showMenu] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {updSingleOrder} = updateSingleOrder()
    const changeStatus = async (currStatus: string) => {
        await updSingleOrder({orderId, newStatus:currStatus})
        dispatch(reloadTheOrders())
        toast.success("Status Updated")
        showMenu(false)
        setOrderStatus(currStatus == "inProgress" ? "In Progress" : currStatus == "outForDelivery" ? "Out For Delivery" : "Completed")
    }
    return (
      <div className="w-[70%] border-2 p-5 rounded-md shadow-md">
        <div className="w-full flex justify-between">
            <div>
                <p className="font-bold">Customer's Name:</p>
                <p>{name}</p>
            </div>
            <div>
                <p className="font-bold">Delivering to:</p>
                <p>{address}</p>
            </div>
            <div>
                <p className="font-bold">Customer's Order:</p>
                {
                    cartItems.map((item: orderItem, index: number) => {
                        return <p key = {index}>{item.name+" x "+ item.quantity}</p>
                    })
                }
            </div>
            <div>
                <p className="font-bold">Total</p>
                <p>{"$"+total}</p>
            </div>
        </div>
        <div className="flex gap-2 items-center"> 
            <div className = "font-bold">Order Status</div>
            <div className="relative">
                <div onClick = {() => showMenu(!menu)} className="border-2 w-[200px] p-3 rounded-md">{orderStatus}</div>
                {menu && <div className="absolute bg-white w-[200px] space-y-2 border-2 shadow-sm">
                    <p onClick = {() => changeStatus("inProgress")} className="hover:bg-gray-200 cursor-pointer p-3">In Progress</p>
                    <p onClick = {() => changeStatus("outForDelivery")} className="hover:bg-gray-200 cursor-pointer p-3">Out For Delivery</p>
                    <p onClick = {() => changeStatus("delivered")} className="hover:bg-gray-200 cursor-pointer p-3">Completed</p>
                </div>}
            </div>
        </div>
      </div>
    )
  }

export default OrderCardRes