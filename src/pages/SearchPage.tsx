import { getResList } from "../api/resApi"
import Cuisine from "../components/Cuisine"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Searchbox from "../components/Searchbox"
import { SpinnerCircular } from 'spinners-react';
import { cuisineList } from "../misc/cuisines"
import RestaurantCard from "../components/RestaurantCard"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
const SearchPage = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const sortMenuRef = useRef<HTMLDivElement | null>(null)
  const [name, setName] = useState<string>("")
  const [sortMenu, setShowMenu] = useState<boolean>(false)
  const [sort, setSort] = useState<string>("")
  const pageref = useRef(1)
  const {city} = useParams()
  const {data, isPending, runResList} = getResList()
  useEffect(() => {
    pageref.current = 1
    runResList({city, name, sort, cuisineList: selectedCuisines, page: String(pageref.current)})

  }, [city, name, selectedCuisines, sort])

  const nextPage = () => {
    pageref.current++
    runResList({city, name, sort, cuisineList: selectedCuisines, page: String(pageref.current)})
  }

  const prevPage = () => {
    pageref.current--
    runResList({city, name, sort, cuisineList: selectedCuisines, page: String(pageref.current)})
  }

  const resetFilters = () => {
    setName("")
    setSelectedCuisines([])
    setSort("")
  }

  const addOrRemove = (index: number) => {
    const target = cuisineList[index] as string
    const foundIndex = selectedCuisines.indexOf(target as string)
    console.log("clicked")
    console.log(foundIndex)
      if(foundIndex == -1){
        setSelectedCuisines([target,...selectedCuisines])
      }
      else{
        const newArray = [...selectedCuisines]
        newArray.splice(foundIndex, 1)
        console.log("deleted")
        console.log(newArray)
        setSelectedCuisines(newArray)
      }
  }
  if(isPending)
    return <SpinnerCircular />
  return (
    <>
    <Header />
    <div className = "flex p-4 gap-4" >
        <div className = "w-[20%] space-y-2">
          <div className="flex flex-col md:flex-row justify-between">
            <span className = "font-bold md:text-xl">Filter By Cuisine</span>
            <span onClick = {() => resetFilters()} className = "cursor-pointer underline font-medium md:text-xl text-blue-500">Reset Filters</span>
          </div>
          {
            cuisineList.map((cuisine, index) => {
              return <Cuisine clickState = {selectedCuisines.indexOf(cuisine) == -1 ? false : true} clickFunc = {() => addOrRemove(index)} key = {index} cuisine = {cuisine as string}/>
            })
          }
        </div>
        <div className = "w-[80%] border-1 space-y-5">
            <Searchbox name = {name} setName = {setName} initial = {false}/>
            <div className="flex items-center justify-between w-[90%] mx-auto">
              <div className="md:space-x-4">
                <h1 className = "md:inline md:text-2xl font-bold">{data?.data.total+" Restaurant(s) found in "+ city}</h1>
                <span className = "underline text-blue-500 text-md font-medium">Change Location</span>
              </div>
              <div>
                <div onClick = {() => setShowMenu(!sortMenu)} className="border-2 border-gray-300 p-1 rounded-lg relative">
                  <span className="font-medium">{"Sort by: " + (sort == "" ? "Best Match" : (sort == "deliveryTime" ? "Delivery Time" : "Delivery Price"))}</span>
                  {sortMenu && <div ref = {sortMenuRef} className = "absolute z-3 bg-white border-2 space-y-1 font-medium p-3">
                    <p className = "cursor-pointer" onClick={() => setSort("deliveryTime")}>Delivery Time</p>
                    <p className = "cursor-pointer" onClick = {() => setSort("deliveryPrice")}>Delivery Price</p>
                    <p className = "cursor-pointer" onClick = {() => setSort("")}>Best Match</p>
                  </div>}
                </div>
              </div>
            </div>
            <div className=" space-y-5">
              {
                data?.data.restaurants.map((item : any, index: number) => {
                  return <RestaurantCard key = {index} image = {item.imageUrl} id = {item._id.toString()} name = {item.name} time = {item.deliveryTime} price = {item.deliveryPrice} cuisines = {item.cuisineList}/>
                })
              }
            </div>
            <div className = " w-[90%] mx-auto gap-3 flex justify-center">
              {pageref.current > 1 && <button onClick = {prevPage} className = "bg-black text-lg font-medium rounded-lg px-4 py-1 text-white ">Previous</button>}
              {((pageref.current < data?.data.total/5  && data?.data.total % 5 == 0) || (pageref.current <= data?.data.total/5 && data?.data.total % 5 != 0)) && <button onClick = {nextPage} className = "bg-black text-lg font-medium rounded-lg px-4 py-1 text-white ">Next</button>}
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default SearchPage