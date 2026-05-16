import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import contentService from '../services/content.service'
import EmptyState from '../components/EmptyState'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().optional(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  rotationDuration: z.number().min(1, 'Rotation duration is required'),
  file: z.any()
})

export default function UploadContentPage() {
  const [previewUrl, setPreviewUrl] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { rotationDuration: 30 }
  })

  const watchedFile = watch('file')
  const file = watchedFile?.[0]

  useEffect(() => {
    if (!file) {
      setPreviewUrl('')
      return
    }
    const allowed = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowed.includes(file.type)) {
      setError('Supported file types: JPG, PNG, GIF')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Max file size is 10MB')
      return
    }
    setError('')
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onSubmit = async (values) => {
    setStatus('loading')
    setError('')
    if (new Date(values.endTime) <= new Date(values.startTime)) {
      setError('End time must be after start time')
      setStatus('')
      return
    }
    const payload = {
      title: values.title,
      subject: values.subject,
      description: values.description,
      startTime: values.startTime,
      endTime: values.endTime,
      rotationDuration: values.rotationDuration,
      previewUrl
    }
    try {
      await contentService.upload(payload)
      setStatus('success')
    } catch (e) {
      setError('Upload failed, please try again')
      setStatus('error')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Upload Content</h2>
        <p className="text-sm text-slate-300">Create a new subject broadcast with schedule and rotation.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 card-3d p-6 md:grid-cols-2">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Title</span>
            <input className="mt-2 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" {...register('title')} />
            {errors.title && <p className="mt-1 text-sm text-rose-300">{errors.title.message}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Subject</span>
            <select className="mt-2 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" {...register('subject')}>
              <option value="">Select subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="English">English</option>
            </select>
            {errors.subject && <p className="mt-1 text-sm text-rose-300">{errors.subject.message}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Description</span>
            <textarea className="mt-2 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" rows="4" {...register('description')} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Upload file</span>
            <input type="file" className="mt-2 block w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('file')} />
            {error && <p className="mt-1 text-sm text-rose-300">{error}</p>}
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Start time</span>
              <input type="datetime-local" className="mt-2 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('startTime')} />
              {errors.startTime && <p className="mt-1 text-sm text-rose-300">{errors.startTime.message}</p>}
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-200">End time</span>
              <input type="datetime-local" className="mt-2 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('endTime')} />
              {errors.endTime && <p className="mt-1 text-sm text-rose-300">{errors.endTime.message}</p>}
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Rotation duration (minutes)</span>
            <input type="number" className="mt-2 w-full rounded-3xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none" {...register('rotationDuration', { valueAsNumber: true })} />
          </label>
          <button className="btn-3d w-full">Submit upload</button>
          {status === 'success' && <div className="rounded-3xl bg-emerald-500/10 p-3 text-sm text-emerald-200 border border-emerald-400/10">Content uploaded successfully and is now pending approval.</div>}
          {status === 'error' && <div className="rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-200 border border-rose-400/10">Upload failed.</div>}
        </div>
        <div className="space-y-4">
          <div className="glass-panel">
            <h3 className="font-semibold text-white">Preview</h3>
            {previewUrl ? (
              <img className="mt-4 w-full rounded-2xl object-cover shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)]" src={previewUrl} alt="File preview" />
            ) : (
              <EmptyState title="Upload preview" description="Upload an image file to see a live preview." />
            )}
          </div>
          <div className="glass-panel">
            <h3 className="font-semibold text-white">Scheduling</h3>
            <p className="mt-3 text-sm text-slate-300">You can specify when the broadcast should start and end. Content will be marked scheduled until the start time is reached.</p>
          </div>
        </div>
      </form>
    </div>
  )
}
