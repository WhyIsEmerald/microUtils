import { Token, Stack, Tokens } from '../src/lib/scripts/dataStructures'
import { describe, it, expect } from 'vitest'

describe('Token', () => {
  it('should classify numbers', () => {
    const t = new Token('42')
    expect(t.type).toBe('number')
  })
  it('should classify operators', () => {
    expect(new Token('+').type).toBe('operator')
    expect(new Token('*').type).toBe('operator')
  })
  it('should classify parentheses', () => {
    expect(new Token('(').type).toBe('leftParenthesis')
    expect(new Token(')').type).toBe('rightParenthesis')
  })
  it('should classify unary minus', () => {
    expect(new Token('_').type).toBe('unaryMinus')
  })
})

describe('Stack', () => {
  it('should push and pop', () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    expect(s.pop()).toBe(2)
    expect(s.pop()).toBe(1)
    expect(s.pop()).toBeUndefined()
  })
  it('should peek', () => {
    const s = new Stack<string>()
    s.push('a')
    expect(s.peek()).toBe('a')
    s.pop()
    expect(s.peek()).toBeUndefined()
  })
  it('should report empty', () => {
    const s = new Stack()
    expect(s.isEmpty()).toBe(true)
    s.push(1)
    expect(s.isEmpty()).toBe(false)
  })
})

describe('Tokens', () => {
  it('should tokenize simple expressions', () => {
    const t = new Tokens('3+4')
    expect(t.tokens.map(tok => tok.value)).toEqual(['3', '+', '4'])
  })
  it('should handle unary minus', () => {
    const t = new Tokens('-3+4')
    expect(t.tokens.map(tok => tok.value)).toEqual(['-3', '+', '4'])
  })
  it('should handle parentheses', () => {
    const t = new Tokens('(1+2)')
    expect(t.tokens.map(tok => tok.value)).toEqual(['(', '1', '+', '2', ')'])
  })
})
