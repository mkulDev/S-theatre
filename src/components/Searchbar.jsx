import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const navigate = useNavigate()

  return (
    <form
      autoComplete='off'
      className='p-3 bg-transparent text-gray-300'
      onSubmit={e => {
        e.preventDefault()
        navigate(`/search/${searchPhrase}`)
        setSearchPhrase('')
      }}
    >
      <div className='flex flex-row justify-start items-center'>
        <FiSearch className='w-5 h-5 mx-2' />
        <input
          autoComplete='off'
          className='bg-transparent p-5 border-none outline-none text-white'
          id='serch-input'
          onChange={event => {
            setSearchPhrase(event.target.value)
          }}
          placeholder='Search for songs...'
          value={searchPhrase}
        />
      </div>
    </form>
  )
}

export default Searchbar
