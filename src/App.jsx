import { useState } from 'react'
import Home from './pages/Home'
import Project from './pages/Project'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const goToProject = () => setCurrentView('project')
  const goToHome = () => setCurrentView('home')

  return (
    currentView === 'home' ? (
      <Home onEnterProject={goToProject} />
    ) : (
      <Project onBackHome={goToHome} />
    )
  )
}

export default App
