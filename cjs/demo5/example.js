let example2 = require2('./example2.js')
let counter = 3
function incCounter() {
  counter++
}
console.log(example2)
module2.exports = {
  counter: counter,
  incCounter: incCounter
}
