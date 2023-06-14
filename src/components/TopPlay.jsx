import { useGetTopChartsQuery } from '../redux/features/shazam/shazamCore'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import PlayPause from './PlayPause'
import Loader from './Loader'
import Error from './Error'

export const ChartCard = ({ song, i, isPlaying, playClick, pauseClick, activeSong }) => (
  <div className='flex flex-row items-center w-full rounded-lg hover:bg-[#52139b44]  p-2 mb-1'>
    <h3 className='text-gray-200 mr-2'>{i + 1}.</h3>
    <img src={song?.images?.coverart} alt={song?.name} className='rounded-lg w-20 h-20 mr-4' />
    <div className='flex-1 flex-col justify-center items-center w-[200px]'>
      <Link className='table' to={`/songs/${song?.key}`}>
        <h3 className='text-gray-200 text-xl'>{song?.title}</h3>
      </Link>

      <Link className='table' to={`/artists/${song?.artists[0].adamid}`}>
        <p className='text-gray-400 text-base'>{song?.subtitle}</p>
      </Link>
    </div>
    <PlayPause song={song} playClick={() => playClick(song, i)} pauseClick={pauseClick} isPlaying={isPlaying} activeSong={activeSong} />
  </div>
)

const TopPlay = () => {
  const { data, isFetching, error } = useGetTopChartsQuery()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const dispatch = useDispatch()

  const playClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const pauseClick = () => {
    dispatch(playPause(false))
  }

  if (isFetching) return <Loader title='Loading Songs...' />
  if (error) return <Error title={error} />

  const topFive = data.slice(0, 5)

  return (
    <div className='xl:ml-6 xl:mb-0 xl:max-w-[500px] sm:ml-0 mb-2 max-w-full flex-1 flex-col'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-between items-baseline'>
          <h2 className='text-white text-2xl'>Top Charts</h2>
          <Link to='/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
        <div className='mt-4 flex flex-col gap-2'>
          {topFive?.map((element, index) => (
            <ChartCard song={element} i={index} key={element.key} isPlaying={isPlaying} playClick={playClick} pauseClick={pauseClick} activeSong={activeSong} />
          ))}
        </div>
      </div>
      <div className='flex flex-col w-full mt-6'>
        <div className='flex flex-row justify-between items-baseline'>
          <h2 className='text-white text-2xl'>Top Artists</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <Swiper slidesPerView='auto' spaceBetween={12} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]} className='mt-3'>
          {topFive?.map((element, index) => (
            <SwiperSlide className='shadow-lg rounded-full animate-slideright' key={element?.key} style={{ width: '25%', height: 'auto' }}>
              <Link to={`/artists/${element?.artists[0].adamid}`}>
                <img src={element.images.background} className='rounded-full w-full object-cover' />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay
