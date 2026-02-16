import React from 'react';

const Terminal = ({ title = "zsh", children }) => {
    return (
        <div className="bg-[#0a0a09]/90 border border-[#333] rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.5)] mb-8 font-terminal w-full text-lg">
            <div className="bg-[#222] px-3 py-2 rounded-t-lg flex items-center relative">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-[#888] text-sm">{title}</div>
            </div>
            <div className="p-5 text-neon-green">
                {children}
            </div>
        </div>
    );
};

export default Terminal;
