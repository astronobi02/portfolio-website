import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'
import LoadingScreen from './LoadingScreen'
import ParticleBackground from './ParticleBackground'

function App() {
  return (
    <>
      <ParticleBackground />
      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </>
  )
}

export default App
