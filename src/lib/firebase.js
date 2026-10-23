import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import config, { firebaseConfigured } from '@/lib/firebaseConfig'

const app = firebaseConfigured
  ? getApps().length ? getApp() : initializeApp(config)
  : null

export const firebaseAuth = app ? getAuth(app) : null
export const firestore = app ? getFirestore(app) : null
