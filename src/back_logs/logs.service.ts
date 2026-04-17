export const openSocket = (callback: (message: string) => void): void => {
  const token = ''
  const ws = new WebSocket(`ws://localhost:4000/cable/http_logs`, { headers: { Authorization: `Bearer ${token}` } })

  ws.addEventListener('open', () => {
    ws.addEventListener('message', async event => {
      const message = typeof event.data === 'string' ?
        JSON.parse(event.data) :
        await event.data.text()

      callback(message)
    })
  })
}