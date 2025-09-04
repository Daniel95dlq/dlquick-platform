"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'dlq-consent'

export default function CookieBanner() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		try {
			const v = localStorage.getItem(KEY)
			setVisible(!v)
		} catch {}
	}, [])

	const accept = () => {
		try { localStorage.setItem(KEY, 'accepted') } catch {}
		setVisible(false)
	}
	const decline = () => {
		try { localStorage.setItem(KEY, 'declined') } catch {}
		setVisible(false)
	}

	if (!visible) return null

	return (
		<div className="fixed inset-x-0 bottom-0 z-[60] p-4">
			<div className="max-w-5xl mx-auto rounded-2xl border border-yellow-400/30 bg-[rgba(10,18,36,0.92)] backdrop-blur shadow-xl">
				<div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
					<div className="text-sm text-gray-200/90 flex-1">
						We use cookies to improve performance, analytics, and experience. See our
						<Link href="/legal/cookies" className="text-yellow-300 hover:underline ml-1">Cookies Policy</Link>.
					</div>
					<div className="flex gap-3">
						<button onClick={decline} className="px-4 py-2 rounded-lg border border-white/20 text-gray-200 hover:bg-white/10">
							Decline
						</button>
						<button onClick={accept} className="px-4 py-2 rounded-lg bg-brand-gold text-brand-navy font-semibold border border-yellow-400/50">
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
