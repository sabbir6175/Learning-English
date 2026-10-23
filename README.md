# Sabbir English

Step-by-step English learning app (A1 Beginner to C2 Mastery) with pronunciation and optional Bangla support.
Stack: React 19, Vite, Tailwind CSS v4, React Router, Framer Motion, Zustand.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Manage learning content

Open `/dashboard` from the footer or visit `http://localhost:5173/dashboard`. Sign in with the verified administrator account configured in Firebase Authentication. The dashboard can add and edit levels, lessons, vocabulary, grammar modules, grammar topics, and lesson exercises. New lessons remain drafts until they have vocabulary and are published.

Content edits are saved in this browser's local storage while you work. Select **Save to cloud** to publish them to Firestore and sync them to learners and other devices. Use the dashboard's Backup tab to export or restore a JSON copy. Starter curriculum defaults live in `src/data/curriculum.js` and `src/data/grammar.js`.

### Firebase setup

1. Create a Firebase project, add a Web app, enable Email/Password sign-in, and create and verify the administrator account.
2. Create a Firestore database and deploy the rules in `firestore.rules`. Replace `REPLACE_WITH_ADMIN_EMAIL` with the administrator's verified email before deployment.
3. Copy `.env.example` to `.env.local`, fill in the Firebase Web app values and `VITE_ADMIN_EMAIL`, then restart the dev server.

The Firebase Web app configuration is public client configuration; never put a Firebase Service Account key in this frontend. Firestore rules allow public reads for learner content and restrict writes to the verified administrator account.

## Structure

```
src/
  app/          App.jsx, AppRoutes.jsx, features.js
  components/   shared UI and layout components
  data/         starter curriculum and grammar content
  features/     learning pages and the content dashboard
  lib/          curriculum helpers, speech, translation, utilities
  store/        learner progress and editable local content
```

## Add a feature

Create `src/features/<name>/<Name>Page.jsx`, then register its route in `src/app/features.js`. Navigation and routes are generated from this feature registry.
