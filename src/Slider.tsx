import React from 'react'
interface SliderProps {
  limit: number // Current value of the slider
  setLimit: (newValue: number) => void // Callback to update the value
}
const Slider = ({ limit, setLimit }: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    setLimit(newValue)
  }

  return (
    <div className="slider-container">
      <label className="slider-label">Value: {limit}</label>
      <input
        type="range"
        min={10}
        max={90}
        step={1}
        value={limit}
        onChange={handleChange}
        className="slider"
      />
    </div>
  )
}

export default Slider
