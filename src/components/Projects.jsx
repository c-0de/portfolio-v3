import React from 'react';
import GlitchText from './GlitchText';

const projectsData = [
    {
        title: "NEURAL_NET_V1",
        description: "An autonomous agent capable of solving complex reasoning tasks.",
        tech: ["Python", "Transformers", "Redis"],
        status: "COMPLETE",
        link: "#"
    },
    {
        title: "VISION_OS",
        description: "Real-time object detection system for surveillance analysis.",
        tech: ["YOLOv8", "OpenCV", "Flask"],
        status: "DEPLOYED",
        link: "#"
    },
    {
        title: "CYBER_DECK",
        description: "A custom hardware interface for interacting with local LLMs.",
        tech: ["C++", "Arduino", "Llama.cpp"],
        status: "IN_PROGRESS",
        link: "#"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-16 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12 block">
                <GlitchText text="ACTIVE_MISSIONS" as="h2" className="text-4xl md:text-5xl" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                {projectsData.map((project, index) => (
                    <div key={index} className="bg-[#141414]/90 border border-[#444] p-0 flex flex-col transition-all duration-300 overflow-hidden hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:scale-[1.02]">
                        <div className="bg-[#1a1a1a] p-4 border-b border-[#444] flex items-center gap-2">
                            <span className="text-lg">📂</span>
                            <span className="font-header text-base text-white">{project.title}</span>
                        </div>
                        <div className="p-6 flex-1">
                            <p className="text-[#aaa] text-sm mb-6 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="bg-[rgba(57,255,20,0.1)] text-neon-green px-2 py-1 text-xs border border-neon-green">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 px-6 border-t border-[#333] flex justify-between items-center bg-[#111]">
                            <span className={`font-terminal text-sm ${project.status === 'COMPLETE' ? 'text-neon-green' :
                                    project.status === 'DEPLOYED' ? 'text-neon-cyan' : 'text-neon-pink'
                                }`}>
                                [{project.status}]
                            </span>
                            <a href={project.link} className="font-terminal text-white text-sm px-3 py-1 bg-neon-pink transition-colors duration-300 hover:bg-[#ff3377]">
                                ACCESS_FILE {'>'}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
