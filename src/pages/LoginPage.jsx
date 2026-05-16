import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
})

export default function LoginPage() {
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) })

  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3500)
    return () => clearTimeout(t)
  }, [])

  const onSubmit = async (values) => {
    setServerError('')
    const result = await login(values)
    if (result.error) setServerError(result.error)
  }

  const useTeacherDemo = () => {
    setValue('email', 'teacher@gmail.com')
    setValue('password', 'password')
  }

  const usePrincipalDemo = () => {
    setValue('email', 'principal@example.com')
    setValue('password', 'password')
  }

  const useAdminDemo = () => {
    setValue('email', 'admin@gmail.com')
    setValue('password', 'password')
  }

  const useStudentDemo = () => {
    setValue('email', 'student@gmail.com')
    setValue('password', 'password')
  }

  return (
    <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="hero-card p-10 lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_15px_40px_-25px_rgba(56,189,248,0.8)]">
              Teacher & Principal Login
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white">Secure access for educators.</h1>
              <p className="max-w-xl text-slate-200/90 text-lg">
                Sign in to manage live broadcasts, upload new content, and review pending approvals.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-panel p-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Teacher access</p>
                <p className="mt-2 text-slate-100">Upload and schedule new live broadcast content.</p>
              </div>
              <div className="glass-panel p-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Principal access</p>
                <p className="mt-2 text-slate-100">Review submissions and manage content approvals.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Student viewers should use the <Link className="text-cyan-200 underline" to="/student-live">Student Live</Link> page instead.
            </div>
          </div>
        </div>

        <div className="relative">
          {showSplash && (
            <div className="splash-screen fixed inset-0 z-50 flex items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="text-4xl font-extrabold text-white tracking-tight">Content Broadcast</div>
                <div className="mt-6 flex items-center justify-center">
                  <video className="w-64 h-36 rounded-xl shadow-lg" src="https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4" autoPlay muted playsInline loop />
                </div>
              </div>
            </div>
          )}

          <div className={`card-3d p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.85)] ${showSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Sign in</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Enter your account</h2>
                <p className="mt-2 text-slate-300">Use teacher or principal credentials for backend access.</p>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <input className="mt-3 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white shadow-inner shadow-slate-950/20 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" {...register('email')} />
                {errors.email && <p className="mt-1 text-sm text-rose-300">{errors.email.message}</p>}
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <input type="password" className="mt-3 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white shadow-inner shadow-slate-950/20 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" {...register('password')} />
                {errors.password && <p className="mt-1 text-sm text-rose-300">{errors.password.message}</p>}
              </label>
              {serverError && <div className="rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-200">{serverError}</div>}
              <button className="btn-3d w-full" onClick={handleSubmit(onSubmit)}>Sign in</button>

              <div className="flex gap-3">
                <button type="button" className="rounded-full px-4 py-2 bg-slate-800 text-slate-200" onClick={useTeacherDemo}>Use teacher demo</button>
                <button type="button" className="rounded-full px-4 py-2 bg-slate-800 text-slate-200" onClick={usePrincipalDemo}>Use principal demo</button>
              </div>

              <div className="text-center text-sm">
                <Link className="text-cyan-200 underline" to="/signup">Sign up (new user)</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
