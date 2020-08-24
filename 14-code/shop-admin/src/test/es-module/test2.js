// 导入 默认导出的
import test1 from './test1'
import { default as test11 } from './test1'

console.log(test1)
console.log(test11)

// 导入 分别导出的
import { num1, f1 } from './test1'
console.log(num1)
console.log(f1)

// 导入 统一导出的
import { num2, num3 } from './test1'
console.log(num2)
console.log(num3)
