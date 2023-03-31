import { useEffect, useState } from "react"
import { useSportHook } from "../components/context/SportContext"
import SportDetails from "../components/SportDetails"
import SportForm from "../components/SportForm"


// import axios from "axios"


const Home = () => {
// const [sports, setSports] = useState(null)
const {sports} = useSportHook()
console.log(sports)



  return (
    <div className='home'>
        <div className="sports">
            {sports && sports.map((sport)=>{
                console.log(sport);
              return  <SportDetails key={sport._id} {...sport}/>
            })}
        </div>
        <SportForm/>
    </div>
  )
}

export default Home