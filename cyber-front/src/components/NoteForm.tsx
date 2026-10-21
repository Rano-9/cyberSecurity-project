import { type NoteFormElements } from './Notes'
import { type SubmitEvent } from 'react'

interface NoteFormProps {
    submitPressed: (event: SubmitEvent<NoteFormElements>) => void
}

const NoteForm = ({
    submitPressed,
}: NoteFormProps) => (
    <div className='action'>
        <h3>Create Note</h3>
        <form onSubmit={submitPressed}>
            <input id="noteInput" placeholder="Testi"></input>
            <a>public?<input id="notePublic" type="checkbox"></input></a>
            <button type="submit">Create note</button>
        </form>
    </div>
)
export default NoteForm