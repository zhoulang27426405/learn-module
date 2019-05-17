let x = 5
let add = function(v) {
  return v + x
}

module.exports = {
  x,
  add
}

/*
 *可以使用exports简写module.exports
 */
// exports.x = x
// exports.add = add

/*
 * 但是不能直接将exports变量指向一个值下述这种情况只能使用module.exports
 */
// module.exports = function() {
//   console.log('hello')
// }

// exports = function() {
//   console.log('hello')
// }