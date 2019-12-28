const webpack = require('webpack')
const ENV = process.env.ENV
const isProd = ENV === 'production'

module.exports = {
	mode: ENV,

	/**
	 * 🚀 entry 有几种形式：『1. 字符串类型入口』、 『2. 数组类型入口』、 『3. 对象类型入口』、 『4. 数组对象类型入口』、 『5. (异步)函数类型入口』：
	 * 1. entry: './src/app.js',
	 * 2. entry: [ 'babel-polyfill', './src/index.js' ],
	 * 3. entry: { index: './src/index.js', lib: './src/lib.js' },
	 * 4. entry: { index: ['babel-polyfill', './src/index.js'], lib: './src/lib.js' },
	 * 5. entry: () => new Promise(resolve => setTimeout(() => resolve('./src/index.js'), 1000)),
	 *
	 * 🚀 提取 vendor（供应商）: 在 webpack 中一般指工程所使用的库、框架等第三方模块集中打包产生的 bundled
	 * 将不会经常变动的文件抽取出来生成一个新的 bundled，有效利用客户端的缓存，在用户后续请求页面时会加快整体的渲染速度。
	 * entry: { app: './src/app.js', vendor: ['react', 'react-dom', 'react-router'] }
	 */
	entry: { 
		app: ['babel-polyfill', './src/app.js']
	},

	/**
	 * output.path 默认是 ./dist，所以通常我们不配置。
	 * output.path 指定资源的输出目录，必须是绝对位置： path: path.join(__dirname, 'dist'),
	 * output.filename 可以是相对路径譬如： './js/bundle.js' => ./dist/js/bundle.js
	 * output.filename 可以加入指纹来防止浏览器缓存： '[name]@[chunkhash ].js'
	 *
	 * 🚀 publicPath 是一个极其特别重要的配置项，容易和path混淆。 从功能上说： path 是指定资源输出路径，publicPath 是资源请求路径。
	 * 假设当前地址是： http://www.google.com/fuck/index.html
	 * - publicPath: ''           // => http://www.baidu.com/fuck/bundle.js
	 * - publicPath: '/'          // => http://www.baidu.com/bundle.js
	 * - publicPath: '/dist/'     // => http://www.baidu.com/dist/bundle.js
	 * - publicPath: './js'       // => http://www.baidu.com/fuck/js/bundle.js
	 * - publicPath: '../assets'  // => http://www.baidu.com/assets/bundle.js
	 */
	output: {
		filename: isProd ? '[name]@[chunkhash].js' : 'app.js',
	},

	module: {
		rules: [{
			// npm install babel-loader @babel/core @babel/preset-env
			test: /\.js$/,
			exclude: '/node_modules/',
			use: {
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					'presets': ['@babel/preset-env']
				},
			},
		}],
	},

	plugins: [
		new webpack.DefinePlugin({
			// ⚠️ 这里必须使用 JSON.stringify 输出
			// 在 app.js 中就可以使用了： console.log(20191229005300, ENV)
			ENV: JSON.stringify('test'),
		})
	],

	devServer: {
		/**
		 * devServer.publicPath 和 output.publicPath 不一样。
		 * 前者指的是资源访问目录，譬如 /dist => http://localhost:8099/dist
		 * 通常这个目录要和 output.path 目录保持一致。
		 */
		publicPath: '/dist',
	},
}