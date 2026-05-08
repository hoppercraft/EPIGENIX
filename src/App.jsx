import { useState } from "react"
import Home from "./pages/Home"
import Project from "./pages/Project"

function App() {
	const [currentView, setCurrentView] = useState("home")
	const [selectedDisease, setSelectedDisease] = useState("Type 2 Diabetes")

	const goToProject = () => setCurrentView("project")
	const goToHome = () => setCurrentView("home")

	return currentView === "home" ? (
		<Home onEnterProject={goToProject} />
	) : (
		<Project
			onBackHome={goToHome}
			selectedDisease={selectedDisease}
			onSelectDisease={setSelectedDisease}
		/>
	)
}

export default App