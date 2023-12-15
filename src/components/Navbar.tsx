'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="bg-primary text-primary-foreground flex justify-between items-center px-8 py-4 sticky top-0">
      <Link href="/">
        <h1>NextGoogle</h1>
      </Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/people">People Table</Link>
      <div className="flex gap-4 items-center">
        {status === 'unauthenticated' && (
          <Button variant="secondary" onClick={() => signIn()}>
            Log In
          </Button>
        )}
        {status === 'authenticated' && (
          <>
            <p>{session?.user?.name}</p>

            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
            >
              Logout
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
