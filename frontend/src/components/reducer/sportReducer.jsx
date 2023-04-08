

export const reducer = (state, action)=>{

    
    switch(action.type){
        case "FETCH_SPORTS":
            return {...state, sports: action.payload, title:"",reps:"",load:""}
            

            case "CREATE_SPORT":
                return {...state, sports:action.payload }


            case "DELETE_SPORT":
                return {sports: state.sports.filter((sport)=>{
                    return sport._id !== action.payload._id
                })}

            default:
                    return state
                
        }
    }
    