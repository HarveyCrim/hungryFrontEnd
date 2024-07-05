import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
const BASE_URL = import.meta.env.VITE_BASE_URL
type user = {
    auth0Id: string,
    email : string,
    name : string,
    address? : string,
    city? : string,
    country? : string
}

type updatedUser = {
    email? : string,
    name? : string,
    address : string,
    city : string,
    country : string
}

export const getUser = () => {
    const query = useQuery( {
        queryKey: ["singleuser"],
        queryFn: async () => {
            const token = localStorage.getItem("token")
            if(!token)
                return null
            const resp =  await axios({
                method:"get",
                url:BASE_URL+"/api/user/",
                headers: {
                    Authorization: JSON.parse(token)
                }
            })
            return resp
          }
    })

    const {data: userData, isSuccess: isFetchedUser} = query

    return {userData, isFetchedUser}
}

export const changeUser = () => {
    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (data: updatedUser) => {
            const token = localStorage.getItem("token")
            const resp = await axios({
                method: "put",
                url: BASE_URL+"/api/user/edit",
                headers: {
                    Authorization: JSON.parse(token as string)
                },
                data
            })
            return resp.data
        },
        onSuccess : () => {
            client.invalidateQueries({queryKey: ["singleuser"]})
        }
    })
    const {isSuccess, data, isPending, mutateAsync} = mutation
    return {
        isSuccess, data, isPending, mutateAsync
    }
}

export const createUser = () => {
    const client = useQueryClient()
    const createRequest = async (data: user) => {
        const resp = await axios({
            method:'post',
            url: BASE_URL+"/api/user/create",
            data
        })
        return resp
    }

    const userMutation = useMutation({
        mutationFn: createRequest,
        onSuccess: (data) => {
            localStorage.setItem("token", JSON.stringify(data.data.token))
            client.invalidateQueries({queryKey: ["singleuser"]})
        },
    })

    const {isSuccess, data, mutateAsync: createANewUser} = userMutation

    return {
        isSuccess, data, createANewUser
    }
}