export default function ContentTable({ items = [] }) {
  return (
    <div className="overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.7)]">
      <table className="min-w-full divide-y divide-slate-700 text-left text-sm text-slate-100">
        <thead className="bg-slate-950/80">
          <tr>
            <th className="px-4 py-4">Title</th>
            <th className="px-4 py-4">Subject</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Start</th>
            <th className="px-4 py-4">End</th>
            <th className="px-4 py-4">Reason</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {items.map((item) => (
            <tr key={item.id} className="border-b border-slate-800">
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{item.subject}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">{new Date(item.startTime).toLocaleString()}</td>
              <td className="px-4 py-3">{new Date(item.endTime).toLocaleString()}</td>
              <td className="px-4 py-3">{item.rejectionReason || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
