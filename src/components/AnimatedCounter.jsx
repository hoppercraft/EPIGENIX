import { useEffect, useRef, useState } from 'react'

/** Animated counter that counts up from 0 to `end` */
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	const hasStarted = useRef(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasStarted.current) {
					hasStarted.current = true
					const startTime = performance.now()
					const animate = (now) => {
						const elapsed = now - startTime
						const progress = Math.min(elapsed / duration, 1)
						const eased = 1 - Math.pow(1 - progress, 3)
						setCount(Math.round(eased * end))
						if (progress < 1) requestAnimationFrame(animate)
					}
					requestAnimationFrame(animate)
				}
			},
			{ threshold: 0.3 }
		)

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [end, duration])

	return (
		<span ref={ref} className="stat-number">
			{prefix}{count.toLocaleString()}{suffix}
		</span>
	)
}

export default AnimatedCounter
