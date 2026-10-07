import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PricingPage from './pages/PricingPage'
import AppShell from './layouts/AppShell'
import HomePage from './pages/app/HomePage'
import SwapPage from './pages/app/SwapPage'
import ClubHubPage from './pages/app/ClubHubPage'
import ProfilePage from './pages/app/ProfilePage'
import { DashboardPage, EventsPage, VolunteersPage, FinancePage } from './pages/app/ClubPages'
import DemoSwitcher from './components/DemoSwitcher'
import { useAppStore } from './store/useAppStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppStore(s => s.isLoggedIn)
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Protected app shell */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          {/* Student routes */}
          <Route path="home" element={<HomePage />} />
          <Route path="swap" element={<SwapPage />} />
          <Route path="clubhub" element={<ClubHubPage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* Club admin routes */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="finance" element={<FinancePage />} />

          {/* Default redirect */}
          <Route index element={<Navigate to="home" replace />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global demo switcher - always rendered */}
      <DemoSwitcher />
    </BrowserRouter>
  )
}
