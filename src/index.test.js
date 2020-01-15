import * as mod from '.'

const log = (x) =>
  console.log(JSON.stringify(x, null, '  '))


describe('isWithinScope', () => {
  it('should is', () => {
    expect(mod.isWithinScope('x', ' y')).toBe(true)
    expect(mod.isWithinScope(' x', '  y')).toBe(true)
  })

  it('should is not', () => {
    expect(mod.isWithinScope('x', 'y')).toBe(false)
    expect(mod.isWithinScope(' x', 'y')).toBe(false)
    expect(mod.isWithinScope(' x', ' y')).toBe(false)
  })
})

describe('findNextEquivalentScope', () => {
  it('nothing', () => {
    const scope = undefined
    const list = []
    const result = mod.findNextEquivalentScope(scope, list)
    expect(result).toBe()
  })

  it('no others', () => {
    const scope = 'x'
    const list = []
    const result = mod.findNextEquivalentScope(scope, list)
    expect(result).toBe()
  })

  it('only children', () => {
    const scope = 'x'
    const list = [' x']
    const result = mod.findNextEquivalentScope(scope, list)
    expect(result).toBe()
  })

  it('sibling', () => {
    const scope = 'x'
    const list = ['x']
    const result = mod.findNextEquivalentScope(scope, list)
    expect(result).toBe(1)
  })

  it('parent', () => {
    const scope = ' x'
    const list = ['x']
    const result = mod.findNextEquivalentScope(scope, list)
    expect(result).toBe(1)
  })
})

describe('findLinesWithinScope', () => {
  it('bullcrap', () => {
    const scope = undefined
    const lines = []
    const result = mod.findLinesWithinScope(scope, lines)
    expect(result).toEqual([])
  })

  it('no lines', () => {
    const scope = 'x'
    const lines = []
    const result = mod.findLinesWithinScope(scope, lines)
    expect(result).toEqual([])
  })

  it('sibling', () => {
    const scope = 'x'
    const lines = ['y']
    const result = mod.findLinesWithinScope(scope, lines)
    expect(result).toEqual([])
  })

  it('parent', () => {
    const scope = ' x'
    const lines = ['y']
    const result = mod.findLinesWithinScope(scope, lines)
    expect(result).toEqual([])
  })

  it('one line', () => {
    const scope = 'x'
    const lines = [' y']
    const result = mod.findLinesWithinScope(scope, lines)
    expect(result).toEqual([' y'])
  })
})

describe('collapse', () => {
  it('empty list', () => {
    const list = []
    const result = mod.collapse(list)
    expect(result).toEqual([])
  })

  it('single', () => {
    const list = ['x']
    const result = mod.collapse(list)
    expect(result).toEqual([
      {
        scope: 'x',
        children: [],
      },
    ])
  })

  it('two', () => {
    const list = ['x', 'y']
    const result = mod.collapse(list)
    expect(result).toEqual([
      {
        scope: 'x',
        children: [],
      },
      {
        scope: 'y',
        children: [],
      },
    ])
  })

  it('three', () => {
    const list = ['x', 'y', 'z']
    const result = mod.collapse(list)
    expect(result).toEqual([
      {
        scope: 'x',
        children: [],
      },
      {
        scope: 'y',
        children: [],
      },
      {
        scope: 'z',
        children: [],
      },
    ])
  })

  it('nested', () => {
    const list = ['x', ' x', 'y']
    const result = mod.collapse(list)
    expect(result).toEqual([
      {
        scope: 'x',
        children: [
          {
            scope: ' x',
            children: [],
          },
        ],
      },
      {
        scope: 'y',
        children: [],
      },
    ])
  })
})
