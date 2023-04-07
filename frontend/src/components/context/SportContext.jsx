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

const fetchSports = async()=>{
    const response = await fetch("http://localhost:8000/api/sports");
    let data = await response.json()
    if(response.ok){
      dispatch({type: "FETCH_SPORTS", payload: data})
    }
  }
  
  useEffect(()=>{
   fetchSports()
  },[])



    return(
        <SportsContext.Provider value={{
         ...state, 
        dispatch, 
        fetchSports,
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