
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// On mobile, make the search bar full width and more compact
const SearchBar = () => {
  return (
    <div className="w-full max-w-xs sm:w-72">
      <form className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="rounded-full pl-8 bg-background border-secondary"
        />
      </form>
    </div>
  );
};

export default SearchBar;
