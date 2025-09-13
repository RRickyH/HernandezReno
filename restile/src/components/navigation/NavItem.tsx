import { NavLink } from 'react-router-dom'

export interface NavItemProps {
    text: string;
    href: string;
}

const NavItem = ({ text, href }: NavItemProps) => {
    return (
        <NavLink to={href}
                 className={""}>
            {text}
        </NavLink>
    )
}

export default NavItem;