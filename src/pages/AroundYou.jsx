import React, { useEffect, useState } from 'react'
import { useGetSongsByCountryQuery } from '../redux/features/shazam/shazamCore'
import { Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'

const AroundYou = () => {
  const [myCountry, setMyCountry] = useState('')
  const { activeSong, isPlaying } = useSelector(state => state.player)
  //After wasting an hour I found this skip option.
  const {
    data: dataCountry,
    isFetching,
    error,
  } = useGetSongsByCountryQuery(myCountry, {
    skip: !myCountry,
  })

  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const fetchFromUrl = async () => {
      const data = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
      const result = await data.json()
      setMyCountry(result.location.country)
    }
    fetchFromUrl()
  }, [myCountry])

  if (!dataCountry) return <Loader title={`Loading songs from your Country`} />

  return (
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
      {console.log(myCountry)}
      {console.log(dataCountry)}
      <h2 className='font-semibold text-2xl text-white w-full my-6'>TOP SONGS from your country {myCountry}</h2>
      {dataCountry && dataCountry.map((song, index) => <SongCard song={song} key={song.key} i={index} data={dataCountry} activeSong={activeSong} isPlaying={isPlaying} />)}
    </div>
  )
}

export default AroundYou
