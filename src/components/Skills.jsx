import React from 'react';
import GlitchText from './GlitchText';

const skillsData = [
    { category: "LANGUAGES", items: ["Python", "JavaScript/TypeScript", "C++", "SQL"] },
    { category: "FRAMEWORKS", items: ["React", "PyTorch", "TensorFlow", "Node.js"] },
    { category: "TOOLS", items: ["Docker", "Kubernetes", "Git", "AWS"] },
    { category: "SPECIALTY", items: ["LLMs", "RAG", "Computer Vision", "Agents"] }
];

const Skills = () => {
    return (
        <section id="skills" className="py-16 px-8 max-w-5xl mx-auto">
            <div className="text-center mb-12 block">
                <GlitchText text="SYSTEM_PROTOCOLS" as="h2" className="text-4xl md:text-5xl" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
                {skillsData.map((skillGroup, index) => (
                    <div key={index} className="bg-dark-bg/80 border border-[#333] p-6 relative transition-all duration-300 hover:-translate-y-1 hover:border-neon-green hover:shadow-[0_0_10px_rgba(57,255,20,0.2)] group">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-green origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                        <h3 className="text-neon-cyan font-terminal mb-4 text-xl border-b border-dashed border-[#333] pb-2">
                            import &#123;{skillGroup.category}&#125; from 'knowledge_base'
                        </h3>
                        <ul className="list-none">
                            {skillGroup.items.map((item, i) => (
                                <li key={i} className="font-body text-[#ccc] mb-2 flex items-center">
                                    <span className="text-neon-pink mr-2 font-bold">{'>'}</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
