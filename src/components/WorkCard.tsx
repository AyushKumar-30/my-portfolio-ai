type Props = {
  title: string;
  org: string;
  location: string;
  date: string;
  description: string[];
  techStack?: string[];
};

export default function WorkCard({
  title,
  org,
  location,
  date,
  description,
  techStack = [],
}: Props) {
  return (
    <div className="border p-4 rounded-lg shadow space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-600 italic">
        {org} — {location}
      </p>
      <ul className="list-disc list-inside text-sm text-gray-800">
        {description.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
      {techStack.length > 0 && (
        <div className="text-sm text-blue-600 mt-1">
          Tech: {techStack.join(", ")}
        </div>
      )}
    </div>
  );
}
