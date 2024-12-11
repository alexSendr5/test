import { NavLink } from 'react-router-dom'

const ToCards = () => {
  return (
    <div className="flex justify-center pt-5">
          <NavLink to={'/products'} className="p-2 mr-3 bg-green-900 border-solid border-black text-white">К списку товаров</NavLink>
    </div>
  )
}

export default ToCards