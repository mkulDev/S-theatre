import React, { useEffect, useState } from 'react'
import { useGetTopChartsQuery } from '../redux/features/shazam/shazamCore'
import { Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data: dataCharts, isFetching, error } = useGetTopChartsQuery()

  if (isFetching) return <Loader title={`Loading ...`} />
  if (error) return <Error title={`${error}`} />

  const sortedData = dataCharts.filter(song => song.hasOwnProperty('artists'))

  return (
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
      {console.log(sortedData)}
      <h2 className='font-semibold text-2xl text-white w-full my-6'>TOP Charts</h2>
      {sortedData?.map((song, index) => (
        <SongCard song={song} key={song.key} i={index} data={sortedData} activeSong={activeSong} isPlaying={isPlaying} />
      ))}
    </div>
  )
}

export default TopCharts
