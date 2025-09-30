import { writable, readable } from 'svelte/store'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBopFtH7ZDF-Q_Q701lzzvVl21SqyS8OMA',
  authDomain: 'appkit-ccdb2.firebaseapp.com',
  projectId: 'appkit-ccdb2',
  storageBucket: 'appkit-ccdb2.firebasestorage.app',
  messagingSenderId: '124041888743',
  appId: '1:124041888743:web:2183f7d9396afba1f67342'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export const firebaseStore = readable({
  app,
  db,
  auth,
  storage
})
