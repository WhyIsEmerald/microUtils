import { solveRPN } from '../src/lib/scripts/calculator'
import { describe, it, expect } from 'vitest'
import { ShuntingYard } from '../src/lib/scripts/shuntingYard'
import { Tokens } from '../src/lib/scripts/dataStructures'

describe('solveRPN', () => {
  it("should give the solution of the expression '3+4*2/(1-5)^2^3'", () => {
    expect(solveRPN(ShuntingYard(new Tokens('3+4*2/(1-5)^2^3'))!)).equals(
      3 + (4 * 2) / (1 - 5) ** (2 ** 3)
    )
  })
  ;(it('should throw an error for more than 1 token left in the solve stack'),
    () => {
      expect(() => solveRPN(ShuntingYard(new Tokens('3(5)'))!)).toThrow()
    })
})
