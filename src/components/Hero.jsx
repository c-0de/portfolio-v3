import React from 'react';
import GlitchText from './GlitchText';
import Terminal from './Terminal';

const Hero = () => {
    return (
        <section id="hero" className="py-16 min-h-[80vh] flex justify-center items-center">
            <div className="flex gap-16 items-center flex-wrap max-w-6xl w-full px-4 md:flex-row flex-col text-center md:text-left">

                {/* Profile Card */}
                <div className="w-[300px] bg-black/60 border border-neon-cyan p-4 relative
          before:content-[''] before:absolute before:-top-[1px] before:-left-[1px] before:w-[10px] before:h-[10px] before:border-l before:border-t before:border-neon-cyan before:transition-all before:duration-300
          after:content-[''] after:absolute after:-bottom-[1px] after:-right-[1px] after:w-[10px] after:h-[10px] after:border-r before:border-b after:border-neon-cyan after:transition-all after:duration-300">

                    <div className="w-full h-[250px] bg-[#111] flex justify-center items-center text-[#333] relative overflow-hidden mb-4">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-green/50 animate-scan"></div>
                        <span className="font-terminal">[NO_SIGNAL]</span>
                    </div>

                    <div className="font-terminal text-[1.1rem]">
                        <div className="flex justify-between mb-2">
                            <span className="text-[#888]">TARGET:</span>
                            <span className="text-neon-cyan">AI ENGINEER</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-[#888]">STATUS:</span>
                            <span className="text-neon-green">ONLINE</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-[#888]">THREAT LEVEL:</span>
                            <span className="text-neon-pink animate-blink">HIGH</span>
                        </div>
                    </div>
                </div>

                {/* Helper text for Tailwind classes: flex-1 takes remaining space */}
                <div className="flex-1 max-w-[600px] w-full">
                    <div className="mb-8 block">
                        <GlitchText text="SYSTEM_OVERRIDE" as="h1" className="text-5xl md:text-6xl" />
                    </div>
                    <Terminal title="bio.exe">
                        <p className="mb-2">Initializing connection...</p>
                        <div className="typing">
                            <p className="mb-1"><span className="text-neon-pink mr-2">{'>'}</span> Hello, World. I build intelligent systems that break boundaries.</p>
                            <p className="mb-1"><span className="text-neon-pink mr-2">{'>'}</span> Specializing in Machine Learning, NLP, and Agentic AI.</p>
                            <p><span className="text-neon-pink mr-2">{'>'}</span> Let's hack the future together.</p>
                        </div>
                    </Terminal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
