var example = require('./example.js')

require('./example.js')
require('./example.js').message = 'hello'
// 删除所有模块的缓存
// Object.keys(require.cache).forEach(function(key) {
//   delete require.cache[key]
// })
console.log(require('./example.js').message)
