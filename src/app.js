// 测试能否使用 es6 commonjs 语法
import { maybe } from './utils/utils'

// 测试 css-loader 和 style-loader
import './styles/normalize.css'

// 测试 scss-loader 是否能用
import './styles/functions.scss'

// 测试 url-loader 是否正常使用
import svg from './assets/404.svg'

// 测试能否使用 es6 const 和 箭头函数 和 模板语法
const hello = maybe(_ => `
	<div class="container">
		<h1 class='title'>hello, webpack4</h1>
		<img src="${svg}" />
	</div>
`)

// 如果一切正常，能在页面看到 hello, webpack
document.getElementById('app').innerHTML = hello