import NavItem, { NavItemProps } from 'src/components/navigation/NavItem.tsx'
import { NavLink } from 'react-router-dom'

interface NavBarProps {
  items: NavItemProps[];
  button?: {
    text: string;
    href: string;
  }
}

const NavBar = ({items, button}: NavBarProps) => {
  return (
    <nav className="flex items-center justify-between w-full bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 gap-4">
          <NavLink to="/" className="flex items-center">
            <img src="HR_logo.svg" alt="logo image" className="h-12 w-auto" />
          </NavLink>
          <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-2">
            <span className="md:text-4xl text-gray-50 font-bold">Hernández</span>
            <span className="md:text-4xl text-gray-50 font-bold">Renovations</span>
          </div>
        </div>
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
        <button className="md:hidden">

        </button>
      </div>
    </nav>
  );
};

export default NavBar;
