import { useEffect, useState } from 'react'
import contentService from '../services/content.service'
import ContentTable from '../components/ContentTable'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function AllContentPage() {
  const [contents, setContents] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contentService.list({ status, search }).then((res) => {
      setContents(res.data)
      setLoading(false)
    })
  }, [status, search])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">All Content</h2>
        <p className="text-sm text-slate-500">Filter by status or search by title.</p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <select className="rounded-lg border p-3" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            className="rounded-lg border p-3"
            placeholder="Search title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? <LoadingSkeleton lines={8} /> : <ContentTable items={contents} />}
    </div>
  )
}
