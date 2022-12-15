

export function userReducer(state=null,action){
    switch(action.type){
        case "LOGIN":
            return {state:action.payload}
        case "LOGOUT":
            return {state:null}    
        default:
            return state    
    }
}