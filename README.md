# Sabbir English

Step-by-step English learning app (A1 Beginner to C2 Mastery) with sound and Bangla support.
Stack: React 19, Vite, Tailwind CSS v4, React Router, Framer Motion, Zustand.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure

```
src/
  app/          App.jsx, AppRoutes.jsx, features.js   <- feature registry
  components/   ui/ (Button, Card, ProgressBar), layout/, SpeakButton, BnToggle
  features/     home, levels, lesson, flashcards, progress   <- one folder per feature
  data/         curriculum.js   <- ALL lesson content
  lib/          curriculum helpers, speech (TTS), utils
  store/        useProgress.js  <- XP, streak, completed lessons (saved in localStorage)
  config.js     unlock rule, pass mark, XP values
```

## Add a lesson
Open `src/data/curriculum.js`, copy a lesson object inside a level, edit it. Exercises are generated automatically.

## Add a feature (example: Dictionary page)
1. Create `src/features/dictionary/DictionaryPage.jsx` (default export).
2. Add one line to `src/app/features.js`:
   `{ id: 'dictionary', path: '/dictionary', label: 'Dictionary', icon: BookA, nav: true, Component: lazy(() => import('@/features/dictionary/DictionaryPage')) }`
3. Done. Route and navigation update automatically.

## Remove a feature
Delete its line in `src/app/features.js` and its folder in `src/features/`.

## Add a new exercise type
Create it in `features/lesson/buildExercises.js`, render it in `ExerciseStep.jsx`.

## Settings
`src/config.js`: `SEQUENTIAL_UNLOCK = false` opens all lessons; `PASS_PERCENT`, `XP` values.

## Ideas for later
Dark mode, user accounts + backend sync (replace the Zustand persist storage), speaking practice (Web Speech Recognition), daily goals, spaced repetition for flashcards.
