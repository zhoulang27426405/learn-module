export let foo = 'baz'
setTimeout(function() {
  foo = 'bar'
}, 100)
