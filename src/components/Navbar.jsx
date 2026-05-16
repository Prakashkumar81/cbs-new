import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-slate-900/85 border-b border-white/10 shadow-[0_25px_70px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="font-semibold text-lg text-white">Content Broadcast</div>
        <nav className="flex flex-wrap gap-3">
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/student-live">Student Live</Link>
          {user ? (
            <>
              {user.role === 'teacher' && (
                <>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/teacher/dashboard">Dashboard</Link>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/teacher/upload">Upload</Link>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/teacher/my-content">My Content</Link>
                </>
              )}
              {user.role === 'principal' && (
                <>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/principal/dashboard">Dashboard</Link>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/principal/pending">Pending</Link>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/principal/all">All Content</Link>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/admin/dashboard">Admin Dashboard</Link>
                </>
              )}
              <button className="rounded-full px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/80 hover:text-white" to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
