import NavItem, { NavItemProps } from 'src/components/navigation/NavItem.tsx'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

interface NavBarProps {
  items: NavItemProps[];
  button?: {
    text: string;
    href: string;
  }
}

const NavBar = ({items, button}: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <>
        <nav className="z-50 relative flex items-center justify-between w-full bg-gray-900 shadow-md px-6 py-2">
            <NavLink to="/" className="flex items-center justify-between gap-4">
              <img src="HR_logo.svg" alt="logo image" className="h-12 w-auto" />
              <span className="text-xl md:text-4xl text-gray-50 font-bold">Hernández Renovations</span>
            </NavLink>
          <div className="hidden md:flex items-center p-4 gap-6">
            <ul className="flex flex-row items-center gap-6">
              {items.map((item) => (
                  <li className="text-gray-400 text-xl hover:text-gray-50 transition-all" key={item.href}>
                    <NavItem text={item.text} href={item.href} />
                  </li>
              ))}
            </ul>
            {
              button ?
                  <NavLink to={button.href} className="bg-gray-50 text-xl text-center justify-center items-center font-bold text-gray-900 rounded-lg py-1 px-4 hover:scale-105 transition-all">
                    {button.text}
                  </NavLink>
                  : ""
            }
          </div>

          {/* Hamburger Button*/}
          <button className="relative md:hidden w-8 h-6" onClick={() => setIsOpen(!isOpen)}>
            <span className={`absolute bg-gray-50 rounded-full w-full h-1 transition-all ${isOpen ? 'top-1/2 -translate-y-1/2 left-0 rotate-45' : 'top-0 left-0'}`}/>
            <span className={`absolute bg-gray-50 rounded-full w-full h-1 top-1/2 -translate-y-1/2 left-0 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}/>
            <span className={`absolute bg-gray-50 rounded-full w-full h-1 transition-all ${isOpen ? '-rotate-45 bottom-1/2 translate-y-1/2 left-0' : 'bottom-0 left-0'}`}/>
          </button>
        </nav>
        {/* Mobile Menu */}
        <div className={`flex flex-col justify-start items-start p-6 gap-8 mt-16 fixed inset-0 z-40 bg-gray-950 text-gray-50 text-2xl transition-all ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <NavLink to='/about' className="">About</NavLink>
          <NavLink to='/gallery' className="">Gallery</NavLink>
          <NavLink to='/contact' className="">Contact</NavLink>
        </div>
      </>
  );
};

export default NavBar;
