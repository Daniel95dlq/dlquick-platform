import "./globals.css"
import Navbar from "../components/site/navbar"
import Footer from "../components/site/footer"
import { brandFont } from "../lib/fonts"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={brandFont.className}>
			<body className="bg-[#0b1b2e] text-gray-100">
				<Navbar />
				<main className="min-h-[calc(100vh-56px)]">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}

export const metadata = {
	metadataBase: new URL('https://dlquick.co.uk'),
	title: {
		default: 'DLQuick — The Ultimate Local App',
		template: '%s | DLQuick',
	},
	description: 'On-demand deliveries and services across the UK.',
	applicationName: 'DLQuick',
	themeColor: '#0E2640',
	icons: {
		icon: '/icon.svg',
	},
	openGraph: {
		type: 'website',
		siteName: 'DLQuick',
		title: 'DLQuick — The Ultimate Local App',
		description: 'On-demand deliveries and services across the UK.',
		images: ['/opengraph-image'],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@dlquick',
		images: ['/opengraph-image'],
	},
}
