export class Token {
  value: string
  type:
    | 'number'
    | 'operator'
    | 'unaryMinus'
    | 'leftParenthesis'
    | 'rightParenthesis'
  precedence?: number
  associativity?: 'left' | 'right'

  constructor(value: string) {
    this.value = value
    if (/\d/.test(value) || (value.startsWith('-') && value.length > 1)) {
      this.type = 'number'
    } else if (value === '(') {
      this.type = 'leftParenthesis'
    } else if (value === ')') {
      this.type = 'rightParenthesis'
    } else if (value === '_') {
      this.type = 'unaryMinus'
    } else {
      this.type = 'operator'
    }
    this.precedence = this.getPrecedence()
    this.associativity = this.getAssociativity()
  }

  private getPrecedence(): number {
    switch (this.value) {
      case '+':
      case '-':
        return 2
      case '*':
      case '/':
        return 3
      case '^':
      case '_':
        return 4
      default:
        return 0
    }
  }

  private getAssociativity(): 'left' | 'right' {
    switch (this.value) {
      case '^':
      case '_':
        return 'right'
      default:
        return 'left'
    }
  }
}

export class Stack<T> {
  private elements: T[] = []

  push(element: T): void {
    this.elements.push(element)
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.elements.pop()
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.elements[this.elements.length - 1]
  }

  isEmpty(): boolean {
    return this.elements.length === 0
  }

  size(): number {
    return this.elements.length
  }
}

export class Tokens {
  tokens: Token[]

  constructor(expression: string) {
    this.tokens = this.tokenize(expression)
  }

  private tokenize(input: string): Token[] {
    let temp = ''
    let tokens: Token[] = []
    for (let i = 0; i < input.length; i++) {
      if ('0123456789.'.indexOf(input[i]) !== -1) {
        temp += input[i]
      } else {
        if (temp.length > 0) {
          tokens.push(new Token(temp))
          temp = ''
        }
        if (input[i] === '-') {
          if (input[i + 1] === '(') {
            tokens.push(new Token('_'))
          } else if (i === 0 || '+-*/^('.indexOf(input[i - 1]) !== -1) {
            temp += input[i]
          } else {
            tokens.push(new Token(input[i]))
          }
        } else if ('+/*^()'.indexOf(input[i]) !== -1) {
          tokens.push(new Token(input[i]))
        }
      }
    }
    if (temp.length > 0) {
      tokens.push(new Token(temp))
      temp = ''
    }
    return tokens
  }
}

function testTokenization(expr: string): void {
  const tokens = new Tokens(expr)
  console.log(`Expression: ${expr}`)
  console.log(
    'Tokens:',
    tokens.tokens.map(t => `${t.value}(${t.type})`).join(', ')
  )
}
