function confere(arr, num){
    if(!arr && !num)
        throw new ReferenceError('Envie os parâmetros');
    if(typeof arr !== 'object')
        throw new TypeError('Array precisa ser objeto');
    if(typeof num !== 'number') 
    throw new TypeError('O número precisa ser do tipo número');
    if(arr.length !== num)
    throw new RangeError('Array não corresponde ao número');

}
console.log(confere([1,2],2));
