import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-8 py-6 border-b-2 border-neon-green bg-dark-bg/90 sticky top-0 z-[100] font-header text-sm md:text-base">
            <div className="text-neon-cyan drop-shadow-[2px_2px_var(--color-neon-pink)]">
                &lt;AI_ENGINEER /&gt;
            </div>
            <ul className="flex list-none gap-8">
                {['IDENTITY', 'PROTOCOLS', 'MISSIONS', 'UPLINK'].map((item) => (
                    <li key={item}>
                        <a
                            href={`#${item === 'IDENTITY' ? 'hero' : item === 'PROTOCOLS' ? 'skills' : item === 'MISSIONS' ? 'projects' : 'contact'}`}
                            className="text-white relative transition-colors duration-300 hover:text-neon-green group"
                            data-text={item}
                        >
                            <span className="relative z-10">{item}</span>
                            <span className="absolute left-0 top-0 w-0 overflow-hidden text-neon-green transition-[width] duration-300 whitespace-nowrap group-hover:w-full z-20" aria-hidden="true">
                                {item}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
