import React from 'react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Connors",
        role: "Cybersecurity Analyst",
        text: "Intercepted this dev's code. Cleanest algorithms I've seen in the network. Their AI integration is efficient and lethal targeting... I mean, targeting aids.",
        date: "2077-10-24"
    },
    {
        id: 2,
        name: "K. Reeves",
        role: "System Architect",
        text: "A true ghost in the machine. Delivered the neural net architecture ahead of schedule. The logic flows like neon rain.",
        date: "2077-11-02"
    },
    {
        id: 3,
        name: "A. Lovelace",
        role: "Lead Developer",
        text: "Optimization levels are off the chart. 10/10 would raid corporate databases with them again.",
        date: "2077-12-15"
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 px-4 md:px-10 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16 border-b border-purple-500/30 pb-4 flex items-end justify-between">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-header text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 glitch-text" data-text="TRANSMISSIONS">
                            TRANSMISSIONS
                        </h2>
                        <p className="font-terminal text-sm text-purple-400 mt-2 tracking-widest">
              // DECRYPTED USER LOGS
                        </p>
                    </div>
                    <div className="hidden md:block font-terminal text-xs text-purple-500/50">
                        SECURE_CONNECTION_ESTABLISHED::V.2.0.4
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="group relative bg-black/40 border border-purple-500/30 p-6 hover:border-pink-500/80 transition-all duration-300 hover:bg-purple-900/10 hover:-translate-y-1"
                        >
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-purple-500 group-hover:border-pink-500 transition-colors"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-purple-500 group-hover:border-pink-500 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-purple-500 group-hover:border-pink-500 transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-500 group-hover:border-pink-500 transition-colors"></div>

                            {/* ID Badge */}
                            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                <span className="font-terminal text-xs text-purple-400">LOG_ID::{t.id.toString().padStart(4, '0')}</span>
                                <span className="font-terminal text-xs text-gray-500">{t.date}</span>
                            </div>

                            {/* Content */}
                            <p className="font-sans text-gray-300 leading-relaxed mb-6 italic">
                                "{t.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-sm flex items-center justify-center font-bold text-white font-header">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-header text-white tracking-wide group-hover:text-pink-400 transition-colors">{t.name}</h4>
                                    <p className="font-terminal text-xs text-purple-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
