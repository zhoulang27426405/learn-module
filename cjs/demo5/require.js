const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module() {
}

Module.prototype.require = function(path) {
  return Module._load(path, this)
}

Module._cache = {}
// Module._load
Module._load = function(request, parent, isMain) {
  //  计算绝对路径
  let filename = Module._resolveFilename(request)

  //  第一步：如果有缓存，取出缓存
  let cachedModule = Module._cache[filename]
  if (cachedModule) {
    return cachedModule.exports
  }

  // 第二步：是否为内置模块
  // if (NativeModule.exists(filename)) {
  //   return NativeModule.require(filename);
  // }

  // 第三步：生成模块实例，存入缓存
  let module = new Module(filename, parent)
  Module._cache[filename] = module

  // 第四步：加载模块
  let hadException = true
  try {
    module.load(filename)
    hadException = false
  } finally {
    if (hadException) {
      delete Module._cache[filename]
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports
}

// 模块绝对路径
Module._resolveFilename = function(request) {
  return path.resolve(__dirname, request)
}

// 加载模块
Module.prototype.load = function(filename) {
  let extension = path.extname(filename) || '.js'
  if (!Module._extensions[extension]) extension = '.js'
  Module._extensions[extension](this, filename)
  this.loaded = true
}

Module._extensions = {}
Module._extensions['.js'] = function(module, filename) {
  let content = fs.readFileSync(filename, 'utf8')
  let funcStr = Module.wrap(stripBOM(content))
  let fn = vm.runInThisContext(funcStr)
  fn.call(module.exports, module.exports, module.require, module)
}

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) {',
  '})'
]

Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1]
}

let example = new Module().require('./example.js')
console.log(example.counter)
