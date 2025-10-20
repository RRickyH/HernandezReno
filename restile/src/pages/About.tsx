import NavBar from "src/components/navigation/NavBar.tsx";
import Footer from "src/components/navigation/Footer.tsx";
import PersonCard from "src/components/PersonCard.tsx";
import ContactCard from "src/components/ContactCard.tsx";

export default function About() {
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
        <section className="relative h-[40vh] items-start justify-start w-full flex">
          <div className="absolute inset-0 bg-[url(/home_kitchen.jpg)] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <img
            alt="Hernandez Renovations Logo"
            src="/Hernandez_renovations_sticker.svg"
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-48 h-48"
          />
          <div className="relative z-10 inset-0 flex flex-col text-gray-50 p-6 gap-4 max-w-md justify-start items-start">
            <div className="flex justify-center items-start gap-4">
              <span className="inline-block rounded-full w-1 h-12 bg-gray-50" />
              <h1 className="text-4xl text-shadow-lg/20 font-bold">About</h1>
            </div>
          </div>
        </section>

        {/* Company about section*/}
        <section>
          <div className="container mx-auto text-gray-50">
            <p className="text-lg p-6">
              Company information about the company description text,
              information. This is supplementary to what we are all about and
              it’s very essential for perception. It’s all about building trust
              in our company and showing that we know what we are doing, and are
              capable of transforming their space, and making them happy. This
              is also about telling a story about where we came from and where
              we are going. This really helps build authenticity, brand, and
              connection.
            </p>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <li className="flex flex-col items-center justify-center p-16 gap-4">
                <h3 className="text-2xl text-center">Projects Completed</h3>
                <p className="text-6xl font-bold">124</p>
              </li>
              <li className="flex flex-col items-center justify-center p-16 gap-4">
                <h3 className="text-2xl text-center">Years of Experience</h3>
                <p className="text-6xl font-bold">15+</p>
              </li>
              <li className="flex flex-col items-center justify-center p-16 gap-4">
                <h3 className="text-2xl text-center">Cities Served</h3>
                <p className="text-6xl font-bold">6</p>
              </li>
            </ul>
          </div>
        </section>

        {/* People section */}
        <section className="p-6 flex flex-col gap-6 items-start justify-start">
          <span className="bg-gray-50/30 inline-block rounded-full w-full h-1" />
          <h1 className="text-6xl text-gray-50 font-bold p-8">People</h1>
          <PersonCard
            name="Jesus Hernandez"
            image_src="/jesus_hernandez.png"
            role="Owner, Renovation Specialist"
            bio="With over a decade of experience in residential and commercial renovations across the Niagara region, Jesus is a trusted name in quality craftsmanship and professional service. As the owner of his renovation business, he brings a deep expertise in finish carpentry and space planning, with a portfolio that includes the installation of hundreds of kitchens and countless beautifully finished interiors.
                Jesus is known for his precision, attention to detail, and commitment to excellence—his finishing work consistently exceeds expectations. Clients value not only his skill but also his reliability, cleanliness, and respectful presence in their homes. A devoted family man who lives with integrity, Jesus runs his business with the same values he lives by: honesty, quality, and care.
                Whether you're planning a full renovation or a custom upgrade, Jesus brings experience, craftsmanship, and a level of professionalism that makes him someone you’ll be glad to have on your project—and in your home."
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 card-row">
            <li>
              <PersonCard
                name="Jennifer Hernández"
                image_src="/jennifer_hernandez.jpg"
                role="Customer Success & Design"
                bio="Jennifer Hernandez is a seasoned Customer Experience and Design Consultant specializing in kitchen and cabinetry renovations. With a strong eye for detail and a passion for delivering exceptional client experiences, Jennifer combines technical expertise with a customer-first approach to guide homeowners through every stage of their renovation journey.
She creates precise 3D renderings and production drawings that bring design concepts to life, helping clients visualize their spaces before work begins. Jennifer also assists in selecting finishes, colours, and materials, ensuring each project reflects the client’s personal style while maintaining functionality and quality.
Known for her friendly and professional demeanor, Jennifer is deeply committed to getting every detail right. She coordinates all aspects of the renovation process, seamlessly bridging the gap between design and execution. Her extensive experience—both in client-facing roles and behind the scenes—has contributed to the success of countless renovation projects."
              />
            </li>
          </ul>
        </section>

        {/* Contact section */}
        <section className="flex flex-col md:flex-row p-12 pb-16 gap-16 items-stretch justify-center bg-gray-800 text-gray-50">
          <div className="flex flex-col gap-12 justify-between p-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-4xl font-bold pb-12">Get In Touch!</h3>
              <ul className="flex flex-col gap-12 items-start justify-start text-xl">
                <li>
                  <a
                    href="tel:+19053292971"
                    className="flex gap-4 items-center justify-center hover:opacity-90 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    <span>(905) 329-2971</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@hernandezreno.ca"
                    className="flex gap-4 items-center justify-center hover:opacity-90 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <span>contact@hernandezreno.ca</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 items-start justify-start">
              <h4 className="text-xl font-semibold">Hours</h4>
              <p className="font-light text-md">
                <time>9:00 AM</time>- <time>6:00 PM</time> | Monday - Saturday
              </p>
              <p className="font-light text-md">
                Serving the Niagara Region and beyond.
              </p>
            </div>
          </div>
          <span className="inline-block h-1 bg-gray-50/50 rounded-full md:w-1 md:h-auto" />
          <ContactCard />
        </section>
      </main>
      <Footer />
    </div>
  );
}
