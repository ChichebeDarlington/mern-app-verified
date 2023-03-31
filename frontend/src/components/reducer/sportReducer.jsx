

export const reducer = (state, action)=>{
    
    switch(action.type){
        case "SET_SPORTS":
            return {...state, sports: action.payload}
            
            case "CREATE_SPORT":
                return {
                    sports:[...state, action.payload]
                }
            case "DELETE_SPORT":
                return {...state, sports: state.sports.filter((sport)=>{
                    return sport._id !== action.payload._id
                })}

            default:
                    return state
                
        }
    }
    