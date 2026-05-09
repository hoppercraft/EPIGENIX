import { useEffect, useRef } from 'react'

/** Animated DNA double-helix drawn on a <canvas> behind the hero section. */
function DnaHelix() {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		let animationId
		let time = 0

		const resize = () => {
			canvas.width = canvas.offsetWidth * window.devicePixelRatio
			canvas.height = canvas.offsetHeight * window.devicePixelRatio
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
		}
		resize()
		window.addEventListener('resize', resize)

		const draw = () => {
			const w = canvas.offsetWidth
			const h = canvas.offsetHeight
			ctx.clearRect(0, 0, w, h)

			const pairs = 28
			const amplitude = w * 0.12
			const centerX = w / 2
			const verticalSpacing = h / (pairs - 1)

			for (let i = 0; i < pairs; i++) {
				const y = i * verticalSpacing
				const phase = (i / pairs) * Math.PI * 4 + time * 0.02
				const x1 = centerX + Math.sin(phase) * amplitude
				const x2 = centerX - Math.sin(phase) * amplitude
				const depth = (Math.sin(phase) + 1) / 2

				// Base pair connecting line
				ctx.beginPath()
				ctx.moveTo(x1, y)
				ctx.lineTo(x2, y)
				ctx.strokeStyle = `rgba(45, 212, 191, ${0.06 + depth * 0.08})`
				ctx.lineWidth = 1
				ctx.stroke()

				// Left strand dot
				ctx.beginPath()
				ctx.arc(x1, y, 2.5 + depth * 2, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(45, 212, 191, ${0.3 + depth * 0.5})`
				ctx.shadowColor = 'rgba(45, 212, 191, 0.4)'
				ctx.shadowBlur = 8 + depth * 8
				ctx.fill()

				// Right strand dot
				ctx.beginPath()
				ctx.arc(x2, y, 2.5 + depth * 2, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(139, 92, 246, ${0.25 + depth * 0.45})`
				ctx.shadowColor = 'rgba(139, 92, 246, 0.4)'
				ctx.shadowBlur = 8 + depth * 8
				ctx.fill()

				ctx.shadowBlur = 0
			}

			// Draw the backbone strands
			ctx.beginPath()
			for (let i = 0; i < pairs; i++) {
				const y = i * verticalSpacing
				const phase = (i / pairs) * Math.PI * 4 + time * 0.02
				const x1 = centerX + Math.sin(phase) * amplitude
				if (i === 0) ctx.moveTo(x1, y)
				else ctx.lineTo(x1, y)
			}
			ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)'
			ctx.lineWidth = 1.5
			ctx.stroke()

			ctx.beginPath()
			for (let i = 0; i < pairs; i++) {
				const y = i * verticalSpacing
				const phase = (i / pairs) * Math.PI * 4 + time * 0.02
				const x2 = centerX - Math.sin(phase) * amplitude
				if (i === 0) ctx.moveTo(x2, y)
				else ctx.lineTo(x2, y)
			}
			ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)'
			ctx.lineWidth = 1.5
			ctx.stroke()

			time++
			animationId = requestAnimationFrame(draw)
		}

		draw()

		return () => {
			cancelAnimationFrame(animationId)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 h-full w-full"
			style={{ opacity: 0.6 }}
			aria-hidden="true"
		/>
	)
}

export default DnaHelix
