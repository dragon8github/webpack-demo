// 测试能否使用 es6 commonjs 语法
import { maybe } from './utils/utils'

// 测试能否使用 es6 const 和 箭头函数 和 模板语法
const hello = maybe(_ => `<h1>hello, webpack</h1>`)

// 如果一切正常，能在页面看到 hello, webpack
document.getElementById('app').innerHTML = hello