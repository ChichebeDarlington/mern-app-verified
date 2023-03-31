import {createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "../reducer/sportReducer";
import axios from "axios"


const initialState = {
    sports: null,
    title:"",
    reps:"",
    load:"",
    error:null
}

const SportsContext = createContext()

export const SportsContextProvider = ({children})=>{
const [state, dispatch] = useReducer(reducer, initialState)


const fetchSports = async()=>{
    const response = await fetch("http://localhost:8000/api/sports");
    let data = await response.json()
    console.log(data);
    // if(response.ok){
      dispatch({type: "SET_SPORTS", payload: data})
        // setSports(data)
    // }
}

useEffect(()=>{
   fetchSports()
},[])


    return(
        <SportsContext.Provider value={{...state, dispatch, fetchSports}}>
            {children}
        </SportsContext.Provider>
    )
}

export const useSportHook = ()=>{
    return useContext(SportsContext)
}