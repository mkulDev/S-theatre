import { Link, useNavigate } from 'react-router-dom'

const ArtistCard = ({ song }) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-[250px] animate-slideup p-2 hover:scale-110'>
      <div className='relative w-full h-56 group'>
        <img className='rounded-full' alt='song-img' src={song.images?.coverart} />
      </div>
      <div className='mt-4 flex flex-col'>
        <p className='text-xl font-bold truncate text-gray-300 mt-0 text-center'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  )
}

export default ArtistCard
