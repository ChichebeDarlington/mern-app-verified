import {createContext, useContext, useReducer, useState, useEffect} from 'react'
import { reducer } from '../reducer/AuthReducer'


export const AuthContext = createContext();

const initialState = {
    user: null,
}

const AuthContextProvider = ({children}) => {
    
    const [state, dispatch]= useReducer(reducer, initialState);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const logOut = ()=>{
        localStorage.removeItem("userInfo");
        dispatch({type:"LOG_OUT"});
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if(user){
            dispatch({type:"POPULATE_USER", payload:user});
        }
    },[])

    

    return (
        <AuthContext.Provider value={{
            ...state, 
            logOut,
            dispatch,
            username,
            setUsername,
            email,
            setEmail,
            password,
            setPassword,
            isLoading,
            setIsLoading,
            error,
            setError
            }}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export default AuthContextProvider