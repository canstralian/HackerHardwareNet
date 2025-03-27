import { Link } from 'wouter';

interface TutorialFeatureProps {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  updatedDate: string;
  learningPoints: string[];
  duration: string;
  level: string;
  platform: string;
}

const TutorialFeature = ({
  id,
  title,
  description,
  image,
  badge,
  badgeColor,
  updatedDate,
  learningPoints,
  duration,
  level,
  platform
}: TutorialFeatureProps) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20">
      <div className="md:flex">
        <div className="md:w-2/5">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="md:w-3/5 p-6">
          <div className="flex items-center mb-3">
            <span 
              className="text-xs font-mono px-2 py-1 rounded mr-2" 
              style={{ backgroundColor: `${badgeColor}10`, color: badgeColor }}
            >
              {badge}
            </span>
            <span className="text-xs text-gray-400">Updated {updatedDate}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          
          <div className="mb-4">
            <h4 className="font-mono text-[#00FF00] mb-2">What you'll learn:</h4>
            <ul className="text-gray-300 space-y-1">
              {learningPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check-circle text-[#00FF00] mt-1 mr-2"></i>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <div className="flex items-center mr-4">
              <i className="fas fa-clock mr-1"></i>
              <span>{duration}</span>
            </div>
            <div className="flex items-center mr-4">
              <i className="fas fa-signal mr-1"></i>
              <span>{level}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-microchip mr-1"></i>
              <span>{platform}</span>
            </div>
          </div>
          
          <Link 
            href={`/tutorial/${id}`} 
            className="bg-[#00FF00] text-[#0D0D0D] px-4 py-2 rounded font-bold hover:bg-[#00FF00]/90 transition-colors inline-block"
          >
            Start Tutorial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialFeature;
