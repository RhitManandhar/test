import { useState } from 'react'
import playLogo from '/play.svg'
import stopLogo from '/stop.svg'
import pauseLogo from '/pause.svg'
import './App.css'
import YouTube, {YouTubeEvent, YouTubePlayer} from "react-youtube";
import {getRndNumber} from "./utils/helper.ts";


function App() {
    const [player, setPlayer] = useState<YouTubePlayer|null>(null);
    const [isPaused, setIsPaused] = useState(false);
  const [song, setSong] = useState('nIhs1T7OcZg');
  const [limit, setLimit] = useState<number>(60);
    const opts = {
        height: "0", // Hide the video
        width: "0",
        playerVars: {
            controls: 0, // Hide controls
            modestbranding: 1, // Remove YouTube logo
            rel: 0, // Disable related videos
        },
    };
    const onReady = (event: YouTubeEvent) => {
        setPlayer(event.target);
    };

    const play = () => {
        if (player) player.playVideo();
        setIsPaused(true);
        const randomNumber = getRndNumber(10,limit);
        console.log('randomNumber', randomNumber);
        setTimeout(()=>{
            console.log('Timeout !!')
            pause()
        },randomNumber*1000)
    };

    const pause = () => {
        console.log('pause track');
        if (player) player.pauseVideo();
        setIsPaused(false);
    };
    const stop = ()=>{
        console.log('stop track');
        if (player) player.stopVideo();
        setIsPaused(false);
    }
    const getVideoId = (url:string) => {
        console.log('getVideoId', url);
        const urlObj = new URL(url);
        setSong (urlObj.searchParams.get("v")||'nIhs1T7OcZg')
        console.log('getSongId', song);

    };

  return (
      <>
          <h4>Minimum Timer is set to 10 seconds</h4>
          <div className="form__group field">
              <input className="form__field" placeholder="50" name="timer" id='timer' type='number'
                        onChange={(e) => setLimit(parseInt(e.target.value))}/>
              <label htmlFor="timerLimit" className="form__label">Timer Limit</label>
          </div>
          <div className="form__group field">
              <textarea className="form__field" placeholder="Link" name="link" id='link'
                        onChange={(e) => getVideoId(e.target.value)}/>
              <label htmlFor="name" className="form__label">Link</label>
          </div>
          <div className="mainBox">
              <YouTube videoId={song} opts={opts} onReady={onReady}/>
              <button onClick={isPaused ? pause : play}>
                  <img src={isPaused ? pauseLogo : playLogo} className="logo" alt="Play Pause Logo"/>
              </button>
              <button onClick={stop}>
                  <img src={stopLogo} className="logo" alt="Stop Logo"/>
              </button>
          </div>
      </>
  )
}

export default App
