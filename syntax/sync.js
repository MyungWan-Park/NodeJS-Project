fs = require('fs')

console.log('a')
fs.readFile('syntax/sample.txt','utf8',function(err,result){
    console.log(result)
})
// console.log(result)
console.log('c')