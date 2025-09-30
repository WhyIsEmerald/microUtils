import { firebaseStore } from './firebase'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { get } from 'svelte/store'
import { encrypt, decrypt } from '$lib/scripts/encryption'
const db = getFirestore(get(firebaseStore).app)

/**
 * Saves a user's note to Firestore, encrypting the content before storage.
 *
 * @param uid - The user's unique identifier.
 * @param data - An object containing the note content to be saved.
 * @param extraPassword - (Optional) An additional password used for encryption, concatenated with the UID.
 *                        If not provided, only the UID is used for encryption.
 * @returns A Promise that resolves when the note has been saved.
 */
export async function saveUserNote(
  uid: string,
  data: string,
  extraPassword?: string
): Promise<void> {
  try {
    if (!uid) throw new Error('UID must be provided.')
    if (!data) throw new Error('Note data must be provided.')
    const noteRef = doc(db, 'users', uid, 'note', 'data')
    if (extraPassword) {
      data = await encrypt(data, extraPassword + uid)
    } else {
      data = await encrypt(data, uid)
    }
    await setDoc(noteRef, { content: data }, { merge: true })
  } catch (e: any) {
    console.error(`Failed to save user note: ${e.message}`)
    throw e
  }
}

/**
 * Retrieve user note from Firestore
 * @param uid User's UID
 * @param extraPassword Optional extra password for decryption
 * @returns Decrypted note content or null if not found
 */
export async function getUserNote(
  uid: string,
  extraPassword?: string
): Promise<{ content: string } | null> {
  const noteRef = doc(db, 'users', uid, 'note', 'data')
  const docSnap = await getDoc(noteRef)
  if (docSnap.exists()) {
    let data = docSnap.data()
    if (extraPassword) {
      data.content = await decrypt(data.content, extraPassword + uid)
    } else {
      data.content = await decrypt(data.content, uid)
    }
    return data.content ? { content: data.content } : null
  } else {
    return null
  }
}

/**
 * Saves a user's todo list to Firestore
 *
 *
 * The todo list are stored by name, and the data is not encrypted.
 *
 * @param uid - The user's unique identifier.
 * @param name - The todo list name.
 * @param data - An object containing the todo list content to be saved.
 * @returns A Promise that resolves when the todo list has been saved.
 */
export async function saveUserTodo(uid: string, data: string): Promise<void> {
  if (!uid) throw new Error('UID must be provided.')
  if (!data) throw new Error('Todo data must be provided.')
  const todoRef = doc(db, 'users', uid, 'todos', 'data')
  await setDoc(todoRef, { content: data }, { merge: true })
}

/**
 * Retrieve user todo list from Firestore
 *
 * @param uid User's UID
 *
 * The returned todo data is not decrypted.
 *
 * If user or todo does not exist, returns null.
 * @returns Todo list content or null if not found
 */
export async function getUserTodo(
  uid: string
): Promise<{ content: string } | null> {
  const todoRef = doc(db, 'users', uid, 'todos', 'data')
  const docSnap = await getDoc(todoRef)
  if (docSnap.exists()) {
    let data = docSnap.data()
    return data.content ? { content: data.content } : null
  } else {
    return null
  }
}
