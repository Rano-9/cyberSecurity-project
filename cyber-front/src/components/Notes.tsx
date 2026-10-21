import { useEffect, useState, type SubmitEvent } from "react"
import type { Note, User } from "../services/types"
import { createNote, getNotes } from "../services/notesService"
import NoteForm from './NoteForm'

interface FormElements extends HTMLFormControlsCollection {
    noteInput: HTMLInputElement
    notePublic: HTMLInputElement
}

export interface NoteFormElements extends HTMLFormElement {
    readonly elements: FormElements
}

interface NotesProps{
    user : User | null
}

const Notes = ({
    user,

}: NotesProps)  => {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function loadNotes() {
            try {
                const fetchedNotes = await getNotes()
                if (isMounted) {
                    setNotes(fetchedNotes)
                }
            } catch (error) {
                if (isMounted) {
                    setError(error instanceof Error ? error.message : 'Unable to load Notes.')
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadNotes()
        console.log("loading notes")
        return () => {
            isMounted = false
        }
    }, [])

    const submitPressed = async (event: SubmitEvent<NoteFormElements>) => {
        event.preventDefault()
        const note = event.currentTarget.elements.noteInput.value
        if (!note) {console.log("returned no text"); return}

        const notePublic = event.currentTarget.elements.notePublic.checked

        try {
            const newNote = await createNote({ text: note, public: notePublic })
            setNotes(prev => [...prev, newNote])
        }
        catch (error) {
            console.log(error)
        }
        console.log(note, notePublic)
    }

    return ( 
        (<div className="content">
            <div className="col">
                <h1>Notes</h1>
                {isLoading ? <p>Loading notes...</p> : null}
                {error ? <p>{error}</p> : null}
                {!isLoading && !error ? (
                    notes.length > 0 ? (
                        <ul>
                            {notes.map((note) => (
                                !note.public ?
                                    null
                                    :
                                    <li key={note.id}>
                                        {note.text}
                                    </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No notes found</p>
                    )
                ) : null}
            </div>
            <div className="col">
                <h2>Actions</h2>
                <NoteForm submitPressed={submitPressed}/>
            </div>
        </div>)
    )
}

export default Notes 
