import { useParams } from "react-router-dom"
import { getSingleRes } from "../api/resApi"
import RestaurantInfo from "../components/RestaurantInfo"
import { SpinnerCircular } from "spinners-react"
import { useEffect } from "react"
import MenuItem from "../components/MenuItem"
import Cart from "../components/Cart"
import { useSelector } from "react-redux"
import { IRootState } from "../redux/store"
import { useDispatch } from "react-redux"
import { switchBlur } from "../redux/blurSlice"
import ConfirmDetails from "../components/ConfirmDetails"
const Restaurant = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const {data, getSingleResFn, isPending} = getSingleRes(id!)
  const blur = useSelector<IRootState, boolean>(state => state.blurReducer.blur)
  useEffect(() => {
    getSingleResFn()
    dispatch(switchBlur(false))
  }, [])
  if(isPending){
    return <SpinnerCircular />
  }
  else{
    console.log(data)
  }
  return (
    <div className = {`relative ${blur && "overflow-hidden h-screen"}`}>
        {blur && <div className="absolute top-0 bg-black opacity-60 w-screen h-screen z-30"></div>}
        <div className = {`flex z-10 p-[40px] ${blur && "opacity-10"} space-x-10`}>
            <img className = "absolute z-10 max-h-[500px] w-[75%]" src = {data?.data.imageUrl} alt = "" />
            <div className = "w-[70%] space-y-6 z-20 mt-[300px]">
                <RestaurantInfo name = {data?.data.name} city = {data?.data.city} cuisines={data?.data.cuisineList}/>
                <div className="pt-2">
                    <h1 className = "text-4xl font-semibold pb-3">Menu</h1>
                    <div>
                        {
                            data?.data.menuItems.map((item: {itemName: string, itemPrice: number}, index: number) => {
                                return <MenuItem id = {id!}  key = {index} name = {item.itemName} price = {item.itemPrice}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className = "w-[30%] z-20">
                <Cart id = {id!} deliveryPrice = {data?.data.deliveryPrice}/>
            </div>
        </div>
        {blur && <ConfirmDetails/>}
    </div>
  )
}

export default Restaurant