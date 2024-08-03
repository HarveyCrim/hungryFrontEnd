import { useState } from "react"

const Cuisine = ({clickState, cuisine, clickFunc} : {clickState: boolean, cuisine: string, clickFunc: () => void}) => {
  const [clicked, setClicked] = useState<boolean>(clickState)
  return (
    <div onClick = {() => {
      clickFunc()
      setClicked(!clicked)
    }} className = {`hover:bg-gray-200 ${clicked ? "bg-gray-200":""} cursor-pointer border-2 px-2 py-1 text-md font-medium rounded-full w-full border-gray-300`}>
       {cuisine}
    </div>
  )
}

export default Cuisine