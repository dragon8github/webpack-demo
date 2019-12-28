
# 安装依赖

```bash
npm install webpack webpack-cli --save-dev
```

# 加入 webpack.config.js
```JavaScript
module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
	},
	mode: 'development',
}
```

# package.json 加入命令

```json
"scripts": {
  "build": "webpack"
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