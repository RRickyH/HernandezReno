import { useState, useEffect } from "react";

import { getProjects, getTags } from "src/services/projects";
import { getImageURLs } from "src/services/types";
import { Project } from "src/services/types";
import NavBar from "src/components/navigation/NavBar.tsx";
import Footer from "src/components/navigation/Footer.tsx";
import ProjectCard from "src/components/ProjectCard.tsx";
import fireplaceImage from "src/assets/fireplace.jpg";

export default function Gallery() {
  const [activeTag, setActiveTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const load = async () => {
      // Load Projects.
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.log(error);
      }

      // Load Tags.
      try {
        const tags = await getTags();
        setTags(tags);
      } catch (error) {
        console.log(error);
      }

      // Finished loading everything.
      setLoading(false);
    };
    load();
  }, []);

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
            {tags?.map((tag) => (
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
                <ProjectCard
                  title={project.title}
                  id={String(project.id)}
                  tags={project.tags}
                  images={getImageURLs(project.imageKeys)}
                  description={project.description}
                  date={project.date}
                />
              ))}
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
