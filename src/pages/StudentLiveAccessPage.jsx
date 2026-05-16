import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentLiveAccessPage() {
  const [teacherId, setTeacherId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!teacherId.trim()) {
      setError('Enter a teacher code or live link to continue')
      return
    }
    setError('')
    navigate(`/live/${encodeURIComponent(teacherId.trim())}`)
  }

  return (
    <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="hero-card p-10 lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_15px_40px_-25px_rgba(56,189,248,0.8)]">
              Student Live Access
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                Watch live classroom broadcasts in 3D style.
              </h1>
              <p className="max-w-xl text-slate-200/90 text-lg">
                Enter your teacher’s live access code or ID to join the current broadcast instantly. No teacher login required for student access.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-panel p-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Fast access</p>
                <p className="mt-2 text-slate-100">Jump directly into the live stream with a teacher code.</p>
              </div>
              <div className="glass-panel p-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Live-first UI</p>
                <p className="mt-2 text-slate-100">A vibrant splash screen for students to join broadcasts quickly.</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-3d p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.8)]">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Student Login</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Enter teacher code</h2>
              <p className="mt-2 text-slate-300">Use the code shared by your teacher to join the active broadcast.</p>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Teacher code or ID</span>
              <input
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white shadow-inner shadow-slate-950/20 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="e.g. 123 or teacher123"
              />
            </label>

            {error && <div className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

            <button className="btn-3d w-full">Join Live Broadcast</button>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Tip: If you do not have a code, ask your teacher for the live broadcast link. You can also open a broadcast directly via <span className="font-semibold text-white">/live/&lt;teacherId&gt;</span>.
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
