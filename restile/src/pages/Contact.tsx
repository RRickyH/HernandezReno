import NavBar from "src/components/navigation/NavBar.tsx";
import Footer from "src/components/navigation/Footer.tsx";
import ContactCard from "src/components/ContactCard";

export default function Contact() {
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
        <div className="flex flex-col items-center justify-center bg-gray-800 py-20 gap-6 text-gray-50">
          <h1 className="font-bold text-3xl md:text-5xl ">Get in touch!</h1>
          <p className="text-pretty text-center md:text-left md:text-xl max-w-2xl px-12">
            Ready to start your kitchen transformation? Contact us today for a
            free consultation and let's bring your dream space a reality.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch justify-center gap-6 p-8">
          <ContactCard></ContactCard>
          <div className="flex flex-col items-stretch justify-stretch gap-6 h-full">
            <div className="flex flex-row flex-1 items-start justify-start p-4 gap-4 rounded-3xl bg-gray-700">
              <div className="flex items-center justify-center rounded-full bg-gray-800 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 stroke-gray-50"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-gray-50 gap-1">
                <h3 className="font-bold text-2xl">Service Area & Hours</h3>
                <p className="">
                  We take renovations across the Niagara region and Hamilton.
                </p>
                <p className="">Hours: Monday — Saturday; 9:00 AM — 6:00 PM</p>
              </div>
            </div>
            <div className="flex flex-row flex-1 p-4 gap-4 items-start justfy-start rounded-3xl bg-gray-700">
              <div className="flex items-center justify-center rounded-full bg-gray-800 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 stroke-gray-50"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-gray-50 gap-1">
                <h3 className="font-bold text-2xl">Phone</h3>
                <a
                  href="tel:+19053292971"
                  className="hover:opacity-80 transition-all duration-200"
                >
                  (905) 329-2971
                </a>
              </div>
            </div>
            <div className="flex flex-row flex-1 items-start justify-start p-4 gap-4 rounded-3xl bg-gray-700">
              <div className="flex items-center justify-center rounded-full bg-gray-800 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 stroke-gray-50"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-gray-50 gap-1">
                <h3 className="font-bold text-2xl">Email</h3>
                <a
                  href="mailto:contact@hernandezreno.ca"
                  className="hover:opacity-80 transition-all duration-200 break-all"
                >
                  contact@hernandezreno.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
