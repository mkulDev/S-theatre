import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { musicTypes } from '../media/constants'
import { useGetSongsByGenreQuery } from '../redux/features/shazam/shazamCore'
import { selectGenreListId } from '../redux/features/playerSlice'

const Discover = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying, genreListId } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'ROCK')
  const [genreTitle, setgenreTitle] = useState('ROCK')

  // I used 'https://loading.io/css/' to create my own loader.
  if (isFetching) return <Loader title='Loading Songs...' />
  if (error) return <Error title={error} />

  // Logic that handles situations when API links are broken
  const sortedData = data.filter(element => {
    return element.hub && element.hub.actions && element.hub.actions[1] && element.hub.actions[1].uri ? true : false
  })

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
        <select
          onChange={event => {
            console.log(musicTypes.find(element => element.value === event.target.value).title)
            setgenreTitle(musicTypes.find(element => element.value === event.target.value).title)
            dispatch(selectGenreListId(event.target.value))
          }}
          className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 border-none cursor-pointer'
          value={genreListId || 'ROCK'}
        >
          {musicTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.title}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {sortedData?.map((song, index) => (
          <SongCard key={song.key} song={song} i={index} activeSong={activeSong} isPlaying={isPlaying} data={sortedData} />
        ))}
      </div>
    </div>
  )
}

export default Discover
