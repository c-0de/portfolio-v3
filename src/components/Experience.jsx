import React from 'react';

const experiences = [
    {
        id: 1,
        role: "Senior AI Engineer",
        company: "CyberDyne Systems",
        period: "2075 - PRESENT",
        description: "Lead architect for the Skynet neural network. Optimized kill-bots for 99.9% efficiency. Implemented ethical subroutines (deprecated).",
        tech: ["Neural Networks", "Python", "TensorFlow", "C++"]
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Tyrell Corp",
        period: "2072 - 2075",
        description: "Developed memory implantation interfaces for Nexus-6 models. maintained legacy Voight-Kampff test suites.",
        tech: ["React", "Node.js", "Bio-Digital APIs"]
    },
    {
        id: 3,
        role: "Junior Dev",
        company: "Massive Dynamic",
        period: "2070 - 2072",
        description: "Assisted in fringe science experiments. Debugged reality distortion fields and quantum computing clusters.",
        tech: ["Javascript", "Quantum#"]
    }
];

const Experience = () => {
    return (
        <section className="py-20 px-4 md:px-10 relative">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-header text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 glitch-text" data-text="SYSTEM_LOGS">
                        SYSTEM_LOGS
                    </h2>
                    <p className="font-terminal text-sm text-green-500/70 mt-4 tracking-widest">
            // KERNEL_HISTORY :: AUTHORIZED_ACCESS_ONLY
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-green-500/20 ml-4 md:ml-10 space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-green-500 rounded-full group-hover:bg-green-500 group-hover:shadow-[0_0_10px_#22c55e] transition-all duration-300"></div>

                            {/* Content Card */}
                            <div className="bg-black/40 border border-green-500/20 p-6 relative hover:border-green-500/60 transition-colors backdrop-blur-sm">

                                {/* Decorative circuit line */}
                                <div className="absolute top-4 -left-8 md:-left-12 w-8 md:w-12 h-[2px] bg-green-500/20 group-hover:bg-green-500 transition-colors"></div>

                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-header text-white group-hover:text-green-400 transition-colors">{exp.role}</h3>
                                        <div className="text-green-500 font-terminal text-sm uppercase tracking-wider mt-1">
                                            @{exp.company}
                                        </div>
                                    </div>
                                    <div className="font-terminal text-xs text-green-500/50 mt-2 md:mt-0 bg-green-900/10 px-2 py-1 rounded border border-green-500/10">
                                        [{exp.period}]
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 font-sans leading-relaxed mb-4">
                                    {exp.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((tech) => (
                                        <span key={tech} className="text-xs font-terminal text-green-400 border border-green-500/30 px-2 py-1 hover:bg-green-500/10 transition-colors cursor-crosshair">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
