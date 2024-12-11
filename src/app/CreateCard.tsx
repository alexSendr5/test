import React, { useState } from "react"
import { addCard } from "./cardSlice"
import { useAppDispatch } from "./hooks"
import { nanoid } from "@reduxjs/toolkit"
import { Link, useNavigate } from "react-router-dom"

const CreateCard = () => {

    const dispatch = useAppDispatch()
    const redirect = useNavigate()
    const [name, setName] = useState('')
    const [descr, setDescr] = useState('')
    const [count, setCount] = useState('')
    const [amount, setAmount] = useState('')
    const [truecount, setTruecount] = useState(false)
    const [trueamount, setTrueamount] = useState(false)
    const liked = false;
    const id = nanoid()

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onChangeDescr = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescr(e.target.value)
    const onChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {if(typeof(Number(e.target.value)) === 'number'){setCount(e.target.value)}}
    const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {if(typeof(Number(e.target.value)) === 'number'){setAmount(e.target.value)}}
    const handleSendParams = (e: React.ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();
            if(Number(count) >= 0 && Number(amount) >= 0){
             const data = {name, descr, count, amount, id, liked}
            dispatch(addCard(data))

            setName('')
            setDescr('')
            setCount('')
            setAmount('')
            setTruecount(false)
            setTrueamount(false)
            window.location.reload()
            redirect('/products')}
            else{
                setTruecount(true)
                setTrueamount(true)
            }
    }
  return (

    <div className="flex flex-col">
        <div className="flext justify-start pt-10">
        <Link to={'/products'} className="p-2 ml-3 bg-green-700 border-solid border-black text-white">Назад</Link>
        </div>
        <div className='flex justify-center'>
            <form onSubmit={handleSendParams}>
                <h2 className='text-2xl font-semibold'>Создание товара</h2>
                <p className='create--input pb-5'>
                    <label>Название </label>
                    <input value={name} onChange={onChangeName} required/>
                </p>

                <p className='pb-5'>
                    <label>Описание </label>
                    <textarea value={descr} onChange={onChangeDescr} className='create--descryption'/>
                </p>

                <p className='create--input pb-5'>
                    <label>Цена </label>
                    <input value={count} onChange={onChangeCount} type="number" required/>
                    {truecount && <p className="text-red-500">Цена не может быть отрицательной</p>}
                </p>

                <p className='create--input'>
                    <label>Количество </label>
                    <input value={amount} onChange={onChangeAmount} type="number" required/>
                    {trueamount && <p className="text-red-500">Количество не может быть отрицательным</p>}
                </p>
                <button className='mt-5 border-solid border-black bg-gray-400 rounded-sm pt-2 pr-2 pl-2 pb-2' type='submit'>Создать товар</button>
            </form>
        </div>
    </div>
  )
}

export default CreateCard