import Image from "next/image";

type CountryCardProps = {
  name: string;
  timezones: string[];
  currency: string;
  borders?: string[];
  languages: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
};

export default function CountryCard({
  name,
  timezones,
  currency,
  borders,
  languages,
  flags,
}: CountryCardProps) {
  return (
    <div className="bg-white text-black p-0 shadow-md w-full border border-gray-300 rounded">
        <div className="w-full h-40 overflow-hidden rounded">
          <Image
            src={flags.svg} 
            alt={flags.alt || `Flag of ${name}`}
            width={288} 
            height={168} 
            className="object-cover w-full h-full" 
          />
        </div>
        <div className="text-md mt-6 px-4">
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="mt-4 text-left text-md">
          <p className="mb-2">
            <span className="font-semibold">Languages:</span> {languages.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Timezones:</span> {timezones[0]}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Currency:</span> {currency}
          </p>
          <p>
            <span className="font-semibold">Borders:</span> {borders?.join(", ") || "None"}
          </p>
        </div>
        </div>
    </div>
  );
}
