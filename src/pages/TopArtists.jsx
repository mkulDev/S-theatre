import React from 'react'
import { useGetTopChartsQuery } from '../redux/features/shazam/shazamCore'
import { ArtistCard, Loader } from '../components'
import { useSelector } from 'react-redux'

const TopArtist = () => {
  const { data: dataCharts, isFetching, error } = useGetTopChartsQuery()

  if (isFetching) return <Loader title={`Loading ...`} />
  if (error) return <Error title={`${error}`} />

  return (
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
      {console.log(dataCharts)}
      <h2 className='font-semibold text-2xl text-white w-full my-6'>TOP Artist</h2>
      {dataCharts && dataCharts.map((song, index) => <ArtistCard song={song} key={song.key} i={index} />)}
    </div>
  )
}

export default TopArtist
