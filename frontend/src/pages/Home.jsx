import { useEffect, useState } from "react"
import { useSportHook } from "../components/context/SportContext"
import SportDetails from "../components/SportDetails"
import SportForm from "../components/SportForm"


const Home = () => {
const {sports} = useSportHook()


  return (
    <div className='home'>
        <div className="sports">
            {sports && sports.map((sport)=>{
            return <SportDetails key={sport._id} {...sport}/>
            })}
        </div>
        <SportForm/>
    </div>
  )
}

export default Home