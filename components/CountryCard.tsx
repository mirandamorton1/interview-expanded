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
    <div className="bg-cyan-600 text-black p-2 w-[438px] h-[144px] rounded-[20px] shadow-md mb-6 ">
      <div className="flex items-start gap-4">
        <div className="mt-2">
        <Image
          src={flags.png}
          alt={flags.alt || `Flag of ${name}`}
          width={57}
          height={52}
          className="object-cover rounded-sm"
        />
        </div>
        <div className="font-bold text-md">
          <h3 className="leading-tight">{name}</h3>
          <p>Languages: {languages.join(", ")}</p>
          <p>Timezones: {timezones[0]}</p>
          <p>Currency: {currency}</p>
          <p>Borders: {borders?.join(", ") || "None"}</p>
        </div>
      </div>
    </div>
  );
}
