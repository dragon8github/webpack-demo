const autoprefixer = require('autoprefixer')

module.exports = {
	plugins: [
		autoprefixer({
			grid: true,
			browsers: [
				'last 99 versions',
			],
		})
	]
}