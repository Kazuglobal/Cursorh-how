interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min: number
  max: number
  step: number
  className?: string
}

export function Slider({
  value,
  onValueChange,
  min,
  max,
  step,
  className = '',
}: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      className={`w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer ${className}`}
      style={{
        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${
          ((value[0] - min) / (max - min)) * 100
        }%, var(--muted) ${((value[0] - min) / (max - min)) * 100}%, var(--muted) 100%)`,
      }}
    />
  )
}
