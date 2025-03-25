
import React from "react";
import { Bell, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  return (
    <header className="bg-background border-b border-border h-16 fixed top-0 right-0 left-0 z-30 transition-all duration-300 flex items-center px-4 sm:px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
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
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Settings</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-px h-9 w-9">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-accent">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
