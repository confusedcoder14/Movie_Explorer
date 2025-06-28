'use client';

import { Link, useLocation } from 'react-router-dom';
import { Film } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Search' },
    { href: '/favorites', label: 'Favorites' },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
            <Film className="w-8 h-8" />
            Movie Explorer
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
