
const Footer = () => { 
  return (
    <div className = {`bg-orange-600 text-white flex border-2 w-full h-[200px] justify-between items-center px-[10px] py-[20px] md:p-[80px]`}>
        <h1 className='tracking-tight font-bold text-3xl md:text-5xl'>Hungry</h1>
        <div className='flex font-semibold text-md md:text-lg space-x-4 md:space-x-9'>
            <h5>Privacy Policy</h5>
            <h5> Terms of Use</h5>
        </div>
    </div>
  )
}

export default Footer