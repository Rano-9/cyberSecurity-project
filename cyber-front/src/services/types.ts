export type Note = {
  id: number
  user: number | null
  text: string
  public: boolean
}

export type UserSettings = {
  id: number
  user: number
  first_name: string | null
  last_name: string | null
  email: string | null
  number: string | null
  admin: boolean | null
}

export type User = {
  id: number
  username: string
  password?: string
  settings?: UserSettings
}