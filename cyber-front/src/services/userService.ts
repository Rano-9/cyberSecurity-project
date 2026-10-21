import { request } from './api'
import type { User, UserSettings } from './types'

interface CreateUserPayload {
  username: string
  password: string
}

function getUsers() {
  return request<User[]>('/user/')
}

function getUser(id: number) {
  return request<User>(`/user/${id}/`)
}

function createUser(payload: CreateUserPayload) {
  return request<User>('/user/', {
    method: 'POST',
    json: payload,
  })
}

function updateUser(id: number, payload: Partial<User>) {
  return request<User>(`/user/${id}/`, {
    method: 'PUT',
    json: payload,
  })
}

function deleteUser(id: number) {
  return request<void>(`/user/${id}/`, {
    method: 'DELETE',
  })
}

function getUserSettings(userId: number) {
  return request<UserSettings>(`/user/${userId}/settings/`)
}

function updateUserSettings(userId: number, payload: Partial<Omit<UserSettings, 'id' | 'user'>>) {
  return request<UserSettings>(`/user/${userId}/settings/`, {
    method: 'PUT',
    json: payload,
  })
}

export {
  createUser,
  deleteUser,
  getUser,
  getUserSettings,
  getUsers,
  updateUser,
  updateUserSettings,
}