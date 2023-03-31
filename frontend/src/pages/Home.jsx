import { useEffect, useState } from "react"
// import axios from "axios"


const Home = () => {
const [sports, setSports] = useState(null)

const fetchSports = async()=>{
    let response = await fetch("http://localhost:8000/api/sports");
    let data = await response.json()
    // console.log(data);
    if(response.ok){
        setSports(data)
    }
}

useEffect(()=>{
   fetchSports()
},[])


  return (
    <div className='home'>
        <div className="sports">
            {sports && sports.map((sport)=>{
                console.log(sport);
              return  <div className="" key={sport._id}>
                    <h3>{sport.title}</h3>
                    <h4>{sport.reps}</h4>
                    <p>{sport.load}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default Home