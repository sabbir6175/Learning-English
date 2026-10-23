import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CircleUserRound,
  LoaderCircle,
  LogOut,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { firebaseAuth } from '@/lib/firebase'
import { firebaseConfigured } from '@/lib/firebaseConfig'

function getAuthError(error) {
  const messages = {
    'auth/email-already-in-use': 'এই email দিয়ে account আগে থেকেই আছে। Log in করুন।',
    'auth/invalid-credential': 'Email বা password সঠিক নয়। আবার চেষ্টা করুন।',
    'auth/invalid-email': 'সঠিক email address লিখুন।',
    'auth/operation-not-allowed': 'Firebase Console-এ Email/Password sign-in চালু করুন।',
    'auth/popup-closed-by-user': 'Google sign-in বন্ধ করা হয়েছে। আবার চেষ্টা করতে পারেন।',
    'auth/popup-blocked': 'Browser popup block করেছে। Popup allow করে আবার চেষ্টা করুন।',
    'auth/unauthorized-domain': 'Firebase Console-এর Authorized domains-এ এই website domain যোগ করুন।',
    'auth/user-disabled': 'এই account নিষ্ক্রিয় করা হয়েছে।',
    'auth/user-not-found': 'এই email-এ account পাওয়া যায়নি। আগে Sign up করুন।',
    'auth/weak-password': 'Password অন্তত ৬ অক্ষরের হতে হবে।',
    'auth/wrong-password': 'Password সঠিক নয়। আবার চেষ্টা করুন।',
  }

  return messages[error.code] || error.message || 'কাজটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।'
}

