var f = function(){
    console.log(1+1)
    console.log(1+2)
}
// console.log(f)
var a = [f]

var o = {
    func: f
}
// o.func();
console.log(o['func'])