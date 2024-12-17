import { useRef, useState } from 'react'
import playLogo from '/play.svg'
import stopLogo from '/stop.svg'
import pauseLogo from '/pause.svg'
import ticktockSfx from '/ticktockSfx.mp3'
import './App.css'
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'
import { getRndNumber, youTubeOpts } from './utils/helper.ts'
import { CountdownDialog } from './CountDownDialog.tsx'
import Slider from './Slider.tsx'
import { ScrollingBox } from './ScrollingBox.tsx'
import { TextAreaWithLabel } from './TextArea.tsx'

function App() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [song, setSong] = useState('nIhs1T7OcZg')
  const [limit, setLimit] = useState<number>(60)
  const [isDialogVisible, setDialogVisible] = useState(false)
  const ticktockAudioRef = useRef<HTMLAudioElement>(null)
  const [decisionTime, setDecisionTime] = useState<number>(10)

  const timeoutIdsRef = useRef<number[]>([])

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target)
    if (player) console.log('song player is ready')
  }

  const play = () => {
    if (player) player.playVideo()
    setIsPaused(true)
    const randomNumber = getRndNumber(7, limit)
    console.log('PLAY :: randomNumber :: ', randomNumber)

    setManagedTimeout(() => {
      pause('setManagedTimeout :: ')
      showCountdown('setManagedTimeout :: ')
    }, randomNumber * 1000)
  }

  const pause = (logPrefix?: unknown) => {
    console.log(`${logPrefix} PAUSE song :: `)
    if (player) player.pauseVideo()
    setIsPaused(false)
    clearAllTimeouts(`${logPrefix} PAUSE song :: `)
  }
  const stop = () => {
    console.log('stop track')
    if (player) player.stopVideo()
    setIsPaused(false)
    clearAllTimeouts(`STOP song :: `)
  }
  const setManagedTimeout = (callback: () => void, delay: number) => {
    console.log('setManagedTimeout :: setting timeout')
    const id = setTimeout(callback, delay)
    timeoutIdsRef.current.push(id)
    console.log('setManagedTimeout :: timeoutIds :: ', timeoutIdsRef.current)
    return id
  }
  const clearAllTimeouts = (logPrefix?: string) => {
    console.log(
      `${logPrefix} clearAllTimeouts :: timeoutIds :: `,
      timeoutIdsRef.current
    )
    timeoutIdsRef.current.forEach((id) => {
      console.log(`${logPrefix} clearAllTimeouts :: clearingTimeout id :: `, id)
      clearTimeout(id)
    })
    timeoutIdsRef.current = [] // Reset the array
  }
  const getVideoId = (url: string) => {
    console.log('TextBoxArea :: getVideoId :: ', url)
    const urlObj = new URL(url)
    const videoId =
      urlObj.hostname === 'youtu.be'
        ? urlObj.pathname.slice(1)
        : urlObj.searchParams.get('v')
    setSong(videoId || 'nIhs1T7OcZg')
    console.log('TextBoxArea :: getVideoId :: songId set to :: ', song)
  }

  const showCountdown = (logPrefix?: string) => {
    console.log(
      `${logPrefix} :: show countdown setting countdown dialog box to TRUE`
    )
    setDialogVisible(true)
  }

  const hideCountdown = (logPrefix?: string) => {
    console.log(
      `${logPrefix} Hide countdown :: setting countdown dialog box to FALSE `
    )
    setDialogVisible(false)
    if (ticktockAudioRef.current) {
      ticktockAudioRef.current.pause()
      ticktockAudioRef.current.currentTime = 0
    }
  }

  return (
    <>
      <div className="timerBox">
        <div className="timer-div">
          <h4 className="timer-label">Random Timer Limit ⏳</h4>
          <Slider limit={limit} setLimit={setLimit} />
        </div>
        <div className="timer-div">
          <h4 className="timer-label">Deciding Time ⏱</h4>
          <ScrollingBox setDecisionTime={setDecisionTime} />
        </div>
      </div>

      <TextAreaWithLabel
        label="Youtube Link 🔗"
        value={song}
        onChange={(e) => getVideoId(e.target.value)}
      />

      <div className="playBox">
        <YouTube videoId={song} opts={youTubeOpts} onReady={onReady} />
        <button onClick={isPaused ? pause : play}>
          <img
            src={isPaused ? pauseLogo : playLogo}
            className="logo"
            alt="Play Pause Logo"
          />
        </button>
        <button onClick={stop}>
          <img src={stopLogo} className="logo" alt="Stop Logo" />
        </button>
      </div>

      <CountdownDialog
        isVisible={isDialogVisible}
        onComplete={hideCountdown}
        audioRef={ticktockAudioRef}
        decisionTime={decisionTime}
      />
      <audio ref={ticktockAudioRef} src={ticktockSfx} preload="auto" />
    </>
  )
}

export default App
