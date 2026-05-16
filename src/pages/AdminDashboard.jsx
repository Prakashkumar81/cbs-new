import { useEffect, useMemo, useState } from 'react'
import contentService from '../services/content.service'
import StatCard from '../components/StatCard'
import ContentTable from '../components/ContentTable'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function AdminDashboard() {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contentService.list().then((res) => {
      setContents(res.data)
      setLoading(false)
    })
  }, [])

  const counts = useMemo(() => ({
    total: contents.length,
    pending: contents.filter((item) => item.status === 'pending').length,
    approved: contents.filter((item) => item.status === 'approved').length,
    rejected: contents.filter((item) => item.status === 'rejected').length
  }), [contents])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="text-sm text-slate-500">Overview for administrators with system-wide controls.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total uploads" value={counts.total} />
        <StatCard title="Pending" value={counts.pending} />
        <StatCard title="Approved" value={counts.approved} />
        <StatCard title="Rejected" value={counts.rejected} />
      </div>
      <section>
        <h3 className="text-lg font-semibold">All recent content</h3>
        {loading ? <LoadingSkeleton lines={6} /> : <ContentTable items={contents.slice(0, 15)} />}
      </section>
    </div>
  )
}
