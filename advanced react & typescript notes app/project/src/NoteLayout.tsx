import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "./App"

type NoteLayoutProps = {
    notes : Note[]
}
export function NoteLayout({notes} : NoteLayoutProps){
    const {id} = useParams()
    const note = notes.find(n => n.id === id)  // find() returns the first element that satisfies a specifec condtion

    if (note === null) return <Navigate to="/" replace /> // replace is used to auto navigate

    return <Outlet context={note} /> // outlet is from raect router  used to render out whatever in the componet
    //  in here all the children element will be here >>>> so this NoteLaout Componets actully returns no jsx 
    //  Outlet` element is a special component used to render child routes within a parent route component. It acts as a placeholder where child routes can be rendered based on the route matching logic.
    //  `context` prop that allows you to pass additional context to the child routes rendered within the `Outlet`. This can be useful for providing shared data or functionality to nested routes without explicitly passing props down the component tree.

}


export function useNote(){
    // this funciton is gonna be used inside the the childrens routes
    return useOutletContext<Note>()
}