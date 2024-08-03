
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Searchbox = ({initial, setName, name} : {name? : string, initial : boolean, setName?: React.Dispatch<React.SetStateAction<string>>}) => {
  const [text, setText] = useState<string>(name ? name : "")
  const navigate = useNavigate()
  useEffect(() => {
    let timeout = setTimeout(() => {
    if(text.length > 0)
        if(initial)
          return navigate("/restaurant/city/"+text)
        else{
          if(setName){
            setName(text)
          }
        }
    }, 2000)
    return () => {
      if(timeout){
        clearTimeout(timeout)
      }
    }
  },[text])
  return (
    <div className = "flex mx-auto justify-between rounded-full w-[90%] items-center border-2 p-2 md:py-4">
        <div className='flex items-center space-x-2'>
            <FaSearch className='fill-orange-500' size = {28}/>
            <input value = {text!} onChange = {(e) => {
                  setText(e.target.value)
              }} className = "text-lg md:text-xl w-[50vw] outline-none" type = "text" placeholder = "Search City or Town"/>
        </div>
    </div>
  )
}

export default Searchbox