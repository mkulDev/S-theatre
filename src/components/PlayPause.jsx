import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

const PlayPause = ({ pauseClick, playClick, isPlaying, activeSong, song }) => {
  return isPlaying && activeSong?.title === song.title ? <FaPauseCircle size={30} className='text-gray-300 m-2 cursor-pointer' onClick={pauseClick} /> : <FaPlayCircle size={30} className='text-gray-300 m-2 cursor-pointer' onClick={playClick} />
}

export default PlayPause
