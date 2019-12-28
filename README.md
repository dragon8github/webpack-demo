# chapter

1. webpack小试牛刀
2. 加入 webpack.config.js
3. 资源的输入与输出：entry的三种形式与动态的output
4. 猪突猛进：loader + babel, es6 => es5
5. webpack-dev-server


# 安装依赖

```bash
npm install webpack webpack-cli --save-dev
npm install babel-polyfill --save-dev
npm install babel-loader @babel/core @babel/preset-env --save-dev
npm install webpack-dev-server --save-dev
```

# 加入 webpack.config.js
```JavaScript
module.exports = {
	mode: 'development',

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
	entry: { app: './src/app.js' },

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
		filename: '[name]@[chunkhash].js'
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

	devServer: {
		publicPath: '/dist',
	}
}
```

# package.json 加入命令

```json
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server"
},
```

运行 `npm run build` 输出内容如下，则说明编译正常。
```bash
Hash: b33a695a6b39dd3acf07
Version: webpack 4.41.5
Time: 76ms
Built at: 2019/12/28 下午10:01:23
    Asset      Size  Chunks             Chunk Names
bundle.js  4.71 KiB    null  [emitted]  null
Entrypoint null = bundle.js
[./index.js] 94 bytes {null} [built]
[./utils.js] 226 bytes {null} [built]
```

打开浏览器验证结果。