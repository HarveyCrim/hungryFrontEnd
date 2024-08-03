import { useMutation } from "@tanstack/react-query"
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
