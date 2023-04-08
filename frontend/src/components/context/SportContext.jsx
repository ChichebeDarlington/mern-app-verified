import {createContext, useContext, useReducer, useEffect, useState } from "react";
import { reducer } from "../reducer/sportReducer";


const initialState = {
    sports: [],
}

const SportsContext = createContext()

export const SportsContextProvider = ({children})=>{

const [state, dispatch] = useReducer(reducer, initialState)
const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")
    const [empty, setEmpty] = useState("")
    const [error, setError] = useState("")


   

    return(
        <SportsContext.Provider value={{
         ...state, 
        dispatch, 
        title,
        setTitle,
        reps,
        setReps,
        load,
        setLoad,
        error,
        setError,
        empty,
        setEmpty
        }}>
            {children}
        </SportsContext.Provider>
    )
}

export const useSportHook = ()=>{
    return useContext(SportsContext)
}