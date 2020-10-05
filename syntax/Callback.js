// function a(){
//     console.log('a')
// }
// a();

var a = function(){
    console.log('b')
}
// a();

function slow(callback){
    callback()
}

slow(a);