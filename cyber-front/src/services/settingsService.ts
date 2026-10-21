import { request } from './api'
import type { UserSettings } from './types'

type SettingsPayload = Partial<Omit<UserSettings, 'id' | 'user'>>

function getSettings() {
  return request<UserSettings[]>('/settings/')
}

function getSetting(id: number) {
  return request<UserSettings>(`/settings/${id}/`)
}

function updateSetting(id: number, payload: SettingsPayload) {
  return request<UserSettings>(`/settings/${id}/`, {
    method: 'PUT',
    json: payload,
  })
}

export { getSetting, getSettings, updateSetting }