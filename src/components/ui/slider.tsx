'use client'

import { cn } from "./utils";

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min: number
  max: number
  step?: number
  className?: string
}

export const Slider = ({ value, onValueChange, min, max, step = 1, className }: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([Number(e.target.value)])
  }

  const percentage = ((value[0] - min) / (max - min)) * 100

  return (
    <div className={cn('relative w-full', className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #FB921D 0%, #FB921D ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
        }}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FB921D;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(251, 146, 29, 0.3);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FB921D;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(251, 146, 29, 0.3);
        }
      `}</style>
    </div>
  )
}