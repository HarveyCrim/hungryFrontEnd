type orderItem = {
    name: string,
    quantity: string,
    menuItemId: string,
    _id? : string
}
const OrderCard = ({cartItems, status, total, address, estTime, image} : {estTime: string, image: string, cartItems: orderItem[], status: string, total: number, address: string}) => {
  return (
    <div className="w-[50%] border-2 p-3 rounded-md shadow-md">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Order Status: {status}</h1>
            {status != "Completed" && <h1 className="text-2xl font-bold">Expected by: {estTime}</h1>}
            {status == "Completed" && <h1 className="text-2xl font-bold">Delivered: {estTime}</h1>}
        </div>
        <div className="rounded-full w-[100%] h-[12px] bg-gray-200 mx-auto mt-4 overflow-hidden">
            <div className={`${status == "In Progress" && "w-[50%]"} ${status == "Out For Delivery" && "w-[75%]"} ${status == "Completed" && "w-[100%]"} bg-gray-500 h-full`}></div>
        </div>
        <div className="flex mt-6">
            <div className="w-[70%] space-y-5">
                <div>
                    <p className="font-bold">Delivering to:</p>
                    <p>{address}</p>
                </div>
                <div>
                    <p className="font-bold">Your Order:</p>
                    {
                        cartItems.map((item: orderItem, index: number) => {
                            return <p key = {index}>{item.name+" x "+ item.quantity}</p>
                        })
                    }
                </div>
                <div className = "h-[1px] bg-gray-300 rounded-full w-[30%]"></div>
                <div>
                    <p className="font-bold">Total</p>
                    <p>{"$"+total}</p>
                </div>
            </div>
            <div className="w-[25%]">
                <img className= "object-cover rounded-md" src = {image} />
            </div>
        </div>
    </div>
  )
}

export default OrderCard