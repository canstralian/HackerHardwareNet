import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // In a real app, this would call the API to search
    toast({
      title: "Search initiated",
      description: `Searching for: ${searchQuery}`,
    });
    
    // Clear search input after submission
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search knowledge base..."
          className="bg-[#0D0D0D] border border-[#1A1A1A] focus:border-[#00FF00] outline-none rounded px-4 py-2 w-full text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-3 top-2.5 text-gray-400" 
          aria-label="Search"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
