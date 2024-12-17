import React, { useEffect, useRef, useState } from 'react'

export const CountdownDialog = ({
  isVisible,
  onComplete,
  audioRef,
  decisionTime,
}: {
  isVisible: boolean
  onComplete: () => void
  audioRef: React.RefObject<HTMLAudioElement>
  decisionTime: number
}) => {
  const [countdown, setCountdown] = useState(10)
  const timerIdsRef = useRef<number | null>(null)
  const clearCountdown = (logPrefix?: string) => {
    console.log(`${logPrefix} clearCountdown triggered`)
    if (audioRef.current) audioRef.current.pause()
    console.log(
      `${logPrefix} clearCountdown :: timerId ::`,
      timerIdsRef.current
    )
    if (timerIdsRef.current) clearInterval(timerIdsRef.current)
    timerIdsRef.current = null
    console.log(
      `${logPrefix} clearCountdown :: timerId is set to ::`,
      timerIdsRef.current
    )
  }

  useEffect(() => {
    const logPrefix = 'CountdownDialog'
    if (!isVisible) {
      return
    }

    const startCountdown = (logPrefix?: string) => {
      console.log(`${logPrefix} startCountdown triggered`)
      if (audioRef.current) audioRef.current.play()
      let timeLeft = decisionTime
      setCountdown(timeLeft)

      timerIdsRef.current = setInterval(() => {
        timeLeft -= 1
        setCountdown(timeLeft)

        if (timeLeft === 0) {
          //clearCountdown(`${logPrefix} startCountdown :: `)
          console.log(`${logPrefix} startCountdown :: onComplete() triggered`)
          onComplete()
        }
      }, 1000)
      console.log(
        `${logPrefix} startCountdown :: timerId is set to ::`,
        timerIdsRef.current
      )
    }
    startCountdown(logPrefix)

    return () => clearCountdown(logPrefix)
  }, [isVisible, onComplete])
  return isVisible ? (
    <div className="countdown-dialog">
      <div className="countdown-box">
        <h3 className="countdown-heading">Hurry up 😬!!</h3>
        <div className="countdown-number">{countdown}</div>
      </div>
    </div>
  ) : null
}
