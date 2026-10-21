import { request } from './api'
import type { Note } from './types'

type NotePayload = {
  user?: number | null
  text: string
  public?: boolean
}

function getNotes() {
  return request<Note[]>('/notes/')
}

function getNote(id: number) {
  return request<Note>(`/notes/${id}/`)
}

function createNote(payload: NotePayload) {
  return request<Note>('/notes/', {
    method: 'POST',
    json: payload,
  })
}

function updateNote(id: number, payload: Partial<NotePayload>) {
  return request<Note>(`/notes/${id}/`, {
    method: 'PUT',
    json: payload,
  })
}

function deleteNote(id: number) {
  return request<void>(`/notes/${id}/`, {
    method: 'DELETE',
  })
}

export { createNote, deleteNote, getNote, getNotes, updateNote }