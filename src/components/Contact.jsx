import React, { useState } from 'react';
import GlitchText from './GlitchText';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("TRANSMISSION_SENT // ENCRYPTED");
    };

    return (
        <section id="contact" className="py-16 px-8 max-w-5xl mx-auto mb-16">
            <div className="text-center mb-12 block">
                <GlitchText text="SECURE_UPLINK" as="h2" className="text-4xl md:text-5xl" />
            </div>
            <div className="flex flex-wrap gap-12 justify-center">
                <form className="flex-[2] min-w-[300px]" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block font-terminal text-neon-cyan mb-2 text-lg">AGENT_ID:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="ENTER_ID"
                            className="w-full bg-black/50 border border-[#444] text-neon-green p-3 font-body text-base outline-none transition-all duration-300 focus:border-neon-green focus:shadow-[0_0_10px_rgba(57,255,20,0.1)]"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block font-terminal text-neon-cyan mb-2 text-lg">COMMS_CHANNEL:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="ENTER_EMAIL"
                            className="w-full bg-black/50 border border-[#444] text-neon-green p-3 font-body text-base outline-none transition-all duration-300 focus:border-neon-green focus:shadow-[0_0_10px_rgba(57,255,20,0.1)]"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block font-terminal text-neon-cyan mb-2 text-lg">DATA_PACKET:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="ENTER_MESSAGE_CONTENT"
                            rows="5"
                            className="w-full bg-black/50 border border-[#444] text-neon-green p-3 font-body text-base outline-none transition-all duration-300 focus:border-neon-green focus:shadow-[0_0_10px_rgba(57,255,20,0.1)] resize-y"
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-neon-green text-black border-none py-3 px-6 font-header text-sm cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_0_15px_var(--color-neon-green)]">
                        INITIATE_TRANSMISSION
                    </button>
                </form>
                <div className="flex-1 min-w-[250px] border border-dashed border-[#444] p-6 bg-[#141414]/50 h-fit">
                    <h3 className="text-neon-pink mb-4 font-header text-base">// SIGNAL_ORIGIN</h3>
                    <p className="mb-3 text-[#aaa] font-terminal text-lg">LOCATION: [REDACTED]</p>
                    <p className="mb-3 text-[#aaa] font-terminal text-lg">EMAIL: <a href="mailto:dev@example.com" className="text-neon-cyan hover:text-neon-pink hover:underline">dev@example.com</a></p>
                    <p className="mb-3 text-[#aaa] font-terminal text-lg">STATUS: MONITORING</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
