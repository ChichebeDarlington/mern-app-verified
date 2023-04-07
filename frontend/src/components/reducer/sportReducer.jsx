

export const reducer = (state, action)=>{

    if (action.type === 'DELETE_SPORT') {
        const newSports = state.sports.filter(
          (person) => person.id !== action.payload
        );
        return { ...state, sports: newSports };
      }
    
    switch(action.type){
        case "FETCH_SPORTS":
            return {...state, sports: action.payload, title:"",reps:"",load:""}
            

            case "CREATE_SPORT":
                return {...state, sports:action.payload }


            // case "DELETE_SPORT":
            //     return {sports: state.sports.filter((sport)=>{
            //         return sport._id !== action.payload._id
            //     })}

            default:
                    return state
                
        }
    }
    