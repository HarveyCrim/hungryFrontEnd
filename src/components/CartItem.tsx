import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../redux/cartSlice";
const CartItem = ({name, quantity, price}: {name: string, quantity: number, price: number}) => {
  const dispatch = useDispatch()
  const deleteItem = () => {
    dispatch(deleteFromCart({name}))
  }
  return (
    <div className = "flex justify-between">
        <div className="flex items-center gap-2">
            <span className="border-2 px-2 text-lg">{quantity}</span>
            <span className="text-lg">{name}</span>
        </div>
        <div className="flex items-center">
            <MdDelete onClick = {() => deleteItem()} className = "fill-red-500 cursor-pointer" size={30}/>
            <span className="text-xl">{"$"+price}</span>
        </div>
    </div>
  )
}

export default CartItem