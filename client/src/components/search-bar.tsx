import { useState } from 'react';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search knowledge base...", 
  onSearch,
  className = "" 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}> 
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isMobile ? "Search..." : placeholder}
          className={`input ${isMobile ? 'pl-9 pr-4 py-3 text-base' : 'pl-10 pr-4'} w-full min-h-[48px] rounded-lg`}
          style={{ fontSize: isMobile ? '16px' : undefined }} // Prevents zoom on iOS
        />
      </div>
    </form>
  );
}