interface PersonCardProps {
  name: string;
  image_src: string;
  role: string;
  bio: string;
}

export default function PersonCard({
  name,
  image_src,
  role,
  bio,
}: PersonCardProps) {
  return (
    <div className="flex flex-col [.card-row_&]:flex-col [.card-row_&]:h-full lg:flex-row w-full items-center justify-between bg-gray-900 rounded-2xl p-4 gap-4">
      <div>
        <img
          src={image_src}
          alt={"Photo of " + name}
          className="size-full aspect-square rounded-md object-cover object-center w-full max-w-128"
        />
      </div>
      <div className="flex flex-grow flex-col items-center justify-center gap-4 text-gray-50">
        <div className="flex flex-col items-start justify-start">
          <h2 className="font-bold italic text-xl">{role}</h2>
          <p className="text-lg font-light max-w-196">{bio}</p>
        </div>
      </div>
    </div>
  );
}
