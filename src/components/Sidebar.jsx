import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../media/logo2.svg'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import { RiCloseCircleLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className='md:flex hidden flex-col w-[200px] py-8 px-4 bg-gradient-to-tl from-black to-[#1f1f1f] items-center'>
        <img src={Logo} alt='logo' className='w-[150px] shadow-lg' />
        <NavBar />
      </div>

      <div className='absolute top-6 right-3 md:hidden z-20'>
        {isMobileMenuOpen ? (
          <RiCloseCircleLine className='w-8 h-8 mr-2 text-gray-50 cursor-pointer ' onClick={() => setIsMobileMenuOpen(false)} />
        ) : (
          <HiOutlineMenu className='w-8 h-8 mr-2 text-gray-50 cursor-pointer' onClick={() => setIsMobileMenuOpen(true)} />
        )}
      </div>

      {isMobileMenuOpen && (
        <div className='absolute top-0 h-screen md:hiden flex flex-col w-full items-center backdrop-blur-lg z-10 smooth-transition bg-gradient-to-tl from-white/10 to-[#1e0d42] pt-10'>
          <img src={Logo} alt='logo' className='w-[150px] bg text-red-600' />
          <NavBar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
      )}
    </>
  )
}

export default Sidebar
