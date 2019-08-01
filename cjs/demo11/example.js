let counter = 3
function incCounter() {
  counter++
  console.log(counter)
}
module.exports = {
  // get counter() {
  //   return counter
  // },
  counter: counter,
  incCounter: incCounter
}
