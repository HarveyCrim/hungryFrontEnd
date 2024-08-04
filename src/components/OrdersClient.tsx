import { useState } from "react"
import Footer from "./Footer"
import Header from "./Header"
import OrderCard from "./OrderCard"
import { getAllOrders } from "../api/orderApi"
import { SpinnerCircular } from "spinners-react"
const OrdersClient = () => {
  const [active, setActive] = useState<boolean>(true)
  const {allOrdersData, isPending} = getAllOrders()

  const addZero = (num: number) => {
    if(num < 10){
        return "0"+num
    }
    return num
  }
  if(isPending){
    return <SpinnerCircular />
  }
  return (
    <>
        <Header />
        <div className="p-4 min-h-[71vh]" >
            <div className="flex gap-5">
                <h1 onClick = {() => setActive(true)} className={`text-xl cursor-pointer font-semibold text-black ${active && "border-b-4 border-orange-500 rounded-md" }`}>Active</h1>
                <h1 onClick = {() => setActive(false)} className={`text-xl cursor-pointer font-semibold text-black ${!active && "border-b-4 border-orange-500 rounded-md" }`}>Completed</h1>
            </div>
            <div className="mt-5 space-y-4">
                {
                    active && allOrdersData?.data.map((item: any, index: number) => {
                        const date = new Date()
                        date.setMinutes(date.getMinutes() + item.restaurant.deliveryTime)
                        const dtStr = addZero(date.getHours()) + ":"+addZero(date.getMinutes())
                        const statString = item.status == "inProgress" ? "In Progress" : ("Out For Delivery")
                        if(item.status != "delivered"){
                            return <OrderCard key = {index} estTime = {dtStr} image = {item.restaurant.imageUrl} cartItems = {item.cartItems} status = {statString} total = {item.totalAmount} address = {item.user.address+", "+item.user.city+", "+item.user.country}/>
                        }
                        
                    })
                }
                {
                    !active && allOrdersData?.data.map((item: any, index: number) => {
                        const date = new Date()
                        date.setMinutes(date.getMinutes() + item.restaurant.deliveryTime)
                        const dtStr = addZero(date.getHours()) + ":"+addZero(date.getMinutes())
                        if(item.status == "delivered"){
                            return <OrderCard key = {index} estTime = {dtStr} image = {item.restaurant.imageUrl} cartItems = {item.cartItems} status = {"Completed"} total = {item.totalAmount} address = {item.user.address+", "+item.user.city+", "+item.user.country}/>
                        }
                        
                    })
                }
            </div>
        </div>
        <Footer />
    </>
  )
}

export default OrdersClient