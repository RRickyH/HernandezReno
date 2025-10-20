import { useState } from "react";

interface ProjectCardProps {
  title: string;
  images: string[];
  date?: string;
  href?: string;
  description?: string;
}

export default function ProjectCard({
  title,
  images,
  date,
  href,
  description,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="mb-4">
        <img alt={`image of ${title}`} src={images[0]} />
      </button>
      {/* Project Pop-up */}
      {open ? (
        <div className="fixed w-screen h-screen backdrop-blur-xs flex items-center justify-center z-50 top-0 left-0">
          <button
            className="flex absolute items-center justify-center top-8 right-8 w-8 h-8 shadow-2xl/20"
            onClick={() => setOpen(false)}
          >
            <span className="absolute rounded-full bg-gray-50 w-full h-1 rotate-45 top-1/2 -translate-y-1/2 left-0" />
            <span className="absolute rounded-full bg-gray-50 w-full h-1 -rotate-45 bottom-1/2 translate-y-1/2 left-0" />
          </button>
          <div className="flex flex-col overflow-y-auto md:flex-row items-stretch justify-between bg-gray-50 rounded-xl shadow-2xl m-4 p-4 md:m-16 max-w-screen max-h-[80vh] gap-6">
            {/* Image Carousel */}
            <img
              alt={`Image of ${title}`}
              src={images[0]}
              className="md:max-w-[33vw] max-h-[80vh] rounded-sm"
            />
            <div className="flex flex-col items-center justify-items-stretch text-gray-900 md:max-w-[33vw] md:overflow-y-auto gap-2">
              <div className="flex flex-row items-start justify-between w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <h3 className="text-2xl font-bold">{title}</h3>
                  {date ? (
                    <h4 className="text-gray-400 text-sm">{date}</h4>
                  ) : null}
                </div>
                {href ? (
                  <a
                    href={href}
                    className="py-2 px-4 rounded-lg bg-blue-400 text-gray-50 font-bold"
                  >
                    More
                  </a>
                ) : null}
              </div>
              <span className="w-full min-h-1 h-1 mt-2 bg-gray-400/40 rounded-full block" />
              <p className="text-md">{description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
