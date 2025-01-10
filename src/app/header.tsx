"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronUp,
  DeleteIcon,
  Github,
  LogInIcon,
  LogOutIcon,
  Menu,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils"

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!session.data;

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
         
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        {isLoggedIn && (
            <DropdownMenuItem
            >
             <DeleteIcon className="mr-2" /> {session.data?.user?.name}
            </DropdownMenuItem>
          )}
          {isLoggedIn ? (
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              <LogOutIcon className="mr-2" /> Sign Out
            </DropdownMenuItem>
            
          ) : (
            <DropdownMenuItem onClick={() => signIn("google")}>
              <LogInIcon className="mr-2" /> Sign In
            </DropdownMenuItem>
          )}

          {isLoggedIn && (
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
              }}
            >
              <DeleteIcon className="mr-2" /> Delete Account
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <header onMouseLeave={()=>setIsDrawerOpen(false)} className="sticky top-0 z-50 w-full p-4">
      <div  className={`container flex gap-4 h-12 py-6 max-w-screen-2xl border-2 rounded-2xl items-center bg-fd-background/80 backdrop-blur-lg border-b border-fd-foreground/10 transition-colors ${isDrawerOpen ? "rounded-b-none" : ""}`}>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex gap-2 items-center text-xl hover:underline"
          >
            <Image
              src="/logo.png"
              width="60"
              height="60"
              className="w-8 h-8"
              alt="the application icon of a magnifying glass"
            />
            PairFinder
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
         
              <Link className="hover:underline" href="/browse">
                Browse
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Your Rooms
              </Link>
          
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <AccountDropdown />
          <ModeToggle />
          <div className="hidden md:flex items-center">

            <Link href="https://github.com/roshan-Kawale/Pair-finder">
              <FaGithub className="h-7 w-7" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>

          {/* Mobile menu */}

           {/* Mobile menu toggle */}
           <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onMouseEnter={() => setIsDrawerOpen(true)}
          >
            {isDrawerOpen ? (
              <ChevronUp onTouchStart={() => setIsDrawerOpen(false)} className="h-7 w-7" />
            ) : (
              <ChevronDown onTouchStart={() => setIsDrawerOpen(true)} className="h-7 w-7" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Custom drawer */}
      {isDrawerOpen && <div
        className={cn(
          "fixed inset-x-0 top-12 p-4 z-50 w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          isDrawerOpen ? "h-[calc(100vh-3.5rem)]" : "h-0"
        )}
        >
        <div onMouseLeave={()=>setIsDrawerOpen(false)} 
        className="container h-48 py-4 border-2 border-t-0 rounded-2xl rounded-t-none overflow-y-auto bg-fd-background/80 backdrop-blur-lg border-b border-fd-foreground/10 transition-colors">
        
        <nav className="flex flex-col space-y-4 mt-4">
               
                    <Link className="hover:underline" href="/browse">
                      Browse
                    </Link>

                    <Link className="hover:underline" href="/your-rooms">
                      Your Rooms
                    </Link>
             
              
              </nav>
              <div className="flex mt-4">
                <Link href="https://github.com/roshan-Kawale/Pair-finder">
                  <FaGithub className="h-7 w-7 mt-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
        </div>
      </div>}
    </header>
  );
}
