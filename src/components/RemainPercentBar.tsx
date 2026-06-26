import { cn } from "@/lib/utils"

import { Progress } from "./ui/progress"

export default function RemainPercentBar({ value, days, className }: { value: number; days?: number; className?: string }) {
  // 优先用天数判断颜色（实际天数而不是百分比）
  let colorClass = "bg-green-500"
  if (days !== undefined) {
    if (days <= 30) colorClass = "bg-red-500"
    else if (days <= 60) colorClass = "bg-yellow-500"
  } else {
    // 兜底：用百分比判断
    if (value < 30) colorClass = "bg-red-500"
    else if (value < 70) colorClass = "bg-yellow-500"
  }

  return (
    <Progress
      aria-label={"Server Usage Bar"}
      aria-labelledby={"Server Usage Bar"}
      value={value}
      indicatorClassName={colorClass}
      className={cn("h-[1.8px] rounded-sm", className)}
    />
  )
}
