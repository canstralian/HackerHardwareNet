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
    <div className="card group bg-[#1A1A1A] rounded-lg border border-[#00FF00]/20 transition-all duration-300 hover:border-[#00FF00]/60 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] hover:-translate-y-1 cursor-pointer">
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
        <Link 
          href={`/learning-paths/${id}`}
          className="flex items-center gap-1 text-sm font-medium mt-2 px-3 py-1.5 rounded-md border transition-all duration-200 hover:bg-opacity-10" 
          style={{ 
            color: color,
            borderColor: `${color}60`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `${color}10`;
            e.currentTarget.style.borderColor = color;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = `${color}60`;
          }}
        >
          Start Learning
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LearningPathCard;