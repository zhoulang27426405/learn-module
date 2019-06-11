import { bar } from './moduleB.js'
export function foo() {
  return 'foo'
}

console.log("========moduleA===========")
console.log(bar())

