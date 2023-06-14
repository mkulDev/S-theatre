import { Link } from 'react-router-dom'

const DetailsHeader = ({ dataSong, dataArtist }) => {
  if (dataSong) {
    return (
      <div className='relative w-full flex flex-col'>
        <div className=' ml-0 flex items-center w-full justify-start '>
          <img alt='art' src={dataSong?.images?.coverart} className='sm:w-18 sm:h-18w-48 h-48 rounded-full border-2 my-8 mr-2 shadow-2xl' />
          <div className='flex flex-col '>
            <p className='font-semibold text-3xl text-white'>
              {dataSong?.title} <span className='font-semibold text-2xl text-gray-300'>({dataSong?.genres?.primary})</span>
            </p>
            <Link className='table' to={`/artists/${dataSong?.artists[0]?.adamid}`}>
              <p className='font-semibold text-xl text-gray-300 '>{dataSong?.artists[0].alias}</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (dataArtist) {
    return (
      <div className='relative w-full flex flex-col'>
        <div className=' ml-0 flex items-center w-full justify-start '>
          <img alt='art' src={dataArtist?.avatar} className='sm:w-18 sm:h-18w-48 h-48 rounded-full border-2 my-8 mr-2 shadow-2xl' />
          <div className='flex flex-col '>
            <p className='font-semibold text-3xl text-white'>
              {dataArtist?.attributes.name} <span className='font-semibold text-2xl text-gray-300'>({dataArtist?.attributes?.genreNames[0]})</span>
            </p>
            <p className='font-semibold text-xl text-gray-300 '>{dataArtist?.attributes?.origin}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailsHeader
