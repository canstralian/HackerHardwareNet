import { Link } from 'wouter';

interface HardwareCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  tagColor: string;
  detailLink: string;
}

const HardwareCard = ({ 
  id, 
  name, 
  description, 
  image, 
  tags, 
  tagColor, 
  detailLink 
}: HardwareCardProps) => {
  return (
    <div className="card bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-0.5 rounded" 
              style={{ backgroundColor: `${tagColor}10`, color: tagColor }}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={detailLink} className="text-sm hover:underline" style={{ color: tagColor }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HardwareCard;
