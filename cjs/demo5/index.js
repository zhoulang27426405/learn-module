const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id = '', parent) {
  this.id = id
  this.exports = {}
  this.parent = parent
  this.filename = id
  this.loaded = false
  this.children = []
}

Module.prototype.require2 = function(path) {
  return Module._load(path, this)
}

Module._cache = Object.create(null)
Module._extensions = Object.create(null)

Module.wrapper = [
  '(function (exports, require2, module2, __filename, __dirname) {',
  '})'
]

Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1]
}

Module._extensions['.js'] = function(module, filename) {
  let content = fs.readFileSync(filename, 'utf8')
  module._compile(content, filename)
}

// 执行加载的模块
Module.prototype._compile = function(content, filename) {
  let funcStr = Module.wrap(content)
  let fn = vm.runInThisContext(funcStr)
  fn.call(this, this.exports, this.require2, this)
}

// 模块绝对路径
Module._resolveFilename = function(request) {
  return path.resolve(__dirname, request)
}

Module._load = function(request, parent) {
  //  计算绝对路径
  let filename = Module._resolveFilename(request)

  //  第一步：如果有缓存，取出缓存
  let cachedModule = Module._cache[filename]
  if (cachedModule) {
    return cachedModule.exports
  }

  // 第二步：生成模块实例，存入缓存
  let module = new Module(filename, parent)
  Module._cache[filename] = module

  // 第三步：加载模块
  let hadException = true
  try {
    module.load(filename)
    hadException = false
  } finally {
    if (hadException) {
      delete Module._cache[filename]
    }
  }

  // 第四步：输出模块的exports属性
  return module.exports
}

// 加载模块
Module.prototype.load = function(filename) {
  let extension = path.extname(filename) || '.js'
  if (!Module._extensions[extension]) extension = '.js'
  Module._extensions[extension](this, filename)
  this.loaded = true
}

new Module().require2('./example.js')
