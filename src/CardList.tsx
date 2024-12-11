import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { useEffect, useState} from "react"
import { deleteCard, fetchCards, takeLike } from "./app/cardSlice"


const CardList = () => {

    const data = useAppSelector((state) => (state.cards.cardArray))
    const dispatch = useAppDispatch()
    const [all, setAll] = useState('false')

    useEffect(()=>{
        window.location.reload();
        dispatch(fetchCards())
    },[dispatch])


const handleDelete = (id: string) => {
    dispatch(deleteCard(id))
}

const handleLike = (id: string) => {
    dispatch(takeLike(id))
}
  return (
    <div>
        <div className="flex justify-between pt-10">
            <Link to={'/create-product'} className="p-2 ml-3 bg-green-700 border-solid border-black text-white">Создать товар</Link>
            <select className="bg-black text-white mr-3" onChange={(e) => setAll(e.target.value)}>
                <option value={'false'}>Все товары</option>
                <option value={'true'}>Понравившиеся</option>
            </select>
        </div>
        <div className="flex justify-center flex-wrap gap-4 pt-8">
            {all === 'false' ? data.map((item) => (
                <Link to={`/products/${item.card.id}`} key={item.card.id} className="p-8 border-solid bg-slate-400 flex flex-col justify-between rounded-md product">
                    <div>
                        <div className="flex justify-end">
                        <Link to={'/products'} className="p-2 bg-red-700 text-white rounded-xl" onClick={() =>handleDelete(item.card.id)}>X</Link>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-lg ">{item.card.name.length > 15 ? item.card.name.substring(0, 15) + '...' : item.card.name}</p>
                            <p>{item.card.descr.length > 15 ? item.card.descr.substring(0, 15) + '...' : item.card.descr}</p>
                            <p>Цена: {item.card.count}</p>
                            <p>Количество: {item.card.amount.substring(0, 100)}</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={'/products'} className={`rounded-md ${item.card.liked ? 'bg-green-600': 'bg-black'} border-solid border-black`} onClick={() => handleLike(item.card.id)}>👍</Link>
                    </div>
                </Link>))
            : data.map(item => {
                if(item.card.liked){
                    return(
                        <Link to={`/products/${item.card.id}`} key={item.card.id} className="p-8 border-solid bg-slate-400 flex flex-col justify-between rounded-md product">
                    <div>
                        <div className="flex justify-end">
                        <Link to={'/'} className="p-2 bg-red-700 text-white rounded-xl" onClick={() =>handleDelete(item.card.id)}>X</Link>
                        </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">{item.card.name.length > 15 ? item.card.name.substring(0, 15) + '...' : item.card.name}</p>
                        <p>{item.card.descr.substring(0, 10) + '...'}</p>
                        <p>Цена: {item.card.count}</p>
                        <p>Количество: {item.card.amount}</p>
                    </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={'/products'} className={`rounded-md ${item.card.liked ? 'bg-green-600': 'bg-black'} border-solid border-black`} onClick={() => handleLike(item.card.id)}>👍</Link>
                    </div>
                </Link>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default CardList