export default function AccountPage() {
  const [mode, setMode] = useState('login')
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const signup = mode === 'signup'

  useEffect(() => {
    if (!firebaseConfigured || !firebaseAuth) {
      setAuthReady(true)
      return undefined
    }

    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser)
      setAuthReady(true)
    }, (authError) => {
      setError(getAuthError(authError))
      setAuthReady(true)
    })
  }, [])

  function clearMessages() {
    setNotice('')
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    clearMessages()
    if (!firebaseAuth) {
      setError('Firebase config পাওয়া যায়নি। .env.local পরীক্ষা করে dev server restart করুন।')
      return
    }

    setBusy(true)
    try {
      if (signup) {
        const credential = await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password)
        if (name.trim()) {
          await updateProfile(credential.user, { displayName: name.trim() })
        }
        setPassword('')
        try {
          await sendEmailVerification(credential.user)
        } catch (verificationError) {
          setNotice(`Account তৈরি হয়েছে, তবে verification email পাঠানো যায়নি: ${getAuthError(verificationError)}`)
          return
        }
        setNotice('Account তৈরি হয়েছে। Email verification link পাঠানো হয়েছে—Inbox বা Spam folder দেখুন।')
      } else {
        await signInWithEmailAndPassword(firebaseAuth, email.trim(), password)
        setNotice('সফলভাবে লগ ইন হয়েছে।')
      }
      setPassword('')
    } catch (authError) {
      setError(getAuthError(authError))
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogleSignIn() {
    clearMessages()
    if (!firebaseAuth) {
      setError('Firebase config পাওয়া যায়নি। .env.local পরীক্ষা করে dev server restart করুন।')
      return
    }

    setBusy(true)
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      await signInWithPopup(firebaseAuth, provider)
      setNotice('Google দিয়ে সফলভাবে লগ ইন হয়েছে।')
    } catch (authError) {
      setError(getAuthError(authError))
    } finally {
      setBusy(false)
    }
  }

  async function handleLogout() {
    if (!firebaseAuth) return
    clearMessages()
    setBusy(true)
    try {
      await signOut(firebaseAuth)
      setNotice('আপনি লগ আউট করেছেন।')
    } catch (authError) {
      setError(getAuthError(authError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh bg-ink-50 px-4 py-5 sm:px-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-brand-700">
          <ArrowLeft className="size-4" /> শেখায় ফিরে যান
        </Link>
      </header>
      <main className="mx-auto grid max-w-5xl gap-10 py-12 md:grid-cols-[.9fr_1.1fr] md:items-center md:py-20">
        <section>
          <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700"><CircleUserRound className="size-6" /></span>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-brand-600">আপনার শেখার জায়গা</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {user ? 'আপনার account' : signup ? 'নতুন account তৈরি করুন' : 'আবার শেখা শুরু করুন'}
          </h1>
          <p className="mt-3 leading-relaxed text-ink-500">
            {user
              ? 'আপনি লগ ইন করেছেন। আপনার account থেকে নিরাপদে লগ আউট করতে পারেন।'
              : 'Email ও password অথবা Google account দিয়ে লগ ইন করে শেখা চালিয়ে যান।'}
          </p>
        </section>

        <section className="border-t-2 border-brand-600 bg-white p-6 shadow-sm sm:p-8">
          {!authReady ? (
            <p className="flex items-center justify-center gap-2 py-12 text-sm text-ink-500">
              <LoaderCircle className="size-4 animate-spin" /> Account যাচাই হচ্ছে…
            </p>
          ) : user ? (
            <div>
              <span className="grid size-12 place-items-center rounded-full bg-brand-50 text-brand-700">
                {user.photoURL
                  ? <img src={user.photoURL} alt="" className="size-12 rounded-full" />
                  : <CircleUserRound className="size-6" />}
              </span>
              <h2 className="mt-4 text-xl font-extrabold">{user.displayName || 'শিক্ষার্থী'}</h2>
              <p className="mt-1 text-sm text-ink-500">{user.email}</p>
              {user.emailVerified && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="size-4" /> Email verified
                </p>
              )}
              <button type="button" onClick={handleLogout} disabled={busy} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 font-bold text-white transition hover:bg-brand-800 disabled:opacity-60">
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : <LogOut className="size-4" />}
                Log out
              </button>
            </div>
          ) : !firebaseConfigured ? (
            <div role="alert" className="rounded-xl bg-sun-50 p-4 text-sm leading-relaxed text-sun-800">
              Firebase config অসম্পূর্ণ। `.env.local`-এ Firebase Web App config দিন এবং dev server restart করুন।
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-ink-200" role="tablist" aria-label="Account access">
                <button type="button" role="tab" aria-selected={!signup} onClick={() => { setMode('login'); clearMessages() }} className={`py-3 text-sm font-bold ${!signup ? 'border-b-2 border-brand-600 text-brand-700' : 'text-ink-500'}`}>Log in</button>
                <button type="button" role="tab" aria-selected={signup} onClick={() => { setMode('signup'); clearMessages() }} className={`py-3 text-sm font-bold ${signup ? 'border-b-2 border-brand-600 text-brand-700' : 'text-ink-500'}`}>Sign up</button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {signup && (
                  <label className="block text-sm font-semibold text-ink-700">
                    নাম
                    <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-ink-200 px-3 font-normal outline-none focus:border-brand-500" />
                  </label>
                )}
                <label className="block text-sm font-semibold text-ink-700">
                  Email
                  <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-ink-200 px-3 font-normal outline-none focus:border-brand-500" />
                </label>
                <label className="block text-sm font-semibold text-ink-700">
                  Password
                  <input required type="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-ink-200 px-3 font-normal outline-none focus:border-brand-500" />
                </label>
                <button type="submit" disabled={busy} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 font-bold text-white transition hover:bg-brand-800 disabled:cursor-wait disabled:opacity-60">
                  {busy && <LoaderCircle className="size-4 animate-spin" />}
                  {signup ? 'Create account' : 'Log in'}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs text-ink-400"><span className="h-px flex-1 bg-ink-100" /> অথবা <span className="h-px flex-1 bg-ink-100" /></div>
              <button type="button" onClick={handleGoogleSignIn} disabled={busy} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 text-sm font-bold text-ink-700 transition hover:bg-ink-50 disabled:cursor-wait disabled:opacity-60">
                <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.44 37.85 46.98 31.72 46.98 24.55Z" />
                  <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.93 23.93 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 4)" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -4)" />
                </svg>
                Continue with Google
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-ink-400">
                Google sign-in প্রথমে Firebase Console → Authentication → Sign-in method-এ enable করুন।
              </p>
            </>
          )}

          {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm leading-relaxed text-rose-700">{error}</p>}
          {notice && <p role="status" className="mt-4 rounded-xl bg-brand-50 p-3 text-sm leading-relaxed text-brand-800">{notice}</p>}
          {firebaseConfigured && !user && authReady && (
            <p className="mt-5 flex items-start gap-2 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-400">
              <Mail className="mt-0.5 size-4 shrink-0" />
              Sign up করলে email verification link পাঠানো হবে। Firebase Console-এর Authorized domains-এ আপনার website domain যোগ করা থাকতে হবে।
            </p>
          )}
        </section>
      </main>
    </div>
  )
}
