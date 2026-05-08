import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import WorkspaceDashboard from './pages/workspaceDashboard'
import Disease from './pages/Disease'

function App() {
	const navigate = useNavigate()

	const goToProject = () => navigate('/project')
	const goToHome = () => navigate('/')

	return (
		<Routes>
			<Route path="/" element={<Home onEnterProject={goToProject} />} />

			<Route path="/project" element={<Project onBackHome={goToHome} />}>
				<Route index element={<WorkspaceDashboard />} />
				<Route path=":diseaseSlug" element={<Disease />} />
			</Route>
		</Routes>
	)
}

export default App
