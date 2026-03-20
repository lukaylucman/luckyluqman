import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/10 mt-10 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-center">
        <p className="text-gray-400 text-sm text-center">
          &copy; {currentYear} lukayproject&trade;. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
