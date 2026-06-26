import { formatBytes } from "@/lib/format"

interface TrafficBarProps {
  used: number
  limit: number
  expiredAt: string
  limitType: string
}

function getColor(percent: number): string {
  return `hsl(${(100 - percent) * 1.4}, 70%, 50%)`
}

export default function TrafficBar({ used, limit, expiredAt: _expiredAt, limitType: _limitType }: TrafficBarProps) {
  const win = window as unknown as Record<string, unknown>
  const showPercent = win.TrafficBarShowPercent !== false

  if (limit <= 0) return null

  const percent = Math.min(100, (used / limit) * 100)
  const percentStr = percent.toFixed(2)
  const usedFormatted = formatBytes(used)
  const limitFormatted = formatBytes(limit)

  // "9.3 GB / 200 GB / 4.65%"
  const textContent = `${usedFormatted} / ${limitFormatted}${showPercent ? ` / ${percentStr}%` : ""}`

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
        {textContent}
      </span>
      <div className="relative flex-1 h-[1.8px]">
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full" />
        <div
          className="absolute inset-0 rounded-full transition-all duration-300"
          style={{
            width: `${percentStr}%`,
            backgroundColor: getColor(percent),
          }}
        />
      </div>
    </div>
  )
}