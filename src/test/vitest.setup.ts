import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './server.ts'
import { cleanup } from '@testing-library/react'
import { db } from './db'
import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  db.reset()
  cleanup()
})
afterAll(() => server.close())
