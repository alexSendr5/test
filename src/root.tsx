import { Outlet } from "react-router-dom"

const Root = () => {
  return (
    <div>
        <p className='text-center text-green-950 text-6xl'>Панель с товарами</p>
        <Outlet />
    </div>
  )
}

export default Root