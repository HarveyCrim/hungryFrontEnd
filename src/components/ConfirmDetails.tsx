import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../zodSchemas/restaurant"
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { switchBlur } from "../redux/blurSlice";
import { useEffect } from "react";
import { getUserManually } from "../api/useApi";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useLocation } from "react-router-dom";
import { createCheckoutFrontEnd } from "../api/orderApi";
type product = {
    name: string,
    quantity: number,
    price: number,
    id: string
}
const ConfirmDetails = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const products = useSelector<IRootState, product[]>(state => state.cartReducer.products)
  const total = useSelector<IRootState, number>((state) => state.cartReducer.total)
  const {register, handleSubmit, reset} = useForm<userType>({
    resolver: zodResolver(userSchema)
  })
  const {data, isPending, getUserWithClick} = getUserManually()
  const {stripeData, checkoutCreated } = createCheckoutFrontEnd()
  useEffect(() => {
    if(!data)
        getUserWithClick()
    else{
        reset({
            address: data.data.address,
            email: data.data.email,
            name: data.data.name,
            country: data.data.country,
            city: data.data.city
        })
    }

  }, [data])
  type userType = Zod.infer<typeof userSchema>
  type checkoutRequest = {
    cartItems: {
        menuItemId: string,
        name: string,
        quantity: number
    }[],
    deliveryDetails: {
        email: string,
        name: string,
        address: string,
        city: string
    },
    restaurantId: string,
    totalAmount: number
}
  const submit: SubmitHandler<userType> = async (data: userType) => {
    const submitData: checkoutRequest = {
        cartItems: products?.map((item: product) => {
            return {
                menuItemId: item.id as string,
                name: item.name as string,
                quantity: item.quantity
            }
        }),
        deliveryDetails: {
            email: data.email,
            name: data.name,
            address: data.address,
            city: data.city
        },
        restaurantId: location.pathname.slice(12),
        totalAmount: total
    }
    console.log("submitdata")
    console.log(submitData)
    await checkoutCreated(submitData)

  }
  if(stripeData){
    window.location.href = stripeData.data?.url as string
  }
  if(isPending){
    return <></>
  }
  return (
    <div className = "border-2 z-40 bg-transparent flex absolute top-0 border-2 w-screen h-screen justify-center items-center">
        <div className=" space-y-5 opacity-100 border-2 p-8 bg-white shadow-lg rounded-md relative">
            <IoCloseSharp onClick = {() => dispatch(switchBlur(false))} size = {40} className="hover:fill-red-500 cursor-pointer absolute top-1 right-1"/>
            <div className="space-y-1">
                <h1 className = "text-4xl font-medium">Confirm Delivery Details</h1>
                <p className = "text-lg text-gray-500">View and change your profile information here</p>
            </div>
            <form className = "space-y-5" onSubmit={handleSubmit(submit)}>
                <div>
                    <label className="block font-medium text-lg">Name</label>
                    <input className = "w-full border-2 rounded-lg p-2" type = "text" {...register("name")} />
                </div>
                <div>
                    <label className="block font-medium text-lg">E-mail</label>
                    <input className = "w-full border-2 rounded-lg p-2" type = "text" {...register("email")} />
                </div>
                <div className="flex justify-between space-x-3">
                    <div>
                        <label className="block font-medium text-lg">City</label>
                        <input className = "w-full border-2 rounded-lg p-2"type = "text" {...register("city")} />
                    </div>
                    <div>
                        <label className="block font-medium text-lg">Country</label>
                        <input className = "w-full border-2 rounded-lg p-2" type = "text" {...register("country")} />
                    </div>
                    <div>
                        <label className="block font-medium text-lg">Address</label>
                        <input className = "w-full border-2 rounded-lg p-2" type = "text" {...register("address")} />
                    </div>
                </div>
                <button className = "hover:bg-black bg-orange-600 text-white text-lg font-medium py-2 px-4 rounded-md" type = "submit">Continue to payment</button>
            </form>
        </div>
    </div>
  )
}

export default ConfirmDetails