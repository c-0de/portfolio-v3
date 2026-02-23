import React, { useState, useCallback, useEffect } from 'react';
import BackgroundBots from './BackgroundBots';
import SecurityPanel from './SecurityPanel';

const Layout = ({ children }) => {
  const [isHostile, setIsHostile] = useState(false);
  // Lift intrusion active state here so player death can reset it
  const [intrusionActive, setIntrusionActive] = useState(false);

  // Toggle animated cursor via a body class — normal cursor outside intrusion mode
  useEffect(() => {
    if (isHostile) {
      document.body.classList.add('intrusion-active');
    } else {
      document.body.classList.remove('intrusion-active');
    }
    // Cleanup on unmount
    return () => document.body.classList.remove('intrusion-active');
  }, [isHostile]);

  const handleIntrusionTrigger = useCallback((value) => {
    setIsHostile(value);
    setIntrusionActive(value);
  }, []);

  const handlePlayerDeath = useCallback(() => {
    // Reset everything: bots return to formation, overlay hides, button reappears
    setIsHostile(false);
    setIntrusionActive(false);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Interactive Layer */}
      <BackgroundBots isHostile={isHostile} onPlayerDeath={handlePlayerDeath} />

      {/* Security Controls */}
      <SecurityPanel
        onIntrusionTrigger={handleIntrusionTrigger}
        active={intrusionActive}
        setActive={setIntrusionActive}
      />

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
