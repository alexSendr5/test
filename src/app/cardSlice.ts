import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import db from "./firebase";


interface Card {
    card: {
        id: string,
        name: string,
        descr: string,
        count: string,
        amount: string,
        liked: boolean
    }|{
        [key: string]: string
    }
}

export const addCard = createAsyncThunk(
    'cards/addCard',
    async (card:{
        id: string,
        name: string,
        descr: string,
        count: string,
        amount: string,
        liked: boolean
    }) => {
        const addCardRef = await addDoc(collection(db, 'Cards'), card)
        const newCard = {id: addCardRef.id, card}
        console.log('added')
        return newCard
    }
)


export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async (id: string) => {
        const cards = await getDocs(collection(db, 'Cards'))
        for(const card of cards.docs){
            if(card.data().id === id){
               await deleteDoc(doc(db, 'Cards', card.id))
               console.log('DEleted')
            }
        }
        return id
    }
)

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'Cards'));
        const retdata = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            card: doc.data(),
        }))
        return retdata
    }
)

export const takeLike = createAsyncThunk(
    'cards/takeLike',
    async (id: string) => {
        const cards = await getDocs(collection(db, 'Cards'));
        for(const i of cards.docs){
            if(i.data().id === id){
                await setDoc(doc(db, 'Cards', i.id), {
                    id: id,
                    name: i.data().name,
                    descr: i.data().descr,
                    count: i.data().count,
                    amount: i.data().amount,
                    liked: !i.data().liked
                })
            }
        }
        const newcards = await getDocs(collection(db, 'Cards'));
        return newcards.docs.map((doc) => ({
            id: doc.id,
            card: doc.data()
        }))
    }
)

const cardArray: Card [] = []

const cardSlice = createSlice({
    name: 'cards',
    initialState:{
        cardArray
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCard.fulfilled, (state, action) => {
            state.cardArray.push(action.payload)

        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.cardArray = action.payload
        })

        builder.addCase(deleteCard.fulfilled, (state, action) => {
            state.cardArray = state.cardArray.filter((card) => card.card.id !== action.payload)
        })

        builder.addCase(takeLike.fulfilled, (state, action) => {
            state.cardArray = action.payload
        })
        }
    })
export default cardSlice.reducer
