export function generatePassword(
  length: number,
  passwordOptions: {
    hasNumbers: boolean
    hasSymbols: boolean
    upperCase: boolean
    lowerCase: boolean
  }
): string {
  let charset = ''
  if (passwordOptions.lowerCase) {
    charset += 'abcdefghijklmnopqrstuvwxyz'
  }
  if (passwordOptions.upperCase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  if (passwordOptions.hasNumbers) {
    charset += '0123456789'
  }
  if (passwordOptions.hasSymbols) {
    charset += '!@#$%^&*()_+[]{}|;:,.<>?'
  }
  //if charset is empty :
  if (charset.length === 0) {
    throw new Error('At least one character type must be selected')
  }

  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}
