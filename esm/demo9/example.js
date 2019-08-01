export let foo = 'baz'
setTimeout(function() {
  foo = 'bar'
}, 100)

export let counter = 3
export function incCounter() {
  counter++
}
