name = ['egoing','k8805','hoya'];

roles = {
    'programmer':'egoing',
    'designer': 'k8805',
    'manager': 'hoya'
}
console.log(roles.designer);
console.log(roles['designer']);

for(var name in roles){
    console.log('key= ',name, 'values= ', roles[name])
}