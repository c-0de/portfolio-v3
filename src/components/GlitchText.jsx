import React from 'react';

const GlitchText = ({ text, as = 'h1', className = '' }) => {
    const Tag = as;
    return (
        <Tag
            className={`relative inline-block text-neon-green font-header uppercase tracking-[2px] 
      before:content-[attr(data-text)] before:absolute before:top-0 before:left-[2px] before:w-full before:h-full before:bg-dark-bg before:[text-shadow:-1px_0_red] before:animate-glitch-2
      after:content-[attr(data-text)] after:absolute after:top-0 after:-left-[2px] after:w-full after:h-full after:bg-dark-bg after:[text-shadow:-1px_0_blue] after:animate-glitch
      ${className}`}
            data-text={text}
        >
            {text}
        </Tag>
    );
};

export default GlitchText;
