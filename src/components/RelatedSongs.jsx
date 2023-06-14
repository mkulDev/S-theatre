import { ChartCard } from '../components/TopPlay'
import Loader from './Loader'
import { useGetRelatedSongsQuery } from '../redux/features/shazam/shazamCore'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setActiveSong } from '../redux/features/playerSlice'
import { playPause } from '../redux/features/playerSlice'

const RelatedSongs = ({ songid }) => {
  const [sortedData, setSortedData] = useState(null)
  const { data: relatedSongDate } = useGetRelatedSongsQuery(songid)
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const dispatch = useDispatch()

  const playClick = (song, i) => {
    dispatch(setActiveSong({ song, i }))
    dispatch(playPause(true))
  }

  const pauseClick = () => {
    dispatch(playPause(false))
  }

  useEffect(() => {
    if (relatedSongDate) {
      const newData = relatedSongDate.filter(element => {
        return element.artists && element.artists.length > 0 && element.artists[0]
      })
      setSortedData(newData)
    }
  }, [relatedSongDate])

  return (
    <div className='relative w-full flex flex-col'>
      <h2 className='font-semibold text-3xl text-white mb-3'>Related Songs</h2>
      {sortedData ? sortedData?.slice(0, 5).map((element, index) => <ChartCard song={element} i={index} key={element.key} isPlaying={isPlaying} playClick={playClick} pauseClick={pauseClick} activeSong={activeSong} />) : <Loader />}
    </div>
  )
}

export default RelatedSongs
