import { NavLink } from "react-router-dom";

export interface NavItemProps {
  text: string;
  href: string;
}

export default function NavItem({ text, href }: NavItemProps) {
  return (
    <NavLink to={href} className={""}>
      {text}
    </NavLink>
  );
}
