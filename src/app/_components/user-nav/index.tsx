"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/domains/auth";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export function UserNav({ email }: { email: string }) {
  const handleLogout = async () => {
    try {
      await Promise.allSettled([signOut(), logout()]);
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>{email}</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="flex gap-2">
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
