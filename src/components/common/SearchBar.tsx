'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface SearchSuggestion {
  id: string;
  text: string;
  category?: string;
}

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock search suggestions - in real app, this would come from API
  const suggestions: SearchSuggestion[] = [
    { id: '1', text: 'Storage containers', category: 'Kitchen' },
    { id: '2', text: 'Water bottles', category: 'Drinkware' },
    { id: '3', text: 'Food containers', category: 'Kitchen' },
    { id: '4', text: 'Organizer bins', category: 'Storage' },
    { id: '5', text: 'Lunch boxes', category: 'Kitchen' },
  ];

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product-catalog?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setIsSearchExpanded(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setSearchQuery(suggestionText);
    router.push(`/product-catalog?search=${encodeURIComponent(suggestionText)}`);
    setShowSuggestions(false);
    setIsSearchExpanded(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleInputFocus = () => {
    setIsSearchExpanded(true);
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      if (!searchQuery) {
        setIsSearchExpanded(false);
      }
    }, 200);
  };

  return (
    <div className="relative flex-1 max-w-xl">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for plastic products..."
            className={`h-10 w-full rounded-md border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              isSearchExpanded ? 'md:w-full' : 'md:w-64'
            }`}
          />
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-smooth hover:text-foreground"
            >
              <Icon name="XMarkIcon" size={16} />
            </button>
          )}
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-[200] mt-2 rounded-md bg-popover shadow-elevation-3">
            <div className="p-2">
              <p className="caption px-3 py-2 text-muted-foreground">
                Suggestions
              </p>
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-smooth hover:bg-muted"
                >
                  <span className="flex items-center space-x-2">
                    <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
                    <span>{suggestion.text}</span>
                  </span>
                  {suggestion.category && (
                    <span className="caption text-muted-foreground">
                      {suggestion.category}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
