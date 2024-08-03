import { useSelector } from "react-redux"
import { IRootState } from "../redux/store"
import CartItem from "./CartItem"
import { useDispatch } from "react-redux"
import { switchBlur } from "../redux/blurSlice" 
type product = {
    name: string,
    quantity: number,
    price: number
}
const Cart = ({deliveryPrice, id}: {deliveryPrice: number, id: string}) => {
  const resId = useSelector<IRootState, string>(state => state.cartReducer.resId)
  const dispatch = useDispatch()
  const products = useSelector<IRootState, product[]>((state) => state.cartReducer.products)
  const total = useSelector<IRootState, number>((state) => state.cartReducer.total)
  return (
    <div className="shadow-lg sticky top-10 p-2 rounded-md p-5 border-2">
        {(total == 0 || resId !== id) && <p className="mb-5 mx-auto text-center font-medium text-lg">The Cart is Empty</p>}
        {total > 0 && resId === id && <div>
            <div className="flex justify-between"> 
                <span className="text-3xl font-medium">Your Order:</span>
                <span className="text-3xl font-medium">{"$" + (total as number + deliveryPrice)}</span>
            </div>
            <div className="my-6 space-y-2">
                {
                   products.map((item, index) => {
                        return <CartItem key = {index} name = {item.name} quantity = {item.quantity} price = {item.price}/>
                    })
                }
            </div>
            <div className="w-[90%] h-[1px] bg-gray-300 mx-auto"> </div>
            <div className="flex mt-5 mb-8 justify-between">
                <span className="text-lg font-medium">Delivery Price: </span>
                <span className="text-xl font-medium">{"$"+deliveryPrice}</span>
            </div>
        </div>}
        <button onClick = {() => {
            if(total == 0 || resId !== id)
                    return
                dispatch(switchBlur(true))
            }} className={`disabled ${(total == 0 || resId !== id) ? "cursor-default bg-orange-300" : "bg-orange-500 cursor-pointer"} text-white font-medium block mx-auto text-xl p-2 rounded-lg`}>Go to Checkout</button>
    </div>
  )
}

export default Cart