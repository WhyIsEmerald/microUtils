import { describe, it, expect } from 'vitest'
import { Tokens } from '../src/lib/scripts/dataStructures'
import { ShuntingYard } from '../src/lib/scripts/shuntingYard'

function toRPN(expr: string): string[] {
  const result = ShuntingYard(new Tokens(expr))
  if (!result) throw new Error('ShuntingYard returned undefined')
  return result.map(t => t.value)
}

describe('ShuntingYard', () => {
  it("should convert '3+4*2/(1-5)^2^3' to correct RPN", () => {
    // Expected RPN: 3 4 2 * 1 5 - 2 3 ^ ^ / +
    expect(toRPN('3+4*2/(1-5)^2^3')).toEqual([
      '3',
      '4',
      '2',
      '*',
      '1',
      '5',
      '-',
      '2',
      '3',
      '^',
      '^',
      '/',
      '+'
    ])
  })

  it('should handle parentheses and precedence', () => {
    // (2+3)*4 => 2 3 + 4 *
    expect(toRPN('(2+3)*4')).toEqual(['2', '3', '+', '4', '*'])
  })

  it('should handle unary minus', () => {
    // -3+4 => -3 4 +
    expect(toRPN('-3+4')).toEqual(['-3', '4', '+'])
    // -(3+4) => 3 4 + _
    expect(toRPN('-(3+4)')).toEqual(['3', '4', '+', '_'])
  })

  it('should throw on mismatched parentheses', () => {
    expect(() => toRPN('(1+2')).toThrow()
    expect(() => toRPN('1+2)')).toThrow()
  })
})
