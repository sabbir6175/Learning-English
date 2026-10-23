
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { features } from './features'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function NotFound() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 text-ink-500">
        This step does not exist yet.
      </p>
      <Button to="/" className="mt-6">
        Back to home
      </Button>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<AppShell />}>
          {features
            .filter((f) => f.layout !== 'focus')
            .map(({ id, path, Component }) => (
              <Route
                key={id}
                path={path}
                element={<Component />}
              />
            ))}

          <Route path="*" element={<NotFound />} />
        </Route>

        {features
          .filter((f) => f.layout === 'focus')
          .map(({ id, path, Component }) => (
            <Route
              key={id}
              path={path}
              element={<Component />}
            />
          ))}
      </Routes>
    </>
  )
}
