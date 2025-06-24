
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-semibold text-emerald-400 mb-2">ZimVibe Rides</p>
        <p className="text-sm">Explore the wonders of Zimbabwe with us.</p>
        <p className="text-sm mt-1">&copy; {new Date().getFullYear()} ZimVibe Rides. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <span className="text-slate-500">|</span>
          <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;