import { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
    onSubmit : (data : NoteData) => void
    onAddTag : (tag: Tag) => void
    availablesTags : Tag[]
}

export function NewNote({onSubmit , onAddTag , availablesTags} : NewNoteProps) {
    return (
        <>
            <h1>New note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availablesTags={availablesTags} />

        </>

    )

}