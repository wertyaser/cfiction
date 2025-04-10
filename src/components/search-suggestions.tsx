"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface SearchSuggestionsProps {
  isOpen: boolean;
  suggestions: string[];
  isLoading: boolean;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export function SearchSuggestions({
  isOpen,
  suggestions,
  isLoading,
  onSelect,
  onClose,
}: SearchSuggestionsProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 w-full mt-1 bg-background rounded-md shadow-lg border border-muted max-h-80 overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="ml-2 text-sm text-foreground">AI Generating suggestions...</span>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="py-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm hover:bg-accent cursor-pointer"
              onClick={() => onSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-sm text-center text-muted-foreground">
          No suggestions available
        </div>
      )}
    </div>
  );
}
