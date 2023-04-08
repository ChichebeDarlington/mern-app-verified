

export const reducer = (state, action)=>{

    
    switch(action.type){

        case "POPULATE_USER":
            return {
                user: action.payload
            }

        case "SIGN_UP":
            return {user: action.payload}

        case "LOG_IN":
            return {user: action.payload}
            

            case "LOG_OUT":
                return {user:null }


            default:
                    return state
                
        }
    }
    