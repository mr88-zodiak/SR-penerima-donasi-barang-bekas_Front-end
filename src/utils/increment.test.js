import { describe, it, expect } from 'vitest'
import { increment } from './increment'

describe('increment function', () => {
  it('should return the incremented value', () => {
    const result = increment(1)
    expect(result).toBe(2)
  })
})
