import { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

type EdtiNoteProps = {
    onSubmit: (idt: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availablesTags: Tag[]
}

export function EdtiNote({ onSubmit, onAddTag, availablesTags }: EdtiNoteProps) {
    const note = useNote()
    return (
        <>
            <h1>Edit note</h1>
            <NoteForm onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availablesTags={availablesTags} title={note.title} markdown={note.markdown} tags={note.tags} />
        </>
    )
}