import { capitalize, humanize } from './text.ts'

describe('text', () => {

  test('should capitalize', () => {
    expect(capitalize('test')).toEqual('Test')
  })

  test('should remove non-letter-or-number chars', () => {
    expect(humanize('test_string')).toEqual('test string')
    expect(humanize('test-string')).toEqual('test string')
    expect(humanize('@test string')).toEqual('test string')
    expect(humanize('Test-String')).toEqual('test string')
  })
})