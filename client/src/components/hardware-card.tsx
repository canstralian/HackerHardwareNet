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
    <div className="card bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20 transition-all duration-300 hover:border-[#00FF00]/60 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] hover:-translate-y-1">
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
        <Link 
          href={detailLink} 
          className="flex items-center gap-1 text-sm font-medium mt-2 px-3 py-1.5 rounded-md border transition-all duration-200 hover:bg-opacity-10" 
          style={{ 
            color: tagColor,
            borderColor: `${tagColor}60`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `${tagColor}10`;
            e.currentTarget.style.borderColor = tagColor;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = `${tagColor}60`;
          }}
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HardwareCard;
