import { createContext, useContext, useEffect, useState } from "react"

const GeneticDataContext = createContext(null)

export function GeneticDataProvider({ children }) {
	const [geneticData, setGeneticData] = useState(() => {
		const savedData = localStorage.getItem("epigenix-genetic-data")

		if (!savedData) return null

		try {
			return JSON.parse(savedData)
		} catch {
			return null
		}
	})

	useEffect(() => {
		if (geneticData) {
			localStorage.setItem("epigenix-genetic-data", JSON.stringify(geneticData))
		}
	}, [geneticData])

	function clearGeneticData() {
		setGeneticData(null)
		localStorage.removeItem("epigenix-genetic-data")
	}

	return (
		<GeneticDataContext.Provider
			value={{
				geneticData,
				setGeneticData,
				clearGeneticData,
			}}
		>
			{children}
		</GeneticDataContext.Provider>
	)
}

export function useGeneticData() {
	const context = useContext(GeneticDataContext)

	if (!context) {
		throw new Error("useGeneticData must be used inside GeneticDataProvider")
	}

	return context
}