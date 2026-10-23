import { Suspense } from 'react'
import { useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useTheme } from '@/store/useTheme'

const PageLoader = () => (
  <div className="grid min-h-dvh place-items-center">
    <div className="size-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
  </div>
)

export default function App() {
  const theme = useTheme((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <Suspense fallback={<PageLoader />}>
      <AppRoutes />
    </Suspense>
  )
}
