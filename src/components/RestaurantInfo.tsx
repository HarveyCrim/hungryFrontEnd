const RestaurantInfo = ({name, city, cuisines} : {name: string, city: string, cuisines: string[]}) => {
  return (
    <div className = "bg-white space-y-8 w-full border-2 px-4 py-6 shadow-md rounded-lg z-4">
        <div>
            <h1 className = "text-4xl font-bold font-mono">{name}</h1>
            <span className = "text-gray-500 font-medium text-lg">{city}</span>
        </div>
        <div>
            {
                cuisines?.map((item, index) => {
                    return <span key = {index} className = "text-lg text-slate-700 font-medium">{item}{index == cuisines.length -1 ? "" :" . "}</span>
                })
            }
        </div>
    </div>
  )
}

export default RestaurantInfo