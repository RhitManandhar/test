import React, { useState } from 'react'

export const ScrollingBox = ({
  setDecisionTime,
}: {
  setDecisionTime: (newDecisionTime: number) => void
}) => {
  const numbers = Array.from({ length: 51 }, (_, i) => 10 + i) // Generate numbers from 10 to 60
  const [selectedNumber, setSelectedNumber] = useState(10)

  const handleSetDecisionTime = () => {
    alert(`Decision time set to ${selectedNumber} seconds!`)
    setDecisionTime(selectedNumber)
    console.log('ScrollingBox :: decision time set to ', selectedNumber)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop
    const itemHeight = 50
    const index = Math.round(scrollTop / itemHeight)
    setSelectedNumber(numbers[index])
  }

  return (
    <div className="scrolling-box-container">
      <div className="scrolling-box" onScroll={handleScroll}>
        {numbers.map((number) => (
          <div key={number} className="scrolling-box-item">
            {number}
          </div>
        ))}
      </div>
      <button className="set-decision-button" onClick={handleSetDecisionTime}>
        Set Decision Time
      </button>
    </div>
  )
}
