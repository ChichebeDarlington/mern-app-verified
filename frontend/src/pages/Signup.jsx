
import { useAuthContext } from '../components/context/AuthContext'

const Signup = () => {
const {
    dispatch,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error,
    setError,
    isLoading,
    setIsLoading
}= useAuthContext();


const handleSignup = async(m)=>{
    m.preventDefault()
    setIsLoading(true)
    setError(null)
    m.preventDefault()
    const response = await fetch("http://localhost:8000/api/user/signup",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",

        },
        body: JSON.stringify({username, email, password})
    })
    const data = await response.json()

    if(!response.ok){
        setIsLoading(false)
        setError(data.error)
    }
    if(response.ok){
        setIsLoading(false)
        dispatch({type:"SIGN_UP", payload:data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    }

}


  return (
    <form className='sign-up' onSubmit={handleSignup}>
        <h4>Sign up</h4>

        <label htmlFor="username">Username:</label>
        <input 
        type="text" 
        id='username'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />

       <label htmlFor="email">Email:</label>
        <input 
        type="email" 
        id='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

       <label htmlFor="password">Password:</label>
        <input 
        type="password" 
        id='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button disabled={isLoading} className='btn' type='submit'>Sign up</button>
        {error && <section className='error'>{error}</section>}
    </form>
  )
}

export default Signup