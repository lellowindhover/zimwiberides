
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';
import { MenuIcon, XIcon, TicketIcon } from './Icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const zimVibeRidesLogo = (
    <div className="flex items-center space-x-2">
      <TicketIcon className="h-8 w-8 text-emerald-600" />
      <span className="text-2xl font-bold text-emerald-700">ZimVibe Rides</span>
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md">
              {zimVibeRidesLogo}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_ITEMS.map((item: NavItem) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                    ${location.pathname === item.path 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-slate-700 hover:bg-emerald-500 hover:text-white focus:bg-emerald-500 focus:text-white focus:outline-none'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item: NavItem) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out
                  ${location.pathname === item.path 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-slate-700 hover:bg-emerald-500 hover:text-white'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;