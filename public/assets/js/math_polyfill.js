Math.toDegrees = function(angleInRadians){
  return angleInRadians * (180/Math.PI)
}

Math.toRadians = function(angleInDegrees){
  return angleInDegrees * (Math.PI/180)
}

Math.crossProduct = function(x, y){
  [
    x[1]*y[2]-x[2]*y[1],
    x[2]*y[0]-x[0]*y[2],
    x[0]*y[1]-x[1]*y[0]
  ]
}

Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}

Math.cosh = Math.cosh || function(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
}

Math.sinh = Math.sinh || function(x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
};

Math.matrixAdd = Math.matrixAdd || function(){
  var arrays= arguments, results= [],
  count= arrays[0].length, L= arrays.length,
  sum, next= 0, i;
  while(next<count){
      sum= 0, i= 0;
      while(i<L){
          sum+= Number(arrays[i++][next]);
      }
      results[next++]= sum;
  }
  return results;
};

Math.scaleMatrix = Math.scaleMatrix || function(factor, matrix){
  var result = [], count = matrix.length, next=0;
  while(next < count){
    result[next] = factor * matrix[next]
    next++
  }

  return result
};