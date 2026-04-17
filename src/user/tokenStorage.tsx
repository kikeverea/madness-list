export default {
  getToken: (): string | null => localStorage.getItem('token'),
  setToken: (token: string): void =>localStorage.setItem('token', token)
}