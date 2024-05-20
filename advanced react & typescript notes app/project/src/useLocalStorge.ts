// T is generic value
// initialValue must be type of generic Type value or function return generic value /// works like useState its value>> value or function returns value 


// key : "NOTES" , "TAGS"
// this function takes key as a string and initialValue as a function returns T or as a T value
// it returns a state (value (from localStorge) , setValue (to set value to LocalStroge))
// first we check if there is any value in localStorge >>>> 
// if no value in LS we make on , or if there is no value .... we make the chekcs

import { useEffect, useState } from "react";

export function useLocalStorge<T>(key:string , initialValue : T | (()=> T)){

    const [value , setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue === null){
            if(typeof jsonValue === "function"){
                //  initialValue as function return T value >>>> and then excute It
                return (initialValue as ()=> T)()
            }else{
                return initialValue
            }
        }else{
            return JSON.parse(jsonValue)
        }
    })


    // every time it changes ... we update the localstroge
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))

    },[key , value])




    return [value , setValue] as [T , typeof setValue]
    // value as T and setValue as a typeof setValue what ever it is




}