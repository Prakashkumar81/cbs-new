import { useEffect, useState } from 'react'
import contentService from '../services/content.service'
import ContentTable from '../components/ContentTable'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function MyContentPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contentService.listByTeacher(2).then((res) => {
      setItems(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">My Content</h2>
        <p className="text-sm text-slate-500">See status, schedule and rejection reason for your uploads.</p>
      </div>
      {loading ? <LoadingSkeleton lines={8} /> : <ContentTable items={items} />}
    </div>
  )
}
