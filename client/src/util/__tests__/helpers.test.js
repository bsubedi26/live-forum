import { isEmpty, isObject } from '../helpers'

describe('helpers', () => {
  it('should validate isEmpty', () => {
    const true1 = isEmpty({})
    const true2 = isEmpty([])
    const true3 = isEmpty(null)
    const false1 = isEmpty([1])
    const false2 = isEmpty({ a: true })
    expect(true1).toEqual(true)
    expect(true2).toEqual(true)
    expect(true3).toEqual(true)
    expect(false1).toEqual(false)
    expect(false2).toEqual(false)
  })

  it('should validate isObject', () => {
    const true1 = isObject({})
    const true2 = isObject({ a: true })
    const false1 = isObject([1])
    const false2 = isObject(null)
    expect(true1).toEqual(true)
    expect(true2).toEqual(true)
    expect(false1).toEqual(false)
    expect(false2).toEqual(null)
  })
})
