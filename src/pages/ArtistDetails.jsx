import { DetailsHeader, Error, Loader } from '../components'
import { useParams } from 'react-router-dom'
import { useGetArtistDetailsQuery } from '../redux/features/shazam/shazamCore'

const ArtistDetails = () => {
  const { id } = useParams()
  const { data: dataArtist, isFetching: isFetchingArtist, error } = useGetArtistDetailsQuery(id)

  if (isFetchingArtist) return <Loader title='Loading Author details...' />
  if (error) return <Error title={error} />

  const artistInfo = dataArtist.data[0]

  console.log(artistInfo)

  return (
    <div className='flex flex-col'>
      <DetailsHeader dataArtist={artistInfo} />
      <div className='mb-8 ml-5'>
        <h2 className='text-2xl text-gray-200 my-5'>Biography</h2>
        <p className='text-xl text-gray-400'>{artistInfo?.attributes?.artistBio || 'For this artist, there is no biography provided.'}</p>
        <div className='mt-5'></div>
      </div>
    </div>
  )
}

export default ArtistDetails
