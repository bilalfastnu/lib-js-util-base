'use strict'

/* eslint-env mocha */

const assert = require('assert')
const { assignInWith } = require('../index')

describe('assignInWith', () => {
  it('should assign the properties of source to the object', () => {
    const object = { a: 1, b: 2 }
    assignInWith(object, { b: 3, c: 4 }, (objValue = 0, srcValue) => objValue + srcValue)
    assert.deepStrictEqual(object, { a: 1, b: 5, c: 4 })
  })

  it('should assign the properties of source to the object with customizer and source', () => {
    const object = { a: 1, b: 2 }
    assignInWith(object, { b: 3, c: 4 }, (objValue = 0, srcValue, key, obj, src) => objValue + srcValue + key.length + obj.a)
    assert.deepStrictEqual(object, { a: 1, b: 7, c: 6 })
  })

  it('should assign the properties of source to the object with complex customizer', () => {
    const customizer = (objValue, srcValue, key, object, source) => {
      return (key === 'd' && object.d)
        ? [...srcValue, ...object.d]
        : srcValue
    }
    const object = {}

    assignInWith(object, { a: 10, d: [1] }, { d: [3], b: 30 }, { d: [4], b: 40 }, customizer)

    assert.deepStrictEqual(object, { d: [4, 3, 1], a: 10, b: 40 })
  })

  it('should handle edge cases', () => {
    const object = { a: 1, b: 2 }
    assignInWith(object)
    assert.deepStrictEqual(object, { a: 1, b: 2 })
    assignInWith(object, { b: 3, c: 4 })
    assert.deepStrictEqual(object, { a: 1, b: 2 })
    assignInWith(object, { b: 3, c: 4 }, null)
    assert.deepStrictEqual(object, { a: 1, b: 2 })
    assignInWith(object, (objValue = 0, srcValue = 0) => objValue + srcValue)
    assert.deepStrictEqual(object, { a: 1, b: 2 })
  })

  it('', () => {
    const object = { a: 1, b: 2 }
    const source = { b: 4, c: 3 }

    const customizer = (objValue, srcValue) => {
      return (objValue === undefined) ? srcValue : undefined
    }
    assert.deepStrictEqual(assignInWith(object, source, customizer), { a: 1, b: 4, c: 3 })
  })
})
