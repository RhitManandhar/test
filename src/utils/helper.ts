export const getRndNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const youTubeOpts = {
  height: '0', // Hide the video
  width: '0',
  playerVars: {
    controls: 0, // Hide controls
    modestbranding: 1, // Remove YouTube logo
    rel: 0, // Disable related videos
  },
}
