import moment from "moment"
import { useSportHook } from "./context/SportContext"
import {FaRegTrashAlt, FiEdit} from "react-icons/all"



const SportDetails = ({title, reps, load, createdAt, _id,}) => {
  const {dispatch, fetchSports, sports, 
    setTitle,
    setReps,
    setLoad,
  } = useSportHook()
  // console.log(sports)

  const handleErase = async ()=>{

    const response = await fetch(`http://localhost:8000/api/sports/${_id}`,{
      method: "DELETE"
    })
    const data = response.json();
    console.log(data);
    if(response.ok){
      dispatch({type:"DELETE_SPORT", payload: data})
    }
    fetchSports()
  }

  const handleEdit = async()=>{
    
    const response = await fetch(`http://localhost:8000/api/sports/${_id}`,{
      method: "PATCH",
      body: JSON.stringify({ title, reps, load }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    })
    const data = await response.json()
    console.log(data)
    if(response.ok){
      setTitle(data.title)
      setReps(data.reps)
      setLoad(data.load)
      dispatch({type:"UPDATE", payload:data})
    }
  }

  return (
    <section className="sport-details" >
        <h4>Title: {title}</h4>
        <p><strong>Load(kg): {load}</strong></p>
        <p><strong>Reps(bls): {reps}</strong></p>
        <h6><small>{moment(createdAt).toNow()}</small></h6>
        <span className="erase" onClick={handleErase}><FaRegTrashAlt/></span>
        <span className="edit" onClick={handleEdit}><FiEdit/></span>
    </section>
  )
}

export default SportDetails