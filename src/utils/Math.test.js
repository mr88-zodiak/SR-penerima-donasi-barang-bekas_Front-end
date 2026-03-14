import { describe, it, expect } from 'vitest'
import { kali } from './math'

describe('method perkalian', () => {
  it('4 x 5 = 20', () => {
    const hasil = kali(4, 5)
    expect(hasil).toBe(20)
  })
})
