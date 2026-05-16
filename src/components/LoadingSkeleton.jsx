export default function LoadingSkeleton({ lines = 4 }) {
  return (
    <div className="space-y-3 animate-pulse p-4">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 rounded-full bg-slate-700/80" />
      ))}
    </div>
  )
}
