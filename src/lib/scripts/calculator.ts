import { Token } from './dataStructures'

export function solveRPN(tokens: Token[]): number | string {
  let solvedStack: Array<number | string> = []
  for (const token of tokens) {
    if (token.type === 'number') {
      solvedStack.push(parseFloat(token.value))
    } else {
      if (token.value === '-') {
        const b = solvedStack.pop()!
        const a = solvedStack.pop()!
        solvedStack.push(Number(a) - Number(b))
      }
      if (token.value === '+') {
        const b = solvedStack.pop()!
        const a = solvedStack.pop()!
        solvedStack.push(Number(a) + Number(b))
      }
      if (token.value === '*') {
        const b = solvedStack.pop()!
        const a = solvedStack.pop()!
        solvedStack.push(Number(a) * Number(b))
      }
      if (token.value === '/') {
        const b = solvedStack.pop()!
        const a = solvedStack.pop()!
        solvedStack.push(Number(a) / Number(b))
      }
      if (token.value === '^') {
        const b = solvedStack.pop()!
        const a = solvedStack.pop()!
        solvedStack.push(Math.pow(Number(a), Number(b)))
      }
      if (token.value === '_') {
        const a = solvedStack.pop()!
        solvedStack.push(-Number(a))
      }
    }
  }
  if (solvedStack.length > 1) {
    throw new Error('invalid expression given as input')
  }
  return solvedStack.pop()!
}
