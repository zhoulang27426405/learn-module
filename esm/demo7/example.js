export let year = 2019
export function multiply(x, y) {
  return x * y
}

let firstName = 'Michael'
let lastName = 'Jack'
function sayHello() {
  console.log('hello!')
}

export { firstName, lastName, sayHello as say }

export default function() {
  console.log('default')
}
