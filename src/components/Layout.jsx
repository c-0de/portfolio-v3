import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-[999] bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]"></div>
      <div className="fixed inset-0 pointer-events-none z-[999] bg-[rgba(18,16,16,0.1)] opacity-0 animate-flicker"></div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
