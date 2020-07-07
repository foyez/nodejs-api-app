import { app } from '../src/app'

describe('sample test', () => {
  it('can add 2 numbers', () => {
    expect(1 + 2).toBe(3)
  })

  it('greet', () => {
    const result = app('Sohel')

    expect(result).toMatch(/Sohel/)
  })
})
