import { useState } from 'react'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'

function App() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        borderTop: '1px solid #333',
        fontFamily: 'var(--terminal-font)',
        color: '#666'
      }}>
        <p>SYSTEM_VERSION: 2.0.4 // EST. 2024</p>
      </footer>
    </Layout>
  )
}

export default App
