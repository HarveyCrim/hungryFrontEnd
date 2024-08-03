import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addTocart, removeFromCart } from "../redux/cartSlice";
const MenuItem = ({name, price, id}: {name: string, price: number, id: string}) => {
  const dispatch = useDispatch()
  const addItem = () => {
    dispatch(addTocart({name, price, id}))
  }
  const removeItem = () => {
    dispatch(removeFromCart({name, price, id}))
  }
  return (
    <div className = "bg-white w-full border-2 px-4 py-6 shadow-md rounded-lg">
        <div className="space-y-6">
            <p className = "font-medium text-lg">{name}</p>
            <p className = "font-medium text-xl">{"$"+price}</p>
        </div>
        <div className="flex justify-end">
            <IoIosAddCircle onClick = {() => addItem()} size={40} className="hover:fill-gray-500 cursor-pointer"/>
            <IoIosRemoveCircle onClick = {() => removeItem()} size={40} className="hover:fill-gray-500 cursor-pointer"/>
        </div>
    </div>
  )
}

export default MenuItem