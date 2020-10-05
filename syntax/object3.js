var func = {
    v1: 'v1',
    v2: 'v2',
    f1: function(){
        console.log(1111)
    },
    f2: function(){
        console.log(this.v2)
    }
}

func.f1()