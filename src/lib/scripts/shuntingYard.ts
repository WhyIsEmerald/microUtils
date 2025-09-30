import { Stack, Token, Tokens } from './dataStructures'

export function ShuntingYard(tokens: Tokens): Token[] | undefined {
  const output: Token[] = []
  const stack = new Stack<Token>()
  for (const token of tokens.tokens) {
    if (token.type === 'number') {
      output.push(token)
    }
    if (token.type === 'leftParenthesis') {
      stack.push(token)
    }
    if (token.type === 'rightParenthesis') {
      while (stack.peek()?.value !== '(') {
        output.push(stack.pop()!)
        if (stack.isEmpty()) {
          throw new Error('Mismatched parentheses')
        }
      }
      stack.pop()
    }
    if (token.type === 'unaryMinus') {
      while (
        !stack.isEmpty() &&
        stack.peek()?.type === 'operator' &&
        (stack.peek()!.precedence! > token.precedence! ||
          (stack.peek()!.precedence! === token.precedence! &&
            token.associativity === 'left'))
      ) {
        output.push(stack.pop()!)
      }
      stack.push(token)
    }
    if (token.type === 'operator') {
      while (
        !stack.isEmpty() &&
        (stack.peek()!.precedence! > token.precedence! ||
          (stack.peek()!.precedence! === token.precedence! &&
            token.associativity === 'left'))
      ) {
        output.push(stack.pop()!)
      }
      stack.push(token)
    }
  }
  while (!stack.isEmpty()) {
    const t = stack.pop()!
    if (t.type === 'leftParenthesis' || t.type === 'rightParenthesis') {
      throw new Error('Mismatched parentheses')
    }
    output.push(t)
  }
  return output
}

function testShuntingyard(expr: string): void {
  const tokens = ShuntingYard(new Tokens(expr))
  if (tokens) {
    console.log(`Expression: ${expr}`)
    console.log('Tokens:', tokens.map(t => `${t.value}`).join(', '))
  }
}
