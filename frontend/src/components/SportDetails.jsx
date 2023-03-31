import moment from "moment"
import { useSportHook } from "./context/SportContext"
import {FaRegTrashAlt} from "react-icons/all"



const SportDetails = ({title, reps, load, createdAt, _id}) => {
  const {dispatch, fetchSports} = useSportHook()

  const handleErase = async ()=>{
    const response = await fetch(`http://localhost:8000/api/sports/${_id}`,{
      method: "DELETE"
    })
    const data = response.json();

    if(response.ok){
      dispatch({type:"DELETE_SPORT", payload: data})
    }
    fetchSports()
  }

  return (
    <section className="sport-details" >
        <h4>Title: {title}</h4>
        <p><strong>Load(kg): {load}</strong></p>
        <p><strong>Reps(bls): {reps}</strong></p>
        <h6><small>{moment(createdAt).toNow()}</small></h6>
        <span onClick={handleErase}><FaRegTrashAlt/></span>
    </section>
  )
}

export default SportDetails