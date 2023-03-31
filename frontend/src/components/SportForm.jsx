import {useState} from 'react'
import { useSportHook } from './context/SportContext'


const SportForm = () => {
    const {fetchSports} = useSportHook()
    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")
    const [error, setError] = useState(null)

    const handleForm = async(w)=>{
      w.preventDefault()
      const sport = {title, reps, load}
  
      const response = await fetch("http://localhost:8000/api/sports",{
          method: "POST",
          body: JSON.stringify(sport),
          headers: {
              "content-type": "application/json"
          }
      })
      const data = await response.json()
      if(!response.ok){
          setError(data.error)
      }
      else{
          setLoad("");
          setReps("");
          setTitle("");
          setError(null)
          fetchSports()
      }
  }
   

  return (
    <form className='form' onSubmit={handleForm}>
        <section className='input-container'>
          <h3>Create a sport workout</h3>

          <label htmlFor="">Sport Title</label>
        <input type="text"
         onChange={(e)=>setTitle(e.target.value)}
        value={title}
        />
        </section>

        <section className='input-container'>
          <label htmlFor="">Load (in kilogram):</label>
        <input type="number"
         onChange={(e)=>setLoad(e.target.value)}
        value={load}
        />
        </section>

        <section className='input-container'>
          <label htmlFor="">Reps (in pounds):</label>
        <input type="number"
         onChange={(e)=>setReps(e.target.value)}
        value={reps}
        />
        </section>
        <section className='btn-container'><button type='submit' className='btn'>Create sports type</button></section>
        {error && <section className='error'>{error}</section>}
    </form>
  )
}

export default SportForm