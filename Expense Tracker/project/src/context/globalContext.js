import React , {createContext ,  useReducer} from "react";
import AppReducer from "./appReducer";



// Initial state (store)
const initialState = {
    transactions : [
        {id:1 , text : 'Flower' , amount : -20},
        {id:2 , text : 'Salary' , amount : 300},
        {id:3 , text : 'Book' , amount : -10},
        {id:4 , text : 'Camera' , amount : 150},
    ] 
}

// creact context 
export const GlobalContext = createContext(initialState)



// Provider Componet
export const GlobalProvider = ({children}) =>{
    const [state , dispatch] = useReducer(AppReducer  , initialState)

    //Actions 
    function deleteTrans(id){
        dispatch({
            type:"DELETE",
            payload: id
        })
    }

    function addTrans(transaction){
        dispatch({
            type:"ADD",
            payload: transaction
        })
    }

    return (
        <GlobalContext.Provider value={{transactions:state.transactions , deleteTrans ,addTrans}} >
            {children}
        </GlobalContext.Provider>
    )
}