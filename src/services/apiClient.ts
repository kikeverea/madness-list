const API_URL = '/api'

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
      ...options.headers, // allow overrides
    },
  })

  if (!res.ok) throw new Error(`API error: ${res.status}`)

  return res.status === 204 ? true as T : res.json()
}
