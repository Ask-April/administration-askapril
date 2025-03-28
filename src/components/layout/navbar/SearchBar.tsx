
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="hidden sm:block w-72">
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
