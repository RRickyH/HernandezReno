import NavBar from "src/components/navigation/NavBar";
import Footer from "src/components/navigation/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <header>
            <NavBar items={[
                {text: "About", href: "about"},
                {text: "Gallery", href: "gallery"},
            ]} button={{"text": "Contact", "href": "/contact"}}/>
        </header>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
