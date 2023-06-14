import { DetailsHeader } from '../components'
import { RelatedSongs } from '../components'
import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery } from '../redux/features/shazam/shazamCore'
import Loader from '../components/Loader'
const SongDetails = () => {
  const { songid } = useParams()
  const { data: dataSong, isFetching: isFetchingSong, error } = useGetSongDetailsQuery(songid)

  if (isFetchingSong) return <Loader title='Loading Song details...' />
  if (error) return <Error title={error} />

  return (
    <div className='flex flex-col'>
      <DetailsHeader autorId={''} dataSong={dataSong} />
      <div className='mb-8 ml-5'>
        <h2 className='text-2xl text-gray-200'>Lyrics</h2>
        <div className='mt-5'>
          {dataSong?.sections[1].type === 'LYRICS'
            ? dataSong?.sections[1]?.text?.map((line, index) => (
                <p key={index} className='text-gray-200 text-base mb-1 italic '>
                  {line}
                </p>
              ))
            : 'There is no Lrics for this song'}
        </div>
      </div>
      <RelatedSongs songid={songid} />
    </div>
  )
}

export default SongDetails
