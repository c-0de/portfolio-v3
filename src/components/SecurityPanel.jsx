import React, { useState } from 'react';

const SecurityPanel = ({ onIntrusionTrigger }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
        onIntrusionTrigger(true);
    };

    return (
        <>
            {/* Caution Button */}
            {!active && (
                <button
                    onClick={handleClick}
                    className="fixed bottom-8 left-8 z-50 group flex items-center gap-3 px-6 py-3 bg-red-900/20 border-2 border-red-600/50 hover:bg-red-900/80 hover:border-red-500 transition-all duration-300 backdrop-blur-sm cursor-pointer animate-[pulse_3s_ease-in-out_infinite]"
                >
                    <div className="text-3xl animate-pulse">💀</div>
                    <div className="flex flex-col items-start">
                        <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Restricted Access</span>
                        <span className="text-red-400 font-terminal text-sm">CAUTION: CLICK AT OWN RISK</span>
                    </div>
                </button>
            )}

            {/* Intrusion Overlay */}
            {active && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-2xl px-4">
                    <div className="bg-red-600/10 border border-red-500/50 p-4 text-center animate-pulse backdrop-blur-md pointer-events-auto">
                        <h2 className="text-4xl md:text-6xl font-header text-red-500 glitch-text" data-text="WARNING: INTRUSION DETECTED">
                            WARNING: INTRUSION DETECTED
                        </h2>
                        <p className="text-red-400 font-terminal mt-2 tracking-widest uppercase">
              // SECURITY PROTOCOLS ENGAGED // SWARM ACTIVATED
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4">
                            <p className="text-red-300/80 font-terminal text-sm">
                                ACCESS DENIED. AUTHORIZATION REQUIRED.
                            </p>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative px-6 py-2 bg-red-900/40 border border-red-500/50 hover:bg-red-500 hover:text-black transition-all duration-300 cursor-pointer"
                            >
                                <span className="font-header tracking-wider uppercase text-sm">
                                    [ CONTACT NETWORK ADMINISTRATOR ]
                                </span>
                                {/* Glitch overlay on hover handled by generic CSS or just simple hover above */}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecurityPanel;
