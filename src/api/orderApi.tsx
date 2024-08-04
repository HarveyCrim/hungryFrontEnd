import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL
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
    restaurantId: string
}

export const getAllOrders =  () => {
    const {data: allOrdersData, isPending} = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const resp = await axios({
                method: "get",
                url: BASE_URL+"/api/orders/allOrders",
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp
        }
    })
    return {allOrdersData, isPending}
}

export const getAllOrdersRes =  () => {
    const {data: allOrdersData, isPending, mutateAsync: resOrders} = useMutation({
        mutationFn: async (resId: string) => {
            const resp = await axios({
                method: "get",
                url: BASE_URL+"/api/orders/allOrdersRes?resId="+resId,
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp
        }
    })
    return {allOrdersData, isPending, resOrders}
}

export const updateSingleOrder = () => {
    const {isPending, mutateAsync: updSingleOrder} = useMutation({
        mutationFn: async (info : {orderId: string, newStatus: string}) => {
            const resp = await axios({
                method: "patch",
                url: BASE_URL+"/api/orders/updateOrder?orderId="+info.orderId+"&newStatus="+info.newStatus,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp
        }
    })
    return {isPending, updSingleOrder}
}

export const createCheckoutFrontEnd = () => {
    const {mutateAsync: checkoutCreated, isPending: stillPending, data: stripeData} = useMutation({
        mutationFn: async (checkoutData: checkoutRequest) => {
            const resp = axios({
                method: "post",
                url: BASE_URL+"/api/orders/createCheckout",
                data: checkoutData,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp
        }
    })
    return {checkoutCreated, stillPending, stripeData}
}
