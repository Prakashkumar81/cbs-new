import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import contentService from '../services/content.service'
import EmptyState from '../components/EmptyState'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function LivePage() {
  const { teacherId } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchActive = async () => {
    setLoading(true)
    setError('')
    const res = await contentService.getActiveByTeacher(teacherId)
    setContent(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchActive()
    const timer = setInterval(fetchActive, 10000)
    return () => clearInterval(timer)
  }, [teacherId])

  if (loading) return <LoadingSkeleton lines={6} />

  if (!content) return <EmptyState title="No content available" description="There is no active broadcast for this teacher right now." />

  return (
    <div className="space-y-6 card-3d p-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Live broadcast</p>
        <h1 className="text-3xl font-semibold text-white">{content.title}</h1>
        <p className="text-sm text-slate-300">Subject: {content.subject}</p>
      </div>
      {content.previewUrl ? (
        <img className="w-full rounded-3xl object-cover shadow-[0_30px_90px_-50px_rgba(15,23,42,0.75)]" src={content.previewUrl} alt="Content preview" />
      ) : (
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-12 text-center text-slate-400">Preview not available</div>
      )}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Start</p>
          <p className="mt-2 font-medium text-white">{new Date(content.startTime).toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">End</p>
          <p className="mt-2 font-medium text-white">{new Date(content.endTime).toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">Rotation</p>
          <p className="mt-2 font-medium text-white">{content.rotationDuration} min</p>
        </div>
      </div>
    </div>
  )
}
