import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-800 items-center justify-center w-full gap-8">
        <h3 className={"text-lg font-semibold justify-center text-center"}>
          Hernandez Renovations
        </h3>
        <p className="text-sm justify-center text-center">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <div className={"flex justify-center gap-20"}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
