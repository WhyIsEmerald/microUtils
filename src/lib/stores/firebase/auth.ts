import { firebaseStore } from './firebase'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User
} from 'firebase/auth'
import { get, writable } from 'svelte/store'

const auth = get(firebaseStore).auth

// setup email authentication
export const emailAuth = {
  signIn: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  },
  signOut: () => {
    return signOut(auth)
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, callback)
  },
  signUp: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  },
  /**
   * Re-authenticate the current user with email and password.
   * @param user The Firebase user object
   * @param email The user's email
   * @param password The user's password
   */
  reauthenticate: async (user: User, email: string, password: string) => {
    const credential = EmailAuthProvider.credential(email, password)
    return reauthenticateWithCredential(user, credential)
  }
}

// User state store
export const user = writable<User | null>(null)

// Listen for auth state changes and update user store
emailAuth.onAuthStateChanged(firebaseUser => {
  user.set(firebaseUser)
})

// export the auth object for use in other parts of the app
export { auth }
