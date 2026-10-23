const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const requiredConfig = Object.values(config)
const configuredValues = [...requiredConfig, import.meta.env.VITE_ADMIN_EMAIL]
export const firebaseConfigured = requiredConfig.every(Boolean) && Boolean(import.meta.env.VITE_ADMIN_EMAIL)
export const firebaseConfigIncomplete = configuredValues.some(Boolean) && !firebaseConfigured
export const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase() || ''

export default config
