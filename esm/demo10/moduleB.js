import { foo } from './moduleA.js'
export function bar() {
  return 'bar'
}

console.log("========moduleB===========")
console.log(foo())
