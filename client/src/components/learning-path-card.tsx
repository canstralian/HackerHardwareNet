import { Link } from 'wouter';

interface LearningPathProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
  duration: string;
  modules: number;
  color: string;
}

const LearningPathCard = ({ 
  id, 
  title, 
  description, 
  icon, 
  badge, 
  badgeColor, 
  duration, 
  modules, 
  color 
}: LearningPathProps) => {
  return (
    <div className="card bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20">
      <div className="h-1" style={{ backgroundColor: color }}></div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
            <i className={`fas ${icon}`} style={{ color }}></i>
          </div>
          <div className="ml-4">
            <span 
              className="text-xs font-mono px-2 py-1 rounded" 
              style={{ backgroundColor: `${badgeColor}10`, color: badgeColor }}
            >
              {badge}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <div className="flex items-center mr-4">
            <i className="fas fa-clock mr-1"></i>
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-book mr-1"></i>
            <span>{modules} modules</span>
          </div>
        </div>
        <Link href={`/learning-paths/${id}`} className="inline-block hover:underline" style={{ color }}>
          Start Learning <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default LearningPathCard;
