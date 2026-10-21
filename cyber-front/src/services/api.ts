const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

type RequestOptions = RequestInit & {
  json?: unknown
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.json !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export { request }