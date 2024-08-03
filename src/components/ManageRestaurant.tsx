import {  useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { cuisineList } from '../misc/cuisines'
import {zodResolver} from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import zod from "zod"
import { createRes, getRes } from '../api/resApi';
import zodSchema from '../zodSchemas/restaurant';
const ManageRestaurant = () => {
  const [image, setImage] = useState<string | null>(null)
  const {data: resData, isSuccess} = getRes()
  const {register, handleSubmit, control, reset, formState: {errors}} = useForm<formFields>({
    resolver: zodResolver(zodSchema)
  }) 
  useEffect(() => {
    if(!resData?.data){
        return
    }
    else{
        reset({
            name : resData?.data.name,
            city: resData?.data.city || "",
            country: resData?.data.country,
            imageUrl:resData?.data.imageUrl || "",
            deliveryPrice: resData?.data.deliveryPrice || 0,
            deliveryTime: resData?.data.deliveryTime || 0,
            cuisines: resData?.data.cuisines || [],
            menuItems: resData?.data.menuItems || []
        })
        setImage(resData?.data.imageUrl)
    }
  },[resData, isSuccess])

  const {createTheRes} = createRes()
  const [manage, setManage] = useState(false)
  const loadImage = (e:React.ChangeEvent): void => {
    
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    const reader = new FileReader()
    reader.addEventListener("load", () => {setImage(reader.result as string)})
    if(file){
        reader.readAsDataURL(file)
    }
  }
  
  type formFields = zod.infer<typeof zodSchema>

    const {fields, append, remove} = useFieldArray({
        name: "menuItems",
        control
    })
    const onSubmit: SubmitHandler<formFields> = async (data: formFields) => {
        if(resData?.data?.imageURL){
            createTheRes(data)
            return
        }
        const cloudName = import.meta.env.VITE_CLOUD_NAME
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const fd = new FormData();
        fd.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);
        fd.append('file', data.image[0]);
        fetch(url, {
            method: 'POST',
            body: fd,
        })
        .then((response) => response.json())
        .then((extracted) => {
            const url = extracted.secure_url;
            const dataToSend = {...data, imageUrl: url}
            delete dataToSend.image
            createTheRes(dataToSend)
        })
  }
  return (
    <>
    <Header />
    <div className=' px-10 mt-10'>
        <div className = "flex ml-3 mt-3 cursor-pointer bg-gray-200 w-fit font-semibold text-lg space-x-3 px-3 py-2 rounded-3xl">
            <span onClick = {() => setManage(false)} className={!manage ? 'bg-white py-1 shadow-md animate-in ease-in delay-150 px-3 rounded-3xl':"bg-gray-200 py-1 px-3 rounded-3xl"}>Orders</span>
            <span onClick = {() => setManage(true)} className={manage ? 'bg-white py-1 shadow-md animate-in ease-in delay-150 px-3 rounded-3xl': "bg-gray-200 py-1 px-3 rounded-3xl"}>Manage Restaurant</span>
        </div>
        {!manage && <div>
            Orders
        </div>}
        {manage && <form className='space-y-5 pt-3 md:pl-3 pb-20 mt-5 md:pr-10 ' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='m-0 p-0 text-4xl font-bold'>Details</h1>
            <span className='text-lg text-gray-400'>Enter the details about your restaurant</span>
            <div className='flex flex-col'>
                <label className='font-medium text-lg'>Name</label>
                <input {...register("name")} className="rounded-lg border-2 text-xl p-1" type = "text" />
                {errors.name && <div className='text-red-500 text-lg'>{errors.name.message}</div>}
            </div>
            <div  className='flex w-full space-x-4'>
                <div className = "w-full">
                    <label className='font-medium text-lg'>City</label>
                    <input {...register("city")} className="w-full p-1 rounded-lg text-xl border-2" type = "text" />
                    {errors.city && <div className='text-red-500 text-lg'>{errors.city.message}</div>}
                </div>
                <div className = "w-full">
                    <label className='font-medium text-lg'>Country</label>
                    <input {...register("country")} className="w-full p-1 rounded-lg border-2 text-xl" type = "text" />
                    {errors.country && <div className='text-red-500 text-lg'>{errors.country.message}</div>}
                </div>
            </div>
            <div className='w-[49.5%]'>
                <label className='font-medium text-lg'>{"Delivery Price ($)"}</label>
                <input {...register("deliveryPrice")} className="w-full p-1 rounded-lg border-2 text-xl" type = "number" />
                {errors.deliveryPrice && <div className='text-red-500 text-lg'>{errors.deliveryPrice.message}</div>}
            </div>
            <div className='w-[49.5%]'>
                <label className='font-medium text-lg'>{"Estimated Delivery Time (minutes)"}</label>
                <input {...register("deliveryTime")} className="w-full p-1 mb-5 rounded-lg border-2 text-xl" type = "number" />
                {errors.deliveryTime && <div className='text-red-500 text-lg'>{errors.deliveryTime.message}</div>}
            </div>
            <div className='bg-gray-300 w-[97%] h-[1px]'></div>
            <h1 className='m-0 p-0 text-4xl font-bold'>Cuisine</h1>
            <span className='text-lg text-gray-400'>Create your restaurant menu</span>
            <div className='grid md:grid-rows-5 grid-rows-8 grid-flow-col w-[80%] md:gap-5 gap-4'>
                {
                    cuisineList.map((cuisine, index) => {
                        return <div className='flex space-x-2' key = {index}>
                            <input className = "scale-150" type = "checkbox" {...register(`cuisines.${index}`)} />
                            <span className='text-lg font-medium'>{cuisine}</span>
                        </div>
                    })
                }
            </div>
            {errors.cuisines && <div className='text-red-500 text-lg'>{errors.cuisines?.root?.message}</div>}
            <div className='border-b-2 border-b-gray-200 w-[97%] h-[20px]  block'></div>
            <div className='space-y-10'>
                <div className=''>
                    <h1 className='m-0 p-0 text-4xl font-bold'>Menu</h1>
                    <span className='text-lg text-gray-400'>Add items to the menu for app display</span>
                </div>
                {
                    fields.map((field, index) => {
                        return <div key = {field.id} className='flex gap-2'> 
                            <div className='flex flex-col w-full'>
                                <label className='font-medium md:text-lg'> Item Name</label>
                                <input className = "border-2 rounded-lg p-1 md:text-lg" type = "text" {...register(`menuItems.${index}.itemName`)}/>
                                {errors.menuItems?.[index]?.itemName && <div className='text-red-500 text-lg'>{errors.menuItems?.[index]?.itemName?.message}</div>}
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium md:text-lg'>{"Item Price ($)"}</label>
                                <input className = "border-2 rounded-lg p-1 md:text-lg md:w-full w-[100px]" type = "text" {...register(`menuItems.${index}.itemPrice`)}/>
                                {errors.menuItems?.[index]?.itemPrice && <div className='text-red-500 text-lg'>{errors.menuItems?.[index]?.itemPrice?.message}</div>}
                            </div>
                            <MdDelete className = "md:hidden cursor-pointer hover:fill-gray-500" onClick = {() => remove(index)} size = {80}/>
                            <button onClick = {() => remove(index)} className='self-end hidden md:inline text-white bg-black text-lg font-medium py-1.5 px-4 rounded-xl'>Remove</button>
                        </div>
                    })
                }
                <FaCirclePlus onClick = {() => append({itemName:"", itemPrice:0})} className = "cursor-pointer fill-orange-500" size = {70}/>
            </div>
            <div className='border-b-2 border-b-gray-200 w-[97%] h-[20px]  block'>
            </div>
            <div>
            <div className=''>
                    <h1 className='m-0 p-0 text-4xl font-bold'>Image</h1>
                    <span className='text-lg text-gray-400'>Add an image to be displayed with the results</span>
                    <input {...register("image")} className="opacity-0" onChange = {(e) => loadImage(e)} id = "fileUpload" type = "file" />
                    <label  className="cursor-pointer block rounded-md mt-5 text-xl w-fit font-medium bg-gray-200 p-2" htmlFor='fileUpload'>Upload an image</label>
                    {image && <img src = {image}  className = "object-cover border mt-10 w-[400px] h-[400px] border-2 shadow-md"/>}
                </div>
            </div>
            <div className='border-b-2 border-b-gray-200 w-[97%] h-[20px]  block'></div>
            <button className = "bg-black text-white text-lg px-7 py-1 font-medium rounded-lg w-[200px] h-[50px]" type = "submit">Submit</button>
        </form>}
    </div>
     <Footer />
    </>
  )
}

export default ManageRestaurant