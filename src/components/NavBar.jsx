import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigationLinks } from '../media/constants'

const NavBar = ({ setIsMobileMenuOpen }) => {
  return (
    <div className='mt-12 '>
      {navigationLinks.map(link => (
        <NavLink
          onClick={() => {
            setIsMobileMenuOpen && setIsMobileMenuOpen(false)
          }}
          to={link.to}
          end // have to implement this to prevent always being active.
          key={link.name}
          className='flex flex-row items-center justify-start my-8 text-base font-[500] text-gray-400 hover:text-cyan-400'
        >
          <link.icon className='w-8 h-8 mr-2' />
          {link.name}
        </NavLink>
      ))}
    </div>
  )
}

export default NavBar
