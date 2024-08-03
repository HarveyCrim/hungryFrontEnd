import { LuClock4 } from "react-icons/lu";
import { FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const RestaurantCard = ({image, name, time, price, cuisines, id} : {image : string, name: string, time: string, price: number, id: string, cuisines: []}) => {
  const navigate = useNavigate()
  const showRest = () => {
    return navigate("/restaurant/"+id)
  }

  return (
    <div onClick = {() => showRest()} className = "cursor-pointer border-2 flex md:h-[220px] max-w-[900px] rounded-lg mx-auto">
        <div className=" hidden md:inline rounded-xl overflow-hidden border-3 w-[40%] border-red-500">
            <img className = "h-full object-cover" src = {image} alt = ""/>
        </div>
        <div className = "flex flex-col md:w-[60%] p-3" >
            <h1 className="font-bold text-3xl">{name}</h1>
            <div className = "flex gap-5 ">
                <div className = "w-[60%] text-gray-400 font-medium text-lg flex-wrap">
                    {cuisines.map((item: string, index: number) => {
                        return <span key = {index as number}>{item as string}. </span>
                    })}
                </div>
                <div className="w-full flex flex-col items-end w-[40%]">
                    <div className="flex items-center w-fit gap-1">
                        <LuClock4 size= {20} className="justify-self-end fill-green-500"/> 
                        <span className="justify-self-end text-end inline-block w-full text-green-500 text-lg font-medium">{time} mins</span>
                    </div>
                    <div className = "flex items-center w-fit gap-1">
                        <FaMoneyBillWave size = {20}/>
                        <span className = "text-end w-full block text-lg font-medium"> Delivery from ${price}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RestaurantCard