import React from 'react'
import {FieldError, SubmitHandler, useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import zod from "zod"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { changeUser, getUser } from '../api/useApi'
import { toast } from 'sonner'

// const zodSchema = zod.object({
//   address: zod.string().min(10),
//   city : zod.string().min(1),
//   country : zod.string().min(2),
//   email: zod.string().email().optional(),
//   name: zod.string().
// })


type fields = {
  address: string,
  city: string,
  country: string,
  name?: string,
  email?: string
}

const UserProfile = () => {
  const {mutateAsync} = changeUser()
  const {userData, isFetchedUser} = getUser() 
  const {register, handleSubmit, setError, formState: {errors, isSubmitting, isSubmitted}} = useForm<fields>({
  })
  // console.log("why")
  // console.log(userData)
  const onSubmit: SubmitHandler<fields> = async (data) => {
    // console.log(data)
    await mutateAsync(data)
    toast.success("Information Successfully updated!")
  }
  if(!isFetchedUser){
    return (
      <h1>Loading....</h1>
    )
  }
  return (
    
    <div className = "flex flex-col min-h-screen flex-auto">
      <Header />
    <div className='bg-gray-100 pl-5 md:pl-8 pt-5 pb-5 min-h-[72vh]'>
      <h1 className='text-5xl font-semibold'>User Profile</h1>
      <h4 className="text-gray-500 font-semibold text=xl mt-2">View and change your profile information here.</h4>
      <form className='space-y-4 mt-5' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className='text-lg font-medium'>E-mail</p>
        <input {...register("email")}  defaultValue = {userData?.data.email || ""} disabled = {true} className="rounded-xl px-2 py-2 w-[400px] text-xl mt-1" id = "email_input" type = "text" placeholder = "Enter your E-mail" />
      </div>
      <div>
        <p className='text-lg font-medium'>Name</p>
        <input {...register("name")}  defaultValue = {userData?.data.name || ""} disabled ={true} className="rounded-xl px-2 w-[400px] py-2 w-fit text-xl mt-1" id = "email_input" type = "text" placeholder = "Enter your Name" />
      </div>
      <div>
        <p className='text-lg font-medium'>Address</p>
        <input {...register("address")} defaultValue = {userData?.data.address || ""} className="rounded-xl px-2 py-2 w-[400px] text-xl mt-1" id = "email_input" type = "text" placeholder = "Enter your Address" />
      </div>
      {errors.address && <div className='text-red-600'>{errors.address.message as string}</div>}
      <div>
        <p className='text-lg font-medium'>City</p>
        <input {...register("city")}  defaultValue = {userData?.data.city || ""} className="rounded-xl px-2 w-[400px]  py-2 text-xl mt-1" id = "email_input" type = "text" placeholder = "Enter your City" />
      </div>
      {errors.city && <div className='text-red-600'>{errors.city.message as string}</div>}
      <div>
        <p className='text-lg font-medium'>Country</p>
        <input {...register("country")} defaultValue = {userData?.data.country || ""} className="rounded-xl px-2 w-[400px]  py-2 text-xl mt-1" id = "email_input" type = "text" placeholder = "Enter your Country" />
      </div>
      {errors.country && <div className='text-red-600'>{errors.country.message as string}</div>}
      <button disabled = {isSubmitting} type = "submit" className=" bg-orange-500 text-white text-2xl font-medium py-1 px-7 rounded-md hover:bg-orange-700" >{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
    <Footer />
    </div>
  )
}

export default UserProfile