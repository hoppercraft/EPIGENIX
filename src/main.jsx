import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { GeneticDataProvider } from "./Context/GeneticDataContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GeneticDataProvider>
				<App />
			</GeneticDataProvider>
		</BrowserRouter>
	</React.StrictMode>
)