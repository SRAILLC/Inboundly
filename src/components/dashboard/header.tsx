"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="md:hidden flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AI</span>
          </div>
          <span className="font-semibold">Receptionist</span>
        </Link>
      </div>
      <div className="hidden md:block" />
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
