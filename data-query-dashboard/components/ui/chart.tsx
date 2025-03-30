"use client"
import { motion } from "framer-motion"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

export const BarChart = ({ data, index, categories, colors, valueFormatter, yAxisWidth }: ChartProps) => {
  // This is a placeholder for the actual chart implementation
  // In a real app, this would use Recharts or another charting library
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between mb-2 text-xs text-muted-foreground">
        <div>Categories</div>
        <div>{valueFormatter ? valueFormatter(maxValue) : maxValue}</div>
      </div>
      <div className="flex-1 flex flex-col justify-end space-y-2">
        {data.map((item, i) => {
          const percentage = (item.value / maxValue) * 100
          return (
            <div key={i} className="flex items-center gap-2">
              <div className="w-24 text-sm truncate">{item.name}</div>
              <motion.div
                className="h-8 bg-primary rounded-r-md"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
              <div className="text-sm">{valueFormatter ? valueFormatter(item.value) : item.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const LineChart = ({ data, index, categories, colors, valueFormatter, yAxisWidth }: ChartProps) => {
  // This is a placeholder for the actual chart implementation
  const maxValue = Math.max(...data.map((item) => item.value))
  const points = data.map((item, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (item.value / maxValue) * 100,
    value: item.value,
    name: item.name,
  }))

  // Create SVG path
  const pathD = points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between mb-2 text-xs text-muted-foreground">
        <div>Timeline</div>
        <div>{valueFormatter ? valueFormatter(maxValue) : maxValue}</div>
      </div>
      <div className="flex-1 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d={pathD}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="hsl(var(--primary))"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}
            />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          {data.map((item, i) => (
            <div key={i} className="text-center truncate" style={{ width: `${100 / data.length}%` }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface PieChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
}

export const PieChart = ({ data, index, categories, colors, valueFormatter }: PieChartProps) => {
  // This is a placeholder for the actual chart implementation
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const segments = data.map((item, i) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    currentAngle += angle

    return {
      name: item.name,
      value: item.value,
      percentage,
      startAngle,
      angle,
      endAngle: startAngle + angle,
      color: `var(--${colors[i % colors.length]})`,
    }
  })

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative h-64 w-64">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {segments.map((segment, i) => {
            // Convert angles to radians for SVG arc
            const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180)
            const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180)

            // Calculate points on the circle
            const x1 = 50 + 40 * Math.cos(startAngleRad)
            const y1 = 50 + 40 * Math.sin(startAngleRad)
            const x2 = 50 + 40 * Math.cos(endAngleRad)
            const y2 = 50 + 40 * Math.sin(endAngleRad)

            // Determine if the arc should be drawn the long way around
            const largeArcFlag = segment.angle > 180 ? 1 : 0

            // Create SVG arc path
            const pathD = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `

            return (
              <motion.path
                key={i}
                d={pathD}
                fill={`hsl(${segment.color})`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            )
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.div
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {total}
          </motion.div>
          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Total
          </motion.div>
        </div>
      </div>

      <div className="ml-8 space-y-2">
        {segments.map((segment, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${segment.color})` }} />
            <div className="text-sm">{segment.name}</div>
            <div className="text-sm text-muted-foreground">
              {valueFormatter ? valueFormatter(segment.value) : segment.value} ({segment.percentage.toFixed(1)}%)
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

