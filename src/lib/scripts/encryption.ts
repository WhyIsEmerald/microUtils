/**
 * Provides AES-256-CBC encryption and decryption utilities using password-based key derivation.
 * Browser-compatible using Web Crypto API.
 */

function buf2hex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x: number) =>
      ('00' + x.toString(16)).slice(-2)
    )
    .join('')
}
function hex2buf(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes.buffer
}

async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypts a plaintext string using AES-256-CBC with a password.
 * Returns a string: `${saltHex}:${ivHex}:${encryptedHex}`
 */
export async function encrypt(text: string, password: string): Promise<string> {
  const enc = new TextEncoder()
  const salt = window.crypto.getRandomValues(new Uint8Array(16))
  const iv = window.crypto.getRandomValues(new Uint8Array(16))
  const key = await deriveKey(password, salt)

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    enc.encode(text)
  )

  return `${buf2hex(salt)}:${buf2hex(iv)}:${buf2hex(encrypted)}`
}

/**
 * Decrypts a string encrypted by the `encrypt` function using AES-256-CBC and a password.
 */
export async function decrypt(
  encryptedText: string,
  password: string
): Promise<string> {
  const [saltHex, ivHex, dataHex] = encryptedText.split(':')
  const salt = new Uint8Array(hex2buf(saltHex))
  const iv = new Uint8Array(hex2buf(ivHex))
  const data = new Uint8Array(hex2buf(dataHex)) // <-- fix here
  const key = await deriveKey(password, salt)

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv },
    key,
    data
  )
  return new TextDecoder().decode(decrypted)
}
