import { useEffect, useState } from 'react'
import approvalService from '../services/approval.service'
import contentService from '../services/content.service'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function PendingApprovalPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    contentService.list({ status: 'pending' }).then((res) => {
      setItems(res.data)
      setLoading(false)
    })
  }, [])

  const refresh = async () => {
    const res = await contentService.list({ status: 'pending' })
    setItems(res.data)
  }

  const handleApprove = async (contentId) => {
    await approvalService.approve(contentId)
    setMessage('Content approved successfully')
    refresh()
  }

  const handleReject = async (contentId) => {
    if (!reason) {
      setMessage('Rejection reason is required')
      return
    }
    await approvalService.reject(contentId, reason)
    setSelected(null)
    setReason('')
    setMessage('Content rejected with reason')
    refresh()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Pending Approval</h2>
        <p className="text-sm text-slate-500">Review new content and approve or reject with a reason.</p>
      </div>
      {message && <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200 border border-emerald-400/10">{message}</div>}
      {loading ? (
        <LoadingSkeleton lines={6} />
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="glass-panel">No pending content available.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="glass-panel p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-300">{item.subject}</p>
                    <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-3xl bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-400" onClick={() => handleApprove(item.id)}>Approve</button>
                    <button className="rounded-3xl bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-400" onClick={() => setSelected(item.id)}>Reject</button>
                  </div>
                </div>
                {selected === item.id && (
                  <div className="mt-4 rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                    <textarea
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/80 p-3 text-slate-100"
                      placeholder="Rejection reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <button className="mt-3 rounded-3xl bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-400" onClick={() => handleReject(item.id)}>Submit rejection</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
