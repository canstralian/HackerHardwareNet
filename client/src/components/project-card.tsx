import { Link } from 'wouter';

interface Author {
  username: string;
  avatar: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  tagColor: string;
  author: Author;
  stars: number;
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  tag,
  tagColor,
  author,
  stars
}: ProjectCardProps) => {
  return (
    <div className="card bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold">{title}</h3>
          <span 
            className="text-xs px-2 py-0.5 rounded" 
            style={{ backgroundColor: `${tagColor}10`, color: tagColor }}
          >
            {tag}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <img 
              src={author.avatar} 
              alt={`${author.username} avatar`} 
              className="w-5 h-5 rounded-full mr-1"
              loading="lazy"
            />
            <span>{author.username}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-star mr-1 text-yellow-500"></i>
            <span>{stars}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
