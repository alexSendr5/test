import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "./app/hooks"

const Card = () => {

    let params = useParams()
    const {productId} = params
    const product = useAppSelector((state) => state.cards.cardArray.find((prod) => prod.card.id === productId))

    if(product){
  return (
    <>
    <div className="flex justify-end pt-10">
        <Link to={'/products'} className="p-2 mr-3 bg-green-900 border-solid border-black text-white">Назад</Link>
    </div>
    <div className="flex pt-5 justify-center">
        <div className="flex flex-col gap-14 items-center">
            <p className="text-6xl font-semibold break-all text-center max-w-100 pl-3 pr-3">
                {product.card.name}
            </p>
            <p className="text-4xl break-all pl-3 pr-3">
                {product.card.descr}
            </p>
            <p>
            <i>Цена: {product.card.count}</i>
            </p>
            <p className="pb-5">
                <i>Количество: {product.card.amount}</i>
            </p>
        </div>
    </div>
    </>
  )}
}

export default Card