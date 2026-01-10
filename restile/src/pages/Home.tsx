import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SiteContext } from "src/Context.tsx";
import NavBar from "src/components/navigation/NavBar.tsx";
import Footer from "src/components/navigation/Footer.tsx";

function Home() {
  const { config, loading } = useContext(SiteContext);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <NavBar
          items={[
            { text: "About", href: "/about" },
            { text: "Gallery", href: "/gallery" },
          ]}
          button={{ text: "Contact", href: "/contact" }}
        />
      </header>
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative h-[50vh] items-center justify-start w-full flex">
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat`}
            style={{ backgroundImage: `url('${config.heroImageURL}')` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 inset-0 flex flex-col text-gray-50 p-6 gap-4 max-w-md justify-start items-start">
            <div className="flex flex-col">
              <span className="text-3xl text-shadow-lg/20">
                {config.titleText}
              </span>
              <span className="text-5xl text-amber-400 font-bold text-shadow-lg/20">
                {config.accentText}
              </span>
            </div>
            <p className="text-lg text-shadow-lg">{config.tagLine}</p>
            <div className="flex gap-4">
              <NavLink
                to="/contact"
                className="bg-gray-50 rounded-lg hover:scale-105 transition-all text-gray-800 font-bold px-4 py-2"
              >
                Find Out How
              </NavLink>
              <NavLink
                to="/gallery"
                className="bg-gray-800/40 rounded-lg border-2 border-gray-50 hover:scale-105 transition-all px-4 py-2"
              >
                Past Projects
              </NavLink>
            </div>
          </div>
        </section>
        {loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            Loading
          </div>
        ) : (
          <></>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
