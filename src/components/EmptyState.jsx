export default function EmptyState({ title = 'No content available', description = '' }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-8 text-center text-slate-300 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.8)]">
      <p className="text-lg font-semibold text-white">{title}</p>
      {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
    </div>
  )
}
