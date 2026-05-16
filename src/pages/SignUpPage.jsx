import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import authService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export default function SignUpPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [status, setStatus] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    setServerError('')
    setStatus('loading')
    const res = await authService.signUp({ name: values.name, email: values.email, password: values.password })
    if (res.error) {
      setServerError(res.error)
      setStatus('')
      return
    }
    // After signup, navigate to login so user can sign in (or auto-login could be added)
    setStatus('success')
    setTimeout(() => navigate('/login'), 900)
  }

  return (
    <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="hero-card p-8 mb-6">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-slate-200 mt-2">Sign up to receive teacher or student access. New users are created locally for demo purposes.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-3d p-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Full name</span>
            <input className="mt-3 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('name')} />
            {errors.name && <p className="mt-1 text-sm text-rose-300">{errors.name.message}</p>}
          </label>
          <label className="block mt-4">
            <span className="text-sm font-medium text-slate-200">Email</span>
            <input className="mt-3 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('email')} />
            {errors.email && <p className="mt-1 text-sm text-rose-300">{errors.email.message}</p>}
          </label>
          <label className="block mt-4">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <input type="password" className="mt-3 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('password')} />
            {errors.password && <p className="mt-1 text-sm text-rose-300">{errors.password.message}</p>}
          </label>
          {serverError && <div className="rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-200 mt-4">{serverError}</div>}
          <button className="btn-3d w-full mt-6">Create account</button>
          {status === 'success' && <div className="rounded-3xl bg-emerald-500/10 p-3 text-sm text-emerald-200 border border-emerald-400/10 mt-4">Account created — redirecting to login...</div>}
        </form>
      </div>
    </div>
  )
}
