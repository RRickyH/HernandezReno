import { useState } from "react";

import NavBar from "src/components/navigation/NavBar.tsx";
import Footer from "src/components/navigation/Footer.tsx";
import ProjectCard from "src/components/ProjectCard.tsx";
import { ProjectCardProps } from "src/components/ProjectCard.tsx";
import fireplaceImage from "src/assets/fireplace.jpg";
import kitchen2Image from "src/assets/kitchen-2.jpg";
import kitchen1Image from "src/assets/kitchen-1.jpg";
import commercialImage from "src/assets/commercial.jpg";
import bathroomImage from "src/assets/bathroom.jpg";

const tags: string[] = [
  "Modern",
  "Industrial",
  "Bright",
  "Kitchen",
  "Bathroom",
];

const projects: ProjectCardProps[] = [
  { title: "Kitchen 1", images: [kitchen1Image], tags: ["Kitchen"] },
  { title: "Kitchen 2", images: [kitchen2Image], tags: ["Kitchen"] },
  { title: "Kitchen 3", images: ["/kitchen_fallback.jpg"], tags: ["Kitchen"] },
  {
    title: "Fireplace 1",
    images: [fireplaceImage],
    tags: ["Modern", "Bright"],
  },
  {
    title: "Bathroom 1",
    images: [bathroomImage],
    tags: ["Bathroom", "Modern"],
  },
  {
    title: "Commercial Job 1",
    images: [commercialImage],
    tags: ["Industrial", "Modern"],
  },
  {
    title: "Home Kitchen",
    images: ["/home_kitchen.jpg"],
    tags: ["Kitchen", "Modern", "Bright"],
    date: "Nov. 23, 2024",
    description:
      "This kitchen presents a stunning balance of elegance, craftsmanship, and modern functionality. The scene is centered around a bright corner that radiates both warmth and sophistication, where the interplay of contrasting colors and textures immediately draws the eye. The cabinetry, countertops, and backsplash are all thoughtfully coordinated to create a harmonious yet striking design that feels timeless. At first glance, the room’s crisp white upper cabinets define the vertical space. Their clean Shaker-style panels are framed with subtle precision, giving a sense of structure and refinement. Brass hardware in a soft brushed tone adds a touch of understated luxury, catching light just enough to highlight the quality of the finishes without overwhelming the simplicity of the design. The cabinetry extends seamlessly up to a substantial crown molding that gives the kitchen a custom, built-in appearance, bridging the line between classic and contemporary design. Below, deep espresso or near-black lower cabinets anchor the room, providing contrast and depth against the lighter surfaces above. The gold-toned pulls match those on the upper cabinets, creating continuity between the contrasting color blocks. Between these two layers, a dazzling black subway-tile backsplash runs horizontally, adding visual rhythm to the space. Each tile reflects the light softly, creating a subtle shimmer that enhances the feeling of depth. The white grout accentuates the clean lines and geometric order, while the rich, dark tone of the tiles introduces a sophisticated drama that feels at once bold and cohesive. The countertops are a smooth expanse of bright, white stone—possibly quartz or marble—with faint veining that adds texture without detracting from the sleek minimalism. They reflect natural light streaming through the large window positioned just above the farmhouse sink. This deep apron-front sink, made of gleaming white ceramic, evokes a sense of heritage and craftsmanship while remaining completely at home in the modern setting. It’s both practical and beautiful—a centerpiece that suggests everyday comfort elevated to something artful. Above the window, two vintage-inspired wall sconces with dark green metal shades and exposed bulbs bring warmth and personality. Their industrial undertones contrast nicely with the refined finishes, grounding the design in a tactile authenticity. The brass details on the fixtures echo the tones of the faucet below, where a gracefully curved spout and single-lever handle in brushed gold complete the picture of coordinated elegance. Through the window, the lush greenery outside provides a natural frame of color and life. The abundance of daylight floods the space, bouncing off the white cabinets and countertops, creating a luminous, airy feeling that makes the black accents appear even richer. A small framed sign on the counter—reading “BOB'S YOUR UNCLE”—adds a playful human touch, reminding the viewer that this kitchen, despite its polish, is lived in and loved.  Altogether, the scene captures a perfect synthesis of design elements: contrast between light and dark, the tactile pleasure of fine materials, and the careful choreography of line and form. It feels both timeless and personal—a kitchen that manages to be a statement of style and a comfortable, inviting heart of the home.",
  },
];

export default function Gallery() {
  const [activeTag, setActiveTag] = useState("");
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
      <main className="flex-grow bg-white items-center justify-center">
        {/* Hero section */}
        <section className="relative h-[50vh] items-start justify-start w-full flex">
          <div
            style={{ backgroundImage: `url(${fireplaceImage})` }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 inset-0 flex flex-col text-gray-50 p-6 gap-4 max-w-md justify-start items-start">
            <div className="flex justify-center items-start gap-4">
              <span className="inline-block rounded-full w-1 h-12 bg-gray-50" />
              <h1 className="text-4xl text-shadow-lg/20 font-bold">
                Project Gallery
              </h1>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-8 p-8">
          {/* Tags */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <button
                className={`rounded-xl py-2 px-4 hover:scale-105 transition-all ${activeTag === tag ? "border-0 bg-gray-900 text-gray-50" : "border-gray-400/50 border-2 b-white text-gray-900"}`}
                onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Project Images */}
          <div className="container columns-md md:columns-2 lg:columns-3 gap-4">
            {projects
              .filter((project) => {
                // Show all projects if there's no filter tag.
                if (!activeTag) return true;
                return project.tags?.includes(activeTag);
              })
              .map((project) => (
                <ProjectCard {...project} />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
