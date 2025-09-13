const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-900 items-center justify-center w-full gap-8 p-2">
        <h3 className={"text-lg font-semibold justify-center text-center text-gray-50"}>
          Hernández Renovations
        </h3>
        <p className="text-sm justify-center text-center text-gray-400">
          &copy; {new Date().getFullYear()} Hernández Renovations. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
