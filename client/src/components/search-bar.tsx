import { useState, useRef, useId } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <form 
      onSubmit={handleSearch} 
      className="w-full"
      role="search"
      aria-label="Site search"
    >
      <div className={`
        relative rounded-md overflow-hidden
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-[#00FF00]/50' : ''}
      `}>
        <label htmlFor={searchId} className="sr-only">Search knowledge base</label>
        <input
          id={searchId}
          ref={inputRef}
          type="search"
          placeholder="Search knowledge base..."
          className="bg-[#0D0D0D] border border-[#1A1A1A] focus:border-[#00FF00] outline-none rounded-md px-4 py-2.5 w-full text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search knowledge base"
        />
        <button 
          type="submit"
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00FF00] p-1.5 rounded-full transition-colors hover:bg-[#00FF00]/10" 
          aria-label="Submit search"
          onClick={() => inputRef.current?.focus()}
        >
          <Search size={18} />
        </button>
      </div>
      {searchQuery.length > 0 && (
        <div className="text-xs text-gray-400 mt-1 pl-1">
          Press Enter to search
        </div>
      )}
    </form>
  );
};

export default SearchBar;
