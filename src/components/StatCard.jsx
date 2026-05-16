export default function StatCard({ title, value, color = 'bg-slate-900' }) {
  return (
    <div className={`rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.7)] ${color}`}>
      <p className="text-sm uppercase tracking-[0.18em] text-cyan-200/80">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  )
}
