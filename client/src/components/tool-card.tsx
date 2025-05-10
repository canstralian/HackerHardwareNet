import { Link } from 'wouter';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  tagColor: string;
  command: string;
  docLink: string;
}

const ToolCard = ({
  id,
  name,
  description,
  icon,
  tags,
  tagColor,
  command,
  docLink
}: ToolCardProps) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20 flex flex-col h-full transition-all duration-300 hover:border-[#00FF00]/60 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] hover:-translate-y-1">
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${tagColor}10`, color: tagColor }}>
            <i className={`fas ${icon}`}></i>
          </div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        
        <div className="mt-auto">
          <div className="mb-4">
            <div className="terminal-header flex items-center">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF3E3E]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-[#00FF00]"></div>
              </div>
              <span className="text-xs text-gray-400 ml-3">Terminal</span>
            </div>
            <div className="terminal-body text-sm">
              {command.split('\n').map((line, index) => (
                <div key={index}>
                  {line.startsWith('#') ? (
                    <span className="text-gray-500">{line}</span>
                  ) : (
                    <>
                      <span className="text-[#00FF00]">$</span>{' '}
                      <span className="text-gray-300">{line}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link 
              href={docLink} 
              className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md border transition-all duration-200 hover:bg-opacity-10" 
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
              View Documentation
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <div className="flex space-x-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
