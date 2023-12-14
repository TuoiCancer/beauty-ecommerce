/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'phutungnhapkhauchinhhang.com',
			'static.thcdn.com',
			'encrypted-tbn3.gstatic.com',
			'cdn-icons-png.flaticon.com',
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'encrypted-tbn0.gstatic.com'
		]
	},
	experimental: {
		appDir: true
	}
	// webpack: (config, { isServer }) => {
	//   if (!isServer) {
	//     config.devServer.watchOptions.poll = 300; // Đặt thời gian kiểm tra thay đổi file (miliseconds)
	//   }
	//   return config;
	// },
}

module.exports = nextConfig
