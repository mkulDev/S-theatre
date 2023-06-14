import { useParams } from 'react-router-dom'
import { useGetSearchSongQuery } from '../redux/features/shazam/shazamCore'
import { Loader, Error, SongCard } from '../components'
import { useSelector } from 'react-redux'

const Search = () => {
  const { searchPhrase } = useParams()
  const { data: searchData, isFetching, error } = useGetSearchSongQuery(searchPhrase)
  const { activeSong, isPlaying } = useSelector(state => state.player)

  if (isFetching) return <Loader title='Loading Songs...' />
  if (error) return <Error title={error} />
  console.log(searchPhrase)
  console.log(searchData.tracks.hits)
  return (
    <div>
      <h2 className='font-bold text-2xl text-white text-left mb-5'>Search result for: {searchPhrase}</h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {searchData?.tracks?.hits?.map((song, index) => (
          <SongCard key={song.key} song={song.track} i={index} activeSong={activeSong} isPlaying={isPlaying} data={searchData?.tracks?.hits} />
        ))}
      </div>
    </div>
  )
}

export default Search
