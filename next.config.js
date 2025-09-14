/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{ source: '/services', destination: '/explore', permanent: true },
			{ source: '/categories', destination: '/explore', permanent: true },
			{ source: '/services/search', destination: '/explore', permanent: true },
		]
	},
}

module.exports = nextConfig
