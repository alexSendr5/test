import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./root"
import './index.css'
import CreateCard from "./app/CreateCard"
import CardList from "./CardList"
import Card from "./Card"
import ToCards from "./ToCards"

function App() {


  const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children:[
      {
        path:'/',
        element: <ToCards />
      },
      {
        path:'/products',
        element: <CardList />
      },
      {
        path:'/create-product',
        element: <CreateCard />
      },
      {
        path:'/products/:productId',
        element: <Card />
      }
    ]
  }])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
