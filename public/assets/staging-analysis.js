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
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
(function(){function a(a){this._value=a}function b(a,b,c,d){var e,f,g=Math.pow(10,b);return f=(c(a*g)/g).toFixed(b),d&&(e=new RegExp("0{1,"+d+"}$"),f=f.replace(e,"")),f}function c(a,b,c){var d;return d=b.indexOf("$")>-1?e(a,b,c):b.indexOf("%")>-1?f(a,b,c):b.indexOf(":")>-1?g(a,b):i(a._value,b,c)}function d(a,b){var c,d,e,f,g,i=b,j=["KB","MB","GB","TB","PB","EB","ZB","YB"],k=!1;if(b.indexOf(":")>-1)a._value=h(b);else if(b===q)a._value=0;else{for("."!==o[p].delimiters.decimal&&(b=b.replace(/\./g,"").replace(o[p].delimiters.decimal,".")),c=new RegExp("[^a-zA-Z]"+o[p].abbreviations.thousand+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),d=new RegExp("[^a-zA-Z]"+o[p].abbreviations.million+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),e=new RegExp("[^a-zA-Z]"+o[p].abbreviations.billion+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),f=new RegExp("[^a-zA-Z]"+o[p].abbreviations.trillion+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),g=0;g<=j.length&&!(k=b.indexOf(j[g])>-1?Math.pow(1024,g+1):!1);g++);a._value=(k?k:1)*(i.match(c)?Math.pow(10,3):1)*(i.match(d)?Math.pow(10,6):1)*(i.match(e)?Math.pow(10,9):1)*(i.match(f)?Math.pow(10,12):1)*(b.indexOf("%")>-1?.01:1)*((b.split("-").length+Math.min(b.split("(").length-1,b.split(")").length-1))%2?1:-1)*Number(b.replace(/[^0-9\.]+/g,"")),a._value=k?Math.ceil(a._value):a._value}return a._value}function e(a,b,c){var d,e,f=b.indexOf("$"),g=b.indexOf("("),h=b.indexOf("-"),j="";return b.indexOf(" $")>-1?(j=" ",b=b.replace(" $","")):b.indexOf("$ ")>-1?(j=" ",b=b.replace("$ ","")):b=b.replace("$",""),e=i(a._value,b,c),1>=f?e.indexOf("(")>-1||e.indexOf("-")>-1?(e=e.split(""),d=1,(g>f||h>f)&&(d=0),e.splice(d,0,o[p].currency.symbol+j),e=e.join("")):e=o[p].currency.symbol+j+e:e.indexOf(")")>-1?(e=e.split(""),e.splice(-1,0,j+o[p].currency.symbol),e=e.join("")):e=e+j+o[p].currency.symbol,e}function f(a,b,c){var d,e="",f=100*a._value;return b.indexOf(" %")>-1?(e=" ",b=b.replace(" %","")):b=b.replace("%",""),d=i(f,b,c),d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,e+"%"),d=d.join("")):d=d+e+"%",d}function g(a){var b=Math.floor(a._value/60/60),c=Math.floor((a._value-60*b*60)/60),d=Math.round(a._value-60*b*60-60*c);return b+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)}function h(a){var b=a.split(":"),c=0;return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}function i(a,c,d){var e,f,g,h,i,j,k=!1,l=!1,m=!1,n="",r=!1,s=!1,t=!1,u=!1,v=!1,w="",x="",y=Math.abs(a),z=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],A="",B=!1;if(0===a&&null!==q)return q;if(c.indexOf("(")>-1?(k=!0,c=c.slice(1,-1)):c.indexOf("+")>-1&&(l=!0,c=c.replace(/\+/g,"")),c.indexOf("a")>-1&&(r=c.indexOf("aK")>=0,s=c.indexOf("aM")>=0,t=c.indexOf("aB")>=0,u=c.indexOf("aT")>=0,v=r||s||t||u,c.indexOf(" a")>-1?(n=" ",c=c.replace(" a","")):c=c.replace("a",""),y>=Math.pow(10,12)&&!v||u?(n+=o[p].abbreviations.trillion,a/=Math.pow(10,12)):y<Math.pow(10,12)&&y>=Math.pow(10,9)&&!v||t?(n+=o[p].abbreviations.billion,a/=Math.pow(10,9)):y<Math.pow(10,9)&&y>=Math.pow(10,6)&&!v||s?(n+=o[p].abbreviations.million,a/=Math.pow(10,6)):(y<Math.pow(10,6)&&y>=Math.pow(10,3)&&!v||r)&&(n+=o[p].abbreviations.thousand,a/=Math.pow(10,3))),c.indexOf("b")>-1)for(c.indexOf(" b")>-1?(w=" ",c=c.replace(" b","")):c=c.replace("b",""),g=0;g<=z.length;g++)if(e=Math.pow(1024,g),f=Math.pow(1024,g+1),a>=e&&f>a){w+=z[g],e>0&&(a/=e);break}return c.indexOf("o")>-1&&(c.indexOf(" o")>-1?(x=" ",c=c.replace(" o","")):c=c.replace("o",""),x+=o[p].ordinal(a)),c.indexOf("[.]")>-1&&(m=!0,c=c.replace("[.]",".")),h=a.toString().split(".")[0],i=c.split(".")[1],j=c.indexOf(","),i?(i.indexOf("[")>-1?(i=i.replace("]",""),i=i.split("["),A=b(a,i[0].length+i[1].length,d,i[1].length)):A=b(a,i.length,d),h=A.split(".")[0],A=A.split(".")[1].length?o[p].delimiters.decimal+A.split(".")[1]:"",m&&0===Number(A.slice(1))&&(A="")):h=b(a,null,d),h.indexOf("-")>-1&&(h=h.slice(1),B=!0),j>-1&&(h=h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+o[p].delimiters.thousands)),0===c.indexOf(".")&&(h=""),(k&&B?"(":"")+(!k&&B?"-":"")+(!B&&l?"+":"")+h+A+(x?x:"")+(n?n:"")+(w?w:"")+(k&&B?")":"")}function j(a,b){o[a]=b}function k(a){var b=a.toString().split(".");return b.length<2?1:Math.pow(10,b[1].length)}function l(){var a=Array.prototype.slice.call(arguments);return a.reduce(function(a,b){var c=k(a),d=k(b);return c>d?c:d},-1/0)}var m,n="1.5.3",o={},p="en",q=null,r="0,0",s="undefined"!=typeof module&&module.exports;m=function(b){return m.isNumeral(b)?b=b.value():0===b||"undefined"==typeof b?b=0:Number(b)||(b=m.fn.unformat(b)),new a(Number(b))},m.version=n,m.isNumeral=function(b){return b instanceof a},m.language=function(a,b){if(!a)return p;if(a&&!b){if(!o[a])throw new Error("Unknown language : "+a);p=a}return(b||!o[a])&&j(a,b),m},m.languageData=function(a){if(!a)return o[p];if(!o[a])throw new Error("Unknown language : "+a);return o[a]},m.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$"}}),m.zeroFormat=function(a){q="string"==typeof a?a:null},m.defaultFormat=function(a){r="string"==typeof a?a:"0.0"},"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(a,b){"use strict";if(null===this||"undefined"==typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof a)throw new TypeError(a+" is not a function");var c,d,e=this.length>>>0,f=!1;for(1<arguments.length&&(d=b,f=!0),c=0;e>c;++c)this.hasOwnProperty(c)&&(f?d=a(d,this[c],c,this):(d=this[c],f=!0));if(!f)throw new TypeError("Reduce of empty array with no initial value");return d}),m.fn=a.prototype={clone:function(){return m(this)},format:function(a,b){return c(this,a?a:r,void 0!==b?b:Math.round)},unformat:function(a){return"[object Number]"===Object.prototype.toString.call(a)?a:d(this,a?a:r)},value:function(){return this._value},valueOf:function(){return this._value},set:function(a){return this._value=Number(a),this},add:function(a){function b(a,b){return a+c*b}var c=l.call(null,this._value,a);return this._value=[this._value,a].reduce(b,0)/c,this},subtract:function(a){function b(a,b){return a-c*b}var c=l.call(null,this._value,a);return this._value=[a].reduce(b,this._value*c)/c,this},multiply:function(a){function b(a,b){var c=l(a,b);return a*c*b*c/(c*c)}return this._value=[this._value,a].reduce(b,1),this},divide:function(a){function b(a,b){var c=l(a,b);return a*c/(b*c)}return this._value=[this._value,a].reduce(b),this},difference:function(a){return Math.abs(m(this._value).subtract(a).value())}},s&&(module.exports=m),"undefined"==typeof ender&&(this.numeral=m),"function"==typeof define&&define.amd&&define([],function(){return m})}).call(this);
// Extracted Richard Bunt's work in Telemachus: https://github.com/richardbunt/Telemachus/blob/master/WebPages/WebPages/src/console.js

var TimeFormatters = {
  formatUT: function(t){
    var day, year;
    if (t == null) {
      t = 0;
    }
    year = ((t / (365 * 24 * 3600)) | 0) + 1;
    t %= 365 * 24 * 3600;
    day = ((t / (24 * 3600)) | 0) + 1;
    t %= 24 * 3600;
    return "Year " + year + ", Day " + day + ", " + (this.hourMinSec(t)) + " UT";
  },

  formatMET: function(t){
    var result;
    if (t == null) {
      t = 0;
    }
    result = "T+";
    if (t >= 365 * 24 * 3600) {
      result += (t / (365 * 24 * 3600) | 0) + ":";
      t %= 365 * 24 * 3600;
      if (t < 24 * 3600) {
        result += "0:";
      }
    }
    if (t >= 24 * 3600) {
      result += (t / (24 * 3600) | 0) + ":";
    }
    t %= 24 * 3600;
    return result + this.hourMinSec(t) + " MET";
  },

  hourMinSec: function(t) {
    var hour, min, sec;
    if (t == null) {
      t = 0;
    }
    hour = (t / 3600) | 0;
    if (hour < 10) {
      hour = "0" + hour;
    }
    t %= 3600;
    min = (t / 60) | 0;
    if (min < 10) {
      min = "0" + min;
    }
    sec = (t % 60 | 0).toFixed();
    if (sec < 10) {
      sec = "0" + sec;
    }
    return "" + hour + ":" + min + ":" + sec;
  },

  durationString: function(t) {
    var result;
    if (t == null) {
      t = 0;
    }
    result = t < 0 ? "-" : "";
    t = Math.abs(t);
    if (t >= 365 * 24 * 3600) {
      result += (t / (365 * 24 * 3600) | 0) + " years ";
      t %= 365 * 24 * 3600;
      if (t < 24 * 3600) {
        result += "0 days ";
      }
    }
    if (t >= 24 * 3600) {
      result += (t / (24 * 3600) | 0) + " days ";
    }
    t %= 24 * 3600;
    return result + this.hourMinSec(t);
  }
}
var DataFormatters = {
  distanceString: function(value){
    return numeral(value).format('0,0.000 a') + "m"
  },

  heightFromTerrainString: function(value){
    if(value <= -1 ){ return "NA" }
    return numeral(value).format('0,0.000 a') + "m"
  },

  degreeString: function(value){
    return numeral(value).format('0.000') + "&deg;"
  },

  velocityString: function(value){
    return numeral(value).format('0,0.000 a') + "m/s"
  },

  temperatureString: function(value){
    if(!value){return "NA"}
    return numeral(value).format('0,000') + "&deg;C"
  },

  accelerationSensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000') + "G"
  },

  pressureSensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000') + "Pa"
  },

  gravitySensorString: function(value){
    if(value[0] == "No Sensors of the Appropriate Type"){return "NA"}
    return numeral(value[1][0]).format('0,000 a') + "m/s&sup2;"
  },

  newtonsString: function(value){
    return numeral(value).format('0,0.00') + " N"
  },

  percentageString: function(value){
    return numeral(value).format("0%")
  },

  tonnageString: function(value){
    return numeral(value).format("0,0.00") + " t"
  },

  timeString: function(value){
    return numeral(value).format('00:00:00')
  },

  plainNumberString: function(value){
    return numeral(value).format("0,0.00")
  }
}
/*  Prototype JavaScript framework, version 1.7.2
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {

  Version: '1.7.2',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div'),
          form = document.createElement('form'),
          isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script\\s*>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },

  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;
/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = Object.keys(source);

    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames()[0] == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = (function(method) {
          return function() { return method.valueOf.call(method); };
        })(method);

        value.toString = (function(method) {
          return function() { return method.toString.call(method); };
        })(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString,
      _hasOwnProperty = Object.prototype.hasOwnProperty,
      NULL_TYPE = 'Null',
      UNDEFINED_TYPE = 'Undefined',
      BOOLEAN_TYPE = 'Boolean',
      NUMBER_TYPE = 'Number',
      STRING_TYPE = 'String',
      OBJECT_TYPE = 'Object',
      FUNCTION_CLASS = '[object Function]',
      BOOLEAN_CLASS = '[object Boolean]',
      NUMBER_CLASS = '[object Number]',
      STRING_CLASS = '[object String]',
      ARRAY_CLASS = '[object Array]',
      DATE_CLASS = '[object Date]',
      NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
        typeof JSON.stringify === 'function' &&
        JSON.stringify(0) === '0' &&
        typeof JSON.stringify(Prototype.K) === 'undefined';



  var DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf',
   'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function Type(o) {
    switch(o) {
      case null: return NULL_TYPE;
      case (void 0): return UNDEFINED_TYPE;
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return BOOLEAN_TYPE;
      case 'number':  return NUMBER_TYPE;
      case 'string':  return STRING_TYPE;
    }
    return OBJECT_TYPE;
  }

  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(value) {
    return Str('', { '': value }, []);
  }

  function Str(key, holder, stack) {
    var value = holder[key];
    if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    var _class = _toString.call(value);

    switch (_class) {
      case NUMBER_CLASS:
      case BOOLEAN_CLASS:
      case STRING_CLASS:
        value = value.valueOf();
    }

    switch (value) {
      case null: return 'null';
      case true: return 'true';
      case false: return 'false';
    }

    var type = typeof value;
    switch (type) {
      case 'string':
        return value.inspect(true);
      case 'number':
        return isFinite(value) ? String(value) : 'null';
      case 'object':

        for (var i = 0, length = stack.length; i < length; i++) {
          if (stack[i] === value) {
            throw new TypeError("Cyclic reference to '" + value + "' in object");
          }
        }
        stack.push(value);

        var partial = [];
        if (_class === ARRAY_CLASS) {
          for (var i = 0, length = value.length; i < length; i++) {
            var str = Str(i, value, stack);
            partial.push(typeof str === 'undefined' ? 'null' : str);
          }
          partial = '[' + partial.join(',') + ']';
        } else {
          var keys = Object.keys(value);
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i], str = Str(key, value, stack);
            if (typeof str !== "undefined") {
               partial.push(key.inspect(true)+ ':' + str);
             }
          }
          partial = '{' + partial.join(',') + '}';
        }
        stack.pop();
        return partial;
    }
  }

  function stringify(object) {
    return JSON.stringify(object);
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
    var results = [];
    for (var property in object) {
      if (_hasOwnProperty.call(object, property))
        results.push(property);
    }

    if (IS_DONTENUM_BUGGY) {
      for (var i = 0; property = DONT_ENUMS[i]; i++) {
        if (_hasOwnProperty.call(object, property))
          results.push(property);
      }
    }

    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) === ARRAY_CLASS;
  }

  var hasNativeIsArray = (typeof Array.isArray == 'function')
    && Array.isArray([]) && !Array.isArray({});

  if (hasNativeIsArray) {
    isArray = Array.isArray;
  }

  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return _toString.call(object) === FUNCTION_CLASS;
  }

  function isString(object) {
    return _toString.call(object) === STRING_CLASS;
  }

  function isNumber(object) {
    return _toString.call(object) === NUMBER_CLASS;
  }

  function isDate(object) {
    return _toString.call(object) === DATE_CLASS;
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          Object.keys || keys,
    values:        values,
    clone:         clone,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isDate:        isDate,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }


  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0]))
      return this;

    if (!Object.isFunction(this))
      throw new TypeError("The object is not callable.");

    var nop = function() {};
    var __method = this, args = slice.call(arguments, 1);

    var bound = function() {
      var a = merge(args, arguments);
      var c = this instanceof bound ? this : context;
      return __method.apply(c, a);
    };

    nop.prototype   = this.prototype;
    bound.prototype = new nop();

    return bound;
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000;
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  var extensions = {
    argumentNames:       argumentNames,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  };

  if (!Function.prototype.bind)
    extensions.bind = bind;

  return extensions;
})());



(function(proto) {


  function toISOString() {
    return this.getUTCFullYear() + '-' +
      (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
      this.getUTCDate().toPaddedString(2) + 'T' +
      this.getUTCHours().toPaddedString(2) + ':' +
      this.getUTCMinutes().toPaddedString(2) + ':' +
      this.getUTCSeconds().toPaddedString(2) + 'Z';
  }


  function toJSON() {
    return this.toISOString();
  }

  if (!proto.toISOString) proto.toISOString = toISOString;
  if (!proto.toJSON) proto.toJSON = toJSON;

})(Date.prototype);


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {
  var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
    typeof JSON.parse === 'function' &&
    JSON.parse('{"test": true}').test;

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function isNonEmptyRegExp(regexp) {
    return regexp.source && regexp.source !== '(?:)';
  }


  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || isNonEmptyRegExp(pattern))) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      match = source.match(pattern)
      if (match && match[0].length > 0) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script); });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift()),
            value = pair.length > 1 ? pair.join('=') : pair[0];

        if (value != undefined) {
          value = value.gsub('+', ' ');
          value = decodeURIComponent(value);
        }

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    return this.replace(/-+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON(),
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    if (cx.test(json)) {
      json = json.replace(cx, function (a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function parseJSON() {
    var json = this.unfilterJSON();
    return JSON.parse(json);
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern, position) {
    position = Object.isNumber(position) ? position : 0;
    return this.lastIndexOf(pattern, position) === position;
  }

  function endsWith(pattern, position) {
    pattern = String(pattern);
    position = Object.isNumber(position) ? position : this.length;
    if (position < 0) position = 0;
    if (position > this.length) position = this.length;
    var d = position - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim || strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
    include:        include,
    startsWith:     String.prototype.startsWith || startsWith,
    endsWith:       String.prototype.endsWith || endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3],
          pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    try {
      this._each(iterator, context);
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index, this);
      if (!result) throw $break;
    }, this);
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index, this))
        throw $break;
    }, this);
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index, this)) {
        result = value;
        throw $break;
      }
    }, this);
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index, this))
        results.push(value);
    }, this);
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf) && this.indexOf(object) != -1)
      return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index, this);
    }, this);
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value >= result)
        result = value;
    }, this);
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value < result)
        result = value;
    }, this);
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index, this) ?
        trues : falses).push(value);
    }, this);
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index, this))
        results.push(value);
    }, this);
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index, this)
      };
    }, this).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();

function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}


function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator, context) {
    for (var i = 0, length = this.length >>> 0; i < length; i++) {
      if (i in this) iterator.call(context, this[i], i, this);
    }
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline === false ? this.toArray() : this)._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.indexOf(item) !== -1;
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function indexOf(item, i) {
    if (this == null) throw new TypeError();

    var array = Object(this), length = array.length >>> 0;
    if (length === 0) return -1;

    i = Number(i);
    if (isNaN(i)) {
      i = 0;
    } else if (i !== 0 && isFinite(i)) {
      i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
    }

    if (i > length) return -1;

    var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
    for (; k < length; k++)
      if (k in array && array[k] === item) return k;
    return -1;
  }


  function lastIndexOf(item, i) {
    if (this == null) throw new TypeError();

    var array = Object(this), length = array.length >>> 0;
    if (length === 0) return -1;

    if (!Object.isUndefined(i)) {
      i = Number(i);
      if (isNaN(i)) {
        i = 0;
      } else if (i !== 0 && isFinite(i)) {
        i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
      }
    } else {
      i = length;
    }

    var k = i >= 0 ? Math.min(i, length - 1) :
     length - Math.abs(i);

    for (; k >= 0; k--)
      if (k in array && array[k] === item) return k;
    return -1;
  }

  function concat(_) {
    var array = [], items = slice.call(arguments, 0), item, n = 0;
    items.unshift(this);
    for (var i = 0, length = items.length; i < length; i++) {
      item = items[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++) {
          if (j in item) array[n] = item[j];
          n++;
        }
      } else {
        array[n++] = item;
      }
    }
    array.length = n;
    return array;
  }


  function wrapNative(method) {
    return function() {
      if (arguments.length === 0) {
        return method.call(this, Prototype.K);
      } else if (arguments[0] === undefined) {
        var args = slice.call(arguments, 1);
        args.unshift(Prototype.K);
        return method.apply(this, args);
      } else {
        return method.apply(this, arguments);
      }
    };
  }


  function map(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;

    var object = Object(this);
    var results = [], context = arguments[1], n = 0;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        results[n] = iterator.call(context, object[i], i, object);
      }
      n++;
    }
    results.length = n;
    return results;
  }

  if (arrayProto.map) {
    map = wrapNative(Array.prototype.map);
  }

  function filter(iterator) {
    if (this == null || !Object.isFunction(iterator))
      throw new TypeError();

    var object = Object(this);
    var results = [], context = arguments[1], value;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        value = object[i];
        if (iterator.call(context, value, i, object)) {
          results.push(value);
        }
      }
    }
    return results;
  }

  if (arrayProto.filter) {
    filter = Array.prototype.filter;
  }

  function some(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    var context = arguments[1];

    var object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && iterator.call(context, object[i], i, object)) {
        return true;
      }
    }

    return false;
  }

  if (arrayProto.some) {
    var some = wrapNative(Array.prototype.some);
  }


  function every(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    var context = arguments[1];

    var object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && !iterator.call(context, object[i], i, object)) {
        return false;
      }
    }

    return true;
  }

  if (arrayProto.every) {
    var every = wrapNative(Array.prototype.every);
  }

  var _reduce = arrayProto.reduce;
  function inject(memo, iterator) {
    iterator = iterator || Prototype.K;
    var context = arguments[2];
    return _reduce.call(this, iterator.bind(context), memo);
  }

  if (!arrayProto.reduce) {
    var inject = Enumerable.inject;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,

    map:       map,
    collect:   map,
    select:    filter,
    filter:    filter,
    findAll:   filter,
    some:      some,
    any:       some,
    every:     every,
    all:       every,
    inject:    inject,

    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2);

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }


  function _each(iterator, context) {
    var i = 0;
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator.call(context, pair, i);
      i++;
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }



  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;

    value = String.interpret(value);

    value = value.gsub(/(\r)?\n/, '\r\n');
    value = encodeURIComponent(value);
    value = value.gsub(/%20/, '+');
    return key + '=' + value;
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values)) {
          var queryValues = [];
          for (var i = 0, len = values.length, value; i < len; i++) {
            value = values[i];
            queryValues.push(toQueryPair(key, value));
          }
          return results.concat(queryValues);
        }
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toObject,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator, context) {
    var value = this.start, i;
    for (i = 0; this.include(value); i++) {
      iterator.call(context, value, i);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator, context) {
    this.responders._each(iterator, context);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.isString(this.options.parameters) ?
          this.options.parameters :
          Object.toQueryString(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params += (params ? '&' : '') + "_method=" + this.method;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url += (this.url.include('?') ? '&' : '?') + params;
    }

    this.parameters = params.toQueryParams();

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      if (headers[name] != null)
        this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300) || status == 304;
  },

  getStatus: function() {
    try {
      if (this.transport.status === 1223) return 204;
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;

    try {
      json = decodeURIComponent(escape(json));
    } catch(e) {
    }

    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});

(function(GLOBAL) {

  var UNDEFINED;
  var SLICE = Array.prototype.slice;

  var DIV = document.createElement('div');


  function $(element) {
    if (arguments.length > 1) {
      for (var i = 0, elements = [], length = arguments.length; i < length; i++)
        elements.push($(arguments[i]));
      return elements;
    }

    if (Object.isString(element))
      element = document.getElementById(element);
    return Element.extend(element);
  }

  GLOBAL.$ = $;


  if (!GLOBAL.Node) GLOBAL.Node = {};

  if (!GLOBAL.Node.ELEMENT_NODE) {
    Object.extend(GLOBAL.Node, {
      ELEMENT_NODE:                1,
      ATTRIBUTE_NODE:              2,
      TEXT_NODE:                   3,
      CDATA_SECTION_NODE:          4,
      ENTITY_REFERENCE_NODE:       5,
      ENTITY_NODE:                 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE:                8,
      DOCUMENT_NODE:               9,
      DOCUMENT_TYPE_NODE:         10,
      DOCUMENT_FRAGMENT_NODE:     11,
      NOTATION_NODE:              12
    });
  }

  var ELEMENT_CACHE = {};

  function shouldUseCreationCache(tagName, attributes) {
    if (tagName === 'select') return false;
    if ('type' in attributes) return false;
    return true;
  }

  var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function(){
    try {
      var el = document.createElement('<input name="x">');
      return el.tagName.toLowerCase() === 'input' && el.name === 'x';
    }
    catch(err) {
      return false;
    }
  })();


  var oldElement = GLOBAL.Element;
  function Element(tagName, attributes) {
    attributes = attributes || {};
    tagName = tagName.toLowerCase();

    if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }

    if (!ELEMENT_CACHE[tagName])
      ELEMENT_CACHE[tagName] = Element.extend(document.createElement(tagName));

    var node = shouldUseCreationCache(tagName, attributes) ?
     ELEMENT_CACHE[tagName].cloneNode(false) : document.createElement(tagName);

    return Element.writeAttribute(node, attributes);
  }

  GLOBAL.Element = Element;

  Object.extend(GLOBAL.Element, oldElement || {});
  if (oldElement) GLOBAL.Element.prototype = oldElement.prototype;

  Element.Methods = { ByTag: {}, Simulated: {} };

  var methods = {};

  var INSPECT_ATTRIBUTES = { id: 'id', className: 'class' };
  function inspect(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();

    var attribute, value;
    for (var property in INSPECT_ATTRIBUTES) {
      attribute = INSPECT_ATTRIBUTES[property];
      value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    }

    return result + '>';
  }

  methods.inspect = inspect;


  function visible(element) {
    return $(element).style.display !== 'none';
  }

  function toggle(element, bool) {
    element = $(element);
    if (Object.isUndefined(bool))
      bool = !Element.visible(element);
    Element[bool ? 'show' : 'hide'](element);

    return element;
  }

  function hide(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  }

  function show(element) {
    element = $(element);
    element.style.display = '';
    return element;
  }


  Object.extend(methods, {
    visible: visible,
    toggle:  toggle,
    hide:    hide,
    show:    show
  });


  function remove(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  }

  var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
    var el = document.createElement("select"),
        isBuggy = true;
    el.innerHTML = "<option value=\"test\">test</option>";
    if (el.options && el.options[0]) {
      isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
    }
    el = null;
    return isBuggy;
  })();

  var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
    try {
      var el = document.createElement("table");
      if (el && el.tBodies) {
        el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
        var isBuggy = typeof el.tBodies[0] == "undefined";
        el = null;
        return isBuggy;
      }
    } catch (e) {
      return true;
    }
  })();

  var LINK_ELEMENT_INNERHTML_BUGGY = (function() {
    try {
      var el = document.createElement('div');
      el.innerHTML = "<link />";
      var isBuggy = (el.childNodes.length === 0);
      el = null;
      return isBuggy;
    } catch(e) {
      return true;
    }
  })();

  var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
   TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

  var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
    var s = document.createElement("script"),
        isBuggy = false;
    try {
      s.appendChild(document.createTextNode(""));
      isBuggy = !s.firstChild ||
        s.firstChild && s.firstChild.nodeType !== 3;
    } catch (e) {
      isBuggy = true;
    }
    s = null;
    return isBuggy;
  })();

  function update(element, content) {
    element = $(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;
    while (i--) purgeElement(descendants[i]);

    if (content && content.toElement)
      content = content.toElement();

    if (Object.isElement(content))
      return element.update().insert(content);


    content = Object.toHTML(content);
    var tagName = element.tagName.toUpperCase();

    if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
      element.text = content;
      return element;
    }

    if (ANY_INNERHTML_BUGGY) {
      if (tagName in INSERTION_TRANSLATIONS.tags) {
        while (element.firstChild)
          element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(tagName, content.stripScripts());
        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);

      } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && content.indexOf('<link') > -1) {
        while (element.firstChild)
          element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(tagName,
         content.stripScripts(), true);

        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);
      } else {
        element.innerHTML = content.stripScripts();
      }
    } else {
      element.innerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  function replace(element, content) {
    element = $(element);

    if (content && content.toElement) {
      content = content.toElement();
    } else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }

    element.parentNode.replaceChild(content, element);
    return element;
  }

  var INSERTION_TRANSLATIONS = {
    before: function(element, node) {
      element.parentNode.insertBefore(node, element);
    },
    top: function(element, node) {
      element.insertBefore(node, element.firstChild);
    },
    bottom: function(element, node) {
      element.appendChild(node);
    },
    after: function(element, node) {
      element.parentNode.insertBefore(node, element.nextSibling);
    },

    tags: {
      TABLE:  ['<table>',                '</table>',                   1],
      TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
      TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
      TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
      SELECT: ['<select>',               '</select>',                  1]
    }
  };

  var tags = INSERTION_TRANSLATIONS.tags;

  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });

  function replace_IE(element, content) {
    element = $(element);
    if (content && content.toElement)
      content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (tagName in INSERTION_TRANSLATIONS.tags) {
      var nextSibling = Element.next(element);
      var fragments = getContentFromAnonymousElement(
       tagName, content.stripScripts());

      parent.removeChild(element);

      var iterator;
      if (nextSibling)
        iterator = function(node) { parent.insertBefore(node, nextSibling) };
      else
        iterator = function(node) { parent.appendChild(node); }

      fragments.each(iterator);
    } else {
      element.outerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  if ('outerHTML' in document.documentElement)
    replace = replace_IE;

  function isContent(content) {
    if (Object.isUndefined(content) || content === null) return false;

    if (Object.isString(content) || Object.isNumber(content)) return true;
    if (Object.isElement(content)) return true;
    if (content.toElement || content.toHTML) return true;

    return false;
  }

  function insertContentAt(element, content, position) {
    position   = position.toLowerCase();
    var method = INSERTION_TRANSLATIONS[position];

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      method(element, content);
      return element;
    }

    content = Object.toHTML(content);
    var tagName = ((position === 'before' || position === 'after') ?
     element.parentNode : element).tagName.toUpperCase();

    var childNodes = getContentFromAnonymousElement(tagName, content.stripScripts());

    if (position === 'top' || position === 'after') childNodes.reverse();

    for (var i = 0, node; node = childNodes[i]; i++)
      method(element, node);

    content.evalScripts.bind(content).defer();
  }

  function insert(element, insertions) {
    element = $(element);

    if (isContent(insertions))
      insertions = { bottom: insertions };

    for (var position in insertions)
      insertContentAt(element, insertions[position], position);

    return element;
  }

  function wrap(element, wrapper, attributes) {
    element = $(element);

    if (Object.isElement(wrapper)) {
      $(wrapper).writeAttribute(attributes || {});
    } else if (Object.isString(wrapper)) {
      wrapper = new Element(wrapper, attributes);
    } else {
      wrapper = new Element('div', wrapper);
    }

    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);

    wrapper.appendChild(element);

    return wrapper;
  }

  function cleanWhitespace(element) {
    element = $(element);
    var node = element.firstChild;

    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  }

  function empty(element) {
    return $(element).innerHTML.blank();
  }

  function getContentFromAnonymousElement(tagName, html, force) {
    var t = INSERTION_TRANSLATIONS.tags[tagName], div = DIV;

    var workaround = !!t;
    if (!workaround && force) {
      workaround = true;
      t = ['', '', 0];
    }

    if (workaround) {
      div.innerHTML = '&#160;' + t[0] + html + t[1];
      div.removeChild(div.firstChild);
      for (var i = t[2]; i--; )
        div = div.firstChild;
    } else {
      div.innerHTML = html;
    }

    return $A(div.childNodes);
  }

  function clone(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    if (!HAS_UNIQUE_ID_PROPERTY) {
      clone._prototypeUID = UNDEFINED;
      if (deep) {
        var descendants = Element.select(clone, '*'),
         i = descendants.length;
        while (i--)
          descendants[i]._prototypeUID = UNDEFINED;
      }
    }
    return Element.extend(clone);
  }

  function purgeElement(element) {
    var uid = getUniqueElementID(element);
    if (uid) {
      Element.stopObserving(element);
      if (!HAS_UNIQUE_ID_PROPERTY)
        element._prototypeUID = UNDEFINED;
      delete Element.Storage[uid];
    }
  }

  function purgeCollection(elements) {
    var i = elements.length;
    while (i--)
      purgeElement(elements[i]);
  }

  function purgeCollection_IE(elements) {
    var i = elements.length, element, uid;
    while (i--) {
      element = elements[i];
      uid = getUniqueElementID(element);
      delete Element.Storage[uid];
      delete Event.cache[uid];
    }
  }

  if (HAS_UNIQUE_ID_PROPERTY) {
    purgeCollection = purgeCollection_IE;
  }


  function purge(element) {
    if (!(element = $(element))) return;
    purgeElement(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;

    while (i--) purgeElement(descendants[i]);

    return null;
  }

  Object.extend(methods, {
    remove:  remove,
    update:  update,
    replace: replace,
    insert:  insert,
    wrap:    wrap,
    cleanWhitespace: cleanWhitespace,
    empty:   empty,
    clone:   clone,
    purge:   purge
  });



  function recursivelyCollect(element, property, maximumLength) {
    element = $(element);
    maximumLength = maximumLength || -1;
    var elements = [];

    while (element = element[property]) {
      if (element.nodeType === Node.ELEMENT_NODE)
        elements.push(Element.extend(element));

      if (elements.length === maximumLength) break;
    }

    return elements;
  }


  function ancestors(element) {
    return recursivelyCollect(element, 'parentNode');
  }

  function descendants(element) {
    return Element.select(element, '*');
  }

  function firstDescendant(element) {
    element = $(element).firstChild;
    while (element && element.nodeType !== Node.ELEMENT_NODE)
      element = element.nextSibling;

    return $(element);
  }

  function immediateDescendants(element) {
    var results = [], child = $(element).firstChild;

    while (child) {
      if (child.nodeType === Node.ELEMENT_NODE)
        results.push(Element.extend(child));

      child = child.nextSibling;
    }

    return results;
  }

  function previousSiblings(element) {
    return recursivelyCollect(element, 'previousSibling');
  }

  function nextSiblings(element) {
    return recursivelyCollect(element, 'nextSibling');
  }

  function siblings(element) {
    element = $(element);
    var previous = previousSiblings(element),
     next = nextSiblings(element);
    return previous.reverse().concat(next);
  }

  function match(element, selector) {
    element = $(element);

    if (Object.isString(selector))
      return Prototype.Selector.match(element, selector);

    return selector.match(element);
  }


  function _recursivelyFind(element, property, expression, index) {
    element = $(element), expression = expression || 0, index = index || 0;
    if (Object.isNumber(expression)) {
      index = expression, expression = null;
    }

    while (element = element[property]) {
      if (element.nodeType !== 1) continue;
      if (expression && !Prototype.Selector.match(element, expression))
        continue;
      if (--index >= 0) continue;

      return Element.extend(element);
    }
  }


  function up(element, expression, index) {
    element = $(element);

    if (arguments.length === 1) return $(element.parentNode);
    return _recursivelyFind(element, 'parentNode', expression, index);
  }

  function down(element, expression, index) {
    if (arguments.length === 1) return firstDescendant(element);
    element = $(element), expression = expression || 0, index = index || 0;

    if (Object.isNumber(expression))
      index = expression, expression = '*';

    var node = Prototype.Selector.select(expression, element)[index];
    return Element.extend(node);
  }

  function previous(element, expression, index) {
    return _recursivelyFind(element, 'previousSibling', expression, index);
  }

  function next(element, expression, index) {
    return _recursivelyFind(element, 'nextSibling', expression, index);
  }

  function select(element) {
    element = $(element);
    var expressions = SLICE.call(arguments, 1).join(', ');
    return Prototype.Selector.select(expressions, element);
  }

  function adjacent(element) {
    element = $(element);
    var expressions = SLICE.call(arguments, 1).join(', ');
    var siblings = Element.siblings(element), results = [];
    for (var i = 0, sibling; sibling = siblings[i]; i++) {
      if (Prototype.Selector.match(sibling, expressions))
        results.push(sibling);
    }

    return results;
  }

  function descendantOf_DOM(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    while (element = element.parentNode)
      if (element === ancestor) return true;
    return false;
  }

  function descendantOf_contains(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    if (!ancestor.contains) return descendantOf_DOM(element, ancestor);
    return ancestor.contains(element) && ancestor !== element;
  }

  function descendantOf_compareDocumentPosition(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    return (element.compareDocumentPosition(ancestor) & 8) === 8;
  }

  var descendantOf;
  if (DIV.compareDocumentPosition) {
    descendantOf = descendantOf_compareDocumentPosition;
  } else if (DIV.contains) {
    descendantOf = descendantOf_contains;
  } else {
    descendantOf = descendantOf_DOM;
  }


  Object.extend(methods, {
    recursivelyCollect:   recursivelyCollect,
    ancestors:            ancestors,
    descendants:          descendants,
    firstDescendant:      firstDescendant,
    immediateDescendants: immediateDescendants,
    previousSiblings:     previousSiblings,
    nextSiblings:         nextSiblings,
    siblings:             siblings,
    match:                match,
    up:                   up,
    down:                 down,
    previous:             previous,
    next:                 next,
    select:               select,
    adjacent:             adjacent,
    descendantOf:         descendantOf,

    getElementsBySelector: select,

    childElements:         immediateDescendants
  });


  var idCounter = 1;
  function identify(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;

    do { id = 'anonymous_element_' + idCounter++ } while ($(id));

    Element.writeAttribute(element, 'id', id);
    return id;
  }


  function readAttribute(element, name) {
    return $(element).getAttribute(name);
  }

  function readAttribute_IE(element, name) {
    element = $(element);

    var table = ATTRIBUTE_TRANSLATIONS.read;
    if (table.values[name])
      return table.values[name](element, name);

    if (table.names[name]) name = table.names[name];

    if (name.include(':')) {
      if (!element.attributes || !element.attributes[name]) return null;
      return element.attributes[name].value;
    }

    return element.getAttribute(name);
  }

  function readAttribute_Opera(element, name) {
    if (name === 'title') return element.title;
    return element.getAttribute(name);
  }

  var PROBLEMATIC_ATTRIBUTE_READING = (function() {
    DIV.setAttribute('onclick', []);
    var value = DIV.getAttribute('onclick');
    var isFunction = Object.isArray(value);
    DIV.removeAttribute('onclick');
    return isFunction;
  })();

  if (PROBLEMATIC_ATTRIBUTE_READING) {
    readAttribute = readAttribute_IE;
  } else if (Prototype.Browser.Opera) {
    readAttribute = readAttribute_Opera;
  }


  function writeAttribute(element, name, value) {
    element = $(element);
    var attributes = {}, table = ATTRIBUTE_TRANSLATIONS.write;

    if (typeof name === 'object') {
      attributes = name;
    } else {
      attributes[name] = Object.isUndefined(value) ? true : value;
    }

    for (var attr in attributes) {
      name = table.names[attr] || attr;
      value = attributes[attr];
      if (table.values[attr])
        name = table.values[attr](element, value) || name;
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }

    return element;
  }

  var PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES = (function () {
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) {
      return false;
    }
    var checkbox = document.createElement('<input type="checkbox">');
    checkbox.checked = true;
    var node = checkbox.getAttributeNode('checked');
    return !node || !node.specified;
  })();

  function hasAttribute(element, attribute) {
    attribute = ATTRIBUTE_TRANSLATIONS.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }

  function hasAttribute_IE(element, attribute) {
    if (attribute === 'checked') {
      return element.checked;
    }
    return hasAttribute(element, attribute);
  }

  GLOBAL.Element.Methods.Simulated.hasAttribute =
   PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES ?
   hasAttribute_IE : hasAttribute;

  function classNames(element) {
    return new Element.ClassNames(element);
  }

  var regExpCache = {};
  function getRegExpForClassName(className) {
    if (regExpCache[className]) return regExpCache[className];

    var re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    regExpCache[className] = re;
    return re;
  }

  function hasClassName(element, className) {
    if (!(element = $(element))) return;

    var elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    return getRegExpForClassName(className).test(elementClassName);
  }

  function addClassName(element, className) {
    if (!(element = $(element))) return;

    if (!hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;

    return element;
  }

  function removeClassName(element, className) {
    if (!(element = $(element))) return;

    element.className = element.className.replace(
     getRegExpForClassName(className), ' ').strip();

    return element;
  }

  function toggleClassName(element, className, bool) {
    if (!(element = $(element))) return;

    if (Object.isUndefined(bool))
      bool = !hasClassName(element, className);

    var method = Element[bool ? 'addClassName' : 'removeClassName'];
    return method(element, className);
  }

  var ATTRIBUTE_TRANSLATIONS = {};

  var classProp = 'className', forProp = 'for';

  DIV.setAttribute(classProp, 'x');
  if (DIV.className !== 'x') {
    DIV.setAttribute('class', 'x');
    if (DIV.className === 'x')
      classProp = 'class';
  }

  var LABEL = document.createElement('label');
  LABEL.setAttribute(forProp, 'x');
  if (LABEL.htmlFor !== 'x') {
    LABEL.setAttribute('htmlFor', 'x');
    if (LABEL.htmlFor === 'x')
      forProp = 'htmlFor';
  }
  LABEL = null;

  function _getAttr(element, attribute) {
    return element.getAttribute(attribute);
  }

  function _getAttr2(element, attribute) {
    return element.getAttribute(attribute, 2);
  }

  function _getAttrNode(element, attribute) {
    var node = element.getAttributeNode(attribute);
    return node ? node.value : '';
  }

  function _getFlag(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  }

  DIV.onclick = Prototype.emptyFunction;
  var onclickValue = DIV.getAttribute('onclick');

  var _getEv;

  if (String(onclickValue).indexOf('{') > -1) {
    _getEv = function(element, attribute) {
      var value = element.getAttribute(attribute);
      if (!value) return null;
      value = value.toString();
      value = value.split('{')[1];
      value = value.split('}')[0];
      return value.strip();
    };
  }
  else if (onclickValue === '') {
    _getEv = function(element, attribute) {
      var value = element.getAttribute(attribute);
      if (!value) return null;
      return value.strip();
    };
  }

  ATTRIBUTE_TRANSLATIONS.read = {
    names: {
      'class':     classProp,
      'className': classProp,
      'for':       forProp,
      'htmlFor':   forProp
    },

    values: {
      style: function(element) {
        return element.style.cssText.toLowerCase();
      },
      title: function(element) {
        return element.title;
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.write = {
    names: {
      className:   'class',
      htmlFor:     'for',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    },

    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.has = { names: {} };

  Object.extend(ATTRIBUTE_TRANSLATIONS.write.names,
   ATTRIBUTE_TRANSLATIONS.read.names);

  var CAMEL_CASED_ATTRIBUTE_NAMES = $w('colSpan rowSpan vAlign dateTime ' +
   'accessKey tabIndex encType maxLength readOnly longDesc frameBorder');

  for (var i = 0, attr; attr = CAMEL_CASED_ATTRIBUTE_NAMES[i]; i++) {
    ATTRIBUTE_TRANSLATIONS.write.names[attr.toLowerCase()] = attr;
    ATTRIBUTE_TRANSLATIONS.has.names[attr.toLowerCase()]   = attr;
  }

  Object.extend(ATTRIBUTE_TRANSLATIONS.read.values, {
    href:        _getAttr2,
    src:         _getAttr2,
    type:        _getAttr,
    action:      _getAttrNode,
    disabled:    _getFlag,
    checked:     _getFlag,
    readonly:    _getFlag,
    multiple:    _getFlag,
    onload:      _getEv,
    onunload:    _getEv,
    onclick:     _getEv,
    ondblclick:  _getEv,
    onmousedown: _getEv,
    onmouseup:   _getEv,
    onmouseover: _getEv,
    onmousemove: _getEv,
    onmouseout:  _getEv,
    onfocus:     _getEv,
    onblur:      _getEv,
    onkeypress:  _getEv,
    onkeydown:   _getEv,
    onkeyup:     _getEv,
    onsubmit:    _getEv,
    onreset:     _getEv,
    onselect:    _getEv,
    onchange:    _getEv
  });


  Object.extend(methods, {
    identify:        identify,
    readAttribute:   readAttribute,
    writeAttribute:  writeAttribute,
    classNames:      classNames,
    hasClassName:    hasClassName,
    addClassName:    addClassName,
    removeClassName: removeClassName,
    toggleClassName: toggleClassName
  });


  function normalizeStyleName(style) {
    if (style === 'float' || style === 'styleFloat')
      return 'cssFloat';
    return style.camelize();
  }

  function normalizeStyleName_IE(style) {
    if (style === 'float' || style === 'cssFloat')
      return 'styleFloat';
    return style.camelize();
  }

  function setStyle(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;

    if (Object.isString(styles)) {
      elementStyle.cssText += ';' + styles;
      if (styles.include('opacity')) {
        var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
        Element.setOpacity(element, opacity);
      }
      return element;
    }

    for (var property in styles) {
      if (property === 'opacity') {
        Element.setOpacity(element, styles[property]);
      } else {
        var value = styles[property];
        if (property === 'float' || property === 'cssFloat') {
          property = Object.isUndefined(elementStyle.styleFloat) ?
           'cssFloat' : 'styleFloat';
        }
        elementStyle[property] = value;
      }
    }

    return element;
  }


  function getStyle(element, style) {
    element = $(element);
    style = normalizeStyleName(style);

    var value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getStyle_Opera(element, style) {
    switch (style) {
      case 'height': case 'width':
        if (!Element.visible(element)) return null;

        var dim = parseInt(getStyle(element, style), 10);

        if (dim !== element['offset' + style.capitalize()])
          return dim + 'px';

        return Element.measure(element, style);

      default: return getStyle(element, style);
    }
  }

  function getStyle_IE(element, style) {
    element = $(element);
    style = normalizeStyleName_IE(style);

    var value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }

    if (style === 'opacity' && !STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity_IE(element);

    if (value === 'auto') {
      if ((style === 'width' || style === 'height') && Element.visible(element))
        return Element.measure(element, style) + 'px';
      return null;
    }

    return value;
  }

  function stripAlphaFromFilter_IE(filter) {
    return (filter || '').replace(/alpha\([^\)]*\)/gi, '');
  }

  function hasLayout_IE(element) {
    if (!element.currentStyle || !element.currentStyle.hasLayout)
      element.style.zoom = 1;
    return element;
  }

  var STANDARD_CSS_OPACITY_SUPPORTED = (function() {
    DIV.style.cssText = "opacity:.55";
    return /^0.55/.test(DIV.style.opacity);
  })();

  function setOpacity(element, value) {
    element = $(element);
    if (value == 1 || value === '') value = '';
    else if (value < 0.00001) value = 0;
    element.style.opacity = value;
    return element;
  }

  function setOpacity_IE(element, value) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return setOpacity(element, value);

    element = hasLayout_IE($(element));
    var filter = Element.getStyle(element, 'filter'),
     style = element.style;

    if (value == 1 || value === '') {
      filter = stripAlphaFromFilter_IE(filter);
      if (filter) style.filter = filter;
      else style.removeAttribute('filter');
      return element;
    }

    if (value < 0.00001) value = 0;

    style.filter = stripAlphaFromFilter_IE(filter) +
     'alpha(opacity=' + (value * 100) + ')';

    return element;
  }


  function getOpacity(element) {
    return Element.getStyle(element, 'opacity');
  }

  function getOpacity_IE(element) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity(element);

    var filter = Element.getStyle(element, 'filter');
    if (filter.length === 0) return 1.0;
    var match = (filter || '').match(/alpha\(opacity=(.*)\)/);
    if (match && match[1]) return parseFloat(match[1]) / 100;
    return 1.0;
  }


  Object.extend(methods, {
    setStyle:   setStyle,
    getStyle:   getStyle,
    setOpacity: setOpacity,
    getOpacity: getOpacity
  });

  if ('styleFloat' in DIV.style) {
    methods.getStyle = getStyle_IE;
    methods.setOpacity = setOpacity_IE;
    methods.getOpacity = getOpacity_IE;
  }

  var UID = 0;

  GLOBAL.Element.Storage = { UID: 1 };

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  var HAS_UNIQUE_ID_PROPERTY = ('uniqueID' in DIV);
  if (HAS_UNIQUE_ID_PROPERTY)
    getUniqueElementID = getUniqueElementID_IE;

  function getStorage(element) {
    if (!(element = $(element))) return;

    var uid = getUniqueElementID(element);

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  }

  function store(element, key, value) {
    if (!(element = $(element))) return;
    var storage = getStorage(element);
    if (arguments.length === 2) {
      storage.update(key);
    } else {
      storage.set(key, value);
    }
    return element;
  }

  function retrieve(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var storage = getStorage(element), value = storage.get(key);

    if (Object.isUndefined(value)) {
      storage.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  }


  Object.extend(methods, {
    getStorage: getStorage,
    store:      store,
    retrieve:   retrieve
  });


  var Methods = {}, ByTag = Element.Methods.ByTag,
   F = Prototype.BrowserFeatures;

  if (!F.ElementExtensions && ('__proto__' in DIV)) {
    GLOBAL.HTMLElement = {};
    GLOBAL.HTMLElement.prototype = DIV['__proto__'];
    F.ElementExtensions = true;
  }

  function checkElementPrototypeDeficiency(tagName) {
    if (typeof window.Element === 'undefined') return false;
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) return false;
    var proto = window.Element.prototype;
    if (proto) {
      var id = '_' + (Math.random() + '').slice(2),
       el = document.createElement(tagName);
      proto[id] = 'x';
      var isBuggy = (el[id] !== 'x');
      delete proto[id];
      el = null;
      return isBuggy;
    }

    return false;
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =
   checkElementPrototypeDeficiency('object');

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var EXTENDED = {};
  function elementIsExtended(element) {
    var uid = getUniqueElementID(element);
    return (uid in EXTENDED);
  }

  function extend(element) {
    if (!element || elementIsExtended(element)) return element;
    if (element.nodeType !== Node.ELEMENT_NODE || element == window)
      return element;

    var methods = Object.clone(Methods),
     tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);
    EXTENDED[getUniqueElementID(element)] = true;
    return element;
  }

  function extend_IE8(element) {
    if (!element || elementIsExtended(element)) return element;

    var t = element.tagName;
    if (t && (/^(?:object|applet|embed)$/i.test(t))) {
      extendElementWith(element, Element.Methods);
      extendElementWith(element, Element.Methods.Simulated);
      extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
    }

    return element;
  }

  if (F.SpecificElementExtensions) {
    extend = HTMLOBJECTELEMENT_PROTOTYPE_BUGGY ? extend_IE8 : Prototype.K;
  }

  function addMethodsToTagName(tagName, methods) {
    tagName = tagName.toUpperCase();
    if (!ByTag[tagName]) ByTag[tagName] = {};
    Object.extend(ByTag[tagName], methods);
  }

  function mergeMethods(destination, methods, onlyIfAbsent) {
    if (Object.isUndefined(onlyIfAbsent)) onlyIfAbsent = false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName),
     proto = element['__proto__'] || element.constructor.prototype;

    element = null;
    return proto;
  }

  function addMethods(methods) {
    if (arguments.length === 0) addFormMethods();

    if (arguments.length === 2) {
      var tagName = methods;
      methods = arguments[1];
    }

    if (!tagName) {
      Object.extend(Element.Methods, methods || {});
    } else {
      if (Object.isArray(tagName)) {
        for (var i = 0, tag; tag = tagName[i]; i++)
          addMethodsToTagName(tag, methods);
      } else {
        addMethodsToTagName(tagName, methods);
      }
    }

    var ELEMENT_PROTOTYPE = window.HTMLElement ? HTMLElement.prototype :
     Element.prototype;

    if (F.ElementExtensions) {
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods);
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods.Simulated, true);
    }

    if (F.SpecificElementExtensions) {
      for (var tag in Element.Methods.ByTag) {
        var klass = findDOMClass(tag);
        if (Object.isUndefined(klass)) continue;
        mergeMethods(klass.prototype, ByTag[tag]);
      }
    }

    Object.extend(Element, Element.Methods);
    Object.extend(Element, Element.Methods.Simulated);
    delete Element.ByTag;
    delete Element.Simulated;

    Element.extend.refresh();

    ELEMENT_CACHE = {};
  }

  Object.extend(GLOBAL.Element, {
    extend:     extend,
    addMethods: addMethods
  });

  if (extend === Prototype.K) {
    GLOBAL.Element.extend.refresh = Prototype.emptyFunction;
  } else {
    GLOBAL.Element.extend.refresh = function() {
      if (Prototype.BrowserFeatures.ElementExtensions) return;
      Object.extend(Methods, Element.Methods);
      Object.extend(Methods, Element.Methods.Simulated);

      EXTENDED = {};
    };
  }

  function addFormMethods() {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods),
      "BUTTON":   Object.clone(Form.Element.Methods)
    });
  }

  Element.addMethods(methods);

  function destroyCache_IE() {
    DIV = null;
    ELEMENT_CACHE = null;
  }

  if (window.attachEvent)
    window.attachEvent('onunload', destroyCache_IE);

})(this);
(function() {

  function toDecimal(pctString) {
    var match = pctString.match(/^(\d+)%?$/i);
    if (!match) return null;
    return (Number(match[1]) / 100);
  }

  function getRawStyle(element, style) {
    element = $(element);

    var value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getRawStyle_IE(element, style) {
    var value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }
    return value;
  }

  function getContentWidth(element, context) {
    var boxWidth = element.offsetWidth;

    var bl = getPixelValue(element, 'borderLeftWidth',  context) || 0;
    var br = getPixelValue(element, 'borderRightWidth', context) || 0;
    var pl = getPixelValue(element, 'paddingLeft',      context) || 0;
    var pr = getPixelValue(element, 'paddingRight',     context) || 0;

    return boxWidth - bl - br - pl - pr;
  }

  if ('currentStyle' in document.documentElement) {
    getRawStyle = getRawStyle_IE;
  }


  function getPixelValue(value, property, context) {
    var element = null;
    if (Object.isElement(value)) {
      element = value;
      value = getRawStyle(element, property);
    }

    if (value === null || Object.isUndefined(value)) {
      return null;
    }

    if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
      return window.parseFloat(value);
    }

    var isPercentage = value.include('%'), isViewport = (context === document.viewport);

    if (/\d/.test(value) && element && element.runtimeStyle && !(isPercentage && isViewport)) {
      var style = element.style.left, rStyle = element.runtimeStyle.left;
      element.runtimeStyle.left = element.currentStyle.left;
      element.style.left = value || 0;
      value = element.style.pixelLeft;
      element.style.left = style;
      element.runtimeStyle.left = rStyle;

      return value;
    }

    if (element && isPercentage) {
      context = context || element.parentNode;
      var decimal = toDecimal(value), whole = null;

      var isHorizontal = property.include('left') || property.include('right') ||
       property.include('width');

      var isVertical   = property.include('top') || property.include('bottom') ||
        property.include('height');

      if (context === document.viewport) {
        if (isHorizontal) {
          whole = document.viewport.getWidth();
        } else if (isVertical) {
          whole = document.viewport.getHeight();
        }
      } else {
        if (isHorizontal) {
          whole = $(context).measure('width');
        } else if (isVertical) {
          whole = $(context).measure('height');
        }
      }

      return (whole === null) ? 0 : whole * decimal;
    }

    return 0;
  }

  function toCSSPixels(number) {
    if (Object.isString(number) && number.endsWith('px'))
      return number;
    return number + 'px';
  }

  function isDisplayed(element) {
    while (element && element.parentNode) {
      var display = element.getStyle('display');
      if (display === 'none') {
        return false;
      }
      element = $(element.parentNode);
    }
    return true;
  }

  var hasLayout = Prototype.K;
  if ('currentStyle' in document.documentElement) {
    hasLayout = function(element) {
      if (!element.currentStyle.hasLayout) {
        element.style.zoom = 1;
      }
      return element;
    };
  }

  function cssNameFor(key) {
    if (key.include('border')) key = key + '-width';
    return key.camelize();
  }

  Element.Layout = Class.create(Hash, {
    initialize: function($super, element, preCompute) {
      $super();
      this.element = $(element);

      Element.Layout.PROPERTIES.each( function(property) {
        this._set(property, null);
      }, this);

      if (preCompute) {
        this._preComputing = true;
        this._begin();
        Element.Layout.PROPERTIES.each( this._compute, this );
        this._end();
        this._preComputing = false;
      }
    },

    _set: function(property, value) {
      return Hash.prototype.set.call(this, property, value);
    },

    set: function(property, value) {
      throw "Properties of Element.Layout are read-only.";
    },

    get: function($super, property) {
      var value = $super(property);
      return value === null ? this._compute(property) : value;
    },

    _begin: function() {
      if (this._isPrepared()) return;

      var element = this.element;
      if (isDisplayed(element)) {
        this._setPrepared(true);
        return;
      }


      var originalStyles = {
        position:   element.style.position   || '',
        width:      element.style.width      || '',
        visibility: element.style.visibility || '',
        display:    element.style.display    || ''
      };

      element.store('prototype_original_styles', originalStyles);

      var position = getRawStyle(element, 'position'), width = element.offsetWidth;

      if (width === 0 || width === null) {
        element.style.display = 'block';
        width = element.offsetWidth;
      }

      var context = (position === 'fixed') ? document.viewport :
       element.parentNode;

      var tempStyles = {
        visibility: 'hidden',
        display:    'block'
      };

      if (position !== 'fixed') tempStyles.position = 'absolute';

      element.setStyle(tempStyles);

      var positionedWidth = element.offsetWidth, newWidth;
      if (width && (positionedWidth === width)) {
        newWidth = getContentWidth(element, context);
      } else if (position === 'absolute' || position === 'fixed') {
        newWidth = getContentWidth(element, context);
      } else {
        var parent = element.parentNode, pLayout = $(parent).getLayout();

        newWidth = pLayout.get('width') -
         this.get('margin-left') -
         this.get('border-left') -
         this.get('padding-left') -
         this.get('padding-right') -
         this.get('border-right') -
         this.get('margin-right');
      }

      element.setStyle({ width: newWidth + 'px' });

      this._setPrepared(true);
    },

    _end: function() {
      var element = this.element;
      var originalStyles = element.retrieve('prototype_original_styles');
      element.store('prototype_original_styles', null);
      element.setStyle(originalStyles);
      this._setPrepared(false);
    },

    _compute: function(property) {
      var COMPUTATIONS = Element.Layout.COMPUTATIONS;
      if (!(property in COMPUTATIONS)) {
        throw "Property not found.";
      }

      return this._set(property, COMPUTATIONS[property].call(this, this.element));
    },

    _isPrepared: function() {
      return this.element.retrieve('prototype_element_layout_prepared', false);
    },

    _setPrepared: function(bool) {
      return this.element.store('prototype_element_layout_prepared', bool);
    },

    toObject: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var obj = {};
      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        var value = this.get(key);
        if (value != null) obj[key] = value;
      }, this);
      return obj;
    },

    toHash: function() {
      var obj = this.toObject.apply(this, arguments);
      return new Hash(obj);
    },

    toCSS: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var css = {};

      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

        var value = this.get(key);
        if (value != null) css[cssNameFor(key)] = value + 'px';
      }, this);
      return css;
    },

    inspect: function() {
      return "#<Element.Layout>";
    }
  });

  Object.extend(Element.Layout, {
    PROPERTIES: $w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),

    COMPOSITE_PROPERTIES: $w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),

    COMPUTATIONS: {
      'height': function(element) {
        if (!this._preComputing) this._begin();

        var bHeight = this.get('border-box-height');
        if (bHeight <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bTop = this.get('border-top'),
         bBottom = this.get('border-bottom');

        var pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        if (!this._preComputing) this._end();

        return bHeight - bTop - bBottom - pTop - pBottom;
      },

      'width': function(element) {
        if (!this._preComputing) this._begin();

        var bWidth = this.get('border-box-width');
        if (bWidth <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bLeft = this.get('border-left'),
         bRight = this.get('border-right');

        var pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        if (!this._preComputing) this._end();
        return bWidth - bLeft - bRight - pLeft - pRight;
      },

      'padding-box-height': function(element) {
        var height = this.get('height'),
         pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        return height + pTop + pBottom;
      },

      'padding-box-width': function(element) {
        var width = this.get('width'),
         pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        return width + pLeft + pRight;
      },

      'border-box-height': function(element) {
        if (!this._preComputing) this._begin();
        var height = element.offsetHeight;
        if (!this._preComputing) this._end();
        return height;
      },

      'border-box-width': function(element) {
        if (!this._preComputing) this._begin();
        var width = element.offsetWidth;
        if (!this._preComputing) this._end();
        return width;
      },

      'margin-box-height': function(element) {
        var bHeight = this.get('border-box-height'),
         mTop = this.get('margin-top'),
         mBottom = this.get('margin-bottom');

        if (bHeight <= 0) return 0;

        return bHeight + mTop + mBottom;
      },

      'margin-box-width': function(element) {
        var bWidth = this.get('border-box-width'),
         mLeft = this.get('margin-left'),
         mRight = this.get('margin-right');

        if (bWidth <= 0) return 0;

        return bWidth + mLeft + mRight;
      },

      'top': function(element) {
        var offset = element.positionedOffset();
        return offset.top;
      },

      'bottom': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pHeight = parent.measure('height');

        var mHeight = this.get('border-box-height');

        return pHeight - mHeight - offset.top;
      },

      'left': function(element) {
        var offset = element.positionedOffset();
        return offset.left;
      },

      'right': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pWidth = parent.measure('width');

        var mWidth = this.get('border-box-width');

        return pWidth - mWidth - offset.left;
      },

      'padding-top': function(element) {
        return getPixelValue(element, 'paddingTop');
      },

      'padding-bottom': function(element) {
        return getPixelValue(element, 'paddingBottom');
      },

      'padding-left': function(element) {
        return getPixelValue(element, 'paddingLeft');
      },

      'padding-right': function(element) {
        return getPixelValue(element, 'paddingRight');
      },

      'border-top': function(element) {
        return getPixelValue(element, 'borderTopWidth');
      },

      'border-bottom': function(element) {
        return getPixelValue(element, 'borderBottomWidth');
      },

      'border-left': function(element) {
        return getPixelValue(element, 'borderLeftWidth');
      },

      'border-right': function(element) {
        return getPixelValue(element, 'borderRightWidth');
      },

      'margin-top': function(element) {
        return getPixelValue(element, 'marginTop');
      },

      'margin-bottom': function(element) {
        return getPixelValue(element, 'marginBottom');
      },

      'margin-left': function(element) {
        return getPixelValue(element, 'marginLeft');
      },

      'margin-right': function(element) {
        return getPixelValue(element, 'marginRight');
      }
    }
  });

  if ('getBoundingClientRect' in document.documentElement) {
    Object.extend(Element.Layout.COMPUTATIONS, {
      'right': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.right - rect.right).round();
      },

      'bottom': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.bottom - rect.bottom).round();
      }
    });
  }

  Element.Offset = Class.create({
    initialize: function(left, top) {
      this.left = left.round();
      this.top  = top.round();

      this[0] = this.left;
      this[1] = this.top;
    },

    relativeTo: function(offset) {
      return new Element.Offset(
        this.left - offset.left,
        this.top  - offset.top
      );
    },

    inspect: function() {
      return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this);
    },

    toString: function() {
      return "[#{left}, #{top}]".interpolate(this);
    },

    toArray: function() {
      return [this.left, this.top];
    }
  });

  function getLayout(element, preCompute) {
    return new Element.Layout(element, preCompute);
  }

  function measure(element, property) {
    return $(element).getLayout().get(property);
  }

  function getHeight(element) {
    return Element.getDimensions(element).height;
  }

  function getWidth(element) {
    return Element.getDimensions(element).width;
  }

  function getDimensions(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');

    if (display && display !== 'none') {
      return { width: element.offsetWidth, height: element.offsetHeight };
    }

    var style = element.style;
    var originalStyles = {
      visibility: style.visibility,
      position:   style.position,
      display:    style.display
    };

    var newStyles = {
      visibility: 'hidden',
      display:    'block'
    };

    if (originalStyles.position !== 'fixed')
      newStyles.position = 'absolute';

    Element.setStyle(element, newStyles);

    var dimensions = {
      width:  element.offsetWidth,
      height: element.offsetHeight
    };

    Element.setStyle(element, originalStyles);

    return dimensions;
  }

  function getOffsetParent(element) {
    element = $(element);

    if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
      return $(document.body);

    var isInline = (Element.getStyle(element, 'display') === 'inline');
    if (!isInline && element.offsetParent) return $(element.offsetParent);

    while ((element = element.parentNode) && element !== document.body) {
      if (Element.getStyle(element, 'position') !== 'static') {
        return isHtml(element) ? $(document.body) : $(element);
      }
    }

    return $(document.body);
  }


  function cumulativeOffset(element) {
    element = $(element);
    var valueT = 0, valueL = 0;
    if (element.parentNode) {
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);
    }
    return new Element.Offset(valueL, valueT);
  }

  function positionedOffset(element) {
    element = $(element);

    var layout = element.getLayout();

    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (isBody(element)) break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);

    valueL -= layout.get('margin-top');
    valueT -= layout.get('margin-left');

    return new Element.Offset(valueL, valueT);
  }

  function cumulativeScrollOffset(element) {
    var valueT = 0, valueL = 0;
    do {
      if (element === document.body) {
        var bodyScrollNode = document.documentElement || document.body.parentNode || document.body;
        valueT += !Object.isUndefined(window.pageYOffset) ? window.pageYOffset : bodyScrollNode.scrollTop || 0;
        valueL += !Object.isUndefined(window.pageXOffset) ? window.pageXOffset : bodyScrollNode.scrollLeft || 0;
        break;
      } else {
        valueT += element.scrollTop  || 0;
        valueL += element.scrollLeft || 0;
        element = element.parentNode;
      }
    } while (element);
    return new Element.Offset(valueL, valueT);
  }

  function viewportOffset(forElement) {
    var valueT = 0, valueL = 0, docBody = document.body;

    forElement = $(forElement);
    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == docBody &&
        Element.getStyle(element, 'position') == 'absolute') break;
    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (element != docBody) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);
    return new Element.Offset(valueL, valueT);
  }

  function absolutize(element) {
    element = $(element);

    if (Element.getStyle(element, 'position') === 'absolute') {
      return element;
    }

    var offsetParent = getOffsetParent(element);
    var eOffset = element.viewportOffset(),
     pOffset = offsetParent.viewportOffset();

    var offset = eOffset.relativeTo(pOffset);
    var layout = element.getLayout();

    element.store('prototype_absolutize_original_styles', {
      position: element.getStyle('position'),
      left:     element.getStyle('left'),
      top:      element.getStyle('top'),
      width:    element.getStyle('width'),
      height:   element.getStyle('height')
    });

    element.setStyle({
      position: 'absolute',
      top:    offset.top + 'px',
      left:   offset.left + 'px',
      width:  layout.get('width') + 'px',
      height: layout.get('height') + 'px'
    });

    return element;
  }

  function relativize(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') === 'relative') {
      return element;
    }

    var originalStyles =
     element.retrieve('prototype_absolutize_original_styles');

    if (originalStyles) element.setStyle(originalStyles);
    return element;
  }


  function scrollTo(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos.left, pos.top);
    return element;
  }


  function makePositioned(element) {
    element = $(element);
    var position = Element.getStyle(element, 'position'), styles = {};
    if (position === 'static' || !position) {
      styles.position = 'relative';
      if (Prototype.Browser.Opera) {
        styles.top  = 0;
        styles.left = 0;
      }
      Element.setStyle(element, styles);
      Element.store(element, 'prototype_made_positioned', true);
    }
    return element;
  }

  function undoPositioned(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     madePositioned = storage.get('prototype_made_positioned');

    if (madePositioned) {
      storage.unset('prototype_made_positioned');
      Element.setStyle(element, {
        position: '',
        top:      '',
        bottom:   '',
        left:     '',
        right:    ''
      });
    }
    return element;
  }

  function makeClipping(element) {
    element = $(element);

    var storage = Element.getStorage(element),
     madeClipping = storage.get('prototype_made_clipping');

    if (Object.isUndefined(madeClipping)) {
      var overflow = Element.getStyle(element, 'overflow');
      storage.set('prototype_made_clipping', overflow);
      if (overflow !== 'hidden')
        element.style.overflow = 'hidden';
    }

    return element;
  }

  function undoClipping(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     overflow = storage.get('prototype_made_clipping');

    if (!Object.isUndefined(overflow)) {
      storage.unset('prototype_made_clipping');
      element.style.overflow = overflow || '';
    }

    return element;
  }

  function clonePosition(element, source, options) {
    options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, options || {});

    source  = $(source);
    element = $(element);
    var p, delta, layout, styles = {};

    if (options.setLeft || options.setTop) {
      p = Element.viewportOffset(source);
      delta = [0, 0];
      if (Element.getStyle(element, 'position') === 'absolute') {
        var parent = Element.getOffsetParent(element);
        if (parent !== document.body) delta = Element.viewportOffset(parent);
      }
    }

    if (options.setWidth || options.setHeight) {
      layout = Element.getLayout(source);
    }

    if (options.setLeft)
      styles.left = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)
      styles.top  = (p[1] - delta[1] + options.offsetTop)  + 'px';

    if (options.setWidth)
      styles.width  = layout.get('border-box-width')  + 'px';
    if (options.setHeight)
      styles.height = layout.get('border-box-height') + 'px';

    return Element.setStyle(element, styles);
  }


  if (Prototype.Browser.IE) {
    getOffsetParent = getOffsetParent.wrap(
      function(proceed, element) {
        element = $(element);

        if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
          return $(document.body);

        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);

        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );

    positionedOffset = positionedOffset.wrap(function(proceed, element) {
      element = $(element);
      if (!element.parentNode) return new Element.Offset(0, 0);
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);

      var offsetParent = element.getOffsetParent();
      if (offsetParent && offsetParent.getStyle('position') === 'fixed')
        hasLayout(offsetParent);

      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    });
  } else if (Prototype.Browser.Webkit) {
    cumulativeOffset = function(element) {
      element = $(element);
      var valueT = 0, valueL = 0;
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        if (element.offsetParent == document.body) {
          if (Element.getStyle(element, 'position') == 'absolute') break;
        }

        element = element.offsetParent;
      } while (element);

      return new Element.Offset(valueL, valueT);
    };
  }


  Element.addMethods({
    getLayout:              getLayout,
    measure:                measure,
    getWidth:               getWidth,
    getHeight:              getHeight,
    getDimensions:          getDimensions,
    getOffsetParent:        getOffsetParent,
    cumulativeOffset:       cumulativeOffset,
    positionedOffset:       positionedOffset,
    cumulativeScrollOffset: cumulativeScrollOffset,
    viewportOffset:         viewportOffset,
    absolutize:             absolutize,
    relativize:             relativize,
    scrollTo:               scrollTo,
    makePositioned:         makePositioned,
    undoPositioned:         undoPositioned,
    makeClipping:           makeClipping,
    undoClipping:           undoClipping,
    clonePosition:          clonePosition
  });

  function isBody(element) {
    return element.nodeName.toUpperCase() === 'BODY';
  }

  function isHtml(element) {
    return element.nodeName.toUpperCase() === 'HTML';
  }

  function isDocument(element) {
    return element.nodeType === Node.DOCUMENT_NODE;
  }

  function isDetached(element) {
    return element !== document.body &&
     !Element.descendantOf(element, document.body);
  }

  if ('getBoundingClientRect' in document.documentElement) {
    Element.addMethods({
      viewportOffset: function(element) {
        element = $(element);
        if (isDetached(element)) return new Element.Offset(0, 0);

        var rect = element.getBoundingClientRect(),
         docEl = document.documentElement;
        return new Element.Offset(rect.left - docEl.clientLeft,
         rect.top - docEl.clientTop);
      }
    });
  }


})();

(function() {

  var IS_OLD_OPERA = Prototype.Browser.Opera &&
   (window.parseFloat(window.opera.version()) < 9.5);
  var ROOT = null;
  function getRootElement() {
    if (ROOT) return ROOT;
    ROOT = IS_OLD_OPERA ? document.body : document.documentElement;
    return ROOT;
  }

  function getDimensions() {
    return { width: this.getWidth(), height: this.getHeight() };
  }

  function getWidth() {
    return getRootElement().clientWidth;
  }

  function getHeight() {
    return getRootElement().clientHeight;
  }

  function getScrollOffsets() {
    var x = window.pageXOffset || document.documentElement.scrollLeft ||
     document.body.scrollLeft;
    var y = window.pageYOffset || document.documentElement.scrollTop ||
     document.body.scrollTop;

    return new Element.Offset(x, y);
  }

  document.viewport = {
    getDimensions:    getDimensions,
    getWidth:         getWidth,
    getHeight:        getHeight,
    getScrollOffsets: getScrollOffsets
  };

})();
window.$$ = function() {
  var expression = $A(arguments).join(', ');
  return Prototype.Selector.select(expression, document);
};

Prototype.Selector = (function() {

  function select() {
    throw new Error('Method "Prototype.Selector.select" must be defined.');
  }

  function match() {
    throw new Error('Method "Prototype.Selector.match" must be defined.');
  }

  function find(elements, expression, index) {
    index = index || 0;
    var match = Prototype.Selector.match, length = elements.length, matchIndex = 0, i;

    for (i = 0; i < length; i++) {
      if (match(elements[i], expression) && index == matchIndex++) {
        return Element.extend(elements[i]);
      }
    }
  }

  function extendElements(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
      Element.extend(elements[i]);
    }
    return elements;
  }


  var K = Prototype.K;

  return {
    select: select,
    match: match,
    find: find,
    extendElements: (Element.extend === K) ? K : extendElements,
    extendElement: Element.extend
  };
})();
Prototype._original_property = window.Sizzle;
/*!
 * Sizzle CSS Selector Engine v@VERSION
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function( window ) {

var i,
  support,
  Expr,
  getText,
  isXML,
  compile,
  select,
  outermostContext,
  sortInput,
  hasDuplicate,

  setDocument,
  document,
  docElem,
  documentIsHTML,
  rbuggyQSA,
  rbuggyMatches,
  matches,
  contains,

  expando = "sizzle" + -(new Date()),
  preferredDoc = window.document,
  dirruns = 0,
  done = 0,
  classCache = createCache(),
  tokenCache = createCache(),
  compilerCache = createCache(),
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
    }
    return 0;
  },

  strundefined = typeof undefined,
  MAX_NEGATIVE = 1 << 31,

  hasOwn = ({}).hasOwnProperty,
  arr = [],
  pop = arr.pop,
  push_native = arr.push,
  push = arr.push,
  slice = arr.slice,
  indexOf = arr.indexOf || function( elem ) {
    var i = 0,
      len = this.length;
    for ( ; i < len; i++ ) {
      if ( this[i] === elem ) {
        return i;
      }
    }
    return -1;
  },

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


  whitespace = "[\\x20\\t\\r\\n\\f]",
  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

  identifier = characterEncoding.replace( "w", "w#" ),

  attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

  pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

  rpseudo = new RegExp( pseudos ),
  ridentifier = new RegExp( "^" + identifier + "$" ),

  matchExpr = {
    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
    "ATTR": new RegExp( "^" + attributes ),
    "PSEUDO": new RegExp( "^" + pseudos ),
    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
      "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
      "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
      whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  },

  rinputs = /^(?:input|select|textarea|button)$/i,
  rheader = /^h\d$/i,

  rnative = /^[^{]+\{\s*\[native \w/,

  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  rsibling = /[+~]/,
  rescape = /'|\\/g,

  runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
  funescape = function( _, escaped, escapedWhitespace ) {
    var high = "0x" + escaped - 0x10000;
    return high !== high || escapedWhitespace ?
      escaped :
      high < 0 ?
        String.fromCharCode( high + 0x10000 ) :
        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  };

try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes )),
    preferredDoc.childNodes
  );
  arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
  push = { apply: arr.length ?

    function( target, els ) {
      push_native.apply( target, slice.call(els) );
    } :

    function( target, els ) {
      var j = target.length,
        i = 0;
      while ( (target[j++] = els[i++]) ) {}
      target.length = j - 1;
    }
  };
}

function Sizzle( selector, context, results, seed ) {
  var match, elem, m, nodeType,
    i, groups, old, nid, newContext, newSelector;

  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
    setDocument( context );
  }

  context = context || document;
  results = results || [];

  if ( !selector || typeof selector !== "string" ) {
    return results;
  }

  if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
    return [];
  }

  if ( documentIsHTML && !seed ) {

    if ( (match = rquickExpr.exec( selector )) ) {
      if ( (m = match[1]) ) {
        if ( nodeType === 9 ) {
          elem = context.getElementById( m );
          if ( elem && elem.parentNode ) {
            if ( elem.id === m ) {
              results.push( elem );
              return results;
            }
          } else {
            return results;
          }
        } else {
          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
            contains( context, elem ) && elem.id === m ) {
            results.push( elem );
            return results;
          }
        }

      } else if ( match[2] ) {
        push.apply( results, context.getElementsByTagName( selector ) );
        return results;

      } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
        push.apply( results, context.getElementsByClassName( m ) );
        return results;
      }
    }

    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
      nid = old = expando;
      newContext = context;
      newSelector = nodeType === 9 && selector;

      if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
        groups = tokenize( selector );

        if ( (old = context.getAttribute("id")) ) {
          nid = old.replace( rescape, "\\$&" );
        } else {
          context.setAttribute( "id", nid );
        }
        nid = "[id='" + nid + "'] ";

        i = groups.length;
        while ( i-- ) {
          groups[i] = nid + toSelector( groups[i] );
        }
        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
        newSelector = groups.join(",");
      }

      if ( newSelector ) {
        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector )
          );
          return results;
        } catch(qsaError) {
        } finally {
          if ( !old ) {
            context.removeAttribute("id");
          }
        }
      }
    }
  }

  return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
  var keys = [];

  function cache( key, value ) {
    if ( keys.push( key + " " ) > Expr.cacheLength ) {
      delete cache[ keys.shift() ];
    }
    return (cache[ key + " " ] = value);
  }
  return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
  fn[ expando ] = true;
  return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
  var div = document.createElement("div");

  try {
    return !!fn( div );
  } catch (e) {
    return false;
  } finally {
    if ( div.parentNode ) {
      div.parentNode.removeChild( div );
    }
    div = null;
  }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
  var arr = attrs.split("|"),
    i = attrs.length;

  while ( i-- ) {
    Expr.attrHandle[ arr[i] ] = handler;
  }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
  var cur = b && a,
    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
      ( ~b.sourceIndex || MAX_NEGATIVE ) -
      ( ~a.sourceIndex || MAX_NEGATIVE );

  if ( diff ) {
    return diff;
  }

  if ( cur ) {
    while ( (cur = cur.nextSibling) ) {
      if ( cur === b ) {
        return -1;
      }
    }
  }

  return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return name === "input" && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return (name === "input" || name === "button") && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
  return markFunction(function( argument ) {
    argument = +argument;
    return markFunction(function( seed, matches ) {
      var j,
        matchIndexes = fn( [], seed.length, argument ),
        i = matchIndexes.length;

      while ( i-- ) {
        if ( seed[ (j = matchIndexes[i]) ] ) {
          seed[j] = !(matches[j] = seed[j]);
        }
      }
    });
  });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
  return context && typeof context.getElementsByTagName !== strundefined && context;
}

support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
  return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
  var hasCompare,
    doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
    return document;
  }

  document = doc;
  docElem = doc.documentElement;

  documentIsHTML = !isXML( doc );

  if ( parent && parent !== parent.top ) {
    if ( parent.addEventListener ) {
      parent.addEventListener( "unload", function() {
        setDocument();
      }, false );
    } else if ( parent.attachEvent ) {
      parent.attachEvent( "onunload", function() {
        setDocument();
      });
    }
  }

  /* Attributes
  ---------------------------------------------------------------------- */

  support.attributes = assert(function( div ) {
    div.className = "i";
    return !div.getAttribute("className");
  });

  /* getElement(s)By*
  ---------------------------------------------------------------------- */

  support.getElementsByTagName = assert(function( div ) {
    div.appendChild( doc.createComment("") );
    return !div.getElementsByTagName("*").length;
  });

  support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

    div.firstChild.className = "i";
    return div.getElementsByClassName("i").length === 2;
  });

  support.getById = assert(function( div ) {
    docElem.appendChild( div ).id = expando;
    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
  });

  if ( support.getById ) {
    Expr.find["ID"] = function( id, context ) {
      if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
        var m = context.getElementById( id );
        return m && m.parentNode ? [m] : [];
      }
    };
    Expr.filter["ID"] = function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        return elem.getAttribute("id") === attrId;
      };
    };
  } else {
    delete Expr.find["ID"];

    Expr.filter["ID"] =  function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
        return node && node.value === attrId;
      };
    };
  }

  Expr.find["TAG"] = support.getElementsByTagName ?
    function( tag, context ) {
      if ( typeof context.getElementsByTagName !== strundefined ) {
        return context.getElementsByTagName( tag );
      }
    } :
    function( tag, context ) {
      var elem,
        tmp = [],
        i = 0,
        results = context.getElementsByTagName( tag );

      if ( tag === "*" ) {
        while ( (elem = results[i++]) ) {
          if ( elem.nodeType === 1 ) {
            tmp.push( elem );
          }
        }

        return tmp;
      }
      return results;
    };

  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
      return context.getElementsByClassName( className );
    }
  };

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */


  rbuggyMatches = [];

  rbuggyQSA = [];

  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
    assert(function( div ) {
      div.innerHTML = "<select t=''><option selected=''></option></select>";

      if ( div.querySelectorAll("[t^='']").length ) {
        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
      }

      if ( !div.querySelectorAll("[selected]").length ) {
        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
      }

      if ( !div.querySelectorAll(":checked").length ) {
        rbuggyQSA.push(":checked");
      }
    });

    assert(function( div ) {
      var input = doc.createElement("input");
      input.setAttribute( "type", "hidden" );
      div.appendChild( input ).setAttribute( "name", "D" );

      if ( div.querySelectorAll("[name=d]").length ) {
        rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
      }

      if ( !div.querySelectorAll(":enabled").length ) {
        rbuggyQSA.push( ":enabled", ":disabled" );
      }

      div.querySelectorAll("*,:x");
      rbuggyQSA.push(",.*:");
    });
  }

  if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector) )) ) {

    assert(function( div ) {
      support.disconnectedMatch = matches.call( div, "div" );

      matches.call( div, "[s!='']:x" );
      rbuggyMatches.push( "!=", pseudos );
    });
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

  /* Contains
  ---------------------------------------------------------------------- */
  hasCompare = rnative.test( docElem.compareDocumentPosition );

  contains = hasCompare || rnative.test( docElem.contains ) ?
    function( a, b ) {
      var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
      return a === bup || !!( bup && bup.nodeType === 1 && (
        adown.contains ?
          adown.contains( bup ) :
          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
      ));
    } :
    function( a, b ) {
      if ( b ) {
        while ( (b = b.parentNode) ) {
          if ( b === a ) {
            return true;
          }
        }
      }
      return false;
    };

  /* Sorting
  ---------------------------------------------------------------------- */

  sortOrder = hasCompare ?
  function( a, b ) {

    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    if ( compare ) {
      return compare;
    }

    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
      a.compareDocumentPosition( b ) :

      1;

    if ( compare & 1 ||
      (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

      if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
        return -1;
      }
      if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
        return 1;
      }

      return sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;
    }

    return compare & 4 ? -1 : 1;
  } :
  function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var cur,
      i = 0,
      aup = a.parentNode,
      bup = b.parentNode,
      ap = [ a ],
      bp = [ b ];

    if ( !aup || !bup ) {
      return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;

    } else if ( aup === bup ) {
      return siblingCheck( a, b );
    }

    cur = a;
    while ( (cur = cur.parentNode) ) {
      ap.unshift( cur );
    }
    cur = b;
    while ( (cur = cur.parentNode) ) {
      bp.unshift( cur );
    }

    while ( ap[i] === bp[i] ) {
      i++;
    }

    return i ?
      siblingCheck( ap[i], bp[i] ) :

      ap[i] === preferredDoc ? -1 :
      bp[i] === preferredDoc ? 1 :
      0;
  };

  return doc;
};

Sizzle.matches = function( expr, elements ) {
  return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  expr = expr.replace( rattributeQuotes, "='$1']" );

  if ( support.matchesSelector && documentIsHTML &&
    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

    try {
      var ret = matches.call( elem, expr );

      if ( ret || support.disconnectedMatch ||
          elem.document && elem.document.nodeType !== 11 ) {
        return ret;
      }
    } catch(e) {}
  }

  return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
  if ( ( context.ownerDocument || context ) !== document ) {
    setDocument( context );
  }
  return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  var fn = Expr.attrHandle[ name.toLowerCase() ],
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
      fn( elem, name, !documentIsHTML ) :
      undefined;

  return val !== undefined ?
    val :
    support.attributes || !documentIsHTML ?
      elem.getAttribute( name ) :
      (val = elem.getAttributeNode(name)) && val.specified ?
        val.value :
        null;
};

Sizzle.error = function( msg ) {
  throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  hasDuplicate = !support.detectDuplicates;
  sortInput = !support.sortStable && results.slice( 0 );
  results.sort( sortOrder );

  if ( hasDuplicate ) {
    while ( (elem = results[i++]) ) {
      if ( elem === results[ i ] ) {
        j = duplicates.push( i );
      }
    }
    while ( j-- ) {
      results.splice( duplicates[ j ], 1 );
    }
  }

  sortInput = null;

  return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  if ( !nodeType ) {
    while ( (node = elem[i++]) ) {
      ret += getText( node );
    }
  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    if ( typeof elem.textContent === "string" ) {
      return elem.textContent;
    } else {
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        ret += getText( elem );
      }
    }
  } else if ( nodeType === 3 || nodeType === 4 ) {
    return elem.nodeValue;
  }

  return ret;
};

Expr = Sizzle.selectors = {

  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {},

  find: {},

  relative: {
    ">": { dir: "parentNode", first: true },
    " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true },
    "~": { dir: "previousSibling" }
  },

  preFilter: {
    "ATTR": function( match ) {
      match[1] = match[1].replace( runescape, funescape );

      match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

      if ( match[2] === "~=" ) {
        match[3] = " " + match[3] + " ";
      }

      return match.slice( 0, 4 );
    },

    "CHILD": function( match ) {
      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[1] = match[1].toLowerCase();

      if ( match[1].slice( 0, 3 ) === "nth" ) {
        if ( !match[3] ) {
          Sizzle.error( match[0] );
        }

        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

      } else if ( match[3] ) {
        Sizzle.error( match[0] );
      }

      return match;
    },

    "PSEUDO": function( match ) {
      var excess,
        unquoted = !match[5] && match[2];

      if ( matchExpr["CHILD"].test( match[0] ) ) {
        return null;
      }

      if ( match[3] && match[4] !== undefined ) {
        match[2] = match[4];

      } else if ( unquoted && rpseudo.test( unquoted ) &&
        (excess = tokenize( unquoted, true )) &&
        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

        match[0] = match[0].slice( 0, excess );
        match[2] = unquoted.slice( 0, excess );
      }

      return match.slice( 0, 3 );
    }
  },

  filter: {

    "TAG": function( nodeNameSelector ) {
      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
      return nodeNameSelector === "*" ?
        function() { return true; } :
        function( elem ) {
          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
    },

    "CLASS": function( className ) {
      var pattern = classCache[ className + " " ];

      return pattern ||
        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
        classCache( className, function( elem ) {
          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
        });
    },

    "ATTR": function( name, operator, check ) {
      return function( elem ) {
        var result = Sizzle.attr( elem, name );

        if ( result == null ) {
          return operator === "!=";
        }
        if ( !operator ) {
          return true;
        }

        result += "";

        return operator === "=" ? result === check :
          operator === "!=" ? result !== check :
          operator === "^=" ? check && result.indexOf( check ) === 0 :
          operator === "*=" ? check && result.indexOf( check ) > -1 :
          operator === "$=" ? check && result.slice( -check.length ) === check :
          operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
          false;
      };
    },

    "CHILD": function( type, what, argument, first, last ) {
      var simple = type.slice( 0, 3 ) !== "nth",
        forward = type.slice( -4 ) !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        function( elem ) {
          return !!elem.parentNode;
        } :

        function( elem, context, xml ) {
          var cache, outerCache, node, diff, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(),
            useCache = !xml && !ofType;

          if ( parent ) {

            if ( simple ) {
              while ( dir ) {
                node = elem;
                while ( (node = node[ dir ]) ) {
                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                    return false;
                  }
                }
                start = dir = type === "only" && !start && "nextSibling";
              }
              return true;
            }

            start = [ forward ? parent.firstChild : parent.lastChild ];

            if ( forward && useCache ) {
              outerCache = parent[ expando ] || (parent[ expando ] = {});
              cache = outerCache[ type ] || [];
              nodeIndex = cache[0] === dirruns && cache[1];
              diff = cache[0] === dirruns && cache[2];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( (node = ++nodeIndex && node && node[ dir ] ||

                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( node.nodeType === 1 && ++diff && node === elem ) {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
                }
              }

            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
              diff = cache[1];

            } else {
              while ( (node = ++nodeIndex && node && node[ dir ] ||
                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                  if ( useCache ) {
                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                  }

                  if ( node === elem ) {
                    break;
                  }
                }
              }
            }

            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 );
          }
        };
    },

    "PSEUDO": function( pseudo, argument ) {
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
          Sizzle.error( "unsupported pseudo: " + pseudo );

      if ( fn[ expando ] ) {
        return fn( argument );
      }

      if ( fn.length > 1 ) {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
          markFunction(function( seed, matches ) {
            var idx,
              matched = fn( seed, argument ),
              i = matched.length;
            while ( i-- ) {
              idx = indexOf.call( seed, matched[i] );
              seed[ idx ] = !( matches[ idx ] = matched[i] );
            }
          }) :
          function( elem ) {
            return fn( elem, 0, args );
          };
      }

      return fn;
    }
  },

  pseudos: {
    "not": markFunction(function( selector ) {
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrim, "$1" ) );

      return matcher[ expando ] ?
        markFunction(function( seed, matches, context, xml ) {
          var elem,
            unmatched = matcher( seed, null, xml, [] ),
            i = seed.length;

          while ( i-- ) {
            if ( (elem = unmatched[i]) ) {
              seed[i] = !(matches[i] = elem);
            }
          }
        }) :
        function( elem, context, xml ) {
          input[0] = elem;
          matcher( input, null, xml, results );
          return !results.pop();
        };
    }),

    "has": markFunction(function( selector ) {
      return function( elem ) {
        return Sizzle( selector, elem ).length > 0;
      };
    }),

    "contains": markFunction(function( text ) {
      return function( elem ) {
        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
      };
    }),

    "lang": markFunction( function( lang ) {
      if ( !ridentifier.test(lang || "") ) {
        Sizzle.error( "unsupported lang: " + lang );
      }
      lang = lang.replace( runescape, funescape ).toLowerCase();
      return function( elem ) {
        var elemLang;
        do {
          if ( (elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

            elemLang = elemLang.toLowerCase();
            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
          }
        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
        return false;
      };
    }),

    "target": function( elem ) {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ) === elem.id;
    },

    "root": function( elem ) {
      return elem === docElem;
    },

    "focus": function( elem ) {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    },

    "enabled": function( elem ) {
      return elem.disabled === false;
    },

    "disabled": function( elem ) {
      return elem.disabled === true;
    },

    "checked": function( elem ) {
      var nodeName = elem.nodeName.toLowerCase();
      return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
    },

    "selected": function( elem ) {
      if ( elem.parentNode ) {
        elem.parentNode.selectedIndex;
      }

      return elem.selected === true;
    },

    "empty": function( elem ) {
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        if ( elem.nodeType < 6 ) {
          return false;
        }
      }
      return true;
    },

    "parent": function( elem ) {
      return !Expr.pseudos["empty"]( elem );
    },

    "header": function( elem ) {
      return rheader.test( elem.nodeName );
    },

    "input": function( elem ) {
      return rinputs.test( elem.nodeName );
    },

    "button": function( elem ) {
      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === "button" || name === "button";
    },

    "text": function( elem ) {
      var attr;
      return elem.nodeName.toLowerCase() === "input" &&
        elem.type === "text" &&

        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
    },

    "first": createPositionalPseudo(function() {
      return [ 0 ];
    }),

    "last": createPositionalPseudo(function( matchIndexes, length ) {
      return [ length - 1 ];
    }),

    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
      return [ argument < 0 ? argument + length : argument ];
    }),

    "even": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 0;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "odd": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 1;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; --i >= 0; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    })
  }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
  Expr.pseudos[ i ] = createButtonPseudo( i );
}

function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ) {
    return parseOnly ? 0 : cached.slice( 0 );
  }

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ) {

    if ( !matched || (match = rcomma.exec( soFar )) ) {
      if ( match ) {
        soFar = soFar.slice( match[0].length ) || soFar;
      }
      groups.push( (tokens = []) );
    }

    matched = false;

    if ( (match = rcombinators.exec( soFar )) ) {
      matched = match.shift();
      tokens.push({
        value: matched,
        type: match[0].replace( rtrim, " " )
      });
      soFar = soFar.slice( matched.length );
    }

    for ( type in Expr.filter ) {
      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
        (match = preFilters[ type ]( match ))) ) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: type,
          matches: match
        });
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
      break;
    }
  }

  return parseOnly ?
    soFar.length :
    soFar ?
      Sizzle.error( selector ) :
      tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ) {
    selector += tokens[i].value;
  }
  return selector;
}

function addCombinator( matcher, combinator, base ) {
  var dir = combinator.dir,
    checkNonElements = base && dir === "parentNode",
    doneName = done++;

  return combinator.first ?
    function( elem, context, xml ) {
      while ( (elem = elem[ dir ]) ) {
        if ( elem.nodeType === 1 || checkNonElements ) {
          return matcher( elem, context, xml );
        }
      }
    } :

    function( elem, context, xml ) {
      var oldCache, outerCache,
        newCache = [ dirruns, doneName ];

      if ( xml ) {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            if ( matcher( elem, context, xml ) ) {
              return true;
            }
          }
        }
      } else {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            outerCache = elem[ expando ] || (elem[ expando ] = {});
            if ( (oldCache = outerCache[ dir ]) &&
              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

              return (newCache[ 2 ] = oldCache[ 2 ]);
            } else {
              outerCache[ dir ] = newCache;

              if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                return true;
              }
            }
          }
        }
      }
    };
}

function elementMatcher( matchers ) {
  return matchers.length > 1 ?
    function( elem, context, xml ) {
      var i = matchers.length;
      while ( i-- ) {
        if ( !matchers[i]( elem, context, xml ) ) {
          return false;
        }
      }
      return true;
    } :
    matchers[0];
}

function multipleContexts( selector, contexts, results ) {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ) {
    Sizzle( selector, contexts[i], results );
  }
  return results;
}

function condense( unmatched, map, filter, context, xml ) {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ) {
    if ( (elem = unmatched[i]) ) {
      if ( !filter || filter( elem, context, xml ) ) {
        newUnmatched.push( elem );
        if ( mapped ) {
          map.push( i );
        }
      }
    }
  }

  return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  if ( postFilter && !postFilter[ expando ] ) {
    postFilter = setMatcher( postFilter );
  }
  if ( postFinder && !postFinder[ expando ] ) {
    postFinder = setMatcher( postFinder, postSelector );
  }
  return markFunction(function( seed, results, context, xml ) {
    var temp, i, elem,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

      matcherIn = preFilter && ( seed || !selector ) ?
        condense( elems, preMap, preFilter, context, xml ) :
        elems,

      matcherOut = matcher ?
        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

          [] :

          results :
        matcherIn;

    if ( matcher ) {
      matcher( matcherIn, matcherOut, context, xml );
    }

    if ( postFilter ) {
      temp = condense( matcherOut, postMap );
      postFilter( temp, [], context, xml );

      i = temp.length;
      while ( i-- ) {
        if ( (elem = temp[i]) ) {
          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
        }
      }
    }

    if ( seed ) {
      if ( postFinder || preFilter ) {
        if ( postFinder ) {
          temp = [];
          i = matcherOut.length;
          while ( i-- ) {
            if ( (elem = matcherOut[i]) ) {
              temp.push( (matcherIn[i] = elem) );
            }
          }
          postFinder( null, (matcherOut = []), temp, xml );
        }

        i = matcherOut.length;
        while ( i-- ) {
          if ( (elem = matcherOut[i]) &&
            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

            seed[temp] = !(results[temp] = elem);
          }
        }
      }

    } else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ) :
          matcherOut
      );
      if ( postFinder ) {
        postFinder( null, results, matcherOut, xml );
      } else {
        push.apply( results, matcherOut );
      }
    }
  });
}

function matcherFromTokens( tokens ) {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[0].type ],
    implicitRelative = leadingRelative || Expr.relative[" "],
    i = leadingRelative ? 1 : 0,

    matchContext = addCombinator( function( elem ) {
      return elem === checkContext;
    }, implicitRelative, true ),
    matchAnyContext = addCombinator( function( elem ) {
      return indexOf.call( checkContext, elem ) > -1;
    }, implicitRelative, true ),
    matchers = [ function( elem, context, xml ) {
      return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
        (checkContext = context).nodeType ?
          matchContext( elem, context, xml ) :
          matchAnyContext( elem, context, xml ) );
    } ];

  for ( ; i < len; i++ ) {
    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
    } else {
      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

      if ( matcher[ expando ] ) {
        j = ++i;
        for ( ; j < len; j++ ) {
          if ( Expr.relative[ tokens[j].type ] ) {
            break;
          }
        }
        return setMatcher(
          i > 1 && elementMatcher( matchers ),
          i > 1 && toSelector(
            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
          ).replace( rtrim, "$1" ),
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ) ),
          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
          j < len && toSelector( tokens )
        );
      }
      matchers.push( matcher );
    }
  }

  return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  var bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, outermost ) {
      var elem, j, matcher,
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        setMatched = [],
        contextBackup = outermostContext,
        elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
        len = elems.length;

      if ( outermost ) {
        outermostContext = context !== document && context;
      }

      for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
        if ( byElement && elem ) {
          j = 0;
          while ( (matcher = elementMatchers[j++]) ) {
            if ( matcher( elem, context, xml ) ) {
              results.push( elem );
              break;
            }
          }
          if ( outermost ) {
            dirruns = dirrunsUnique;
          }
        }

        if ( bySet ) {
          if ( (elem = !matcher && elem) ) {
            matchedCount--;
          }

          if ( seed ) {
            unmatched.push( elem );
          }
        }
      }

      matchedCount += i;
      if ( bySet && i !== matchedCount ) {
        j = 0;
        while ( (matcher = setMatchers[j++]) ) {
          matcher( unmatched, setMatched, context, xml );
        }

        if ( seed ) {
          if ( matchedCount > 0 ) {
            while ( i-- ) {
              if ( !(unmatched[i] || setMatched[i]) ) {
                setMatched[i] = pop.call( results );
              }
            }
          }

          setMatched = condense( setMatched );
        }

        push.apply( results, setMatched );

        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ) > 1 ) {

          Sizzle.uniqueSort( results );
        }
      }

      if ( outermost ) {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      }

      return unmatched;
    };

  return bySet ?
    markFunction( superMatcher ) :
    superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ) {
    if ( !match ) {
      match = tokenize( selector );
    }
    i = match.length;
    while ( i-- ) {
      cached = matcherFromTokens( match[i] );
      if ( cached[ expando ] ) {
        setMatchers.push( cached );
      } else {
        elementMatchers.push( cached );
      }
    }

    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

    cached.selector = selector;
  }
  return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
  var i, tokens, token, type, find,
    compiled = typeof selector === "function" && selector,
    match = !seed && tokenize( (selector = compiled.selector || selector) );

  results = results || [];

  if ( match.length === 1 ) {

    tokens = match[0] = match[0].slice( 0 );
    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
        support.getById && context.nodeType === 9 && documentIsHTML &&
        Expr.relative[ tokens[1].type ] ) {

      context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
      if ( !context ) {
        return results;

      } else if ( compiled ) {
        context = context.parentNode;
      }

      selector = selector.slice( tokens.shift().value.length );
    }

    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
    while ( i-- ) {
      token = tokens[i];

      if ( Expr.relative[ (type = token.type) ] ) {
        break;
      }
      if ( (find = Expr.find[ type ]) ) {
        if ( (seed = find(
          token.matches[0].replace( runescape, funescape ),
          rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
        )) ) {

          tokens.splice( i, 1 );
          selector = seed.length && toSelector( tokens );
          if ( !selector ) {
            push.apply( results, seed );
            return results;
          }

          break;
        }
      }
    }
  }

  ( compiled || compile( selector, match ) )(
    seed,
    context,
    !documentIsHTML,
    results,
    rsibling.test( selector ) && testContext( context.parentNode ) || context
  );
  return results;
};


support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

support.detectDuplicates = !!hasDuplicate;

setDocument();

support.sortDetached = assert(function( div1 ) {
  return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

if ( !assert(function( div ) {
  div.innerHTML = "<a href='#'></a>";
  return div.firstChild.getAttribute("href") === "#" ;
}) ) {
  addHandle( "type|href|height|width", function( elem, name, isXML ) {
    if ( !isXML ) {
      return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
    }
  });
}

if ( !support.attributes || !assert(function( div ) {
  div.innerHTML = "<input/>";
  div.firstChild.setAttribute( "value", "" );
  return div.firstChild.getAttribute( "value" ) === "";
}) ) {
  addHandle( "value", function( elem, name, isXML ) {
    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
      return elem.defaultValue;
    }
  });
}

if ( !assert(function( div ) {
  return div.getAttribute("disabled") == null;
}) ) {
  addHandle( booleans, function( elem, name, isXML ) {
    var val;
    if ( !isXML ) {
      return elem[ name ] === true ? name.toLowerCase() :
          (val = elem.getAttributeNode( name )) && val.specified ?
          val.value :
        null;
    }
  });
}

if ( typeof define === "function" && define.amd ) {
  define(function() { return Sizzle; });
} else if ( typeof module !== "undefined" && module.exports ) {
  module.exports = Sizzle;
} else {
  window.Sizzle = Sizzle;
}

})( window );

;(function(engine) {
  var extendElements = Prototype.Selector.extendElements;

  function select(selector, scope) {
    return extendElements(engine(selector, scope || document));
  }

  function match(element, selector) {
    return engine.matches(selector, [element]).length == 1;
  }

  Prototype.Selector.engine = engine;
  Prototype.Selector.select = select;
  Prototype.Selector.match = match;
})(Sizzle);

window.Sizzle = Prototype._original_property;
delete Prototype._original_property;

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit, accumulator, initial;

    if (options.hash) {
      initial = {};
      accumulator = function(result, key, value) {
        if (key in result) {
          if (!Object.isArray(result[key])) result[key] = [result[key]];
          result[key] = result[key].concat(value);
        } else result[key] = value;
        return result;
      };
    } else {
      initial = '';
      accumulator = function(result, key, values) {
        if (!Object.isArray(values)) {values = [values];}
        if (!values.length) {return result;}
        var encodedKey = encodeURIComponent(key).gsub(/%20/, '+');
        return result + (result ? "&" : "") + values.map(function (value) {
          value = value.gsub(/(\r)?\n/, '\r\n');
          value = encodeURIComponent(value);
          value = value.gsub(/%20/, '+');
          return encodedKey + "=" + value;
        }).join("&");
      };
    }

    return elements.inject(initial, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          result = accumulator(result, key, value);
        }
      }
      return result;
    });
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },


  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*');
    var element, results = [], serializers = Form.Element.Serializers;

    for (var i = 0; element = elements[i]; i++) {
      if (serializers[element.tagName.toLowerCase()])
        results.push(Element.extend(element));
    }
    return results;
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    var element = form.findFirstElement();
    if (element) element.activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = (function() {
  function input(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return inputSelector(element, value);
      default:
        return valueSelector(element, value);
    }
  }

  function inputSelector(element, value) {
    if (Object.isUndefined(value))
      return element.checked ? element.value : null;
    else element.checked = !!value;
  }

  function valueSelector(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  }

  function select(element, value) {
    if (Object.isUndefined(value))
      return (element.type === 'select-one' ? selectOne : selectMany)(element);

    var opt, currentValue, single = !Object.isArray(value);
    for (var i = 0, length = element.length; i < length; i++) {
      opt = element.options[i];
      currentValue = this.optionValue(opt);
      if (single) {
        if (currentValue == value) {
          opt.selected = true;
          return;
        }
      }
      else opt.selected = value.include(currentValue);
    }
  }

  function selectOne(element) {
    var index = element.selectedIndex;
    return index >= 0 ? optionValue(element.options[index]) : null;
  }

  function selectMany(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(optionValue(opt));
    }
    return values;
  }

  function optionValue(opt) {
    return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
  }

  return {
    input:         input,
    inputSelector: inputSelector,
    textarea:      valueSelector,
    select:        select,
    selectOne:     selectOne,
    selectMany:    selectMany,
    optionValue:   optionValue,
    button:        valueSelector
  };
})();

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function(GLOBAL) {
  var DIV = document.createElement('div');
  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
   && 'onmouseleave' in docEl;

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45
  };


  var isIELegacyEvent = function(event) { return false; };

  if (window.attachEvent) {
    if (window.addEventListener) {
      isIELegacyEvent = function(event) {
        return !(event instanceof window.Event);
      };
    } else {
      isIELegacyEvent = function(event) { return true; };
    }
  }

  var _isButton;

  function _isButtonForDOMEvents(event, code) {
    return event.which ? (event.which === code + 1) : (event.button === code);
  }

  var legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
  function _isButtonForLegacyEvents(event, code) {
    return event.button === legacyButtonMap[code];
  }

  function _isButtonForWebKit(event, code) {
    switch (code) {
      case 0: return event.which == 1 && !event.metaKey;
      case 1: return event.which == 2 || (event.which == 1 && event.metaKey);
      case 2: return event.which == 3;
      default: return false;
    }
  }

  if (window.attachEvent) {
    if (!window.addEventListener) {
      _isButton = _isButtonForLegacyEvents;
    } else {
      _isButton = function(event, code) {
        return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) :
         _isButtonForDOMEvents(event, code);
      }
    }
  } else if (Prototype.Browser.WebKit) {
    _isButton = _isButtonForWebKit;
  } else {
    _isButton = _isButtonForDOMEvents;
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    return Element.extend(_element(event));
  }

  function _element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    return node.nodeType == Node.TEXT_NODE ? node.parentNode : node;
  }

  function findElement(event, expression) {
    var element = _element(event), selector = Prototype.Selector;
    if (!expression) return Element.extend(element);
    while (element) {
      if (Object.isElement(element) && selector.match(element, expression))
        return Element.extend(element);
      element = element.parentNode;
    }
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }


  Event.Methods = {
    isLeftClick:   isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick:  isRightClick,

    element:     element,
    findElement: findElement,

    pointer:  pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };

  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (window.attachEvent) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover':
        case 'mouseenter':
          element = event.fromElement;
          break;
        case 'mouseout':
        case 'mouseleave':
          element = event.toElement;
          break;
        default:
          return null;
      }
      return Element.extend(element);
    }

    var additionalMethods = {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    };

    Event.extend = function(event, element) {
      if (!event) return false;

      if (!isIELegacyEvent(event)) return event;

      if (event._extendedByPrototype) return event;
      event._extendedByPrototype = Prototype.emptyFunction;

      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      Object.extend(event, methods);
      Object.extend(event, additionalMethods);

      return event;
    };
  } else {
    Event.extend = Prototype.K;
  }

  if (window.addEventListener) {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
  }

  var EVENT_TRANSLATIONS = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };

  function getDOMEventName(eventName) {
    return EVENT_TRANSLATIONS[eventName] || eventName;
  }

  if (MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED)
    getDOMEventName = Prototype.K;

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  if ('uniqueID' in DIV)
    getUniqueElementID = getUniqueElementID_IE;

  function isCustomEvent(eventName) {
    return eventName.include(':');
  }

  Event._isCustomEvent = isCustomEvent;

  function getRegistryForElement(element, uid) {
    var CACHE = GLOBAL.Event.cache;
    if (Object.isUndefined(uid))
      uid = getUniqueElementID(element);
    if (!CACHE[uid]) CACHE[uid] = { element: element };
    return CACHE[uid];
  }

  function destroyRegistryForElement(element, uid) {
    if (Object.isUndefined(uid))
      uid = getUniqueElementID(element);
    delete GLOBAL.Event.cache[uid];
  }


  function register(element, eventName, handler) {
    var registry = getRegistryForElement(element);
    if (!registry[eventName]) registry[eventName] = [];
    var entries = registry[eventName];

    var i = entries.length;
    while (i--)
      if (entries[i].handler === handler) return null;

    var uid = getUniqueElementID(element);
    var responder = GLOBAL.Event._createResponder(uid, eventName, handler);
    var entry = {
      responder: responder,
      handler:   handler
    };

    entries.push(entry);
    return entry;
  }

  function unregister(element, eventName, handler) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;

    var i = entries.length, entry;
    while (i--) {
      if (entries[i].handler === handler) {
        entry = entries[i];
        break;
      }
    }

    if (!entry) return;

    var index = entries.indexOf(entry);
    entries.splice(index, 1);

    return entry;
  }


  function observe(element, eventName, handler) {
    element = $(element);
    var entry = register(element, eventName, handler);

    if (entry === null) return element;

    var responder = entry.responder;
    if (isCustomEvent(eventName))
      observeCustomEvent(element, eventName, responder);
    else
      observeStandardEvent(element, eventName, responder);

    return element;
  }

  function observeStandardEvent(element, eventName, responder) {
    var actualEventName = getDOMEventName(eventName);
    if (element.addEventListener) {
      element.addEventListener(actualEventName, responder, false);
    } else {
      element.attachEvent('on' + actualEventName, responder);
    }
  }

  function observeCustomEvent(element, eventName, responder) {
    if (element.addEventListener) {
      element.addEventListener('dataavailable', responder, false);
    } else {
      element.attachEvent('ondataavailable', responder);
      element.attachEvent('onlosecapture',   responder);
    }
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);
    var handlerGiven = !Object.isUndefined(handler),
     eventNameGiven = !Object.isUndefined(eventName);

    if (!eventNameGiven && !handlerGiven) {
      stopObservingElement(element);
      return element;
    }

    if (!handlerGiven) {
      stopObservingEventName(element, eventName);
      return element;
    }

    var entry = unregister(element, eventName, handler);

    if (!entry) return element;
    removeEvent(element, eventName, entry.responder);
    return element;
  }

  function stopObservingStandardEvent(element, eventName, responder) {
    var actualEventName = getDOMEventName(eventName);
    if (element.removeEventListener) {
      element.removeEventListener(actualEventName, responder, false);
    } else {
      element.detachEvent('on' + actualEventName, responder);
    }
  }

  function stopObservingCustomEvent(element, eventName, responder) {
    if (element.removeEventListener) {
      element.removeEventListener('dataavailable', responder, false);
    } else {
      element.detachEvent('ondataavailable', responder);
      element.detachEvent('onlosecapture',   responder);
    }
  }



  function stopObservingElement(element) {
    var uid = getUniqueElementID(element), registry = GLOBAL.Event.cache[uid];
    if (!registry) return;

    destroyRegistryForElement(element, uid);

    var entries, i;
    for (var eventName in registry) {
      if (eventName === 'element') continue;

      entries = registry[eventName];
      i = entries.length;
      while (i--)
        removeEvent(element, eventName, entries[i].responder);
    }
  }

  function stopObservingEventName(element, eventName) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;
    delete registry[eventName];

    var i = entries.length;
    while (i--)
      removeEvent(element, eventName, entries[i].responder);
  }


  function removeEvent(element, eventName, handler) {
    if (isCustomEvent(eventName))
      stopObservingCustomEvent(element, eventName, handler);
    else
      stopObservingStandardEvent(element, eventName, handler);
  }



  function getFireTarget(element) {
    if (element !== document) return element;
    if (document.createEvent && !element.dispatchEvent)
      return document.documentElement;
    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = getFireTarget($(element));
    if (Object.isUndefined(bubble)) bubble = true;
    memo = memo || {};

    var event = fireEvent(element, eventName, memo, bubble);
    return Event.extend(event);
  }

  function fireEvent_DOM(element, eventName, memo, bubble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('dataavailable', bubble, true);

    event.eventName = eventName;
    event.memo = memo;

    element.dispatchEvent(event);
    return event;
  }

  function fireEvent_IE(element, eventName, memo, bubble) {
    var event = document.createEventObject();
    event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';

    event.eventName = eventName;
    event.memo = memo;

    element.fireEvent(event.eventType, event);
    return event;
  }

  var fireEvent = document.createEvent ? fireEvent_DOM : fireEvent_IE;



  Event.Handler = Class.create({
    initialize: function(element, eventName, selector, callback) {
      this.element   = $(element);
      this.eventName = eventName;
      this.selector  = selector;
      this.callback  = callback;
      this.handler   = this.handleEvent.bind(this);
    },


    start: function() {
      Event.observe(this.element, this.eventName, this.handler);
      return this;
    },

    stop: function() {
      Event.stopObserving(this.element, this.eventName, this.handler);
      return this;
    },

    handleEvent: function(event) {
      var element = Event.findElement(event, this.selector);
      if (element) this.callback.call(this.element, event, element);
    }
  });

  function on(element, eventName, selector, callback) {
    element = $(element);
    if (Object.isFunction(selector) && Object.isUndefined(callback)) {
      callback = selector, selector = null;
    }

    return new Event.Handler(element, eventName, selector, callback).start();
  }

  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving,
    on:            on
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving,

    on:            on
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    on:            on.methodize(),

    loaded:        false
  });

  if (GLOBAL.Event) Object.extend(window.Event, Event);
  else GLOBAL.Event = Event;

  GLOBAL.Event.cache = {};

  function destroyCache_IE() {
    GLOBAL.Event.cache = null;
  }

  if (window.attachEvent)
    window.attachEvent('onunload', destroyCache_IE);

  DIV = null;
  docEl = null;
})(this);

(function(GLOBAL) {
  /* Code for creating leak-free event responders is based on work by
   John-David Dalton. */

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;

  function isSimulatedMouseEnterLeaveEvent(eventName) {
    return !MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
     (eventName === 'mouseenter' || eventName === 'mouseleave');
  }

  function createResponder(uid, eventName, handler) {
    if (Event._isCustomEvent(eventName))
      return createResponderForCustomEvent(uid, eventName, handler);
    if (isSimulatedMouseEnterLeaveEvent(eventName))
      return createMouseEnterLeaveResponder(uid, eventName, handler);

    return function(event) {
      if (!Event.cache) return;

      var element = Event.cache[uid].element;
      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createResponderForCustomEvent(uid, eventName, handler) {
    return function(event) {
      var element = Event.cache[uid].element;

      if (Object.isUndefined(event.eventName))
        return false;

      if (event.eventName !== eventName)
        return false;

      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createMouseEnterLeaveResponder(uid, eventName, handler) {
    return function(event) {
      var element = Event.cache[uid].element;

      Event.extend(event, element);
      var parent = event.relatedTarget;

      while (parent && parent !== element) {
        try { parent = parent.parentNode; }
        catch(e) { parent = element; }
      }

      if (parent === element) return;
      handler.call(element, event);
    }
  }

  GLOBAL.Event._createResponder = createResponder;
  docEl = null;
})(this);

(function(GLOBAL) {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var TIMER;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (TIMER) window.clearTimeout(TIMER);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.detachEvent('onreadystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try {
      document.documentElement.doScroll('left');
    } catch (e) {
      TIMER = pollDoScroll.defer();
      return;
    }

    fireContentLoadedEvent();
  }


  if (document.readyState === 'complete') {
    fireContentLoadedEvent();
    return;
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.attachEvent('onreadystatechange', checkReadyState);
    if (window == top) TIMER = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})(this);


Element.addMethods();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator, context) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator, context);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

(function() {
  window.Selector = Class.create({
    initialize: function(expression) {
      this.expression = expression.strip();
    },

    findElements: function(rootElement) {
      return Prototype.Selector.select(this.expression, rootElement);
    },

    match: function(element) {
      return Prototype.Selector.match(element, this.expression);
    },

    toString: function() {
      return this.expression;
    },

    inspect: function() {
      return "#<Selector: " + this.expression + ">";
    }
  });

  Object.extend(Selector, {
    matchElements: function(elements, expression) {
      var match = Prototype.Selector.match,
          results = [];

      for (var i = 0, length = elements.length; i < length; i++) {
        var element = elements[i];
        if (match(element, expression)) {
          results.push(Element.extend(element));
        }
      }
      return results;
    },

    findElement: function(elements, expression, index) {
      index = index || 0;
      var matchIndex = 0, element;
      for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        if (Prototype.Selector.match(element, expression) && index === matchIndex++) {
          return Element.extend(element);
        }
      }
    },

    findChildElements: function(element, expressions) {
      var selector = expressions.toArray().join(', ');
      return Prototype.Selector.select(selector, element || document);
    }
  });
})();

/**
 * Event.simulate(@element, eventName[, options]) -> Element
 * 
 * - @element: element to fire event on
 * - eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
 * - options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.
 *
 *    $('foo').simulate('click'); // => fires "click" event on an element with id=foo
 *
 **/
(function(){
  
  var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll|input)$/,
    'MouseEvents': /^(?:click|mouse(?:down|up|over|move|out))$/
  }
  var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
  }
  
  Event.simulate = function(element, eventName) {
    var options = Object.extend(defaultOptions, arguments[2] || { });
    var oEvent, eventType = null;
    
    element = $(element);
    
    for (var name in eventMatchers) {
      if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
      throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
      oEvent = document.createEvent(eventType);
      if (eventType == 'HTMLEvents') {
        oEvent.initEvent(eventName, options.bubbles, options.cancelable);
      }
      else {
        oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, 
          options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
          options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
      }
      element.dispatchEvent(oEvent);
    }
    else {
      options.clientX = options.pointerX;
      options.clientY = options.pointerY;
      oEvent = Object.extend(document.createEventObject(), options);
      element.fireEvent('on' + eventName, oEvent);
    }
    return element;
  }
  
  Element.addMethods({ simulate: Event.simulate });
})()
function phi4z(t,i,s,e,o,n,a,r,h){var l,c,m,u,d,p,_,f,P,y;for(h=n,y=1;15>=y;y++)if(l=Math.sin(h),m=Math.tan(h),r=m*Math.sqrt(1-t*l*l),c=Math.sin(2*h),u=i*h-s*c+e*Math.sin(4*h)-o*Math.sin(6*h),d=i-2*s*Math.cos(2*h)+4*e*Math.cos(4*h)-6*o*Math.cos(6*h),p=2*u+r*(u*u+a)-2*n*(r*u+1),_=t*c*(u*u+a-2*n*u)/(2*r),f=2*(n-u)*(r*d-2/c)-2*d,P=p/(_+f),h+=P,1e-10>=Math.abs(P))return h;return Proj4js.reportError("phi4z: No convergence"),null}function e4fn(t){var i,s;return i=1+t,s=1-t,Math.sqrt(Math.pow(i,i)*Math.pow(s,s))}var Proj4js={defaultDatum:"WGS84",transform:function(t,i,s){if(!t.readyToUse)return this.reportError("Proj4js initialization for:"+t.srsCode+" not yet complete"),s;if(!i.readyToUse)return this.reportError("Proj4js initialization for:"+i.srsCode+" not yet complete"),s;if(t.datum&&i.datum&&((t.datum.datum_type==Proj4js.common.PJD_3PARAM||t.datum.datum_type==Proj4js.common.PJD_7PARAM)&&"WGS84"!=i.datumCode||(i.datum.datum_type==Proj4js.common.PJD_3PARAM||i.datum.datum_type==Proj4js.common.PJD_7PARAM)&&"WGS84"!=t.datumCode)){var e=Proj4js.WGS84;this.transform(t,e,s),t=e}return"enu"!=t.axis&&this.adjust_axis(t,!1,s),"longlat"==t.projName?(s.x*=Proj4js.common.D2R,s.y*=Proj4js.common.D2R):(t.to_meter&&(s.x*=t.to_meter,s.y*=t.to_meter),t.inverse(s)),t.from_greenwich&&(s.x+=t.from_greenwich),s=this.datum_transform(t.datum,i.datum,s),i.from_greenwich&&(s.x-=i.from_greenwich),"longlat"==i.projName?(s.x*=Proj4js.common.R2D,s.y*=Proj4js.common.R2D):(i.forward(s),i.to_meter&&(s.x/=i.to_meter,s.y/=i.to_meter)),"enu"!=i.axis&&this.adjust_axis(i,!0,s),s},datum_transform:function(t,i,s){return t.compare_datums(i)?s:t.datum_type==Proj4js.common.PJD_NODATUM||i.datum_type==Proj4js.common.PJD_NODATUM?s:((t.es!=i.es||t.a!=i.a||t.datum_type==Proj4js.common.PJD_3PARAM||t.datum_type==Proj4js.common.PJD_7PARAM||i.datum_type==Proj4js.common.PJD_3PARAM||i.datum_type==Proj4js.common.PJD_7PARAM)&&(t.geodetic_to_geocentric(s),(t.datum_type==Proj4js.common.PJD_3PARAM||t.datum_type==Proj4js.common.PJD_7PARAM)&&t.geocentric_to_wgs84(s),(i.datum_type==Proj4js.common.PJD_3PARAM||i.datum_type==Proj4js.common.PJD_7PARAM)&&i.geocentric_from_wgs84(s),i.geocentric_to_geodetic(s)),s)},adjust_axis:function(t,i,s){for(var e,o,n=s.x,a=s.y,r=s.z||0,h=0;3>h;h++)if(!i||2!=h||void 0!==s.z)switch(0==h?(e=n,o="x"):1==h?(e=a,o="y"):(e=r,o="z"),t.axis[h]){case"e":s[o]=e;break;case"w":s[o]=-e;break;case"n":s[o]=e;break;case"s":s[o]=-e;break;case"u":void 0!==s[o]&&(s.z=e);break;case"d":void 0!==s[o]&&(s.z=-e);break;default:return alert("ERROR: unknow axis ("+t.axis[h]+") - check definition of "+t.projName),null}return s},reportError:function(){},extend:function(t,i){if(t=t||{},i)for(var s in i){var e=i[s];void 0!==e&&(t[s]=e)}return t},Class:function(){for(var t,i=function(){this.initialize.apply(this,arguments)},s={},e=0;arguments.length>e;++e)t="function"==typeof arguments[e]?arguments[e].prototype:arguments[e],Proj4js.extend(s,t);return i.prototype=s,i},bind:function(t,i){var s=Array.prototype.slice.apply(arguments,[2]);return function(){var e=s.concat(Array.prototype.slice.apply(arguments,[0]));return t.apply(i,e)}},scriptName:"proj4js-combined.js",defsLookupService:"http://spatialreference.org/ref",libPath:null,getScriptLocation:function(){if(this.libPath)return this.libPath;for(var t=this.scriptName,i=t.length,s=document.getElementsByTagName("script"),e=0;s.length>e;e++){var o=s[e].getAttribute("src");if(o){var n=o.lastIndexOf(t);if(n>-1&&n+i==o.length){this.libPath=o.slice(0,-i);break}}}return this.libPath||""},loadScript:function(t,i,s,e){var o=document.createElement("script");o.defer=!1,o.type="text/javascript",o.id=t,o.src=t,o.onload=i,o.onerror=s,o.loadCheck=e,/MSIE/.test(navigator.userAgent)&&(o.onreadystatechange=this.checkReadyState),document.getElementsByTagName("head")[0].appendChild(o)},checkReadyState:function(){"loaded"==this.readyState&&(this.loadCheck()?this.onload():this.onerror())}};Proj4js.Proj=Proj4js.Class({readyToUse:!1,title:null,projName:null,units:null,datum:null,x0:0,y0:0,localCS:!1,queue:null,initialize:function(t,i){if(this.srsCodeInput=t,this.queue=[],i&&this.queue.push(i),t.indexOf("GEOGCS")>=0||t.indexOf("GEOCCS")>=0||t.indexOf("PROJCS")>=0||t.indexOf("LOCAL_CS")>=0)return this.parseWKT(t),this.deriveConstants(),this.loadProjCode(this.projName),void 0;if(0==t.indexOf("urn:")){var s=t.split(":");"ogc"!=s[1]&&"x-ogc"!=s[1]||"def"!=s[2]||"crs"!=s[3]||(t=s[4]+":"+s[s.length-1])}else if(0==t.indexOf("http://")){var e=t.split("#");e[0].match(/epsg.org/)?t="EPSG:"+e[1]:e[0].match(/RIG.xml/)&&(t="IGNF:"+e[1])}this.srsCode=t.toUpperCase(),0==this.srsCode.indexOf("EPSG")?(this.srsCode=this.srsCode,this.srsAuth="epsg",this.srsProjNumber=this.srsCode.substring(5)):0==this.srsCode.indexOf("IGNF")?(this.srsCode=this.srsCode,this.srsAuth="IGNF",this.srsProjNumber=this.srsCode.substring(5)):0==this.srsCode.indexOf("CRS")?(this.srsCode=this.srsCode,this.srsAuth="CRS",this.srsProjNumber=this.srsCode.substring(4)):(this.srsAuth="",this.srsProjNumber=this.srsCode),this.loadProjDefinition()},loadProjDefinition:function(){if(Proj4js.defs[this.srsCode])return this.defsLoaded(),void 0;var t=Proj4js.getScriptLocation()+"defs/"+this.srsAuth.toUpperCase()+this.srsProjNumber+".js";Proj4js.loadScript(t,Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.loadFromService,this),Proj4js.bind(this.checkDefsLoaded,this))},loadFromService:function(){var t=Proj4js.defsLookupService+"/"+this.srsAuth+"/"+this.srsProjNumber+"/proj4js/";Proj4js.loadScript(t,Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.defsFailed,this),Proj4js.bind(this.checkDefsLoaded,this))},defsLoaded:function(){this.parseDefs(),this.loadProjCode(this.projName)},checkDefsLoaded:function(){return Proj4js.defs[this.srsCode]?!0:!1},defsFailed:function(){Proj4js.reportError("failed to load projection definition for: "+this.srsCode),Proj4js.defs[this.srsCode]=Proj4js.defs.WGS84,this.defsLoaded()},loadProjCode:function(t){if(Proj4js.Proj[t])return this.initTransforms(),void 0;var i=Proj4js.getScriptLocation()+"projCode/"+t+".js";Proj4js.loadScript(i,Proj4js.bind(this.loadProjCodeSuccess,this,t),Proj4js.bind(this.loadProjCodeFailure,this,t),Proj4js.bind(this.checkCodeLoaded,this,t))},loadProjCodeSuccess:function(t){Proj4js.Proj[t].dependsOn?this.loadProjCode(Proj4js.Proj[t].dependsOn):this.initTransforms()},loadProjCodeFailure:function(t){Proj4js.reportError("failed to find projection file for: "+t)},checkCodeLoaded:function(t){return Proj4js.Proj[t]?!0:!1},initTransforms:function(){if(Proj4js.extend(this,Proj4js.Proj[this.projName]),this.init(),this.readyToUse=!0,this.queue)for(var t;t=this.queue.shift();)t.call(this,this)},wktRE:/^(\w+)\[(.*)\]$/,parseWKT:function(t){var i=t.match(this.wktRE);if(i){var s,e=i[1],o=i[2],n=o.split(",");s="TOWGS84"==e.toUpperCase()?e:n.shift(),s=s.replace(/^\"/,""),s=s.replace(/\"$/,"");for(var a=[],r=0,h="",l=0;n.length>l;++l){for(var c=n[l],m=0;c.length>m;++m)"["==c.charAt(m)&&++r,"]"==c.charAt(m)&&--r;h+=c,0===r?(a.push(h),h=""):h+=","}switch(e){case"LOCAL_CS":this.projName="identity",this.localCS=!0,this.srsCode=s;break;case"GEOGCS":this.projName="longlat",this.geocsCode=s,this.srsCode||(this.srsCode=s);break;case"PROJCS":this.srsCode=s;break;case"GEOCCS":break;case"PROJECTION":this.projName=Proj4js.wktProjections[s];break;case"DATUM":this.datumName=s;break;case"LOCAL_DATUM":this.datumCode="none";break;case"SPHEROID":this.ellps=s,this.a=parseFloat(a.shift()),this.rf=parseFloat(a.shift());break;case"PRIMEM":this.from_greenwich=parseFloat(a.shift());break;case"UNIT":this.units=s,this.unitsPerMeter=parseFloat(a.shift());break;case"PARAMETER":var u=s.toLowerCase(),d=parseFloat(a.shift());switch(u){case"false_easting":this.x0=d;break;case"false_northing":this.y0=d;break;case"scale_factor":this.k0=d;break;case"central_meridian":this.long0=d*Proj4js.common.D2R;break;case"latitude_of_origin":this.lat0=d*Proj4js.common.D2R;break;case"more_here":break;default:}break;case"TOWGS84":this.datum_params=a;break;case"AXIS":var u=s.toLowerCase(),d=a.shift();switch(d){case"EAST":d="e";break;case"WEST":d="w";break;case"NORTH":d="n";break;case"SOUTH":d="s";break;case"UP":d="u";break;case"DOWN":d="d";break;case"OTHER":default:d=" "}switch(this.axis||(this.axis="enu"),u){case"x":this.axis=d+this.axis.substr(1,2);break;case"y":this.axis=this.axis.substr(0,1)+d+this.axis.substr(2,1);break;case"z":this.axis=this.axis.substr(0,2)+d;break;default:}case"MORE_HERE":break;default:}for(var l=0;a.length>l;++l)this.parseWKT(a[l])}},parseDefs:function(){this.defData=Proj4js.defs[this.srsCode];var t,i;if(this.defData){for(var s=this.defData.split("+"),e=0;s.length>e;e++){var o=s[e].split("=");switch(t=o[0].toLowerCase(),i=o[1],t.replace(/\s/gi,"")){case"":break;case"title":this.title=i;break;case"proj":this.projName=i.replace(/\s/gi,"");break;case"units":this.units=i.replace(/\s/gi,"");break;case"datum":this.datumCode=i.replace(/\s/gi,"");break;case"nadgrids":this.nagrids=i.replace(/\s/gi,"");break;case"ellps":this.ellps=i.replace(/\s/gi,"");break;case"a":this.a=parseFloat(i);break;case"b":this.b=parseFloat(i);break;case"rf":this.rf=parseFloat(i);break;case"lat_0":this.lat0=i*Proj4js.common.D2R;break;case"lat_1":this.lat1=i*Proj4js.common.D2R;break;case"lat_2":this.lat2=i*Proj4js.common.D2R;break;case"lat_ts":this.lat_ts=i*Proj4js.common.D2R;break;case"lon_0":this.long0=i*Proj4js.common.D2R;break;case"alpha":this.alpha=parseFloat(i)*Proj4js.common.D2R;break;case"lonc":this.longc=i*Proj4js.common.D2R;break;case"x_0":this.x0=parseFloat(i);break;case"y_0":this.y0=parseFloat(i);break;case"k_0":this.k0=parseFloat(i);break;case"k":this.k0=parseFloat(i);break;case"r_a":this.R_A=!0;break;case"zone":this.zone=parseInt(i,10);break;case"south":this.utmSouth=!0;break;case"towgs84":this.datum_params=i.split(",");break;case"to_meter":this.to_meter=parseFloat(i);break;case"from_greenwich":this.from_greenwich=i*Proj4js.common.D2R;break;case"pm":i=i.replace(/\s/gi,""),this.from_greenwich=Proj4js.PrimeMeridian[i]?Proj4js.PrimeMeridian[i]:parseFloat(i),this.from_greenwich*=Proj4js.common.D2R;break;case"axis":i=i.replace(/\s/gi,"");var n="ewnsud";3==i.length&&-1!=n.indexOf(i.substr(0,1))&&-1!=n.indexOf(i.substr(1,1))&&-1!=n.indexOf(i.substr(2,1))&&(this.axis=i);break;case"no_defs":break;default:}}this.deriveConstants()}},deriveConstants:function(){if("@null"==this.nagrids&&(this.datumCode="none"),this.datumCode&&"none"!=this.datumCode){var t=Proj4js.Datum[this.datumCode];t&&(this.datum_params=t.towgs84?t.towgs84.split(","):null,this.ellps=t.ellipse,this.datumName=t.datumName?t.datumName:this.datumCode)}if(!this.a){var i=Proj4js.Ellipsoid[this.ellps]?Proj4js.Ellipsoid[this.ellps]:Proj4js.Ellipsoid.WGS84;Proj4js.extend(this,i)}this.rf&&!this.b&&(this.b=(1-1/this.rf)*this.a),(0===this.rf||Math.abs(this.a-this.b)<Proj4js.common.EPSLN)&&(this.sphere=!0,this.b=this.a),this.a2=this.a*this.a,this.b2=this.b*this.b,this.es=(this.a2-this.b2)/this.a2,this.e=Math.sqrt(this.es),this.R_A&&(this.a*=1-this.es*(Proj4js.common.SIXTH+this.es*(Proj4js.common.RA4+this.es*Proj4js.common.RA6)),this.a2=this.a*this.a,this.b2=this.b*this.b,this.es=0),this.ep2=(this.a2-this.b2)/this.b2,this.k0||(this.k0=1),this.axis||(this.axis="enu"),this.datum=new Proj4js.datum(this)}}),Proj4js.Proj.longlat={init:function(){},forward:function(t){return t},inverse:function(t){return t}},Proj4js.Proj.identity=Proj4js.Proj.longlat,Proj4js.defs={WGS84:"+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4326":"+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4269":"+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees","EPSG:3875":"+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"},Proj4js.defs["EPSG:3785"]=Proj4js.defs["EPSG:3875"],Proj4js.defs.GOOGLE=Proj4js.defs["EPSG:3875"],Proj4js.defs["EPSG:900913"]=Proj4js.defs["EPSG:3875"],Proj4js.defs["EPSG:102113"]=Proj4js.defs["EPSG:3875"],Proj4js.common={PI:3.141592653589793,HALF_PI:1.5707963267948966,TWO_PI:6.283185307179586,FORTPI:.7853981633974483,R2D:57.29577951308232,D2R:.017453292519943295,SEC_TO_RAD:484813681109536e-20,EPSLN:1e-10,MAX_ITER:20,COS_67P5:.3826834323650898,AD_C:1.0026,PJD_UNKNOWN:0,PJD_3PARAM:1,PJD_7PARAM:2,PJD_GRIDSHIFT:3,PJD_WGS84:4,PJD_NODATUM:5,SRS_WGS84_SEMIMAJOR:6378137,SIXTH:.16666666666666666,RA4:.04722222222222222,RA6:.022156084656084655,RV4:.06944444444444445,RV6:.04243827160493827,msfnz:function(t,i,s){var e=t*i;return s/Math.sqrt(1-e*e)},tsfnz:function(t,i,s){var e=t*s,o=.5*t;return e=Math.pow((1-e)/(1+e),o),Math.tan(.5*(this.HALF_PI-i))/e},phi2z:function(t,i){for(var s,e,o=.5*t,n=this.HALF_PI-2*Math.atan(i),a=0;15>=a;a++)if(s=t*Math.sin(n),e=this.HALF_PI-2*Math.atan(i*Math.pow((1-s)/(1+s),o))-n,n+=e,1e-10>=Math.abs(e))return n;return alert("phi2z has NoConvergence"),-9999},qsfnz:function(t,i){var s;return t>1e-7?(s=t*i,(1-t*t)*(i/(1-s*s)-.5/t*Math.log((1-s)/(1+s)))):2*i},asinz:function(t){return Math.abs(t)>1&&(t=t>1?1:-1),Math.asin(t)},e0fn:function(t){return 1-.25*t*(1+t/16*(3+1.25*t))},e1fn:function(t){return.375*t*(1+.25*t*(1+.46875*t))},e2fn:function(t){return.05859375*t*t*(1+.75*t)},e3fn:function(t){return t*t*t*(35/3072)},mlfn:function(t,i,s,e,o){return t*o-i*Math.sin(2*o)+s*Math.sin(4*o)-e*Math.sin(6*o)},srat:function(t,i){return Math.pow((1-t)/(1+t),i)},sign:function(t){return 0>t?-1:1},adjust_lon:function(t){return t=Math.abs(t)<this.PI?t:t-this.sign(t)*this.TWO_PI},adjust_lat:function(t){return t=Math.abs(t)<this.HALF_PI?t:t-this.sign(t)*this.PI},latiso:function(t,i,s){if(Math.abs(i)>this.HALF_PI)return+Number.NaN;if(i==this.HALF_PI)return Number.POSITIVE_INFINITY;if(i==-1*this.HALF_PI)return-1*Number.POSITIVE_INFINITY;var e=t*s;return Math.log(Math.tan((this.HALF_PI+i)/2))+t*Math.log((1-e)/(1+e))/2},fL:function(t,i){return 2*Math.atan(t*Math.exp(i))-this.HALF_PI},invlatiso:function(t,i){var s=this.fL(1,i),e=0,o=0;do e=s,o=t*Math.sin(e),s=this.fL(Math.exp(t*Math.log((1+o)/(1-o))/2),i);while(Math.abs(s-e)>1e-12);return s},sinh:function(t){var i=Math.exp(t);return i=(i-1/i)/2},cosh:function(t){var i=Math.exp(t);return i=(i+1/i)/2},tanh:function(t){var i=Math.exp(t);return i=(i-1/i)/(i+1/i)},asinh:function(t){var i=t>=0?1:-1;return i*Math.log(Math.abs(t)+Math.sqrt(t*t+1))},acosh:function(t){return 2*Math.log(Math.sqrt((t+1)/2)+Math.sqrt((t-1)/2))},atanh:function(t){return Math.log((t-1)/(t+1))/2},gN:function(t,i,s){var e=i*s;return t/Math.sqrt(1-e*e)},pj_enfn:function(t){var i=[];i[0]=this.C00-t*(this.C02+t*(this.C04+t*(this.C06+t*this.C08))),i[1]=t*(this.C22-t*(this.C04+t*(this.C06+t*this.C08)));var s=t*t;return i[2]=s*(this.C44-t*(this.C46+t*this.C48)),s*=t,i[3]=s*(this.C66-t*this.C68),i[4]=s*t*this.C88,i},pj_mlfn:function(t,i,s,e){return s*=i,i*=i,e[0]*t-s*(e[1]+i*(e[2]+i*(e[3]+i*e[4])))},pj_inv_mlfn:function(t,i,s){for(var e=1/(1-i),o=t,n=Proj4js.common.MAX_ITER;n;--n){var a=Math.sin(o),r=1-i*a*a;if(r=(this.pj_mlfn(o,a,Math.cos(o),s)-t)*r*Math.sqrt(r)*e,o-=r,Math.abs(r)<Proj4js.common.EPSLN)return o}return Proj4js.reportError("cass:pj_inv_mlfn: Convergence error"),o},C00:1,C02:.25,C04:.046875,C06:.01953125,C08:.01068115234375,C22:.75,C44:.46875,C46:.013020833333333334,C48:.007120768229166667,C66:.3645833333333333,C68:.005696614583333333,C88:.3076171875},Proj4js.datum=Proj4js.Class({initialize:function(t){if(this.datum_type=Proj4js.common.PJD_WGS84,t.datumCode&&"none"==t.datumCode&&(this.datum_type=Proj4js.common.PJD_NODATUM),t&&t.datum_params){for(var i=0;t.datum_params.length>i;i++)t.datum_params[i]=parseFloat(t.datum_params[i]);(0!=t.datum_params[0]||0!=t.datum_params[1]||0!=t.datum_params[2])&&(this.datum_type=Proj4js.common.PJD_3PARAM),t.datum_params.length>3&&(0!=t.datum_params[3]||0!=t.datum_params[4]||0!=t.datum_params[5]||0!=t.datum_params[6])&&(this.datum_type=Proj4js.common.PJD_7PARAM,t.datum_params[3]*=Proj4js.common.SEC_TO_RAD,t.datum_params[4]*=Proj4js.common.SEC_TO_RAD,t.datum_params[5]*=Proj4js.common.SEC_TO_RAD,t.datum_params[6]=t.datum_params[6]/1e6+1)}t&&(this.a=t.a,this.b=t.b,this.es=t.es,this.ep2=t.ep2,this.datum_params=t.datum_params)},compare_datums:function(t){return this.datum_type!=t.datum_type?!1:this.a!=t.a||Math.abs(this.es-t.es)>5e-11?!1:this.datum_type==Proj4js.common.PJD_3PARAM?this.datum_params[0]==t.datum_params[0]&&this.datum_params[1]==t.datum_params[1]&&this.datum_params[2]==t.datum_params[2]:this.datum_type==Proj4js.common.PJD_7PARAM?this.datum_params[0]==t.datum_params[0]&&this.datum_params[1]==t.datum_params[1]&&this.datum_params[2]==t.datum_params[2]&&this.datum_params[3]==t.datum_params[3]&&this.datum_params[4]==t.datum_params[4]&&this.datum_params[5]==t.datum_params[5]&&this.datum_params[6]==t.datum_params[6]:this.datum_type==Proj4js.common.PJD_GRIDSHIFT||t.datum_type==Proj4js.common.PJD_GRIDSHIFT?(alert("ERROR: Grid shift transformations are not implemented."),!1):!0},geodetic_to_geocentric:function(t){var i,s,e,o,n,a,r,h=t.x,l=t.y,c=t.z?t.z:0,m=0;if(-Proj4js.common.HALF_PI>l&&l>-1.001*Proj4js.common.HALF_PI)l=-Proj4js.common.HALF_PI;else if(l>Proj4js.common.HALF_PI&&1.001*Proj4js.common.HALF_PI>l)l=Proj4js.common.HALF_PI;else if(-Proj4js.common.HALF_PI>l||l>Proj4js.common.HALF_PI)return Proj4js.reportError("geocent:lat out of range:"+l),null;return h>Proj4js.common.PI&&(h-=2*Proj4js.common.PI),n=Math.sin(l),r=Math.cos(l),a=n*n,o=this.a/Math.sqrt(1-this.es*a),i=(o+c)*r*Math.cos(h),s=(o+c)*r*Math.sin(h),e=(o*(1-this.es)+c)*n,t.x=i,t.y=s,t.z=e,m},geocentric_to_geodetic:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d,p,_,f,P,y=1e-12,g=y*y,L=30,v=t.x,j=t.y,M=t.z?t.z:0;if(d=!1,i=Math.sqrt(v*v+j*j),s=Math.sqrt(v*v+j*j+M*M),y>i/this.a){if(d=!0,_=0,y>s/this.a)return f=Proj4js.common.HALF_PI,P=-this.b,void 0}else _=Math.atan2(j,v);e=M/s,o=i/s,n=1/Math.sqrt(1-this.es*(2-this.es)*o*o),h=o*(1-this.es)*n,l=e*n,p=0;do p++,r=this.a/Math.sqrt(1-this.es*l*l),P=i*h+M*l-r*(1-this.es*l*l),a=this.es*r/(r+P),n=1/Math.sqrt(1-a*(2-a)*o*o),c=o*(1-a)*n,m=e*n,u=m*h-c*l,h=c,l=m;while(u*u>g&&L>p);return f=Math.atan(m/Math.abs(c)),t.x=_,t.y=f,t.z=P,t},geocentric_to_geodetic_noniter:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d,p,_,f,P,y=t.x,g=t.y,L=t.z?t.z:0;if(y=parseFloat(y),g=parseFloat(g),L=parseFloat(L),P=!1,0!=y)i=Math.atan2(g,y);else if(g>0)i=Proj4js.common.HALF_PI;else if(0>g)i=-Proj4js.common.HALF_PI;else if(P=!0,i=0,L>0)s=Proj4js.common.HALF_PI;else{if(!(0>L))return s=Proj4js.common.HALF_PI,e=-this.b,void 0;s=-Proj4js.common.HALF_PI}return n=y*y+g*g,o=Math.sqrt(n),a=L*Proj4js.common.AD_C,h=Math.sqrt(a*a+n),c=a/h,u=o/h,m=c*c*c,r=L+this.b*this.ep2*m,f=o-this.a*this.es*u*u*u,l=Math.sqrt(r*r+f*f),d=r/l,p=f/l,_=this.a/Math.sqrt(1-this.es*d*d),e=p>=Proj4js.common.COS_67P5?o/p-_:-Proj4js.common.COS_67P5>=p?o/-p-_:L/d+_*(this.es-1),0==P&&(s=Math.atan(d/p)),t.x=i,t.y=s,t.z=e,t},geocentric_to_wgs84:function(t){if(this.datum_type==Proj4js.common.PJD_3PARAM)t.x+=this.datum_params[0],t.y+=this.datum_params[1],t.z+=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var i=this.datum_params[0],s=this.datum_params[1],e=this.datum_params[2],o=this.datum_params[3],n=this.datum_params[4],a=this.datum_params[5],r=this.datum_params[6],h=r*(t.x-a*t.y+n*t.z)+i,l=r*(a*t.x+t.y-o*t.z)+s,c=r*(-n*t.x+o*t.y+t.z)+e;t.x=h,t.y=l,t.z=c}},geocentric_from_wgs84:function(t){if(this.datum_type==Proj4js.common.PJD_3PARAM)t.x-=this.datum_params[0],t.y-=this.datum_params[1],t.z-=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var i=this.datum_params[0],s=this.datum_params[1],e=this.datum_params[2],o=this.datum_params[3],n=this.datum_params[4],a=this.datum_params[5],r=this.datum_params[6],h=(t.x-i)/r,l=(t.y-s)/r,c=(t.z-e)/r;t.x=h+a*l-n*c,t.y=-a*h+l+o*c,t.z=n*h-o*l+c}}}),Proj4js.Point=Proj4js.Class({initialize:function(t,i,s){if("object"==typeof t)this.x=t[0],this.y=t[1],this.z=t[2]||0;else if("string"==typeof t&&i===void 0){var e=t.split(",");this.x=parseFloat(e[0]),this.y=parseFloat(e[1]),this.z=parseFloat(e[2])||0}else this.x=t,this.y=i,this.z=s||0},clone:function(){return new Proj4js.Point(this.x,this.y,this.z)},toString:function(){return"x="+this.x+",y="+this.y},toShortString:function(){return this.x+", "+this.y}}),Proj4js.PrimeMeridian={greenwich:0,lisbon:-9.131906111111,paris:2.337229166667,bogota:-74.080916666667,madrid:-3.687938888889,rome:12.452333333333,bern:7.439583333333,jakarta:106.807719444444,ferro:-17.666666666667,brussels:4.367975,stockholm:18.058277777778,athens:23.7163375,oslo:10.722916666667},Proj4js.Ellipsoid={MERIT:{a:6378137,rf:298.257,ellipseName:"MERIT 1983"},SGS85:{a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},GRS80:{a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},IAU76:{a:6378140,rf:298.257,ellipseName:"IAU 1976"},airy:{a:6377563.396,b:6356256.91,ellipseName:"Airy 1830"},"APL4.":{a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},NWL9D:{a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},mod_airy:{a:6377340.189,b:6356034.446,ellipseName:"Modified Airy"},andrae:{a:6377104.43,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},aust_SA:{a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},GRS67:{a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},bessel:{a:6377397.155,rf:299.1528128,ellipseName:"Bessel 1841"},bess_nam:{a:6377483.865,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},clrk66:{a:6378206.4,b:6356583.8,ellipseName:"Clarke 1866"},clrk80:{a:6378249.145,rf:293.4663,ellipseName:"Clarke 1880 mod."},CPM:{a:6375738.7,rf:334.29,ellipseName:"Comm. des Poids et Mesures 1799"},delmbr:{a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},engelis:{a:6378136.05,rf:298.2566,ellipseName:"Engelis 1985"},evrst30:{a:6377276.345,rf:300.8017,ellipseName:"Everest 1830"},evrst48:{a:6377304.063,rf:300.8017,ellipseName:"Everest 1948"},evrst56:{a:6377301.243,rf:300.8017,ellipseName:"Everest 1956"},evrst69:{a:6377295.664,rf:300.8017,ellipseName:"Everest 1969"},evrstSS:{a:6377298.556,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},fschr60:{a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},fschr60m:{a:6378155,rf:298.3,ellipseName:"Fischer 1960"},fschr68:{a:6378150,rf:298.3,ellipseName:"Fischer 1968"},helmert:{a:6378200,rf:298.3,ellipseName:"Helmert 1906"},hough:{a:6378270,rf:297,ellipseName:"Hough"},intl:{a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},kaula:{a:6378163,rf:298.24,ellipseName:"Kaula 1961"},lerch:{a:6378139,rf:298.257,ellipseName:"Lerch 1979"},mprts:{a:6397300,rf:191,ellipseName:"Maupertius 1738"},new_intl:{a:6378157.5,b:6356772.2,ellipseName:"New International 1967"},plessis:{a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},krass:{a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},SEasia:{a:6378155,b:6356773.3205,ellipseName:"Southeast Asia"},walbeck:{a:6376896,b:6355834.8467,ellipseName:"Walbeck"},WGS60:{a:6378165,rf:298.3,ellipseName:"WGS 60"},WGS66:{a:6378145,rf:298.25,ellipseName:"WGS 66"},WGS72:{a:6378135,rf:298.26,ellipseName:"WGS 72"},WGS84:{a:6378137,rf:298.257223563,ellipseName:"WGS 84"},sphere:{a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}},Proj4js.Datum={WGS84:{towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},GGRS87:{towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},NAD83:{towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},NAD27:{nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},potsdam:{towgs84:"606.0,23.0,413.0",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},carthage:{towgs84:"-263.0,6.0,431.0",ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},hermannskogel:{towgs84:"653.0,-212.0,449.0",ellipse:"bessel",datumName:"Hermannskogel"},ire65:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},nzgd49:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},OSGB36:{towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Airy 1830"}},Proj4js.WGS84=new Proj4js.Proj("WGS84"),Proj4js.Datum.OSB36=Proj4js.Datum.OSGB36,Proj4js.wktProjections={"Lambert Tangential Conformal Conic Projection":"lcc",Mercator:"merc","Popular Visualisation Pseudo Mercator":"merc",Mercator_1SP:"merc",Transverse_Mercator:"tmerc","Transverse Mercator":"tmerc","Lambert Azimuthal Equal Area":"laea","Universal Transverse Mercator System":"utm"},Proj4js.Proj.aea={init:function(){return Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN?(Proj4js.reportError("aeaInitEqualLatitudes"),void 0):(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.t1=this.sin_po,this.con=this.sin_po,this.ms1=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po),this.qs1=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=this.sin_po,this.ms2=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po),this.qs2=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.ns0=Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN?(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0,void 0)},forward:function(t){var i=t.x,s=t.y;this.sin_phi=Math.sin(s),this.cos_phi=Math.cos(s);var e=Proj4js.common.qsfnz(this.e3,this.sin_phi,this.cos_phi),o=this.a*Math.sqrt(this.c-this.ns0*e)/this.ns0,n=this.ns0*Proj4js.common.adjust_lon(i-this.long0),a=o*Math.sin(n)+this.x0,r=this.rh-o*Math.cos(n)+this.y0;return t.x=a,t.y=r,t},inverse:function(t){var i,s,e,o,n,a;return t.x-=this.x0,t.y=this.rh-t.y+this.y0,this.ns0>=0?(i=Math.sqrt(t.x*t.x+t.y*t.y),e=1):(i=-Math.sqrt(t.x*t.x+t.y*t.y),e=-1),o=0,0!=i&&(o=Math.atan2(e*t.x,e*t.y)),e=i*this.ns0/this.a,s=(this.c-e*e)/this.ns0,this.e3>=1e-10?(e=1-.5*(1-this.es)*Math.log((1-this.e3)/(1+this.e3))/this.e3,a=Math.abs(Math.abs(e)-Math.abs(s))>1e-10?this.phi1z(this.e3,s):s>=0?.5*Proj4js.common.PI:-.5*Proj4js.common.PI):a=this.phi1z(this.e3,s),n=Proj4js.common.adjust_lon(o/this.ns0+this.long0),t.x=n,t.y=a,t},phi1z:function(t,i){var s,e,o,n,a,r=Proj4js.common.asinz(.5*i);if(Proj4js.common.EPSLN>t)return r;for(var h=t*t,l=1;25>=l;l++)if(s=Math.sin(r),e=Math.cos(r),o=t*s,n=1-o*o,a=.5*n*n/e*(i/(1-h)-s/n+.5/t*Math.log((1-o)/(1+o))),r+=a,1e-7>=Math.abs(a))return r;return Proj4js.reportError("aea:phi1z:Convergence error"),null}},Proj4js.Proj.sterea={dependsOn:"gauss",init:function(){return Proj4js.Proj.gauss.init.apply(this),this.rc?(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative"),void 0):(Proj4js.reportError("sterea:init:E_ERROR_0"),void 0)},forward:function(t){var i,s,e,o;return t.x=Proj4js.common.adjust_lon(t.x-this.long0),Proj4js.Proj.gauss.forward.apply(this,[t]),i=Math.sin(t.y),s=Math.cos(t.y),e=Math.cos(t.x),o=this.k0*this.R2/(1+this.sinc0*i+this.cosc0*s*e),t.x=o*s*Math.sin(t.x),t.y=o*(this.cosc0*i-this.sinc0*s*e),t.x=this.a*t.x+this.x0,t.y=this.a*t.y+this.y0,t},inverse:function(t){var i,s,e,o,n;if(t.x=(t.x-this.x0)/this.a,t.y=(t.y-this.y0)/this.a,t.x/=this.k0,t.y/=this.k0,n=Math.sqrt(t.x*t.x+t.y*t.y)){var a=2*Math.atan2(n,this.R2);i=Math.sin(a),s=Math.cos(a),o=Math.asin(s*this.sinc0+t.y*i*this.cosc0/n),e=Math.atan2(t.x*i,n*this.cosc0*s-t.y*this.sinc0*i)}else o=this.phic0,e=0;return t.x=e,t.y=o,Proj4js.Proj.gauss.inverse.apply(this,[t]),t.x=Proj4js.common.adjust_lon(t.x+this.long0),t}},Proj4js.Proj.poly={init:function(){0==this.lat0&&(this.lat0=90),this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Proj4js.common.e0fn(this.es),this.e1=Proj4js.common.e1fn(this.es),this.e2=Proj4js.common.e2fn(this.es),this.e3=Proj4js.common.e3fn(this.es),this.ml0=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(t){var i,s,e,o,n,a,r,h=t.x,l=t.y;return e=Proj4js.common.adjust_lon(h-this.long0),1e-7>=Math.abs(l)?(a=this.x0+this.a*e,r=this.y0-this.a*this.ml0):(i=Math.sin(l),s=Math.cos(l),o=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,l),n=Proj4js.common.msfnz(this.e,i,s),e=i,a=this.x0+this.a*n*Math.sin(e)/i,r=this.y0+this.a*(o-this.ml0+n*(1-Math.cos(e))/i)),t.x=a,t.y=r,t},inverse:function(t){var i,s,e,o,n,a;if(t.x-=this.x0,t.y-=this.y0,i=this.ml0+t.y/this.a,o=0,1e-7>=Math.abs(i))n=t.x/this.a+this.long0,a=0;else{if(s=i*i+t.x/this.a*(t.x/this.a),o=phi4z(this.es,this.e0,this.e1,this.e2,this.e3,this.al,s,e,a),1!=o)return o;n=Proj4js.common.adjust_lon(Proj4js.common.asinz(t.x*e/this.a)/Math.sin(a)+this.long0)}return t.x=n,t.y=a,t}},Proj4js.Proj.equi={init:function(){this.x0||(this.x0=0),this.y0||(this.y0=0),this.lat0||(this.lat0=0),this.long0||(this.long0=0)},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=this.x0+this.a*e*Math.cos(this.lat0),n=this.y0+this.a*s;return this.t1=o,this.t2=Math.cos(this.lat0),t.x=o,t.y=n,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=t.y/this.a;Math.abs(i)>Proj4js.common.HALF_PI&&Proj4js.reportError("equi:Inv:DataError");var s=Proj4js.common.adjust_lon(this.long0+t.x/(this.a*Math.cos(this.lat0)));t.x=s,t.y=i}},Proj4js.Proj.merc={init:function(){this.lat_ts&&(this.k0=this.sphere?Math.cos(this.lat_ts):Proj4js.common.msfnz(this.es,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))},forward:function(t){var i=t.x,s=t.y;if(s*Proj4js.common.R2D>90&&-90>s*Proj4js.common.R2D&&i*Proj4js.common.R2D>180&&-180>i*Proj4js.common.R2D)return Proj4js.reportError("merc:forward: llInputOutOfRange: "+i+" : "+s),null;var e,o;if(Math.abs(Math.abs(s)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)return Proj4js.reportError("merc:forward: ll2mAtPoles"),null;if(this.sphere)e=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(i-this.long0),o=this.y0+this.a*this.k0*Math.log(Math.tan(Proj4js.common.FORTPI+.5*s));else{var n=Math.sin(s),a=Proj4js.common.tsfnz(this.e,s,n);e=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(i-this.long0),o=this.y0-this.a*this.k0*Math.log(a)}return t.x=e,t.y=o,t},inverse:function(t){var i,s,e=t.x-this.x0,o=t.y-this.y0;if(this.sphere)s=Proj4js.common.HALF_PI-2*Math.atan(Math.exp(-o/this.a*this.k0));else{var n=Math.exp(-o/(this.a*this.k0));if(s=Proj4js.common.phi2z(this.e,n),-9999==s)return Proj4js.reportError("merc:inverse: lat = -9999"),null}return i=Proj4js.common.adjust_lon(this.long0+e/(this.a*this.k0)),t.x=i,t.y=s,t}},Proj4js.Proj.utm={dependsOn:"tmerc",init:function(){return this.zone?(this.lat0=0,this.long0=(6*Math.abs(this.zone)-183)*Proj4js.common.D2R,this.x0=5e5,this.y0=this.utmSouth?1e7:0,this.k0=.9996,Proj4js.Proj.tmerc.init.apply(this),this.forward=Proj4js.Proj.tmerc.forward,this.inverse=Proj4js.Proj.tmerc.inverse,void 0):(Proj4js.reportError("utm:init: zone must be specified for UTM"),void 0)}},Proj4js.Proj.eqdc={init:function(){this.mode||(this.mode=0),this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Proj4js.common.e0fn(this.es),this.e1=Proj4js.common.e1fn(this.es),this.e2=Proj4js.common.e2fn(this.es),this.e3=Proj4js.common.e3fn(this.es),this.sinphi=Math.sin(this.lat1),this.cosphi=Math.cos(this.lat1),this.ms1=Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi),this.ml1=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat1),0!=this.mode?(Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN&&Proj4js.reportError("eqdc:Init:EqualLatitudes"),this.sinphi=Math.sin(this.lat2),this.cosphi=Math.cos(this.lat2),this.ms2=Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi),this.ml2=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=Math.abs(this.lat1-this.lat2)>=Proj4js.common.EPSLN?(this.ms1-this.ms2)/(this.ml2-this.ml1):this.sinphi):this.ns=this.sinphi,this.g=this.ml1+this.ms1/this.ns,this.ml0=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0)
},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,s),o=this.a*(this.g-e),n=this.ns*Proj4js.common.adjust_lon(i-this.long0),a=this.x0+o*Math.sin(n),r=this.y0+this.rh-o*Math.cos(n);return t.x=a,t.y=r,t},inverse:function(t){t.x-=this.x0,t.y=this.rh-t.y+this.y0;var i,s;this.ns>=0?(s=Math.sqrt(t.x*t.x+t.y*t.y),i=1):(s=-Math.sqrt(t.x*t.x+t.y*t.y),i=-1);var e=0;0!=s&&(e=Math.atan2(i*t.x,i*t.y));var o=this.g-s/this.a,n=this.phi3z(o,this.e0,this.e1,this.e2,this.e3),a=Proj4js.common.adjust_lon(this.long0+e/this.ns);return t.x=a,t.y=n,t},phi3z:function(t,i,s,e,o){var n,a;n=t;for(var r=0;15>r;r++)if(a=(t+s*Math.sin(2*n)-e*Math.sin(4*n)+o*Math.sin(6*n))/i-n,n+=a,1e-10>=Math.abs(a))return n;return Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"),null}},Proj4js.Proj.tmerc={init:function(){this.e0=Proj4js.common.e0fn(this.es),this.e1=Proj4js.common.e1fn(this.es),this.e2=Proj4js.common.e2fn(this.es),this.e3=Proj4js.common.e3fn(this.es),this.ml0=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(t){var i,s,e,o=t.x,n=t.y,a=Proj4js.common.adjust_lon(o-this.long0),r=Math.sin(n),h=Math.cos(n);if(this.sphere){var l=h*Math.sin(a);if(1e-10>Math.abs(Math.abs(l)-1))return Proj4js.reportError("tmerc:forward: Point projects into infinity"),93;s=.5*this.a*this.k0*Math.log((1+l)/(1-l)),i=Math.acos(h*Math.cos(a)/Math.sqrt(1-l*l)),0>n&&(i=-i),e=this.a*this.k0*(i-this.lat0)}else{var c=h*a,m=Math.pow(c,2),u=this.ep2*Math.pow(h,2),d=Math.tan(n),p=Math.pow(d,2);i=1-this.es*Math.pow(r,2);var _=this.a/Math.sqrt(i),f=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,n);s=this.k0*_*c*(1+m/6*(1-p+u+m/20*(5-18*p+Math.pow(p,2)+72*u-58*this.ep2)))+this.x0,e=this.k0*(f-this.ml0+_*d*m*(.5+m/24*(5-p+9*u+4*Math.pow(u,2)+m/30*(61-58*p+Math.pow(p,2)+600*u-330*this.ep2))))+this.y0}return t.x=s,t.y=e,t},inverse:function(t){var i,s,e,o,n,a,r=6;if(this.sphere){var h=Math.exp(t.x/(this.a*this.k0)),l=.5*(h-1/h),c=this.lat0+t.y/(this.a*this.k0),m=Math.cos(c);i=Math.sqrt((1-m*m)/(1+l*l)),n=Proj4js.common.asinz(i),0>c&&(n=-n),a=0==l&&0==m?this.long0:Proj4js.common.adjust_lon(Math.atan2(l,m)+this.long0)}else{var u=t.x-this.x0,d=t.y-this.y0;for(i=(this.ml0+d/this.k0)/this.a,s=i,o=0;!0&&(e=(i+this.e1*Math.sin(2*s)-this.e2*Math.sin(4*s)+this.e3*Math.sin(6*s))/this.e0-s,s+=e,!(Math.abs(e)<=Proj4js.common.EPSLN));o++)if(o>=r)return Proj4js.reportError("tmerc:inverse: Latitude failed to converge"),95;if(Math.abs(s)<Proj4js.common.HALF_PI){var p=Math.sin(s),_=Math.cos(s),f=Math.tan(s),P=this.ep2*Math.pow(_,2),y=Math.pow(P,2),g=Math.pow(f,2),L=Math.pow(g,2);i=1-this.es*Math.pow(p,2);var v=this.a/Math.sqrt(i),j=v*(1-this.es)/i,M=u/(v*this.k0),S=Math.pow(M,2);n=s-v*f*S/j*(.5-S/24*(5+3*g+10*P-4*y-9*this.ep2-S/30*(61+90*g+298*P+45*L-252*this.ep2-3*y))),a=Proj4js.common.adjust_lon(this.long0+M*(1-S/6*(1+2*g+P-S/20*(5-2*P+28*g-3*y+8*this.ep2+24*L)))/_)}else n=Proj4js.common.HALF_PI*Proj4js.common.sign(d),a=this.long0}return t.x=a,t.y=n,t}},Proj4js.defs.GOOGLE="+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs",Proj4js.defs["EPSG:900913"]=Proj4js.defs.GOOGLE,Proj4js.Proj.gstmerc={init:function(){var t=this.b/this.a;this.e=Math.sqrt(1-t*t),this.lc=this.long0,this.rs=Math.sqrt(1+this.e*this.e*Math.pow(Math.cos(this.lat0),4)/(1-this.e*this.e));var i=Math.sin(this.lat0),s=Math.asin(i/this.rs),e=Math.sin(s);this.cp=Proj4js.common.latiso(0,s,e)-this.rs*Proj4js.common.latiso(this.e,this.lat0,i),this.n2=this.k0*this.a*Math.sqrt(1-this.e*this.e)/(1-this.e*this.e*i*i),this.xs=this.x0,this.ys=this.y0-this.n2*s,this.title||(this.title="Gauss Schreiber transverse mercator")},forward:function(t){var i=t.x,s=t.y,e=this.rs*(i-this.lc),o=this.cp+this.rs*Proj4js.common.latiso(this.e,s,Math.sin(s)),n=Math.asin(Math.sin(e)/Proj4js.common.cosh(o)),a=Proj4js.common.latiso(0,n,Math.sin(n));return t.x=this.xs+this.n2*a,t.y=this.ys+this.n2*Math.atan(Proj4js.common.sinh(o)/Math.cos(e)),t},inverse:function(t){var i=t.x,s=t.y,e=Math.atan(Proj4js.common.sinh((i-this.xs)/this.n2)/Math.cos((s-this.ys)/this.n2)),o=Math.asin(Math.sin((s-this.ys)/this.n2)/Proj4js.common.cosh((i-this.xs)/this.n2)),n=Proj4js.common.latiso(0,o,Math.sin(o));return t.x=this.lc+e/this.rs,t.y=Proj4js.common.invlatiso(this.e,(n-this.cp)/this.rs),t}},Proj4js.Proj.ortho={init:function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0)},forward:function(t){var i,s,e,o,n,a,r=t.x,h=t.y;if(e=Proj4js.common.adjust_lon(r-this.long0),i=Math.sin(h),s=Math.cos(h),o=Math.cos(e),a=this.sin_p14*i+this.cos_p14*s*o,n=1,a>0||Math.abs(a)<=Proj4js.common.EPSLN)var l=this.a*n*s*Math.sin(e),c=this.y0+this.a*n*(this.cos_p14*i-this.sin_p14*s*o);else Proj4js.reportError("orthoFwdPointError");return t.x=l,t.y=c,t},inverse:function(t){var i,s,e,o,n,a,r;return t.x-=this.x0,t.y-=this.y0,i=Math.sqrt(t.x*t.x+t.y*t.y),i>this.a+1e-7&&Proj4js.reportError("orthoInvDataError"),s=Proj4js.common.asinz(i/this.a),e=Math.sin(s),o=Math.cos(s),a=this.long0,Math.abs(i)<=Proj4js.common.EPSLN&&(r=this.lat0),r=Proj4js.common.asinz(o*this.sin_p14+t.y*e*this.cos_p14/i),n=Math.abs(this.lat0)-Proj4js.common.HALF_PI,Math.abs(n)<=Proj4js.common.EPSLN&&(a=this.lat0>=0?Proj4js.common.adjust_lon(this.long0+Math.atan2(t.x,-t.y)):Proj4js.common.adjust_lon(this.long0-Math.atan2(-t.x,t.y))),n=o-this.sin_p14*Math.sin(r),t.x=a,t.y=r,t}},Proj4js.Proj.krovak={init:function(){this.a=6377397.155,this.es=.006674372230614,this.e=Math.sqrt(this.es),this.lat0||(this.lat0=.863937979737193),this.long0||(this.long0=.4334234309119251),this.k0||(this.k0=.9999),this.s45=.785398163397448,this.s90=2*this.s45,this.fi0=this.lat0,this.e2=this.es,this.e=Math.sqrt(this.e2),this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2)),this.uq=1.04216856380474,this.u0=Math.asin(Math.sin(this.fi0)/this.alfa),this.g=Math.pow((1+this.e*Math.sin(this.fi0))/(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2),this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g,this.k1=this.k0,this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2)),this.s0=1.37008346281555,this.n=Math.sin(this.s0),this.ro0=this.k1*this.n0/Math.tan(this.s0),this.ad=this.s90-this.uq},forward:function(t){var i,s,e,o,n,a,r,h=t.x,l=t.y,c=Proj4js.common.adjust_lon(h-this.long0);return i=Math.pow((1+this.e*Math.sin(l))/(1-this.e*Math.sin(l)),this.alfa*this.e/2),s=2*(Math.atan(this.k*Math.pow(Math.tan(l/2+this.s45),this.alfa)/i)-this.s45),e=-c*this.alfa,o=Math.asin(Math.cos(this.ad)*Math.sin(s)+Math.sin(this.ad)*Math.cos(s)*Math.cos(e)),n=Math.asin(Math.cos(s)*Math.sin(e)/Math.cos(o)),a=this.n*n,r=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(o/2+this.s45),this.n),t.y=r*Math.cos(a)/1,t.x=r*Math.sin(a)/1,this.czech&&(t.y*=-1,t.x*=-1),t},inverse:function(t){var i,s,e,o,n,a,r,h,l=t.x;t.x=t.y,t.y=l,this.czech&&(t.y*=-1,t.x*=-1),a=Math.sqrt(t.x*t.x+t.y*t.y),n=Math.atan2(t.y,t.x),o=n/Math.sin(this.s0),e=2*(Math.atan(Math.pow(this.ro0/a,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45),i=Math.asin(Math.cos(this.ad)*Math.sin(e)-Math.sin(this.ad)*Math.cos(e)*Math.cos(o)),s=Math.asin(Math.cos(e)*Math.sin(o)/Math.cos(i)),t.x=this.long0-s/this.alfa,r=i,h=0;var c=0;do t.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(i/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(r))/(1-this.e*Math.sin(r)),this.e/2))-this.s45),1e-10>Math.abs(r-t.y)&&(h=1),r=t.y,c+=1;while(0==h&&15>c);return c>=15?(Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"),null):t}},Proj4js.Proj.somerc={init:function(){var t=this.lat0;this.lambda0=this.long0;var i=Math.sin(t),s=this.a,e=this.rf,o=1/e,n=2*o-Math.pow(o,2),a=this.e=Math.sqrt(n);this.R=this.k0*s*Math.sqrt(1-n)/(1-n*Math.pow(i,2)),this.alpha=Math.sqrt(1+n/(1-n)*Math.pow(Math.cos(t),4)),this.b0=Math.asin(i/this.alpha),this.K=Math.log(Math.tan(Math.PI/4+this.b0/2))-this.alpha*Math.log(Math.tan(Math.PI/4+t/2))+this.alpha*a/2*Math.log((1+a*i)/(1-a*i))},forward:function(t){var i=Math.log(Math.tan(Math.PI/4-t.y/2)),s=this.e/2*Math.log((1+this.e*Math.sin(t.y))/(1-this.e*Math.sin(t.y))),e=-this.alpha*(i+s)+this.K,o=2*(Math.atan(Math.exp(e))-Math.PI/4),n=this.alpha*(t.x-this.lambda0),a=Math.atan(Math.sin(n)/(Math.sin(this.b0)*Math.tan(o)+Math.cos(this.b0)*Math.cos(n))),r=Math.asin(Math.cos(this.b0)*Math.sin(o)-Math.sin(this.b0)*Math.cos(o)*Math.cos(n));return t.y=this.R/2*Math.log((1+Math.sin(r))/(1-Math.sin(r)))+this.y0,t.x=this.R*a+this.x0,t},inverse:function(t){for(var i=t.x-this.x0,s=t.y-this.y0,e=i/this.R,o=2*(Math.atan(Math.exp(s/this.R))-Math.PI/4),n=Math.asin(Math.cos(this.b0)*Math.sin(o)+Math.sin(this.b0)*Math.cos(o)*Math.cos(e)),a=Math.atan(Math.sin(e)/(Math.cos(this.b0)*Math.cos(e)-Math.sin(this.b0)*Math.tan(o))),r=this.lambda0+a/this.alpha,h=0,l=n,c=-1e3,m=0;Math.abs(l-c)>1e-7;){if(++m>20)return Proj4js.reportError("omercFwdInfinity"),void 0;h=1/this.alpha*(Math.log(Math.tan(Math.PI/4+n/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(l))/2)),c=l,l=2*Math.atan(Math.exp(h))-Math.PI/2}return t.x=r,t.y=l,t}},Proj4js.Proj.stere={ssfn_:function(t,i,s){return i*=s,Math.tan(.5*(Proj4js.common.HALF_PI+t))*Math.pow((1-i)/(1+i),.5*s)},TOL:1e-8,NITER:8,CONV:1e-10,S_POLE:0,N_POLE:1,OBLIQ:2,EQUIT:3,init:function(){this.phits=this.lat_ts?this.lat_ts:Proj4js.common.HALF_PI;var t=Math.abs(this.lat0);if(this.mode=Math.abs(t)-Proj4js.common.HALF_PI<Proj4js.common.EPSLN?0>this.lat0?this.S_POLE:this.N_POLE:t>Proj4js.common.EPSLN?this.OBLIQ:this.EQUIT,this.phits=Math.abs(this.phits),this.es){var i;switch(this.mode){case this.N_POLE:case this.S_POLE:Math.abs(this.phits-Proj4js.common.HALF_PI)<Proj4js.common.EPSLN?this.akm1=2*this.k0/Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)):(t=Math.sin(this.phits),this.akm1=Math.cos(this.phits)/Proj4js.common.tsfnz(this.e,this.phits,t),t*=this.e,this.akm1/=Math.sqrt(1-t*t));break;case this.EQUIT:this.akm1=2*this.k0;break;case this.OBLIQ:t=Math.sin(this.lat0),i=2*Math.atan(this.ssfn_(this.lat0,t,this.e))-Proj4js.common.HALF_PI,t*=this.e,this.akm1=2*this.k0*Math.cos(this.lat0)/Math.sqrt(1-t*t),this.sinX1=Math.sin(i),this.cosX1=Math.cos(i)}}else switch(this.mode){case this.OBLIQ:this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0);case this.EQUIT:this.akm1=2*this.k0;break;case this.S_POLE:case this.N_POLE:this.akm1=Math.abs(this.phits-Proj4js.common.HALF_PI)>=Proj4js.common.EPSLN?Math.cos(this.phits)/Math.tan(Proj4js.common.FORTPI-.5*this.phits):2*this.k0}},forward:function(t){var i=t.x;i=Proj4js.common.adjust_lon(i-this.long0);var s,e,o=t.y;if(this.sphere){var n,a,r,h;switch(n=Math.sin(o),a=Math.cos(o),r=Math.cos(i),h=Math.sin(i),this.mode){case this.EQUIT:e=1+a*r,Proj4js.common.EPSLN>=e&&Proj4js.reportError("stere:forward:Equit"),e=this.akm1/e,s=e*a*h,e*=n;break;case this.OBLIQ:e=1+this.sinph0*n+this.cosph0*a*r,Proj4js.common.EPSLN>=e&&Proj4js.reportError("stere:forward:Obliq"),e=this.akm1/e,s=e*a*h,e*=this.cosph0*n-this.sinph0*a*r;break;case this.N_POLE:r=-r,o=-o;case this.S_POLE:Math.abs(o-Proj4js.common.HALF_PI)<this.TOL&&Proj4js.reportError("stere:forward:S_POLE"),e=this.akm1*Math.tan(Proj4js.common.FORTPI+.5*o),s=h*e,e*=r}}else{r=Math.cos(i),h=Math.sin(i),n=Math.sin(o);var l,c;if(this.mode==this.OBLIQ||this.mode==this.EQUIT){var m=2*Math.atan(this.ssfn_(o,n,this.e));l=Math.sin(m-Proj4js.common.HALF_PI),c=Math.cos(m)}switch(this.mode){case this.OBLIQ:var u=this.akm1/(this.cosX1*(1+this.sinX1*l+this.cosX1*c*r));e=u*(this.cosX1*l-this.sinX1*c*r),s=u*c;break;case this.EQUIT:var u=2*this.akm1/(1+c*r);e=u*l,s=u*c;break;case this.S_POLE:o=-o,r=-r,n=-n;case this.N_POLE:s=this.akm1*Proj4js.common.tsfnz(this.e,o,n),e=-s*r}s*=h}return t.x=s*this.a+this.x0,t.y=e*this.a+this.y0,t},inverse:function(t){var i,s,e,o,n,a,r=(t.x-this.x0)/this.a,h=(t.y-this.y0)/this.a,l=0,c=0,m=0,u=0;if(this.sphere){var d,p,_,f;switch(p=Math.sqrt(r*r+h*h),d=2*Math.atan(p/this.akm1),_=Math.sin(d),f=Math.cos(d),i=0,this.mode){case this.EQUIT:s=Math.abs(p)<=Proj4js.common.EPSLN?0:Math.asin(h*_/p),(0!=f||0!=r)&&(i=Math.atan2(r*_,f*p));break;case this.OBLIQ:s=Math.abs(p)<=Proj4js.common.EPSLN?this.phi0:Math.asin(f*this.sinph0+h*_*this.cosph0/p),d=f-this.sinph0*Math.sin(s),(0!=d||0!=r)&&(i=Math.atan2(r*_*this.cosph0,d*p));break;case this.N_POLE:h=-h;case this.S_POLE:s=Math.abs(p)<=Proj4js.common.EPSLN?this.phi0:Math.asin(this.mode==this.S_POLE?-f:f),i=0==r&&0==h?0:Math.atan2(r,h)}t.x=Proj4js.common.adjust_lon(i+this.long0),t.y=s}else{switch(n=Math.sqrt(r*r+h*h),this.mode){case this.OBLIQ:case this.EQUIT:l=2*Math.atan2(n*this.cosX1,this.akm1),e=Math.cos(l),o=Math.sin(l),c=0==n?Math.asin(e*this.sinX1):Math.asin(e*this.sinX1+h*o*this.cosX1/n),l=Math.tan(.5*(Proj4js.common.HALF_PI+c)),r*=o,h=n*this.cosX1*e-h*this.sinX1*o,u=Proj4js.common.HALF_PI,m=.5*this.e;break;case this.N_POLE:h=-h;case this.S_POLE:l=-n/this.akm1,c=Proj4js.common.HALF_PI-2*Math.atan(l),u=-Proj4js.common.HALF_PI,m=-.5*this.e}for(a=this.NITER;a--;c=s)if(o=this.e*Math.sin(c),s=2*Math.atan(l*Math.pow((1+o)/(1-o),m))-u,Math.abs(c-s)<this.CONV)return this.mode==this.S_POLE&&(s=-s),i=0==r&&0==h?0:Math.atan2(r,h),t.x=Proj4js.common.adjust_lon(i+this.long0),t.y=s,t}}},Proj4js.Proj.nzmg={iterations:1,init:function(){this.A=[],this.A[1]=.6399175073,this.A[2]=-.1358797613,this.A[3]=.063294409,this.A[4]=-.02526853,this.A[5]=.0117879,this.A[6]=-.0055161,this.A[7]=.0026906,this.A[8]=-.001333,this.A[9]=67e-5,this.A[10]=-34e-5,this.B_re=[],this.B_im=[],this.B_re[1]=.7557853228,this.B_im[1]=0,this.B_re[2]=.249204646,this.B_im[2]=.003371507,this.B_re[3]=-.001541739,this.B_im[3]=.04105856,this.B_re[4]=-.10162907,this.B_im[4]=.01727609,this.B_re[5]=-.26623489,this.B_im[5]=-.36249218,this.B_re[6]=-.6870983,this.B_im[6]=-1.1651967,this.C_re=[],this.C_im=[],this.C_re[1]=1.3231270439,this.C_im[1]=0,this.C_re[2]=-.577245789,this.C_im[2]=-.007809598,this.C_re[3]=.508307513,this.C_im[3]=-.112208952,this.C_re[4]=-.15094762,this.C_im[4]=.18200602,this.C_re[5]=1.01418179,this.C_im[5]=1.64497696,this.C_re[6]=1.9660549,this.C_im[6]=2.5127645,this.D=[],this.D[1]=1.5627014243,this.D[2]=.5185406398,this.D[3]=-.03333098,this.D[4]=-.1052906,this.D[5]=-.0368594,this.D[6]=.007317,this.D[7]=.0122,this.D[8]=.00394,this.D[9]=-.0013},forward:function(t){for(var i=t.x,s=t.y,e=s-this.lat0,o=i-this.long0,n=1e-5*(e/Proj4js.common.SEC_TO_RAD),a=o,r=1,h=0,l=1;10>=l;l++)r*=n,h+=this.A[l]*r;for(var c,m,u=h,d=a,p=1,_=0,f=0,P=0,l=1;6>=l;l++)c=p*u-_*d,m=_*u+p*d,p=c,_=m,f=f+this.B_re[l]*p-this.B_im[l]*_,P=P+this.B_im[l]*p+this.B_re[l]*_;return t.x=P*this.a+this.x0,t.y=f*this.a+this.y0,t},inverse:function(t){for(var i,s,e=t.x,o=t.y,n=e-this.x0,a=o-this.y0,r=a/this.a,h=n/this.a,l=1,c=0,m=0,u=0,d=1;6>=d;d++)i=l*r-c*h,s=c*r+l*h,l=i,c=s,m=m+this.C_re[d]*l-this.C_im[d]*c,u=u+this.C_im[d]*l+this.C_re[d]*c;for(var p=0;this.iterations>p;p++){for(var _,f,P=m,y=u,g=r,L=h,d=2;6>=d;d++)_=P*m-y*u,f=y*m+P*u,P=_,y=f,g+=(d-1)*(this.B_re[d]*P-this.B_im[d]*y),L+=(d-1)*(this.B_im[d]*P+this.B_re[d]*y);P=1,y=0;for(var v=this.B_re[1],j=this.B_im[1],d=2;6>=d;d++)_=P*m-y*u,f=y*m+P*u,P=_,y=f,v+=d*(this.B_re[d]*P-this.B_im[d]*y),j+=d*(this.B_im[d]*P+this.B_re[d]*y);var M=v*v+j*j;m=(g*v+L*j)/M,u=(L*v-g*j)/M}for(var S=m,b=u,x=1,E=0,d=1;9>=d;d++)x*=S,E+=this.D[d]*x;var C=this.lat0+1e5*E*Proj4js.common.SEC_TO_RAD,w=this.long0+b;return t.x=w,t.y=C,t}},Proj4js.Proj.mill={init:function(){},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=this.x0+this.a*e,n=this.y0+1.25*this.a*Math.log(Math.tan(Proj4js.common.PI/4+s/2.5));return t.x=o,t.y=n,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=Proj4js.common.adjust_lon(this.long0+t.x/this.a),s=2.5*(Math.atan(Math.exp(.8*t.y/this.a))-Proj4js.common.PI/4);return t.x=i,t.y=s,t}},Proj4js.Proj.gnom={init:function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0),this.infinity_dist=1e3*this.a,this.rc=1},forward:function(t){var i,s,e,o,n,a,r,h,l=t.x,c=t.y;return e=Proj4js.common.adjust_lon(l-this.long0),i=Math.sin(c),s=Math.cos(c),o=Math.cos(e),a=this.sin_p14*i+this.cos_p14*s*o,n=1,a>0||Math.abs(a)<=Proj4js.common.EPSLN?(r=this.x0+this.a*n*s*Math.sin(e)/a,h=this.y0+this.a*n*(this.cos_p14*i-this.sin_p14*s*o)/a):(Proj4js.reportError("orthoFwdPointError"),r=this.x0+this.infinity_dist*s*Math.sin(e),h=this.y0+this.infinity_dist*(this.cos_p14*i-this.sin_p14*s*o)),t.x=r,t.y=h,t},inverse:function(t){var i,s,e,o,n,a;return t.x=(t.x-this.x0)/this.a,t.y=(t.y-this.y0)/this.a,t.x/=this.k0,t.y/=this.k0,(i=Math.sqrt(t.x*t.x+t.y*t.y))?(o=Math.atan2(i,this.rc),s=Math.sin(o),e=Math.cos(o),a=Proj4js.common.asinz(e*this.sin_p14+t.y*s*this.cos_p14/i),n=Math.atan2(t.x*s,i*this.cos_p14*e-t.y*this.sin_p14*s),n=Proj4js.common.adjust_lon(this.long0+n)):(a=this.phic0,n=0),t.x=n,t.y=a,t}},Proj4js.Proj.sinu={init:function(){this.sphere?(this.n=1,this.m=0,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=Proj4js.common.pj_enfn(this.es)},forward:function(t){var i,s,e=t.x,o=t.y;if(e=Proj4js.common.adjust_lon(e-this.long0),this.sphere){if(this.m)for(var n=this.n*Math.sin(o),a=Proj4js.common.MAX_ITER;a;--a){var r=(this.m*o+Math.sin(o)-n)/(this.m+Math.cos(o));if(o-=r,Math.abs(r)<Proj4js.common.EPSLN)break}else o=1!=this.n?Math.asin(this.n*Math.sin(o)):o;i=this.a*this.C_x*e*(this.m+Math.cos(o)),s=this.a*this.C_y*o}else{var h=Math.sin(o),l=Math.cos(o);s=this.a*Proj4js.common.pj_mlfn(o,h,l,this.en),i=this.a*e*l/Math.sqrt(1-this.es*h*h)}return t.x=i,t.y=s,t},inverse:function(t){var i,s,e;if(t.x-=this.x0,t.y-=this.y0,i=t.y/this.a,this.sphere)t.y/=this.C_y,i=this.m?Math.asin((this.m*t.y+Math.sin(t.y))/this.n):1!=this.n?Math.asin(Math.sin(t.y)/this.n):t.y,e=t.x/(this.C_x*(this.m+Math.cos(t.y)));else{i=Proj4js.common.pj_inv_mlfn(t.y/this.a,this.es,this.en);var o=Math.abs(i);Proj4js.common.HALF_PI>o?(o=Math.sin(i),s=this.long0+t.x*Math.sqrt(1-this.es*o*o)/(this.a*Math.cos(i)),e=Proj4js.common.adjust_lon(s)):o-Proj4js.common.EPSLN<Proj4js.common.HALF_PI&&(e=this.long0)}return t.x=e,t.y=i,t}},Proj4js.Proj.vandg={init:function(){this.R=6370997},forward:function(t){var i,s,e=t.x,o=t.y,n=Proj4js.common.adjust_lon(e-this.long0);Math.abs(o)<=Proj4js.common.EPSLN&&(i=this.x0+this.R*n,s=this.y0);var a=Proj4js.common.asinz(2*Math.abs(o/Proj4js.common.PI));(Math.abs(n)<=Proj4js.common.EPSLN||Math.abs(Math.abs(o)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)&&(i=this.x0,s=o>=0?this.y0+Proj4js.common.PI*this.R*Math.tan(.5*a):this.y0+Proj4js.common.PI*this.R*-Math.tan(.5*a));var r=.5*Math.abs(Proj4js.common.PI/n-n/Proj4js.common.PI),h=r*r,l=Math.sin(a),c=Math.cos(a),m=c/(l+c-1),u=m*m,d=m*(2/l-1),p=d*d,_=Proj4js.common.PI*this.R*(r*(m-p)+Math.sqrt(h*(m-p)*(m-p)-(p+h)*(u-p)))/(p+h);return 0>n&&(_=-_),i=this.x0+_,_=Math.abs(_/(Proj4js.common.PI*this.R)),s=o>=0?this.y0+Proj4js.common.PI*this.R*Math.sqrt(1-_*_-2*r*_):this.y0-Proj4js.common.PI*this.R*Math.sqrt(1-_*_-2*r*_),t.x=i,t.y=s,t},inverse:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d;return t.x-=this.x0,t.y-=this.y0,m=Proj4js.common.PI*this.R,e=t.x/m,o=t.y/m,n=e*e+o*o,a=-Math.abs(o)*(1+n),r=a-2*o*o+e*e,h=-2*a+1+2*o*o+n*n,d=o*o/h+(2*r*r*r/h/h/h-9*a*r/h/h)/27,l=(a-r*r/3/h)/h,c=2*Math.sqrt(-l/3),m=3*d/l/c,Math.abs(m)>1&&(m=m>=0?1:-1),u=Math.acos(m)/3,s=t.y>=0?(-c*Math.cos(u+Proj4js.common.PI/3)-r/3/h)*Proj4js.common.PI:-(-c*Math.cos(u+Proj4js.common.PI/3)-r/3/h)*Proj4js.common.PI,Math.abs(e)<Proj4js.common.EPSLN&&(i=this.long0),i=Proj4js.common.adjust_lon(this.long0+Proj4js.common.PI*(n-1+Math.sqrt(1+2*(e*e-o*o)+n*n))/2/e),t.x=i,t.y=s,t}},Proj4js.Proj.cea={init:function(){},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=this.x0+this.a*e*Math.cos(this.lat_ts),n=this.y0+this.a*Math.sin(s)/Math.cos(this.lat_ts);return t.x=o,t.y=n,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=Proj4js.common.adjust_lon(this.long0+t.x/this.a/Math.cos(this.lat_ts)),s=Math.asin(t.y/this.a*Math.cos(this.lat_ts));return t.x=i,t.y=s,t}},Proj4js.Proj.eqc={init:function(){this.x0||(this.x0=0),this.y0||(this.y0=0),this.lat0||(this.lat0=0),this.long0||(this.long0=0),this.lat_ts||(this.lat_ts=0),this.title||(this.title="Equidistant Cylindrical (Plate Carre)"),this.rc=Math.cos(this.lat_ts)},forward:function(t){var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=Proj4js.common.adjust_lat(s-this.lat0);return t.x=this.x0+this.a*e*this.rc,t.y=this.y0+this.a*o,t},inverse:function(t){var i=t.x,s=t.y;return t.x=Proj4js.common.adjust_lon(this.long0+(i-this.x0)/(this.a*this.rc)),t.y=Proj4js.common.adjust_lat(this.lat0+(s-this.y0)/this.a),t}},Proj4js.Proj.cass={init:function(){this.sphere||(this.en=Proj4js.common.pj_enfn(this.es),this.m0=Proj4js.common.pj_mlfn(this.lat0,Math.sin(this.lat0),Math.cos(this.lat0),this.en))},C1:.16666666666666666,C2:.008333333333333333,C3:.041666666666666664,C4:.3333333333333333,C5:.06666666666666667,forward:function(t){var i,s,e=t.x,o=t.y;return e=Proj4js.common.adjust_lon(e-this.long0),this.sphere?(i=Math.asin(Math.cos(o)*Math.sin(e)),s=Math.atan2(Math.tan(o),Math.cos(e))-this.phi0):(this.n=Math.sin(o),this.c=Math.cos(o),s=Proj4js.common.pj_mlfn(o,this.n,this.c,this.en),this.n=1/Math.sqrt(1-this.es*this.n*this.n),this.tn=Math.tan(o),this.t=this.tn*this.tn,this.a1=e*this.c,this.c*=this.es*this.c/(1-this.es),this.a2=this.a1*this.a1,i=this.n*this.a1*(1-this.a2*this.t*(this.C1-(8-this.t+8*this.c)*this.a2*this.C2)),s-=this.m0-this.n*this.tn*this.a2*(.5+(5-this.t+6*this.c)*this.a2*this.C3)),t.x=this.a*i+this.x0,t.y=this.a*s+this.y0,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i,s,e=t.x/this.a,o=t.y/this.a;if(this.sphere)this.dd=o+this.lat0,i=Math.asin(Math.sin(this.dd)*Math.cos(e)),s=Math.atan2(Math.tan(e),Math.cos(this.dd));else{var n=Proj4js.common.pj_inv_mlfn(this.m0+o,this.es,this.en);this.tn=Math.tan(n),this.t=this.tn*this.tn,this.n=Math.sin(n),this.r=1/(1-this.es*this.n*this.n),this.n=Math.sqrt(this.r),this.r*=(1-this.es)*this.n,this.dd=e/this.n,this.d2=this.dd*this.dd,i=n-this.n*this.tn/this.r*this.d2*(.5-(1+3*this.t)*this.d2*this.C3),s=this.dd*(1+this.t*this.d2*(-this.C4+(1+3*this.t)*this.d2*this.C5))/Math.cos(n)}return t.x=Proj4js.common.adjust_lon(this.long0+s),t.y=i,t}},Proj4js.Proj.gauss={init:function(){var t=Math.sin(this.lat0),i=Math.cos(this.lat0);i*=i,this.rc=Math.sqrt(1-this.es)/(1-this.es*t*t),this.C=Math.sqrt(1+this.es*i*i/(1-this.es)),this.phic0=Math.asin(t/this.C),this.ratexp=.5*this.C*this.e,this.K=Math.tan(.5*this.phic0+Proj4js.common.FORTPI)/(Math.pow(Math.tan(.5*this.lat0+Proj4js.common.FORTPI),this.C)*Proj4js.common.srat(this.e*t,this.ratexp))},forward:function(t){var i=t.x,s=t.y;return t.y=2*Math.atan(this.K*Math.pow(Math.tan(.5*s+Proj4js.common.FORTPI),this.C)*Proj4js.common.srat(this.e*Math.sin(s),this.ratexp))-Proj4js.common.HALF_PI,t.x=this.C*i,t},inverse:function(t){for(var i=1e-14,s=t.x/this.C,e=t.y,o=Math.pow(Math.tan(.5*e+Proj4js.common.FORTPI)/this.K,1/this.C),n=Proj4js.common.MAX_ITER;n>0&&(e=2*Math.atan(o*Proj4js.common.srat(this.e*Math.sin(t.y),-.5*this.e))-Proj4js.common.HALF_PI,!(i>Math.abs(e-t.y)));--n)t.y=e;return n?(t.x=s,t.y=e,t):(Proj4js.reportError("gauss:inverse:convergence failed"),null)}},Proj4js.Proj.omerc={init:function(){this.mode||(this.mode=0),this.lon1||(this.lon1=0,this.mode=1),this.lon2||(this.lon2=0),this.lat2||(this.lat2=0);var t=this.b/this.a,i=1-Math.pow(t,2);Math.sqrt(i),this.sin_p20=Math.sin(this.lat0),this.cos_p20=Math.cos(this.lat0),this.con=1-this.es*this.sin_p20*this.sin_p20,this.com=Math.sqrt(1-i),this.bl=Math.sqrt(1+this.es*Math.pow(this.cos_p20,4)/(1-i)),this.al=this.a*this.bl*this.k0*this.com/this.con,Math.abs(this.lat0)<Proj4js.common.EPSLN?(this.ts=1,this.d=1,this.el=1):(this.ts=Proj4js.common.tsfnz(this.e,this.lat0,this.sin_p20),this.con=Math.sqrt(this.con),this.d=this.bl*this.com/(this.cos_p20*this.con),this.f=this.d*this.d-1>0?this.lat0>=0?this.d+Math.sqrt(this.d*this.d-1):this.d-Math.sqrt(this.d*this.d-1):this.d,this.el=this.f*Math.pow(this.ts,this.bl)),0!=this.mode?(this.g=.5*(this.f-1/this.f),this.gama=Proj4js.common.asinz(Math.sin(this.alpha)/this.d),this.longc=this.longc-Proj4js.common.asinz(this.g*Math.tan(this.gama))/this.bl,this.con=Math.abs(this.lat0),this.con>Proj4js.common.EPSLN&&Math.abs(this.con-Proj4js.common.HALF_PI)>Proj4js.common.EPSLN?(this.singam=Math.sin(this.gama),this.cosgam=Math.cos(this.gama),this.sinaz=Math.sin(this.alpha),this.cosaz=Math.cos(this.alpha),this.u=this.lat0>=0?this.al/this.bl*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz):-(this.al/this.bl)*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz)):Proj4js.reportError("omerc:Init:DataError")):(this.sinphi=Math.sin(this.at1),this.ts1=Proj4js.common.tsfnz(this.e,this.lat1,this.sinphi),this.sinphi=Math.sin(this.lat2),this.ts2=Proj4js.common.tsfnz(this.e,this.lat2,this.sinphi),this.h=Math.pow(this.ts1,this.bl),this.l=Math.pow(this.ts2,this.bl),this.f=this.el/this.h,this.g=.5*(this.f-1/this.f),this.j=(this.el*this.el-this.l*this.h)/(this.el*this.el+this.l*this.h),this.p=(this.l-this.h)/(this.l+this.h),this.dlon=this.lon1-this.lon2,this.dlon<-Proj4js.common.PI&&(this.lon2=this.lon2-2*Proj4js.common.PI),this.dlon>Proj4js.common.PI&&(this.lon2=this.lon2+2*Proj4js.common.PI),this.dlon=this.lon1-this.lon2,this.longc=.5*(this.lon1+this.lon2)-Math.atan(this.j*Math.tan(.5*this.bl*this.dlon)/this.p)/this.bl,this.dlon=Proj4js.common.adjust_lon(this.lon1-this.longc),this.gama=Math.atan(Math.sin(this.bl*this.dlon)/this.g),this.alpha=Proj4js.common.asinz(this.d*Math.sin(this.gama)),Math.abs(this.lat1-this.lat2)<=Proj4js.common.EPSLN?Proj4js.reportError("omercInitDataError"):this.con=Math.abs(this.lat1),this.con<=Proj4js.common.EPSLN||Math.abs(this.con-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN?Proj4js.reportError("omercInitDataError"):Math.abs(Math.abs(this.lat0)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN&&Proj4js.reportError("omercInitDataError"),this.singam=Math.sin(this.gam),this.cosgam=Math.cos(this.gam),this.sinaz=Math.sin(this.alpha),this.cosaz=Math.cos(this.alpha),this.u=this.lat0>=0?this.al/this.bl*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz):-(this.al/this.bl)*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz))},forward:function(t){var i,s,e,o,n,a,r,h,l,c,m,u=t.x,d=t.y;i=Math.sin(d),c=Proj4js.common.adjust_lon(u-this.longc),a=Math.sin(this.bl*c),Math.abs(Math.abs(d)-Proj4js.common.HALF_PI)>Proj4js.common.EPSLN?(m=Proj4js.common.tsfnz(this.e,d,i),o=this.el/Math.pow(m,this.bl),l=.5*(o-1/o),s=.5*(o+1/o),r=(l*this.singam-a*this.cosgam)/s,e=Math.cos(this.bl*c),1e-7>Math.abs(e)?n=this.al*this.bl*c:(n=this.al*Math.atan((l*this.cosgam+a*this.singam)/e)/this.bl,0>e&&(n+=Proj4js.common.PI*this.al/this.bl))):(r=d>=0?this.singam:-this.singam,n=this.al*d/this.bl),Math.abs(Math.abs(r)-1)<=Proj4js.common.EPSLN&&Proj4js.reportError("omercFwdInfinity"),h=.5*this.al*Math.log((1-r)/(1+r))/this.bl,n-=this.u;var p=this.x0+h*this.cosaz+n*this.sinaz,_=this.y0+n*this.cosaz-h*this.sinaz;return t.x=p,t.y=_,t},inverse:function(t){var i,s,e,o,n,a,r,h,l,c,m,u,d;return t.x-=this.x0,t.y-=this.y0,d=0,o=t.x*this.cosaz-t.y*this.sinaz,n=t.y*this.cosaz+t.x*this.sinaz,n+=this.u,a=Math.exp(-this.bl*o/this.al),r=.5*(a-1/a),s=.5*(a+1/a),l=Math.sin(this.bl*n/this.al),c=(l*this.cosgam+r*this.singam)/s,Math.abs(Math.abs(c)-1)<=Proj4js.common.EPSLN?(m=this.longc,u=c>=0?Proj4js.common.HALF_PI:-Proj4js.common.HALF_PI):(e=1/this.bl,h=Math.pow(this.el/Math.sqrt((1+c)/(1-c)),e),u=Proj4js.common.phi2z(this.e,h),i=this.longc-Math.atan2(r*this.cosgam-l*this.singam,e)/this.bl,m=Proj4js.common.adjust_lon(i)),t.x=m,t.y=u,t}},Proj4js.Proj.lcc={init:function(){if(this.lat2||(this.lat2=this.lat0),this.k0||(this.k0=1),Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN)return Proj4js.reportError("lcc:init: Equal Latitudes"),void 0;var t=this.b/this.a;this.e=Math.sqrt(1-t*t);var i=Math.sin(this.lat1),s=Math.cos(this.lat1),e=Proj4js.common.msfnz(this.e,i,s),o=Proj4js.common.tsfnz(this.e,this.lat1,i),n=Math.sin(this.lat2),a=Math.cos(this.lat2),r=Proj4js.common.msfnz(this.e,n,a),h=Proj4js.common.tsfnz(this.e,this.lat2,n),l=Proj4js.common.tsfnz(this.e,this.lat0,Math.sin(this.lat0));this.ns=Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN?Math.log(e/r)/Math.log(o/h):i,this.f0=e/(this.ns*Math.pow(o,this.ns)),this.rh=this.a*this.f0*Math.pow(l,this.ns),this.title||(this.title="Lambert Conformal Conic")},forward:function(t){var i=t.x,s=t.y;if(!(90>=s&&s>=-90&&180>=i&&i>=-180))return Proj4js.reportError("lcc:forward: llInputOutOfRange: "+i+" : "+s),null;var e,o,n=Math.abs(Math.abs(s)-Proj4js.common.HALF_PI);if(n>Proj4js.common.EPSLN)e=Proj4js.common.tsfnz(this.e,s,Math.sin(s)),o=this.a*this.f0*Math.pow(e,this.ns);else{if(n=s*this.ns,0>=n)return Proj4js.reportError("lcc:forward: No Projection"),null;o=0}var a=this.ns*Proj4js.common.adjust_lon(i-this.long0);return t.x=this.k0*o*Math.sin(a)+this.x0,t.y=this.k0*(this.rh-o*Math.cos(a))+this.y0,t},inverse:function(t){var i,s,e,o,n,a=(t.x-this.x0)/this.k0,r=this.rh-(t.y-this.y0)/this.k0;this.ns>0?(i=Math.sqrt(a*a+r*r),s=1):(i=-Math.sqrt(a*a+r*r),s=-1);var h=0;if(0!=i&&(h=Math.atan2(s*a,s*r)),0!=i||this.ns>0){if(s=1/this.ns,e=Math.pow(i/(this.a*this.f0),s),o=Proj4js.common.phi2z(this.e,e),-9999==o)return null}else o=-Proj4js.common.HALF_PI;return n=Proj4js.common.adjust_lon(h/this.ns+this.long0),t.x=n,t.y=o,t}},Proj4js.Proj.laea={S_POLE:1,N_POLE:2,EQUIT:3,OBLIQ:4,init:function(){var t=Math.abs(this.lat0);if(this.mode=Math.abs(t-Proj4js.common.HALF_PI)<Proj4js.common.EPSLN?0>this.lat0?this.S_POLE:this.N_POLE:Math.abs(t)<Proj4js.common.EPSLN?this.EQUIT:this.OBLIQ,this.es>0){var i;switch(this.qp=Proj4js.common.qsfnz(this.e,1),this.mmf=.5/(1-this.es),this.apa=this.authset(this.es),this.mode){case this.N_POLE:case this.S_POLE:this.dd=1;break;case this.EQUIT:this.rq=Math.sqrt(.5*this.qp),this.dd=1/this.rq,this.xmf=1,this.ymf=.5*this.qp;break;case this.OBLIQ:this.rq=Math.sqrt(.5*this.qp),i=Math.sin(this.lat0),this.sinb1=Proj4js.common.qsfnz(this.e,i)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*i*i)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd}}else this.mode==this.OBLIQ&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))},forward:function(t){var i,s,e=t.x,o=t.y;if(e=Proj4js.common.adjust_lon(e-this.long0),this.sphere){var n,a,r;switch(r=Math.sin(o),a=Math.cos(o),n=Math.cos(e),this.mode){case this.OBLIQ:case this.EQUIT:if(s=this.mode==this.EQUIT?1+a*n:1+this.sinph0*r+this.cosph0*a*n,Proj4js.common.EPSLN>=s)return Proj4js.reportError("laea:fwd:y less than eps"),null;s=Math.sqrt(2/s),i=s*a*Math.sin(e),s*=this.mode==this.EQUIT?r:this.cosph0*r-this.sinph0*a*n;break;case this.N_POLE:n=-n;case this.S_POLE:if(Math.abs(o+this.phi0)<Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:phi < eps"),null;s=Proj4js.common.FORTPI-.5*o,s=2*(this.mode==this.S_POLE?Math.cos(s):Math.sin(s)),i=s*Math.sin(e),s*=n}}else{var n,h,r,l,c=0,m=0,u=0;switch(n=Math.cos(e),h=Math.sin(e),r=Math.sin(o),l=Proj4js.common.qsfnz(this.e,r),(this.mode==this.OBLIQ||this.mode==this.EQUIT)&&(c=l/this.qp,m=Math.sqrt(1-c*c)),this.mode){case this.OBLIQ:u=1+this.sinb1*c+this.cosb1*m*n;break;case this.EQUIT:u=1+m*n;break;case this.N_POLE:u=Proj4js.common.HALF_PI+o,l=this.qp-l;break;case this.S_POLE:u=o-Proj4js.common.HALF_PI,l=this.qp+l}if(Math.abs(u)<Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:b < eps"),null;switch(this.mode){case this.OBLIQ:case this.EQUIT:u=Math.sqrt(2/u),s=this.mode==this.OBLIQ?this.ymf*u*(this.cosb1*c-this.sinb1*m*n):(u=Math.sqrt(2/(1+m*n)))*c*this.ymf,i=this.xmf*u*m*h;break;case this.N_POLE:case this.S_POLE:l>=0?(i=(u=Math.sqrt(l))*h,s=n*(this.mode==this.S_POLE?u:-u)):i=s=0}}return t.x=this.a*i+this.x0,t.y=this.a*s+this.y0,t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i,s,e=t.x/this.a,o=t.y/this.a;if(this.sphere){var n,a=0,r=0;if(n=Math.sqrt(e*e+o*o),s=.5*n,s>1)return Proj4js.reportError("laea:Inv:DataError"),null;
switch(s=2*Math.asin(s),(this.mode==this.OBLIQ||this.mode==this.EQUIT)&&(r=Math.sin(s),a=Math.cos(s)),this.mode){case this.EQUIT:s=Math.abs(n)<=Proj4js.common.EPSLN?0:Math.asin(o*r/n),e*=r,o=a*n;break;case this.OBLIQ:s=Math.abs(n)<=Proj4js.common.EPSLN?this.phi0:Math.asin(a*this.sinph0+o*r*this.cosph0/n),e*=r*this.cosph0,o=(a-Math.sin(s)*this.sinph0)*n;break;case this.N_POLE:o=-o,s=Proj4js.common.HALF_PI-s;break;case this.S_POLE:s-=Proj4js.common.HALF_PI}i=0!=o||this.mode!=this.EQUIT&&this.mode!=this.OBLIQ?Math.atan2(e,o):0}else{var h,l,c,m,u=0;switch(this.mode){case this.EQUIT:case this.OBLIQ:if(e/=this.dd,o*=this.dd,m=Math.sqrt(e*e+o*o),Proj4js.common.EPSLN>m)return t.x=0,t.y=this.phi0,t;l=2*Math.asin(.5*m/this.rq),h=Math.cos(l),e*=l=Math.sin(l),this.mode==this.OBLIQ?(u=h*this.sinb1+o*l*this.cosb1/m,c=this.qp*u,o=m*this.cosb1*h-o*this.sinb1*l):(u=o*l/m,c=this.qp*u,o=m*h);break;case this.N_POLE:o=-o;case this.S_POLE:if(c=e*e+o*o,!c)return t.x=0,t.y=this.phi0,t;u=1-c/this.qp,this.mode==this.S_POLE&&(u=-u)}i=Math.atan2(e,o),s=this.authlat(Math.asin(u),this.apa)}return t.x=Proj4js.common.adjust_lon(this.long0+i),t.y=s,t},P00:.3333333333333333,P01:.17222222222222222,P02:.10257936507936508,P10:.06388888888888888,P11:.0664021164021164,P20:.016415012942191543,authset:function(t){var i,s=[];return s[0]=t*this.P00,i=t*t,s[0]+=i*this.P01,s[1]=i*this.P10,i*=t,s[0]+=i*this.P02,s[1]+=i*this.P11,s[2]=i*this.P20,s},authlat:function(t,i){var s=t+t;return t+i[0]*Math.sin(s)+i[1]*Math.sin(s+s)+i[2]*Math.sin(s+s+s)}},Proj4js.Proj.aeqd={init:function(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0)},forward:function(t){var i=t.x;t.y;var s,e=Math.sin(t.y),o=Math.cos(t.y),n=Proj4js.common.adjust_lon(i-this.long0),a=Math.cos(n),r=this.sin_p12*e+this.cos_p12*o*a;if(Math.abs(Math.abs(r)-1)<Proj4js.common.EPSLN){if(s=1,0>r)return Proj4js.reportError("aeqd:Fwd:PointError"),void 0}else{var h=Math.acos(r);s=h/Math.sin(h)}return t.x=this.x0+this.a*s*o*Math.sin(n),t.y=this.y0+this.a*s*(this.cos_p12*e-this.sin_p12*o*a),t},inverse:function(t){t.x-=this.x0,t.y-=this.y0;var i=Math.sqrt(t.x*t.x+t.y*t.y);if(i>2*Proj4js.common.HALF_PI*this.a)return Proj4js.reportError("aeqdInvDataError"),void 0;var s,e=i/this.a,o=Math.sin(e),n=Math.cos(e),a=this.long0;if(Math.abs(i)<=Proj4js.common.EPSLN)s=this.lat0;else{s=Proj4js.common.asinz(n*this.sin_p12+t.y*o*this.cos_p12/i);var r=Math.abs(this.lat0)-Proj4js.common.HALF_PI;Math.abs(r)<=Proj4js.common.EPSLN?a=this.lat0>=0?Proj4js.common.adjust_lon(this.long0+Math.atan2(t.x,-t.y)):Proj4js.common.adjust_lon(this.long0-Math.atan2(-t.x,t.y)):(r=n-this.sin_p12*Math.sin(s),Math.abs(r)<Proj4js.common.EPSLN&&Math.abs(t.x)<Proj4js.common.EPSLN||(Math.atan2(t.x*o*this.cos_p12,r*i),a=Proj4js.common.adjust_lon(this.long0+Math.atan2(t.x*o*this.cos_p12,r*i))))}return t.x=a,t.y=s,t}},Proj4js.Proj.moll={init:function(){},forward:function(t){for(var i=t.x,s=t.y,e=Proj4js.common.adjust_lon(i-this.long0),o=s,n=Proj4js.common.PI*Math.sin(s),a=0;!0;a++){var r=-(o+Math.sin(o)-n)/(1+Math.cos(o));if(o+=r,Math.abs(r)<Proj4js.common.EPSLN)break;a>=50&&Proj4js.reportError("moll:Fwd:IterationError")}o/=2,Proj4js.common.PI/2-Math.abs(s)<Proj4js.common.EPSLN&&(e=0);var h=.900316316158*this.a*e*Math.cos(o)+this.x0,l=1.4142135623731*this.a*Math.sin(o)+this.y0;return t.x=h,t.y=l,t},inverse:function(t){var i,s;t.x-=this.x0;var s=t.y/(1.4142135623731*this.a);Math.abs(s)>.999999999999&&(s=.999999999999);var i=Math.asin(s),e=Proj4js.common.adjust_lon(this.long0+t.x/(.900316316158*this.a*Math.cos(i)));-Proj4js.common.PI>e&&(e=-Proj4js.common.PI),e>Proj4js.common.PI&&(e=Proj4js.common.PI),s=(2*i+Math.sin(2*i))/Proj4js.common.PI,Math.abs(s)>1&&(s=1);var o=Math.asin(s);return t.x=e,t.y=o,t}},function(t,i,s){var e,o;typeof exports!=s+""?e=exports:(o=t.L,e={},e.noConflict=function(){return t.L=o,this},t.L=e),e.version="0.5.1",e.Util={extend:function(t){var i,s,e,o,n=Array.prototype.slice.call(arguments,1);for(s=0,e=n.length;e>s;s++){o=n[s]||{};for(i in o)o.hasOwnProperty(i)&&(t[i]=o[i])}return t},bind:function(t,i){var s=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return t.apply(i,s||arguments)}},stamp:function(){var t=0,i="_leaflet_id";return function(s){return s[i]=s[i]||++t,s[i]}}(),limitExecByInterval:function(t,i,e){var o,n;return function a(){var r=arguments;return o?(n=!0,s):(o=!0,setTimeout(function(){o=!1,n&&(a.apply(e,r),n=!1)},i),t.apply(e,r),s)}},falseFn:function(){return!1},formatNum:function(t,i){var s=Math.pow(10,i||5);return Math.round(t*s)/s},splitWords:function(t){return t.replace(/^\s+|\s+$/g,"").split(/\s+/)},setOptions:function(t,i){return t.options=e.extend({},t.options,i),t.options},getParamString:function(t,i){var s=[];for(var e in t)t.hasOwnProperty(e)&&s.push(e+"="+t[e]);return(i&&-1!==i.indexOf("?")?"&":"?")+s.join("&")},template:function(t,i){return t.replace(/\{ *([\w_]+) *\}/g,function(t,s){var e=i[s];if(!i.hasOwnProperty(s))throw Error("No value provided for variable "+t);return e})},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function i(i){var s,e,o=["webkit","moz","o","ms"];for(s=0;o.length>s&&!e;s++)e=t[o[s]+i];return e}function o(i){var s=+new Date,e=Math.max(0,16-(s-n));return n=s+e,t.setTimeout(i,e)}var n=0,a=t.requestAnimationFrame||i("RequestAnimationFrame")||o,r=t.cancelAnimationFrame||i("CancelAnimationFrame")||i("CancelRequestAnimationFrame")||function(i){t.clearTimeout(i)};e.Util.requestAnimFrame=function(i,n,r,h){return i=e.bind(i,n),r&&a===o?(i(),s):a.call(t,i,h)},e.Util.cancelAnimFrame=function(i){i&&r.call(t,i)}}(),e.extend=e.Util.extend,e.bind=e.Util.bind,e.stamp=e.Util.stamp,e.setOptions=e.Util.setOptions,e.Class=function(){},e.Class.extend=function(t){var i=function(){this.initialize&&this.initialize.apply(this,arguments),this._initHooks&&this.callInitHooks()},s=function(){};s.prototype=this.prototype;var o=new s;o.constructor=i,i.prototype=o;for(var n in this)this.hasOwnProperty(n)&&"prototype"!==n&&(i[n]=this[n]);t.statics&&(e.extend(i,t.statics),delete t.statics),t.includes&&(e.Util.extend.apply(null,[o].concat(t.includes)),delete t.includes),t.options&&o.options&&(t.options=e.extend({},o.options,t.options)),e.extend(o,t),o._initHooks=[];var a=this;return o.callInitHooks=function(){if(!this._initHooksCalled){a.prototype.callInitHooks&&a.prototype.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,i=o._initHooks.length;i>t;t++)o._initHooks[t].call(this)}},i},e.Class.include=function(t){e.extend(this.prototype,t)},e.Class.mergeOptions=function(t){e.extend(this.prototype.options,t)},e.Class.addInitHook=function(t){var i=Array.prototype.slice.call(arguments,1),s="function"==typeof t?t:function(){this[t].apply(this,i)};this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(s)};var n="_leaflet_events";e.Mixin={},e.Mixin.Events={addEventListener:function(t,i,s){var o,a,r,h=this[n]=this[n]||{};if("object"==typeof t){for(o in t)t.hasOwnProperty(o)&&this.addEventListener(o,t[o],i);return this}for(t=e.Util.splitWords(t),a=0,r=t.length;r>a;a++)h[t[a]]=h[t[a]]||[],h[t[a]].push({action:i,context:s||this});return this},hasEventListeners:function(t){return n in this&&t in this[n]&&this[n][t].length>0},removeEventListener:function(t,i,s){var o,a,r,h,l,c=this[n];if("object"==typeof t){for(o in t)t.hasOwnProperty(o)&&this.removeEventListener(o,t[o],i);return this}for(t=e.Util.splitWords(t),a=0,r=t.length;r>a;a++)if(this.hasEventListeners(t[a]))for(h=c[t[a]],l=h.length-1;l>=0;l--)i&&h[l].action!==i||s&&h[l].context!==s||h.splice(l,1);return this},fireEvent:function(t,i){if(!this.hasEventListeners(t))return this;for(var s=e.extend({type:t,target:this},i),o=this[n][t].slice(),a=0,r=o.length;r>a;a++)o[a].action.call(o[a].context||this,s);return this}},e.Mixin.Events.on=e.Mixin.Events.addEventListener,e.Mixin.Events.off=e.Mixin.Events.removeEventListener,e.Mixin.Events.fire=e.Mixin.Events.fireEvent,function(){var o=!!t.ActiveXObject,n=o&&!t.XMLHttpRequest,a=o&&!i.querySelector,r=navigator.userAgent.toLowerCase(),h=-1!==r.indexOf("webkit"),l=-1!==r.indexOf("chrome"),c=-1!==r.indexOf("android"),m=-1!==r.search("android [23]"),u=typeof orientation!=s+"",d=t.navigator&&t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints,p="devicePixelRatio"in t&&t.devicePixelRatio>1||"matchMedia"in t&&t.matchMedia("(min-resolution:144dpi)")&&t.matchMedia("(min-resolution:144dpi)").matches,_=i.documentElement,f=o&&"transition"in _.style,P="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix,y="MozPerspective"in _.style,g="OTransition"in _.style,L=!t.L_DISABLE_3D&&(f||P||y||g),v=!t.L_NO_TOUCH&&function(){var t="ontouchstart";if(d||t in _)return!0;var s=i.createElement("div"),e=!1;return s.setAttribute?(s.setAttribute(t,"return;"),"function"==typeof s[t]&&(e=!0),s.removeAttribute(t),s=null,e):!1}();e.Browser={ie:o,ie6:n,ie7:a,webkit:h,android:c,android23:m,chrome:l,ie3d:f,webkit3d:P,gecko3d:y,opera3d:g,any3d:L,mobile:u,mobileWebkit:u&&h,mobileWebkit3d:u&&P,mobileOpera:u&&t.opera,touch:v,msTouch:d,retina:p}}(),e.Point=function(t,i,s){this.x=s?Math.round(t):t,this.y=s?Math.round(i):i},e.Point.prototype={clone:function(){return new e.Point(this.x,this.y)},add:function(t){return this.clone()._add(e.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(e.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},distanceTo:function(t){t=e.point(t);var i=t.x-this.x,s=t.y-this.y;return Math.sqrt(i*i+s*s)},equals:function(t){return t.x===this.x&&t.y===this.y},toString:function(){return"Point("+e.Util.formatNum(this.x)+", "+e.Util.formatNum(this.y)+")"}},e.point=function(t,i,s){return t instanceof e.Point?t:e.Util.isArray(t)?new e.Point(t[0],t[1]):isNaN(t)?t:new e.Point(t,i,s)},e.Bounds=function(t,i){if(t)for(var s=i?[t,i]:t,e=0,o=s.length;o>e;e++)this.extend(s[e])},e.Bounds.prototype={extend:function(t){return t=e.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new e.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new e.Point(this.min.x,this.max.y)},getTopRight:function(){return new e.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var i,s;return t="number"==typeof t[0]||t instanceof e.Point?e.point(t):e.bounds(t),t instanceof e.Bounds?(i=t.min,s=t.max):i=s=t,i.x>=this.min.x&&s.x<=this.max.x&&i.y>=this.min.y&&s.y<=this.max.y},intersects:function(t){t=e.bounds(t);var i=this.min,s=this.max,o=t.min,n=t.max,a=n.x>=i.x&&o.x<=s.x,r=n.y>=i.y&&o.y<=s.y;return a&&r},isValid:function(){return!(!this.min||!this.max)}},e.bounds=function(t,i){return!t||t instanceof e.Bounds?t:new e.Bounds(t,i)},e.Transformation=function(t,i,s,e){this._a=t,this._b=i,this._c=s,this._d=e},e.Transformation.prototype={transform:function(t,i){return this._transform(t.clone(),i)},_transform:function(t,i){return i=i||1,t.x=i*(this._a*t.x+this._b),t.y=i*(this._c*t.y+this._d),t},untransform:function(t,i){return i=i||1,new e.Point((t.x/i-this._b)/this._a,(t.y/i-this._d)/this._c)}},e.DomUtil={get:function(t){return"string"==typeof t?i.getElementById(t):t},getStyle:function(t,s){var e=t.style[s];if(!e&&t.currentStyle&&(e=t.currentStyle[s]),(!e||"auto"===e)&&i.defaultView){var o=i.defaultView.getComputedStyle(t,null);e=o?o[s]:null}return"auto"===e?null:e},getViewportOffset:function(t){var s,o=0,n=0,a=t,r=i.body,h=e.Browser.ie7;do{if(o+=a.offsetTop||0,n+=a.offsetLeft||0,o+=parseInt(e.DomUtil.getStyle(a,"borderTopWidth"),10)||0,n+=parseInt(e.DomUtil.getStyle(a,"borderLeftWidth"),10)||0,s=e.DomUtil.getStyle(a,"position"),a.offsetParent===r&&"absolute"===s)break;if("fixed"===s){o+=r.scrollTop||0,n+=r.scrollLeft||0;break}a=a.offsetParent}while(a);a=t;do{if(a===r)break;o-=a.scrollTop||0,n-=a.scrollLeft||0,e.DomUtil.documentIsLtr()||!e.Browser.webkit&&!h||(n+=a.scrollWidth-a.clientWidth,h&&"hidden"!==e.DomUtil.getStyle(a,"overflow-y")&&"hidden"!==e.DomUtil.getStyle(a,"overflow")&&(n+=17)),a=a.parentNode}while(a);return new e.Point(n,o)},documentIsLtr:function(){return e.DomUtil._docIsLtrCached||(e.DomUtil._docIsLtrCached=!0,e.DomUtil._docIsLtr="ltr"===e.DomUtil.getStyle(i.body,"direction")),e.DomUtil._docIsLtr},create:function(t,s,e){var o=i.createElement(t);return o.className=s,e&&e.appendChild(o),o},disableTextSelection:function(){i.selection&&i.selection.empty&&i.selection.empty(),this._onselectstart||(this._onselectstart=i.onselectstart||null,i.onselectstart=e.Util.falseFn)},enableTextSelection:function(){i.onselectstart===e.Util.falseFn&&(i.onselectstart=this._onselectstart,this._onselectstart=null)},hasClass:function(t,i){return t.className.length>0&&RegExp("(^|\\s)"+i+"(\\s|$)").test(t.className)},addClass:function(t,i){e.DomUtil.hasClass(t,i)||(t.className+=(t.className?" ":"")+i)},removeClass:function(t,i){function s(t,s){return s===i?"":t}t.className=t.className.replace(/(\S+)\s*/g,s).replace(/(^\s+|\s+$)/,"")},setOpacity:function(t,i){if("opacity"in t.style)t.style.opacity=i;else if("filter"in t.style){var s=!1,e="DXImageTransform.Microsoft.Alpha";try{s=t.filters.item(e)}catch(o){}i=Math.round(100*i),s?(s.Enabled=100!==i,s.Opacity=i):t.style.filter+=" progid:"+e+"(opacity="+i+")"}},testProp:function(t){for(var s=i.documentElement.style,e=0;t.length>e;e++)if(t[e]in s)return t[e];return!1},getTranslateString:function(t){var i=e.Browser.webkit3d,s="translate"+(i?"3d":"")+"(",o=(i?",0":"")+")";return s+t.x+"px,"+t.y+"px"+o},getScaleString:function(t,i){var s=e.DomUtil.getTranslateString(i.add(i.multiplyBy(-1*t))),o=" scale("+t+") ";return s+o},setPosition:function(t,i,s){t._leaflet_pos=i,!s&&e.Browser.any3d?(t.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(i),e.Browser.mobileWebkit3d&&(t.style.WebkitBackfaceVisibility="hidden")):(t.style.left=i.x+"px",t.style.top=i.y+"px")},getPosition:function(t){return t._leaflet_pos}},e.DomUtil.TRANSFORM=e.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),e.DomUtil.TRANSITION=e.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),e.DomUtil.TRANSITION_END="webkitTransition"===e.DomUtil.TRANSITION||"OTransition"===e.DomUtil.TRANSITION?e.DomUtil.TRANSITION+"End":"transitionend",e.LatLng=function(t,i){var s=parseFloat(t),e=parseFloat(i);if(isNaN(s)||isNaN(e))throw Error("Invalid LatLng object: ("+t+", "+i+")");this.lat=s,this.lng=e},e.extend(e.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1e-9}),e.LatLng.prototype={equals:function(t){if(!t)return!1;t=e.latLng(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return e.LatLng.MAX_MARGIN>=i},toString:function(t){return"LatLng("+e.Util.formatNum(this.lat,t)+", "+e.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){t=e.latLng(t);var i=6378137,s=e.LatLng.DEG_TO_RAD,o=(t.lat-this.lat)*s,n=(t.lng-this.lng)*s,a=this.lat*s,r=t.lat*s,h=Math.sin(o/2),l=Math.sin(n/2),c=h*h+l*l*Math.cos(a)*Math.cos(r);return 2*i*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))},wrap:function(t,i){var s=this.lng;return t=t||-180,i=i||180,s=(s+i)%(i-t)+(t>s||s===i?i:t),new e.LatLng(this.lat,s)}},e.latLng=function(t,i){return t instanceof e.LatLng?t:e.Util.isArray(t)?new e.LatLng(t[0],t[1]):isNaN(t)?t:new e.LatLng(t,i)},e.LatLngBounds=function(t,i){if(t)for(var s=i?[t,i]:t,e=0,o=s.length;o>e;e++)this.extend(s[e])},e.LatLngBounds.prototype={extend:function(t){return t="number"==typeof t[0]||"string"==typeof t[0]||t instanceof e.LatLng?e.latLng(t):e.latLngBounds(t),t instanceof e.LatLng?this._southWest||this._northEast?(this._southWest.lat=Math.min(t.lat,this._southWest.lat),this._southWest.lng=Math.min(t.lng,this._southWest.lng),this._northEast.lat=Math.max(t.lat,this._northEast.lat),this._northEast.lng=Math.max(t.lng,this._northEast.lng)):(this._southWest=new e.LatLng(t.lat,t.lng),this._northEast=new e.LatLng(t.lat,t.lng)):t instanceof e.LatLngBounds&&(this.extend(t._southWest),this.extend(t._northEast)),this},pad:function(t){var i=this._southWest,s=this._northEast,o=Math.abs(i.lat-s.lat)*t,n=Math.abs(i.lng-s.lng)*t;return new e.LatLngBounds(new e.LatLng(i.lat-o,i.lng-n),new e.LatLng(s.lat+o,s.lng+n))},getCenter:function(){return new e.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new e.LatLng(this._northEast.lat,this._southWest.lng)},getSouthEast:function(){return new e.LatLng(this._southWest.lat,this._northEast.lng)},contains:function(t){t="number"==typeof t[0]||t instanceof e.LatLng?e.latLng(t):e.latLngBounds(t);var i,s,o=this._southWest,n=this._northEast;return t instanceof e.LatLngBounds?(i=t.getSouthWest(),s=t.getNorthEast()):i=s=t,i.lat>=o.lat&&s.lat<=n.lat&&i.lng>=o.lng&&s.lng<=n.lng},intersects:function(t){t=e.latLngBounds(t);var i=this._southWest,s=this._northEast,o=t.getSouthWest(),n=t.getNorthEast(),a=n.lat>=i.lat&&o.lat<=s.lat,r=n.lng>=i.lng&&o.lng<=s.lng;return a&&r},toBBoxString:function(){var t=this._southWest,i=this._northEast;return[t.lng,t.lat,i.lng,i.lat].join(",")},equals:function(t){return t?(t=e.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())):!1},isValid:function(){return!(!this._southWest||!this._northEast)}},e.latLngBounds=function(t,i){return!t||t instanceof e.LatLngBounds?t:new e.LatLngBounds(t,i)},e.Projection={},e.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(t){var i=e.LatLng.DEG_TO_RAD,s=this.MAX_LATITUDE,o=Math.max(Math.min(s,t.lat),-s),n=t.lng*i,a=o*i;return a=Math.log(Math.tan(Math.PI/4+a/2)),new e.Point(n,a)},unproject:function(t){var i=e.LatLng.RAD_TO_DEG,s=t.x*i,o=(2*Math.atan(Math.exp(t.y))-Math.PI/2)*i;return new e.LatLng(o,s)}},e.Projection.LonLat={project:function(t){return new e.Point(t.lng,t.lat)},unproject:function(t){return new e.LatLng(t.y,t.x)}},e.CRS={latLngToPoint:function(t,i){var s=this.projection.project(t),e=this.scale(i);return this.transformation._transform(s,e)},pointToLatLng:function(t,i){var s=this.scale(i),e=this.transformation.untransform(t,s);return this.projection.unproject(e)},project:function(t){return this.projection.project(t)},scale:function(t){return 256*Math.pow(2,t)}},e.CRS.Simple=e.extend({},e.CRS,{projection:e.Projection.LonLat,transformation:new e.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)}}),e.CRS.EPSG3857=e.extend({},e.CRS,{code:"EPSG:3857",projection:e.Projection.SphericalMercator,transformation:new e.Transformation(.5/Math.PI,.5,-.5/Math.PI,.5),project:function(t){var i=this.projection.project(t),s=6378137;return i.multiplyBy(s)}}),e.CRS.EPSG900913=e.extend({},e.CRS.EPSG3857,{code:"EPSG:900913"}),e.CRS.EPSG4326=e.extend({},e.CRS,{code:"EPSG:4326",projection:e.Projection.LonLat,transformation:new e.Transformation(1/360,.5,-1/360,.5)}),e.Map=e.Class.extend({includes:e.Mixin.Events,options:{crs:e.CRS.EPSG3857,fadeAnimation:e.DomUtil.TRANSITION&&!e.Browser.android23,trackResize:!0,markerZoomAnimation:e.DomUtil.TRANSITION&&e.Browser.any3d},initialize:function(t,i){i=e.setOptions(this,i),this._initContainer(t),this._initLayout(),this.callInitHooks(),this._initEvents(),i.maxBounds&&this.setMaxBounds(i.maxBounds),i.center&&i.zoom!==s&&this.setView(e.latLng(i.center),i.zoom,!0),this._initLayers(i.layers)},setView:function(t,i){return this._resetView(e.latLng(t),this._limitZoom(i)),this},setZoom:function(t){return this.setView(this.getCenter(),t)},zoomIn:function(t){return this.setZoom(this._zoom+(t||1))},zoomOut:function(t){return this.setZoom(this._zoom-(t||1))},fitBounds:function(t){var i=this.getBoundsZoom(t);return this.setView(e.latLngBounds(t).getCenter(),i)},fitWorld:function(){var t=new e.LatLng(-60,-170),i=new e.LatLng(85,179);return this.fitBounds(new e.LatLngBounds(t,i))},panTo:function(t){return this.setView(t,this._zoom)},panBy:function(t){return this.fire("movestart"),this._rawPanBy(e.point(t)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(t){if(t=e.latLngBounds(t),this.options.maxBounds=t,!t)return this._boundsMinZoom=null,this;var i=this.getBoundsZoom(t,!0);return this._boundsMinZoom=i,this._loaded&&(i>this._zoom?this.setView(t.getCenter(),i):this.panInsideBounds(t)),this},panInsideBounds:function(t){t=e.latLngBounds(t);var i=this.getBounds(),s=this.project(i.getSouthWest()),o=this.project(i.getNorthEast()),n=this.project(t.getSouthWest()),a=this.project(t.getNorthEast()),r=0,h=0;return o.y<a.y&&(h=a.y-o.y),o.x>a.x&&(r=a.x-o.x),s.y>n.y&&(h=n.y-s.y),s.x<n.x&&(r=n.x-s.x),this.panBy(new e.Point(r,h,!0))},addLayer:function(t){var i=e.stamp(t);return this._layers[i]?this:(this._layers[i]=t,!t.options||isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[i]=t,this._updateZoomLevels()),this.options.zoomAnimation&&e.TileLayer&&t instanceof e.TileLayer&&(this._tileLayersNum++,this._tileLayersToLoad++,t.on("load",this._onTileLayerLoad,this)),this.whenReady(function(){t.onAdd(this),this.fire("layeradd",{layer:t})},this),this)},removeLayer:function(t){var i=e.stamp(t);if(this._layers[i])return t.onRemove(this),delete this._layers[i],this._zoomBoundLayers[i]&&(delete this._zoomBoundLayers[i],this._updateZoomLevels()),this.options.zoomAnimation&&e.TileLayer&&t instanceof e.TileLayer&&(this._tileLayersNum--,this._tileLayersToLoad--,t.off("load",this._onTileLayerLoad,this)),this.fire("layerremove",{layer:t})},hasLayer:function(t){var i=e.stamp(t);return this._layers.hasOwnProperty(i)},invalidateSize:function(t){var i=this.getSize();if(this._sizeChanged=!0,this.options.maxBounds&&this.setMaxBounds(this.options.maxBounds),!this._loaded)return this;var s=i._subtract(this.getSize())._divideBy(2)._round();return t===!0?this.panBy(s):(this._rawPanBy(s),this.fire("move"),clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(e.bind(this.fire,this,"moveend"),200)),this},addHandler:function(t,i){return i?(this[t]=new i(this),this.options[t]&&this[t].enable(),this):s},getCenter:function(){return this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),i=this.unproject(t.getBottomLeft()),s=this.unproject(t.getTopRight());return new e.LatLngBounds(i,s)},getMinZoom:function(){var t=this.options.minZoom||0,i=this._layersMinZoom||0,s=this._boundsMinZoom||0;return Math.max(t,i,s)},getMaxZoom:function(){var t=this.options.maxZoom===s?1/0:this.options.maxZoom,i=this._layersMaxZoom===s?1/0:this._layersMaxZoom;return Math.min(t,i)},getBoundsZoom:function(t,i){t=e.latLngBounds(t);var s,o,n,a=this.getSize(),r=this.options.minZoom||0,h=this.getMaxZoom(),l=t.getNorthEast(),c=t.getSouthWest(),m=!0;i&&r--;do r++,o=this.project(l,r),n=this.project(c,r),s=new e.Point(Math.abs(o.x-n.x),Math.abs(n.y-o.y)),m=i?s.x<a.x||s.y<a.y:s.x<=a.x&&s.y<=a.y;while(m&&h>=r);return m&&i?null:i?r:r-1},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new e.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(){var t=this._getTopLeftPoint();return new e.Bounds(t,t.add(this.getSize()))},getPixelOrigin:function(){return this._initialTopLeftPoint},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t){var i=this.options.crs;return i.scale(t)/i.scale(this._zoom)},getScaleZoom:function(t){return this._zoom+Math.log(t)/Math.LN2},project:function(t,i){return i=i===s?this._zoom:i,this.options.crs.latLngToPoint(e.latLng(t),i)},unproject:function(t,i){return i=i===s?this._zoom:i,this.options.crs.pointToLatLng(e.point(t),i)},layerPointToLatLng:function(t){var i=e.point(t).add(this._initialTopLeftPoint);return this.unproject(i)},latLngToLayerPoint:function(t){var i=this.project(e.latLng(t))._round();return i._subtract(this._initialTopLeftPoint)},containerPointToLayerPoint:function(t){return e.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return e.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var i=this.containerPointToLayerPoint(e.point(t));return this.layerPointToLatLng(i)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(e.latLng(t)))},mouseEventToContainerPoint:function(t){return e.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var i=this._container=e.DomUtil.get(t);if(i._leaflet)throw Error("Map container is already initialized.");i._leaflet=!0},_initLayout:function(){var t=this._container;e.DomUtil.addClass(t,"leaflet-container"),e.Browser.touch&&e.DomUtil.addClass(t,"leaflet-touch"),this.options.fadeAnimation&&e.DomUtil.addClass(t,"leaflet-fade-anim");var i=e.DomUtil.getStyle(t,"position");"absolute"!==i&&"relative"!==i&&"fixed"!==i&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._mapPane=t.mapPane=this._createPane("leaflet-map-pane",this._container),this._tilePane=t.tilePane=this._createPane("leaflet-tile-pane",this._mapPane),t.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane),t.shadowPane=this._createPane("leaflet-shadow-pane"),t.overlayPane=this._createPane("leaflet-overlay-pane"),t.markerPane=this._createPane("leaflet-marker-pane"),t.popupPane=this._createPane("leaflet-popup-pane");var i=" leaflet-zoom-hide";this.options.markerZoomAnimation||(e.DomUtil.addClass(t.markerPane,i),e.DomUtil.addClass(t.shadowPane,i),e.DomUtil.addClass(t.popupPane,i))},_createPane:function(t,i){return e.DomUtil.create("div",t,i||this._panes.objectsPane)},_initLayers:function(t){t=t?e.Util.isArray(t)?t:[t]:[],this._layers={},this._zoomBoundLayers={},this._tileLayersNum=0;var i,s;for(i=0,s=t.length;s>i;i++)this.addLayer(t[i])},_resetView:function(t,i,s,o){var n=this._zoom!==i;o||(this.fire("movestart"),n&&this.fire("zoomstart")),this._zoom=i,this._initialTopLeftPoint=this._getNewTopLeftPoint(t),s?this._initialTopLeftPoint._add(this._getMapPanePos()):e.DomUtil.setPosition(this._mapPane,new e.Point(0,0)),this._tileLayersToLoad=this._tileLayersNum;var a=!this._loaded;this._loaded=!0,this.fire("viewreset",{hard:!s}),this.fire("move"),(n||o)&&this.fire("zoomend"),this.fire("moveend",{hard:!s}),a&&this.fire("load")},_rawPanBy:function(t){e.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_updateZoomLevels:function(){var t,i=1/0,e=-1/0;for(t in this._zoomBoundLayers)if(this._zoomBoundLayers.hasOwnProperty(t)){var o=this._zoomBoundLayers[t];isNaN(o.options.minZoom)||(i=Math.min(i,o.options.minZoom)),isNaN(o.options.maxZoom)||(e=Math.max(e,o.options.maxZoom))}t===s?this._layersMaxZoom=this._layersMinZoom=s:(this._layersMaxZoom=e,this._layersMinZoom=i)},_initEvents:function(){if(e.DomEvent){e.DomEvent.on(this._container,"click",this._onMouseClick,this);var i,s,o=["dblclick","mousedown","mouseup","mouseenter","mouseleave","mousemove","contextmenu"];for(i=0,s=o.length;s>i;i++)e.DomEvent.on(this._container,o[i],this._fireMouseEvent,this);this.options.trackResize&&e.DomEvent.on(t,"resize",this._onResize,this)}},_onResize:function(){e.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=e.Util.requestAnimFrame(this.invalidateSize,this,!1,this._container)},_onMouseClick:function(t){!this._loaded||this.dragging&&this.dragging.moved()||(this.fire("preclick"),this._fireMouseEvent(t))},_fireMouseEvent:function(t){if(this._loaded){var i=t.type;if(i="mouseenter"===i?"mouseover":"mouseleave"===i?"mouseout":i,this.hasEventListeners(i)){"contextmenu"===i&&e.DomEvent.preventDefault(t);var s=this.mouseEventToContainerPoint(t),o=this.containerPointToLayerPoint(s),n=this.layerPointToLatLng(o);this.fire(i,{latlng:n,layerPoint:o,containerPoint:s,originalEvent:t})}}},_onTileLayerLoad:function(){this._tileLayersToLoad--,this._tileLayersNum&&!this._tileLayersToLoad&&this._tileBg&&(clearTimeout(this._clearTileBgTimer),this._clearTileBgTimer=setTimeout(e.bind(this._clearTileBg,this),500))},whenReady:function(t,i){return this._loaded?t.call(i||this,this):this.on("load",t,i),this},_getMapPanePos:function(){return e.DomUtil.getPosition(this._mapPane)},_getTopLeftPoint:function(){if(!this._loaded)throw Error("Set map center and zoom first.");return this._initialTopLeftPoint.subtract(this._getMapPanePos())},_getNewTopLeftPoint:function(t,i){var s=this.getSize()._divideBy(2);return this.project(t,i)._subtract(s)._round()},_latLngToNewLayerPoint:function(t,i,s){var e=this._getNewTopLeftPoint(s,i).add(this._getMapPanePos());return this.project(t,i)._subtract(e)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitZoom:function(t){var i=this.getMinZoom(),s=this.getMaxZoom();return Math.max(i,Math.min(s,t))}}),e.map=function(t,i){return new e.Map(t,i)},e.Projection.Mercator={MAX_LATITUDE:85.0840591556,R_MINOR:6356752.3142,R_MAJOR:6378137,project:function(t){var i=e.LatLng.DEG_TO_RAD,s=this.MAX_LATITUDE,o=Math.max(Math.min(s,t.lat),-s),n=this.R_MAJOR,a=this.R_MINOR,r=t.lng*i*n,h=o*i,l=a/n,c=Math.sqrt(1-l*l),m=c*Math.sin(h);m=Math.pow((1-m)/(1+m),.5*c);var u=Math.tan(.5*(.5*Math.PI-h))/m;return h=-a*Math.log(u),new e.Point(r,h)},unproject:function(t){for(var i,s=e.LatLng.RAD_TO_DEG,o=this.R_MAJOR,n=this.R_MINOR,a=t.x*s/o,r=n/o,h=Math.sqrt(1-r*r),l=Math.exp(-t.y/n),c=Math.PI/2-2*Math.atan(l),m=15,u=1e-7,d=m,p=.1;Math.abs(p)>u&&--d>0;)i=h*Math.sin(c),p=Math.PI/2-2*Math.atan(l*Math.pow((1-i)/(1+i),.5*h))-c,c+=p;return new e.LatLng(c*s,a)}},e.CRS.EPSG3395=e.extend({},e.CRS,{code:"EPSG:3395",projection:e.Projection.Mercator,transformation:function(){var t=e.Projection.Mercator,i=t.R_MAJOR,s=t.R_MINOR;return new e.Transformation(.5/(Math.PI*i),.5,-.5/(Math.PI*s),.5)}()}),e.TileLayer=e.Class.extend({includes:e.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",zoomOffset:0,opacity:1,unloadInvisibleTiles:e.Browser.mobile,updateWhenIdle:e.Browser.mobile},initialize:function(t,i){i=e.setOptions(this,i),i.detectRetina&&e.Browser.retina&&i.maxZoom>0&&(i.tileSize=Math.floor(i.tileSize/2),i.zoomOffset++,i.minZoom>0&&i.minZoom--,this.options.maxZoom--),this._url=t;var s=this.options.subdomains;"string"==typeof s&&(this.options.subdomains=s.split(""))},onAdd:function(t){this._map=t,this._initContainer(),this._createTileProto(),t.on({viewreset:this._resetCallback,moveend:this._update},this),this.options.updateWhenIdle||(this._limitedUpdate=e.Util.limitExecByInterval(this._update,150,this),t.on("move",this._limitedUpdate,this)),this._reset(),this._update()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._container.parentNode.removeChild(this._container),t.off({viewreset:this._resetCallback,moveend:this._update},this),this.options.updateWhenIdle||t.off("move",this._limitedUpdate,this),this._container=null,this._map=null
},bringToFront:function(){var t=this._map._panes.tilePane;return this._container&&(t.appendChild(this._container),this._setAutoZIndex(t,Math.max)),this},bringToBack:function(){var t=this._map._panes.tilePane;return this._container&&(t.insertBefore(this._container,t.firstChild),this._setAutoZIndex(t,Math.min)),this},getAttribution:function(){return this.options.attribution},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},setUrl:function(t,i){return this._url=t,i||this.redraw(),this},redraw:function(){return this._map&&(this._map._panes.tilePane.empty=!1,this._reset(!0),this._update()),this},_updateZIndex:function(){this._container&&this.options.zIndex!==s&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t,i){var s,e,o,n=t.children,a=-i(1/0,-1/0);for(e=0,o=n.length;o>e;e++)n[e]!==this._container&&(s=parseInt(n[e].style.zIndex,10),isNaN(s)||(a=i(a,s)));this.options.zIndex=this._container.style.zIndex=(isFinite(a)?a:0)+i(1,-1)},_updateOpacity:function(){e.DomUtil.setOpacity(this._container,this.options.opacity);var t,i=this._tiles;if(e.Browser.webkit)for(t in i)i.hasOwnProperty(t)&&(i[t].style.webkitTransform+=" translate(0,0)")},_initContainer:function(){var t=this._map._panes.tilePane;(!this._container||t.empty)&&(this._container=e.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),t.appendChild(this._container),1>this.options.opacity&&this._updateOpacity())},_resetCallback:function(t){this._reset(t.hard)},_reset:function(t){var i=this._tiles;for(var s in i)i.hasOwnProperty(s)&&this.fire("tileunload",{tile:i[s]});this._tiles={},this._tilesToLoad=0,this.options.reuseTiles&&(this._unusedTiles=[]),t&&this._container&&(this._container.innerHTML=""),this._initContainer()},_update:function(){if(this._map){var t=this._map.getPixelBounds(),i=this._map.getZoom(),s=this.options.tileSize;if(!(i>this.options.maxZoom||this.options.minZoom>i)){var o=new e.Point(Math.floor(t.min.x/s),Math.floor(t.min.y/s)),n=new e.Point(Math.floor(t.max.x/s),Math.floor(t.max.y/s)),a=new e.Bounds(o,n);this._addTilesFromCenterOut(a),(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(a)}}},_addTilesFromCenterOut:function(t){var s,o,n,a=[],r=t.getCenter();for(s=t.min.y;t.max.y>=s;s++)for(o=t.min.x;t.max.x>=o;o++)n=new e.Point(o,s),this._tileShouldBeLoaded(n)&&a.push(n);var h=a.length;if(0!==h){a.sort(function(t,i){return t.distanceTo(r)-i.distanceTo(r)});var l=i.createDocumentFragment();for(this._tilesToLoad||this.fire("loading"),this._tilesToLoad+=h,o=0;h>o;o++)this._addTile(a[o],l);this._container.appendChild(l)}},_tileShouldBeLoaded:function(t){if(t.x+":"+t.y in this._tiles)return!1;if(!this.options.continuousWorld){var i=this._getWrapTileNum();if(this.options.noWrap&&(0>t.x||t.x>=i)||0>t.y||t.y>=i)return!1}return!0},_removeOtherTiles:function(t){var i,s,e,o;for(o in this._tiles)this._tiles.hasOwnProperty(o)&&(i=o.split(":"),s=parseInt(i[0],10),e=parseInt(i[1],10),(t.min.x>s||s>t.max.x||t.min.y>e||e>t.max.y)&&this._removeTile(o))},_removeTile:function(t){var i=this._tiles[t];this.fire("tileunload",{tile:i,url:i.src}),this.options.reuseTiles?(e.DomUtil.removeClass(i,"leaflet-tile-loaded"),this._unusedTiles.push(i)):i.parentNode===this._container&&this._container.removeChild(i),e.Browser.android||(i.src=e.Util.emptyImageUrl),delete this._tiles[t]},_addTile:function(t,i){var s=this._getTilePos(t),o=this._getTile();e.DomUtil.setPosition(o,s,e.Browser.chrome||e.Browser.android23),this._tiles[t.x+":"+t.y]=o,this._loadTile(o,t),o.parentNode!==this._container&&i.appendChild(o)},_getZoomForUrl:function(){var t=this.options,i=this._map.getZoom();return t.zoomReverse&&(i=t.maxZoom-i),i+t.zoomOffset},_getTilePos:function(t){var i=this._map.getPixelOrigin(),s=this.options.tileSize;return t.multiplyBy(s).subtract(i)},getTileUrl:function(t){return this._adjustTilePoint(t),e.Util.template(this._url,e.extend({s:this._getSubdomain(t),z:this._getZoomForUrl(),x:t.x,y:t.y},this.options))},_getWrapTileNum:function(){return Math.pow(2,this._getZoomForUrl())},_adjustTilePoint:function(t){var i=this._getWrapTileNum();this.options.continuousWorld||this.options.noWrap||(t.x=(t.x%i+i)%i),this.options.tms&&(t.y=i-t.y-1)},_getSubdomain:function(t){var i=(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[i]},_createTileProto:function(){var t=this._tileImg=e.DomUtil.create("img","leaflet-tile");t.style.width=t.style.height=this.options.tileSize+"px",t.galleryimg="no"},_getTile:function(){if(this.options.reuseTiles&&this._unusedTiles.length>0){var t=this._unusedTiles.pop();return this._resetTile(t),t}return this._createTile()},_resetTile:function(){},_createTile:function(){var t=this._tileImg.cloneNode(!1);return t.onselectstart=t.onmousemove=e.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t.onload=this._tileOnLoad,t.onerror=this._tileOnError,t.src=this.getTileUrl(i)},_tileLoaded:function(){this._tilesToLoad--,this._tilesToLoad||this.fire("load")},_tileOnLoad:function(){var t=this._layer;this.src!==e.Util.emptyImageUrl&&(e.DomUtil.addClass(this,"leaflet-tile-loaded"),t.fire("tileload",{tile:this,url:this.src})),t._tileLoaded()},_tileOnError:function(){var t=this._layer;t.fire("tileerror",{tile:this,url:this.src});var i=t.options.errorTileUrl;i&&(this.src=i),t._tileLoaded()}}),e.tileLayer=function(t,i){return new e.TileLayer(t,i)},e.TileLayer.WMS=e.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},initialize:function(t,i){this._url=t;var s=e.extend({},this.defaultWmsParams);s.width=s.height=i.detectRetina&&e.Browser.retina?2*this.options.tileSize:this.options.tileSize;for(var o in i)this.options.hasOwnProperty(o)||(s[o]=i[o]);this.wmsParams=s,e.setOptions(this,i)},onAdd:function(t){var i=parseFloat(this.wmsParams.version)>=1.3?"crs":"srs";this.wmsParams[i]=t.options.crs.code,e.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t,i){this._adjustTilePoint(t);var s=this._map,o=s.options.crs,n=this.options.tileSize,a=t.multiplyBy(n),r=a.add(new e.Point(n,n)),h=o.project(s.unproject(a,i)),l=o.project(s.unproject(r,i)),c=[h.x,l.y,l.x,h.y].join(","),m=e.Util.template(this._url,{s:this._getSubdomain(t)});return m+e.Util.getParamString(this.wmsParams,m)+"&bbox="+c},setParams:function(t,i){return e.extend(this.wmsParams,t),i||this.redraw(),this}}),e.tileLayer.wms=function(t,i){return new e.TileLayer.WMS(t,i)},e.TileLayer.Canvas=e.TileLayer.extend({options:{async:!1},initialize:function(t){e.setOptions(this,t)},redraw:function(){var t=this._tiles;for(var i in t)t.hasOwnProperty(i)&&this._redrawTile(t[i])},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTileProto:function(){var t=this._canvasProto=e.DomUtil.create("canvas","leaflet-tile");t.width=t.height=this.options.tileSize},_createTile:function(){var t=this._canvasProto.cloneNode(!1);return t.onselectstart=t.onmousemove=e.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t._tilePoint=i,this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(){},tileDrawn:function(t){this._tileOnLoad.call(t)}}),e.tileLayer.canvas=function(t){return new e.TileLayer.Canvas(t)},e.ImageOverlay=e.Class.extend({includes:e.Mixin.Events,options:{opacity:1},initialize:function(t,i,s){this._url=t,this._bounds=e.latLngBounds(i),e.setOptions(this,s)},onAdd:function(t){this._map=t,this._image||this._initImage(),t._panes.overlayPane.appendChild(this._image),t.on("viewreset",this._reset,this),t.options.zoomAnimation&&e.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._image),t.off("viewreset",this._reset,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},bringToFront:function(){return this._image&&this._map._panes.overlayPane.appendChild(this._image),this},bringToBack:function(){var t=this._map._panes.overlayPane;return this._image&&t.insertBefore(this._image,t.firstChild),this},_initImage:function(){this._image=e.DomUtil.create("img","leaflet-image-layer"),this._map.options.zoomAnimation&&e.Browser.any3d?e.DomUtil.addClass(this._image,"leaflet-zoom-animated"):e.DomUtil.addClass(this._image,"leaflet-zoom-hide"),this._updateOpacity(),e.extend(this._image,{galleryimg:"no",onselectstart:e.Util.falseFn,onmousemove:e.Util.falseFn,onload:e.bind(this._onImageLoad,this),src:this._url})},_animateZoom:function(t){var i=this._map,s=this._image,o=i.getZoomScale(t.zoom),n=this._bounds.getNorthWest(),a=this._bounds.getSouthEast(),r=i._latLngToNewLayerPoint(n,t.zoom,t.center),h=i._latLngToNewLayerPoint(a,t.zoom,t.center)._subtract(r),l=r._add(h._multiplyBy(.5*(1-1/o)));s.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(l)+" scale("+o+") "},_reset:function(){var t=this._image,i=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),s=this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(i);e.DomUtil.setPosition(t,i),t.style.width=s.x+"px",t.style.height=s.y+"px"},_onImageLoad:function(){this.fire("load")},_updateOpacity:function(){e.DomUtil.setOpacity(this._image,this.options.opacity)}}),e.imageOverlay=function(t,i,s){return new e.ImageOverlay(t,i,s)},e.Icon=e.Class.extend({options:{className:""},initialize:function(t){e.setOptions(this,t)},createIcon:function(){return this._createIcon("icon")},createShadow:function(){return this._createIcon("shadow")},_createIcon:function(t){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw Error("iconUrl not set in Icon options (see the docs).");return null}var s=this._createImg(i);return this._setIconStyles(s,t),s},_setIconStyles:function(t,i){var s,o=this.options,n=e.point(o[i+"Size"]);s="shadow"===i?e.point(o.shadowAnchor||o.iconAnchor):e.point(o.iconAnchor),!s&&n&&(s=n.divideBy(2,!0)),t.className="leaflet-marker-"+i+" "+o.className,s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),n&&(t.style.width=n.x+"px",t.style.height=n.y+"px")},_createImg:function(t){var s;return e.Browser.ie6?(s=i.createElement("div"),s.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+t+'")'):(s=i.createElement("img"),s.src=t),s},_getIconUrl:function(t){return e.Browser.retina&&this.options[t+"RetinaUrl"]?this.options[t+"RetinaUrl"]:this.options[t+"Url"]}}),e.icon=function(t){return new e.Icon(t)},e.Icon.Default=e.Icon.extend({options:{iconSize:new e.Point(25,41),iconAnchor:new e.Point(12,41),popupAnchor:new e.Point(1,-34),shadowSize:new e.Point(41,41)},_getIconUrl:function(t){var i=t+"Url";if(this.options[i])return this.options[i];e.Browser.retina&&"icon"===t&&(t+="@2x");var s=e.Icon.Default.imagePath;if(!s)throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return "marker-"+t+".png"}}),e.Icon.Default.imagePath=function(){var t,s,e,o,n=i.getElementsByTagName("script"),a=/\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,s=n.length;s>t;t++)if(e=n[t].src,o=e.match(a))return e.split(a)[0]+""}(),e.Marker=e.Class.extend({includes:e.Mixin.Events,options:{icon:new e.Icon.Default,title:"",clickable:!0,draggable:!1,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250},initialize:function(t,i){e.setOptions(this,i),this._latlng=e.latLng(t)},onAdd:function(t){this._map=t,t.on("viewreset",this.update,this),this._initIcon(),this.update(),t.options.zoomAnimation&&t.options.markerZoomAnimation&&t.on("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._removeIcon(),this.fire("remove"),t.off({viewreset:this.update,zoomanim:this._animateZoom},this),this._map=null},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=e.latLng(t),this.update(),this.fire("move",{latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update(),this},setIcon:function(t){return this._map&&this._removeIcon(),this.options.icon=t,this._map&&(this._initIcon(),this.update()),this},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,i=this._map,s=i.options.zoomAnimation&&i.options.markerZoomAnimation,o=s?"leaflet-zoom-animated":"leaflet-zoom-hide",n=!1;this._icon||(this._icon=t.icon.createIcon(),t.title&&(this._icon.title=t.title),this._initInteraction(),n=1>this.options.opacity,e.DomUtil.addClass(this._icon,o),t.riseOnHover&&e.DomEvent.on(this._icon,"mouseover",this._bringToFront,this).on(this._icon,"mouseout",this._resetZIndex,this)),this._shadow||(this._shadow=t.icon.createShadow(),this._shadow&&(e.DomUtil.addClass(this._shadow,o),n=1>this.options.opacity)),n&&this._updateOpacity();var a=this._map._panes;a.markerPane.appendChild(this._icon),this._shadow&&a.shadowPane.appendChild(this._shadow)},_removeIcon:function(){var t=this._map._panes;this.options.riseOnHover&&e.DomEvent.off(this._icon,"mouseover",this._bringToFront).off(this._icon,"mouseout",this._resetZIndex),t.markerPane.removeChild(this._icon),this._shadow&&t.shadowPane.removeChild(this._shadow),this._icon=this._shadow=null},_setPos:function(t){e.DomUtil.setPosition(this._icon,t),this._shadow&&e.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPos(i)},_initInteraction:function(){if(this.options.clickable){var t=this._icon,i=["dblclick","mousedown","mouseover","mouseout","contextmenu"];e.DomUtil.addClass(t,"leaflet-clickable"),e.DomEvent.on(t,"click",this._onMouseClick,this);for(var s=0;i.length>s;s++)e.DomEvent.on(t,i[s],this._fireMouseEvent,this);e.Handler.MarkerDrag&&(this.dragging=new e.Handler.MarkerDrag(this),this.options.draggable&&this.dragging.enable())}},_onMouseClick:function(t){var i=this.dragging&&this.dragging.moved();(this.hasEventListeners(t.type)||i)&&e.DomEvent.stopPropagation(t),i||(this.dragging&&this.dragging._enabled||!this._map.dragging||!this._map.dragging.moved())&&this.fire(t.type,{originalEvent:t})},_fireMouseEvent:function(t){this.fire(t.type,{originalEvent:t}),"contextmenu"===t.type&&this.hasEventListeners(t.type)&&e.DomEvent.preventDefault(t),"mousedown"!==t.type&&e.DomEvent.stopPropagation(t)},setOpacity:function(t){this.options.opacity=t,this._map&&this._updateOpacity()},_updateOpacity:function(){e.DomUtil.setOpacity(this._icon,this.options.opacity),this._shadow&&e.DomUtil.setOpacity(this._shadow,this.options.opacity)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),e.marker=function(t,i){return new e.Marker(t,i)},e.DivIcon=e.Icon.extend({options:{iconSize:new e.Point(12,12),className:"leaflet-div-icon"},createIcon:function(){var t=i.createElement("div"),s=this.options;return s.html&&(t.innerHTML=s.html),s.bgPos&&(t.style.backgroundPosition=-s.bgPos.x+"px "+-s.bgPos.y+"px"),this._setIconStyles(t,"icon"),t},createShadow:function(){return null}}),e.divIcon=function(t){return new e.DivIcon(t)},e.Map.mergeOptions({closePopupOnClick:!0}),e.Popup=e.Class.extend({includes:e.Mixin.Events,options:{minWidth:50,maxWidth:300,maxHeight:null,autoPan:!0,closeButton:!0,offset:new e.Point(0,6),autoPanPadding:new e.Point(5,5),className:"",zoomAnimation:!0},initialize:function(t,i){e.setOptions(this,t),this._source=i,this._animated=e.Browser.any3d&&this.options.zoomAnimation},onAdd:function(t){this._map=t,this._container||this._initLayout(),this._updateContent();var i=t.options.fadeAnimation;i&&e.DomUtil.setOpacity(this._container,0),t._panes.popupPane.appendChild(this._container),t.on("viewreset",this._updatePosition,this),this._animated&&t.on("zoomanim",this._zoomAnimation,this),t.options.closePopupOnClick&&t.on("preclick",this._close,this),this._update(),i&&e.DomUtil.setOpacity(this._container,1)},addTo:function(t){return t.addLayer(this),this},openOn:function(t){return t.openPopup(this),this},onRemove:function(t){t._panes.popupPane.removeChild(this._container),e.Util.falseFn(this._container.offsetWidth),t.off({viewreset:this._updatePosition,preclick:this._close,zoomanim:this._zoomAnimation},this),t.options.fadeAnimation&&e.DomUtil.setOpacity(this._container,0),this._map=null},setLatLng:function(t){return this._latlng=e.latLng(t),this._update(),this},setContent:function(t){return this._content=t,this._update(),this},_close:function(){var t=this._map;t&&(t._popup=null,t.removeLayer(this).fire("popupclose",{popup:this}))},_initLayout:function(){var t,i="leaflet-popup",s=i+" "+this.options.className+" leaflet-zoom-"+(this._animated?"animated":"hide"),o=this._container=e.DomUtil.create("div",s);this.options.closeButton&&(t=this._closeButton=e.DomUtil.create("a",i+"-close-button",o),t.href="#close",t.innerHTML="&#215;",e.DomEvent.on(t,"click",this._onCloseButtonClick,this));var n=this._wrapper=e.DomUtil.create("div",i+"-content-wrapper",o);e.DomEvent.disableClickPropagation(n),this._contentNode=e.DomUtil.create("div",i+"-content",n),e.DomEvent.on(this._contentNode,"mousewheel",e.DomEvent.stopPropagation),this._tipContainer=e.DomUtil.create("div",i+"-tip-container",o),this._tip=e.DomUtil.create("div",i+"-tip",this._tipContainer)},_update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},_updateContent:function(){if(this._content){if("string"==typeof this._content)this._contentNode.innerHTML=this._content;else{for(;this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)}this.fire("contentupdate")}},_updateLayout:function(){var t=this._contentNode,i=t.style;i.width="",i.whiteSpace="nowrap";var s=t.offsetWidth;s=Math.min(s,this.options.maxWidth),s=Math.max(s,this.options.minWidth),i.width=s+1+"px",i.whiteSpace="",i.height="";var o=t.offsetHeight,n=this.options.maxHeight,a="leaflet-popup-scrolled";n&&o>n?(i.height=n+"px",e.DomUtil.addClass(t,a)):e.DomUtil.removeClass(t,a),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),i=this._animated,s=this.options.offset;i&&e.DomUtil.setPosition(this._container,t),this._containerBottom=-s.y-(i?0:t.y),this._containerLeft=-Math.round(this._containerWidth/2)+s.x+(i?0:t.x),this._container.style.bottom=this._containerBottom+"px",this._container.style.left=this._containerLeft+"px"}},_zoomAnimation:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);e.DomUtil.setPosition(this._container,i)},_adjustPan:function(){if(this.options.autoPan){var t=this._map,i=this._container.offsetHeight,s=this._containerWidth,o=new e.Point(this._containerLeft,-i-this._containerBottom);this._animated&&o._add(e.DomUtil.getPosition(this._container));var n=t.layerPointToContainerPoint(o),a=this.options.autoPanPadding,r=t.getSize(),h=0,l=0;0>n.x&&(h=n.x-a.x),n.x+s>r.x&&(h=n.x+s-r.x+a.x),0>n.y&&(l=n.y-a.y),n.y+i>r.y&&(l=n.y+i-r.y+a.y),(h||l)&&t.panBy(new e.Point(h,l))}},_onCloseButtonClick:function(t){this._close(),e.DomEvent.stop(t)}}),e.popup=function(t,i){return new e.Popup(t,i)},e.Marker.include({openPopup:function(){return this._popup&&this._map&&(this._popup.setLatLng(this._latlng),this._map.openPopup(this._popup)),this},closePopup:function(){return this._popup&&this._popup._close(),this},bindPopup:function(t,i){var s=e.point(this.options.icon.options.popupAnchor)||new e.Point(0,0);return s=s.add(e.Popup.prototype.options.offset),i&&i.offset&&(s=s.add(i.offset)),i=e.extend({offset:s},i),this._popup||this.on("click",this.openPopup,this).on("remove",this.closePopup,this).on("move",this._movePopup,this),this._popup=new e.Popup(i,this).setContent(t),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this.openPopup).off("remove",this.closePopup).off("move",this._movePopup)),this},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),e.Map.include({openPopup:function(t){return this.closePopup(),this._popup=t,this.addLayer(t).fire("popupopen",{popup:this._popup})},closePopup:function(){return this._popup&&this._popup._close(),this}}),e.LayerGroup=e.Class.extend({initialize:function(t){this._layers={};var i,s;if(t)for(i=0,s=t.length;s>i;i++)this.addLayer(t[i])},addLayer:function(t){var i=e.stamp(t);return this._layers[i]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var i=e.stamp(t);return delete this._layers[i],this._map&&this._map.removeLayer(t),this},clearLayers:function(){return this.eachLayer(this.removeLayer,this),this},invoke:function(t){var i,s,e=Array.prototype.slice.call(arguments,1);for(i in this._layers)this._layers.hasOwnProperty(i)&&(s=this._layers[i],s[t]&&s[t].apply(s,e));return this},onAdd:function(t){this._map=t,this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t),this._map=null},addTo:function(t){return t.addLayer(this),this},eachLayer:function(t,i){for(var s in this._layers)this._layers.hasOwnProperty(s)&&t.call(i,this._layers[s])},setZIndex:function(t){return this.invoke("setZIndex",t)}}),e.layerGroup=function(t){return new e.LayerGroup(t)},e.FeatureGroup=e.LayerGroup.extend({includes:e.Mixin.Events,statics:{EVENTS:"click dblclick mouseover mouseout mousemove contextmenu"},addLayer:function(t){return this._layers[e.stamp(t)]?this:(t.on(e.FeatureGroup.EVENTS,this._propagateEvent,this),e.LayerGroup.prototype.addLayer.call(this,t),this._popupContent&&t.bindPopup&&t.bindPopup(this._popupContent,this._popupOptions),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return t.off(e.FeatureGroup.EVENTS,this._propagateEvent,this),e.LayerGroup.prototype.removeLayer.call(this,t),this._popupContent&&this.invoke("unbindPopup"),this.fire("layerremove",{layer:t})},bindPopup:function(t,i){return this._popupContent=t,this._popupOptions=i,this.invoke("bindPopup",t,i)},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new e.LatLngBounds;return this.eachLayer(function(i){t.extend(i instanceof e.Marker?i.getLatLng():i.getBounds())}),t},_propagateEvent:function(t){t.layer=t.target,t.target=this,this.fire(t.type,t)}}),e.featureGroup=function(t){return new e.FeatureGroup(t)},e.Path=e.Class.extend({includes:[e.Mixin.Events],statics:{CLIP_PADDING:e.Browser.mobile?Math.max(0,Math.min(.5,(1280/Math.max(t.innerWidth,t.innerHeight)-1)/2)):.5},options:{stroke:!0,color:"#0033ff",dashArray:null,weight:5,opacity:.5,fill:!1,fillColor:null,fillOpacity:.2,clickable:!0},initialize:function(t){e.setOptions(this,t)},onAdd:function(t){this._map=t,this._container||(this._initElements(),this._initEvents()),this.projectLatlngs(),this._updatePath(),this._container&&this._map._pathRoot.appendChild(this._container),this.fire("add"),t.on({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t._pathRoot.removeChild(this._container),this.fire("remove"),this._map=null,e.Browser.vml&&(this._container=null,this._stroke=null,this._fill=null),t.off({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},projectLatlngs:function(){},setStyle:function(t){return e.setOptions(this,t),this._container&&this._updateStyle(),this},redraw:function(){return this._map&&(this.projectLatlngs(),this._updatePath()),this}}),e.Map.include({_updatePathViewport:function(){var t=e.Path.CLIP_PADDING,i=this.getSize(),s=e.DomUtil.getPosition(this._mapPane),o=s.multiplyBy(-1)._subtract(i.multiplyBy(t)._round()),n=o.add(i.multiplyBy(1+2*t)._round());this._pathViewport=new e.Bounds(o,n)}}),e.Path.SVG_NS="http://www.w3.org/2000/svg",e.Browser.svg=!(!i.createElementNS||!i.createElementNS(e.Path.SVG_NS,"svg").createSVGRect),e.Path=e.Path.extend({statics:{SVG:e.Browser.svg},bringToFront:function(){var t=this._map._pathRoot,i=this._container;return i&&t.lastChild!==i&&t.appendChild(i),this},bringToBack:function(){var t=this._map._pathRoot,i=this._container,s=t.firstChild;return i&&s!==i&&t.insertBefore(i,s),this},getPathString:function(){},_createElement:function(t){return i.createElementNS(e.Path.SVG_NS,t)},_initElements:function(){this._map._initPathRoot(),this._initPath(),this._initStyle()},_initPath:function(){this._container=this._createElement("g"),this._path=this._createElement("path"),this._container.appendChild(this._path)},_initStyle:function(){this.options.stroke&&(this._path.setAttribute("stroke-linejoin","round"),this._path.setAttribute("stroke-linecap","round")),this.options.fill&&this._path.setAttribute("fill-rule","evenodd"),this._updateStyle()},_updateStyle:function(){this.options.stroke?(this._path.setAttribute("stroke",this.options.color),this._path.setAttribute("stroke-opacity",this.options.opacity),this._path.setAttribute("stroke-width",this.options.weight),this.options.dashArray?this._path.setAttribute("stroke-dasharray",this.options.dashArray):this._path.removeAttribute("stroke-dasharray")):this._path.setAttribute("stroke","none"),this.options.fill?(this._path.setAttribute("fill",this.options.fillColor||this.options.color),this._path.setAttribute("fill-opacity",this.options.fillOpacity)):this._path.setAttribute("fill","none")},_updatePath:function(){var t=this.getPathString();t||(t="M0 0"),this._path.setAttribute("d",t)},_initEvents:function(){if(this.options.clickable){(e.Browser.svg||!e.Browser.vml)&&this._path.setAttribute("class","leaflet-clickable"),e.DomEvent.on(this._container,"click",this._onMouseClick,this);for(var t=["dblclick","mousedown","mouseover","mouseout","mousemove","contextmenu"],i=0;t.length>i;i++)e.DomEvent.on(this._container,t[i],this._fireMouseEvent,this)}},_onMouseClick:function(t){this._map.dragging&&this._map.dragging.moved()||this._fireMouseEvent(t)},_fireMouseEvent:function(t){if(this.hasEventListeners(t.type)){var i=this._map,s=i.mouseEventToContainerPoint(t),o=i.containerPointToLayerPoint(s),n=i.layerPointToLatLng(o);this.fire(t.type,{latlng:n,layerPoint:o,containerPoint:s,originalEvent:t}),"contextmenu"===t.type&&e.DomEvent.preventDefault(t),"mousemove"!==t.type&&e.DomEvent.stopPropagation(t)}}}),e.Map.include({_initPathRoot:function(){this._pathRoot||(this._pathRoot=e.Path.prototype._createElement("svg"),this._panes.overlayPane.appendChild(this._pathRoot),this.options.zoomAnimation&&e.Browser.any3d?(this._pathRoot.setAttribute("class"," leaflet-zoom-animated"),this.on({zoomanim:this._animatePathZoom,zoomend:this._endPathZoom})):this._pathRoot.setAttribute("class"," leaflet-zoom-hide"),this.on("moveend",this._updateSvgViewport),this._updateSvgViewport())},_animatePathZoom:function(t){var i=this.getZoomScale(t.zoom),s=this._getCenterOffset(t.center)._multiplyBy(-i)._add(this._pathViewport.min);this._pathRoot.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(s)+" scale("+i+") ",this._pathZooming=!0},_endPathZoom:function(){this._pathZooming=!1},_updateSvgViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,i=t.min,s=t.max,o=s.x-i.x,n=s.y-i.y,a=this._pathRoot,r=this._panes.overlayPane;e.Browser.mobileWebkit&&r.removeChild(a),e.DomUtil.setPosition(a,i),a.setAttribute("width",o),a.setAttribute("height",n),a.setAttribute("viewBox",[i.x,i.y,o,n].join(" ")),e.Browser.mobileWebkit&&r.appendChild(a)}}}),e.Path.include({bindPopup:function(t,i){return(!this._popup||i)&&(this._popup=new e.Popup(i,this)),this._popup.setContent(t),this._popupHandlersAdded||(this.on("click",this._openPopup,this).on("remove",this.closePopup,this),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this._openPopup).off("remove",this.closePopup),this._popupHandlersAdded=!1),this},openPopup:function(t){return this._popup&&(t=t||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],this._openPopup({latlng:t})),this},closePopup:function(){return this._popup&&this._popup._close(),this},_openPopup:function(t){this._popup.setLatLng(t.latlng),this._map.openPopup(this._popup)}}),e.Browser.vml=!e.Browser.svg&&function(){try{var t=i.createElement("div");t.innerHTML='<v:shape adj="1"/>';var s=t.firstChild;return s.style.behavior="url(#default#VML)",s&&"object"==typeof s.adj}catch(e){return!1}}(),e.Path=e.Browser.svg||!e.Browser.vml?e.Path:e.Path.extend({statics:{VML:!0,CLIP_PADDING:.02},_createElement:function(){try{return i.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return i.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return i.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_initPath:function(){var t=this._container=this._createElement("shape");e.DomUtil.addClass(t,"leaflet-vml-shape"),this.options.clickable&&e.DomUtil.addClass(t,"leaflet-clickable"),t.coordsize="1 1",this._path=this._createElement("path"),t.appendChild(this._path),this._map._pathRoot.appendChild(t)},_initStyle:function(){this._updateStyle()},_updateStyle:function(){var t=this._stroke,i=this._fill,s=this.options,e=this._container;e.stroked=s.stroke,e.filled=s.fill,s.stroke?(t||(t=this._stroke=this._createElement("stroke"),t.endcap="round",e.appendChild(t)),t.weight=s.weight+"px",t.color=s.color,t.opacity=s.opacity,t.dashStyle=s.dashArray?s.dashArray instanceof Array?s.dashArray.join(" "):s.dashArray.replace(/ *, */g," "):""):t&&(e.removeChild(t),this._stroke=null),s.fill?(i||(i=this._fill=this._createElement("fill"),e.appendChild(i)),i.color=s.fillColor||s.color,i.opacity=s.fillOpacity):i&&(e.removeChild(i),this._fill=null)},_updatePath:function(){var t=this._container.style;t.display="none",this._path.v=this.getPathString()+" ",t.display=""}}),e.Map.include(e.Browser.svg||!e.Browser.vml?{}:{_initPathRoot:function(){if(!this._pathRoot){var t=this._pathRoot=i.createElement("div");t.className="leaflet-vml-container",this._panes.overlayPane.appendChild(t),this.on("moveend",this._updatePathViewport),this._updatePathViewport()}}}),e.Browser.canvas=function(){return!!i.createElement("canvas").getContext}(),e.Path=e.Path.SVG&&!t.L_PREFER_CANVAS||!e.Browser.canvas?e.Path:e.Path.extend({statics:{CANVAS:!0,SVG:!1},redraw:function(){return this._map&&(this.projectLatlngs(),this._requestUpdate()),this},setStyle:function(t){return e.setOptions(this,t),this._map&&(this._updateStyle(),this._requestUpdate()),this},onRemove:function(t){t.off("viewreset",this.projectLatlngs,this).off("moveend",this._updatePath,this),this.options.clickable&&this._map.off("click",this._onClick,this),this._requestUpdate(),this._map=null},_requestUpdate:function(){this._map&&!e.Path._updateRequest&&(e.Path._updateRequest=e.Util.requestAnimFrame(this._fireMapMoveEnd,this._map))},_fireMapMoveEnd:function(){e.Path._updateRequest=null,this.fire("moveend")},_initElements:function(){this._map._initPathRoot(),this._ctx=this._map._canvasCtx},_updateStyle:function(){var t=this.options;t.stroke&&(this._ctx.lineWidth=t.weight,this._ctx.strokeStyle=t.color),t.fill&&(this._ctx.fillStyle=t.fillColor||t.color)},_drawPath:function(){var t,i,s,o,n,a;for(this._ctx.beginPath(),t=0,s=this._parts.length;s>t;t++){for(i=0,o=this._parts[t].length;o>i;i++)n=this._parts[t][i],a=(0===i?"move":"line")+"To",this._ctx[a](n.x,n.y);this instanceof e.Polygon&&this._ctx.closePath()}},_checkIfEmpty:function(){return!this._parts.length},_updatePath:function(){if(!this._checkIfEmpty()){var t=this._ctx,i=this.options;this._drawPath(),t.save(),this._updateStyle(),i.fill&&(t.globalAlpha=i.fillOpacity,t.fill()),i.stroke&&(t.globalAlpha=i.opacity,t.stroke()),t.restore()
}},_initEvents:function(){this.options.clickable&&this._map.on("click",this._onClick,this)},_onClick:function(t){this._containsPoint(t.layerPoint)&&this.fire("click",{latlng:t.latlng,layerPoint:t.layerPoint,containerPoint:t.containerPoint,originalEvent:t})}}),e.Map.include(e.Path.SVG&&!t.L_PREFER_CANVAS||!e.Browser.canvas?{}:{_initPathRoot:function(){var t,s=this._pathRoot;s||(s=this._pathRoot=i.createElement("canvas"),s.style.position="absolute",t=this._canvasCtx=s.getContext("2d"),t.lineCap="round",t.lineJoin="round",this._panes.overlayPane.appendChild(s),this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",this.on("zoomanim",this._animatePathZoom),this.on("zoomend",this._endPathZoom)),this.on("moveend",this._updateCanvasViewport),this._updateCanvasViewport())},_updateCanvasViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,i=t.min,s=t.max.subtract(i),o=this._pathRoot;e.DomUtil.setPosition(o,i),o.width=s.x,o.height=s.y,o.getContext("2d").translate(-i.x,-i.y)}}}),e.LineUtil={simplify:function(t,i){if(!i||!t.length)return t.slice();var s=i*i;return t=this._reducePoints(t,s),t=this._simplifyDP(t,s)},pointToSegmentDistance:function(t,i,s){return Math.sqrt(this._sqClosestPointOnSegment(t,i,s,!0))},closestPointOnSegment:function(t,i,s){return this._sqClosestPointOnSegment(t,i,s)},_simplifyDP:function(t,i){var e=t.length,o=typeof Uint8Array!=s+""?Uint8Array:Array,n=new o(e);n[0]=n[e-1]=1,this._simplifyDPStep(t,n,i,0,e-1);var a,r=[];for(a=0;e>a;a++)n[a]&&r.push(t[a]);return r},_simplifyDPStep:function(t,i,s,e,o){var n,a,r,h=0;for(a=e+1;o-1>=a;a++)r=this._sqClosestPointOnSegment(t[a],t[e],t[o],!0),r>h&&(n=a,h=r);h>s&&(i[n]=1,this._simplifyDPStep(t,i,s,e,n),this._simplifyDPStep(t,i,s,n,o))},_reducePoints:function(t,i){for(var s=[t[0]],e=1,o=0,n=t.length;n>e;e++)this._sqDist(t[e],t[o])>i&&(s.push(t[e]),o=e);return n-1>o&&s.push(t[n-1]),s},clipSegment:function(t,i,s,e){var o,n,a,r=e?this._lastCode:this._getBitCode(t,s),h=this._getBitCode(i,s);for(this._lastCode=h;;){if(!(r|h))return[t,i];if(r&h)return!1;o=r||h,n=this._getEdgeIntersection(t,i,o,s),a=this._getBitCode(n,s),o===r?(t=n,r=a):(i=n,h=a)}},_getEdgeIntersection:function(t,i,o,n){var a=i.x-t.x,r=i.y-t.y,h=n.min,l=n.max;return 8&o?new e.Point(t.x+a*(l.y-t.y)/r,l.y):4&o?new e.Point(t.x+a*(h.y-t.y)/r,h.y):2&o?new e.Point(l.x,t.y+r*(l.x-t.x)/a):1&o?new e.Point(h.x,t.y+r*(h.x-t.x)/a):s},_getBitCode:function(t,i){var s=0;return t.x<i.min.x?s|=1:t.x>i.max.x&&(s|=2),t.y<i.min.y?s|=4:t.y>i.max.y&&(s|=8),s},_sqDist:function(t,i){var s=i.x-t.x,e=i.y-t.y;return s*s+e*e},_sqClosestPointOnSegment:function(t,i,s,o){var n,a=i.x,r=i.y,h=s.x-a,l=s.y-r,c=h*h+l*l;return c>0&&(n=((t.x-a)*h+(t.y-r)*l)/c,n>1?(a=s.x,r=s.y):n>0&&(a+=h*n,r+=l*n)),h=t.x-a,l=t.y-r,o?h*h+l*l:new e.Point(a,r)}},e.Polyline=e.Path.extend({initialize:function(t,i){e.Path.prototype.initialize.call(this,i),this._latlngs=this._convertLatLngs(t)},options:{smoothFactor:1,noClip:!1},projectLatlngs:function(){this._originalPoints=[];for(var t=0,i=this._latlngs.length;i>t;t++)this._originalPoints[t]=this._map.latLngToLayerPoint(this._latlngs[t])},getPathString:function(){for(var t=0,i=this._parts.length,s="";i>t;t++)s+=this._getPathPartStr(this._parts[t]);return s},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._latlngs=this._convertLatLngs(t),this.redraw()},addLatLng:function(t){return this._latlngs.push(e.latLng(t)),this.redraw()},spliceLatLngs:function(){var t=[].splice.apply(this._latlngs,arguments);return this._convertLatLngs(this._latlngs),this.redraw(),t},closestLayerPoint:function(t){for(var i,s,o=1/0,n=this._parts,a=null,r=0,h=n.length;h>r;r++)for(var l=n[r],c=1,m=l.length;m>c;c++){i=l[c-1],s=l[c];var u=e.LineUtil._sqClosestPointOnSegment(t,i,s,!0);o>u&&(o=u,a=e.LineUtil._sqClosestPointOnSegment(t,i,s))}return a&&(a.distance=Math.sqrt(o)),a},getBounds:function(){var t,i,s=new e.LatLngBounds,o=this.getLatLngs();for(t=0,i=o.length;i>t;t++)s.extend(o[t]);return s},_convertLatLngs:function(t){var i,s;for(i=0,s=t.length;s>i;i++){if(e.Util.isArray(t[i])&&"number"!=typeof t[i][0])return;t[i]=e.latLng(t[i])}return t},_initEvents:function(){e.Path.prototype._initEvents.call(this)},_getPathPartStr:function(t){for(var i,s=e.Path.VML,o=0,n=t.length,a="";n>o;o++)i=t[o],s&&i._round(),a+=(o?"L":"M")+i.x+" "+i.y;return a},_clipPoints:function(){var t,i,o,n=this._originalPoints,a=n.length;if(this.options.noClip)return this._parts=[n],s;this._parts=[];var r=this._parts,h=this._map._pathViewport,l=e.LineUtil;for(t=0,i=0;a-1>t;t++)o=l.clipSegment(n[t],n[t+1],h,t),o&&(r[i]=r[i]||[],r[i].push(o[0]),(o[1]!==n[t+1]||t===a-2)&&(r[i].push(o[1]),i++))},_simplifyPoints:function(){for(var t=this._parts,i=e.LineUtil,s=0,o=t.length;o>s;s++)t[s]=i.simplify(t[s],this.options.smoothFactor)},_updatePath:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),e.Path.prototype._updatePath.call(this))}}),e.polyline=function(t,i){return new e.Polyline(t,i)},e.PolyUtil={},e.PolyUtil.clipPolygon=function(t,i){var s,o,n,a,r,h,l,c,m,u=[1,4,2,8],d=e.LineUtil;for(o=0,l=t.length;l>o;o++)t[o]._code=d._getBitCode(t[o],i);for(a=0;4>a;a++){for(c=u[a],s=[],o=0,l=t.length,n=l-1;l>o;n=o++)r=t[o],h=t[n],r._code&c?h._code&c||(m=d._getEdgeIntersection(h,r,c,i),m._code=d._getBitCode(m,i),s.push(m)):(h._code&c&&(m=d._getEdgeIntersection(h,r,c,i),m._code=d._getBitCode(m,i),s.push(m)),s.push(r));t=s}return t},e.Polygon=e.Polyline.extend({options:{fill:!0},initialize:function(t,i){e.Polyline.prototype.initialize.call(this,t,i),t&&e.Util.isArray(t[0])&&"number"!=typeof t[0][0]&&(this._latlngs=this._convertLatLngs(t[0]),this._holes=t.slice(1))},projectLatlngs:function(){if(e.Polyline.prototype.projectLatlngs.call(this),this._holePoints=[],this._holes){var t,i,s,o;for(t=0,s=this._holes.length;s>t;t++)for(this._holePoints[t]=[],i=0,o=this._holes[t].length;o>i;i++)this._holePoints[t][i]=this._map.latLngToLayerPoint(this._holes[t][i])}},_clipPoints:function(){var t=this._originalPoints,i=[];if(this._parts=[t].concat(this._holePoints),!this.options.noClip){for(var s=0,o=this._parts.length;o>s;s++){var n=e.PolyUtil.clipPolygon(this._parts[s],this._map._pathViewport);n.length&&i.push(n)}this._parts=i}},_getPathPartStr:function(t){var i=e.Polyline.prototype._getPathPartStr.call(this,t);return i+(e.Browser.svg?"z":"x")}}),e.polygon=function(t,i){return new e.Polygon(t,i)},function(){function t(t){return e.FeatureGroup.extend({initialize:function(t,i){this._layers={},this._options=i,this.setLatLngs(t)},setLatLngs:function(i){var s=0,e=i.length;for(this.eachLayer(function(t){e>s?t.setLatLngs(i[s++]):this.removeLayer(t)},this);e>s;)this.addLayer(new t(i[s++],this._options));return this}})}e.MultiPolyline=t(e.Polyline),e.MultiPolygon=t(e.Polygon),e.multiPolyline=function(t,i){return new e.MultiPolyline(t,i)},e.multiPolygon=function(t,i){return new e.MultiPolygon(t,i)}}(),e.Rectangle=e.Polygon.extend({initialize:function(t,i){e.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),i)},setBounds:function(t){this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=e.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),e.rectangle=function(t,i){return new e.Rectangle(t,i)},e.Circle=e.Path.extend({initialize:function(t,i,s){e.Path.prototype.initialize.call(this,s),this._latlng=e.latLng(t),this._mRadius=i},options:{fill:!0},setLatLng:function(t){return this._latlng=e.latLng(t),this.redraw()},setRadius:function(t){return this._mRadius=t,this.redraw()},projectLatlngs:function(){var t=this._getLngRadius(),i=new e.LatLng(this._latlng.lat,this._latlng.lng-t),s=this._map.latLngToLayerPoint(i);this._point=this._map.latLngToLayerPoint(this._latlng),this._radius=Math.max(Math.round(this._point.x-s.x),1)},getBounds:function(){var t=this._getLngRadius(),i=360*(this._mRadius/40075017),s=this._latlng,o=new e.LatLng(s.lat-i,s.lng-t),n=new e.LatLng(s.lat+i,s.lng+t);return new e.LatLngBounds(o,n)},getLatLng:function(){return this._latlng},getPathString:function(){var t=this._point,i=this._radius;return this._checkIfEmpty()?"":e.Browser.svg?"M"+t.x+","+(t.y-i)+"A"+i+","+i+",0,1,1,"+(t.x-.1)+","+(t.y-i)+" z":(t._round(),i=Math.round(i),"AL "+t.x+","+t.y+" "+i+","+i+" 0,"+23592600)},getRadius:function(){return this._mRadius},_getLatRadius:function(){return 360*(this._mRadius/40075017)},_getLngRadius:function(){return this._getLatRadius()/Math.cos(e.LatLng.DEG_TO_RAD*this._latlng.lat)},_checkIfEmpty:function(){if(!this._map)return!1;var t=this._map._pathViewport,i=this._radius,s=this._point;return s.x-i>t.max.x||s.y-i>t.max.y||s.x+i<t.min.x||s.y+i<t.min.y}}),e.circle=function(t,i,s){return new e.Circle(t,i,s)},e.CircleMarker=e.Circle.extend({options:{radius:10,weight:2},initialize:function(t,i){e.Circle.prototype.initialize.call(this,t,null,i),this._radius=this.options.radius},projectLatlngs:function(){this._point=this._map.latLngToLayerPoint(this._latlng)},_updateStyle:function(){e.Circle.prototype._updateStyle.call(this),this.setRadius(this.options.radius)},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()}}),e.circleMarker=function(t,i){return new e.CircleMarker(t,i)},e.Polyline.include(e.Path.CANVAS?{_containsPoint:function(t,i){var s,o,n,a,r,h,l,c=this.options.weight/2;for(e.Browser.touch&&(c+=10),s=0,a=this._parts.length;a>s;s++)for(l=this._parts[s],o=0,r=l.length,n=r-1;r>o;n=o++)if((i||0!==o)&&(h=e.LineUtil.pointToSegmentDistance(t,l[n],l[o]),c>=h))return!0;return!1}}:{}),e.Polygon.include(e.Path.CANVAS?{_containsPoint:function(t){var i,s,o,n,a,r,h,l,c=!1;if(e.Polyline.prototype._containsPoint.call(this,t,!0))return!0;for(n=0,h=this._parts.length;h>n;n++)for(i=this._parts[n],a=0,l=i.length,r=l-1;l>a;r=a++)s=i[a],o=i[r],s.y>t.y!=o.y>t.y&&t.x<(o.x-s.x)*(t.y-s.y)/(o.y-s.y)+s.x&&(c=!c);return c}}:{}),e.Circle.include(e.Path.CANVAS?{_drawPath:function(){var t=this._point;this._ctx.beginPath(),this._ctx.arc(t.x,t.y,this._radius,0,2*Math.PI,!1)},_containsPoint:function(t){var i=this._point,s=this.options.stroke?this.options.weight/2:0;return t.distanceTo(i)<=this._radius+s}}:{}),e.GeoJSON=e.FeatureGroup.extend({initialize:function(t,i){e.setOptions(this,i),this._layers={},t&&this.addData(t)},addData:function(t){var i,s,o=e.Util.isArray(t)?t:t.features;if(o){for(i=0,s=o.length;s>i;i++)(o[i].geometries||o[i].geometry||o[i].features)&&this.addData(o[i]);return this}var n=this.options;if(!n.filter||n.filter(t)){var a=e.GeoJSON.geometryToLayer(t,n.pointToLayer);return a.feature=t,a.defaultOptions=a.options,this.resetStyle(a),n.onEachFeature&&n.onEachFeature(t,a),this.addLayer(a)}},resetStyle:function(t){var i=this.options.style;i&&(e.Util.extend(t.options,t.defaultOptions),this._setLayerStyle(t,i))},setStyle:function(t){this.eachLayer(function(i){this._setLayerStyle(i,t)},this)},_setLayerStyle:function(t,i){"function"==typeof i&&(i=i(t.feature)),t.setStyle&&t.setStyle(i)}}),e.extend(e.GeoJSON,{geometryToLayer:function(t,i){var s,o,n,a,r,h="Feature"===t.type?t.geometry:t,l=h.coordinates,c=[];switch(h.type){case"Point":return s=this.coordsToLatLng(l),i?i(t,s):new e.Marker(s);case"MultiPoint":for(n=0,a=l.length;a>n;n++)s=this.coordsToLatLng(l[n]),r=i?i(t,s):new e.Marker(s),c.push(r);return new e.FeatureGroup(c);case"LineString":return o=this.coordsToLatLngs(l),new e.Polyline(o);case"Polygon":return o=this.coordsToLatLngs(l,1),new e.Polygon(o);case"MultiLineString":return o=this.coordsToLatLngs(l,1),new e.MultiPolyline(o);case"MultiPolygon":return o=this.coordsToLatLngs(l,2),new e.MultiPolygon(o);case"GeometryCollection":for(n=0,a=h.geometries.length;a>n;n++)r=this.geometryToLayer({geometry:h.geometries[n],type:"Feature",properties:t.properties},i),c.push(r);return new e.FeatureGroup(c);default:throw Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t,i){var s=parseFloat(t[i?0:1]),o=parseFloat(t[i?1:0]);return new e.LatLng(s,o)},coordsToLatLngs:function(t,i,s){var e,o,n,a=[];for(o=0,n=t.length;n>o;o++)e=i?this.coordsToLatLngs(t[o],i-1,s):this.coordsToLatLng(t[o],s),a.push(e);return a}}),e.geoJson=function(t,i){return new e.GeoJSON(t,i)},e.DomEvent={addListener:function(t,i,o,n){var a,r,h,l=e.stamp(o),c="_leaflet_"+i+l;return t[c]?this:(a=function(i){return o.call(n||t,i||e.DomEvent._getEvent())},e.Browser.msTouch&&0===i.indexOf("touch")?this.addMsTouchListener(t,i,a,l):(e.Browser.touch&&"dblclick"===i&&this.addDoubleTapListener&&this.addDoubleTapListener(t,a,l),"addEventListener"in t?"mousewheel"===i?(t.addEventListener("DOMMouseScroll",a,!1),t.addEventListener(i,a,!1)):"mouseenter"===i||"mouseleave"===i?(r=a,h="mouseenter"===i?"mouseover":"mouseout",a=function(i){return e.DomEvent._checkMouse(t,i)?r(i):s},t.addEventListener(h,a,!1)):t.addEventListener(i,a,!1):"attachEvent"in t&&t.attachEvent("on"+i,a),t[c]=a,this))},removeListener:function(t,i,s){var o=e.stamp(s),n="_leaflet_"+i+o,a=t[n];if(a)return e.Browser.msTouch&&0===i.indexOf("touch")?this.removeMsTouchListener(t,i,o):e.Browser.touch&&"dblclick"===i&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,o):"removeEventListener"in t?"mousewheel"===i?(t.removeEventListener("DOMMouseScroll",a,!1),t.removeEventListener(i,a,!1)):"mouseenter"===i||"mouseleave"===i?t.removeEventListener("mouseenter"===i?"mouseover":"mouseout",a,!1):t.removeEventListener(i,a,!1):"detachEvent"in t&&t.detachEvent("on"+i,a),t[n]=null,this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,this},disableClickPropagation:function(t){for(var i=e.DomEvent.stopPropagation,s=e.Draggable.START.length-1;s>=0;s--)e.DomEvent.addListener(t,e.Draggable.START[s],i);return e.DomEvent.addListener(t,"click",i).addListener(t,"dblclick",i)},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return e.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,s){var o=i.body,n=i.documentElement,a=t.pageX?t.pageX:t.clientX+o.scrollLeft+n.scrollLeft,r=t.pageY?t.pageY:t.clientY+o.scrollTop+n.scrollTop,h=new e.Point(a,r);return s?h._subtract(e.DomUtil.getViewportOffset(s)):h},getWheelDelta:function(t){var i=0;return t.wheelDelta&&(i=t.wheelDelta/120),t.detail&&(i=-t.detail/3),i},_checkMouse:function(t,i){var s=i.relatedTarget;if(!s)return!0;try{for(;s&&s!==t;)s=s.parentNode}catch(e){return!1}return s!==t},_getEvent:function(){var i=t.event;if(!i)for(var s=arguments.callee.caller;s&&(i=s.arguments[0],!i||t.Event!==i.constructor);)s=s.caller;return i}},e.DomEvent.on=e.DomEvent.addListener,e.DomEvent.off=e.DomEvent.removeListener,e.Draggable=e.Class.extend({includes:e.Mixin.Events,statics:{START:e.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",MSPointerDown:"touchmove"},TAP_TOLERANCE:15},initialize:function(t,i,s){this._element=t,this._dragStartTarget=i||t,this._longPress=s&&!e.Browser.msTouch},enable:function(){if(!this._enabled){for(var t=e.Draggable.START.length-1;t>=0;t--)e.DomEvent.on(this._dragStartTarget,e.Draggable.START[t],this._onDown,this);this._enabled=!0}},disable:function(){if(this._enabled){for(var t=e.Draggable.START.length-1;t>=0;t--)e.DomEvent.off(this._dragStartTarget,e.Draggable.START[t],this._onDown,this);this._enabled=!1,this._moved=!1}},_onDown:function(t){if(!(!e.Browser.touch&&t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(e.DomEvent.preventDefault(t),e.DomEvent.stopPropagation(t),e.Draggable._disabled))){if(this._simulateClick=!0,t.touches&&t.touches.length>1)return this._simulateClick=!1,clearTimeout(this._longPressTimeout),s;var o=t.touches&&1===t.touches.length?t.touches[0]:t,n=o.target;e.Browser.touch&&"a"===n.tagName.toLowerCase()&&e.DomUtil.addClass(n,"leaflet-active"),this._moved=!1,this._moving||(this._startPoint=new e.Point(o.clientX,o.clientY),this._startPos=this._newPos=e.DomUtil.getPosition(this._element),t.touches&&1===t.touches.length&&e.Browser.touch&&this._longPress&&(this._longPressTimeout=setTimeout(e.bind(function(){var t=this._newPos&&this._newPos.distanceTo(this._startPos)||0;e.Draggable.TAP_TOLERANCE>t&&(this._simulateClick=!1,this._onUp(),this._simulateEvent("contextmenu",o))},this),1e3)),e.DomEvent.on(i,e.Draggable.MOVE[t.type],this._onMove,this),e.DomEvent.on(i,e.Draggable.END[t.type],this._onUp,this))}},_onMove:function(t){if(!(t.touches&&t.touches.length>1)){var i=t.touches&&1===t.touches.length?t.touches[0]:t,s=new e.Point(i.clientX,i.clientY),o=s.subtract(this._startPoint);(o.x||o.y)&&(e.DomEvent.preventDefault(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=e.DomUtil.getPosition(this._element).subtract(o),e.Browser.touch||(e.DomUtil.disableTextSelection(),this._setMovingCursor())),this._newPos=this._startPos.add(o),this._moving=!0,e.Util.cancelAnimFrame(this._animRequest),this._animRequest=e.Util.requestAnimFrame(this._updatePosition,this,!0,this._dragStartTarget))}},_updatePosition:function(){this.fire("predrag"),e.DomUtil.setPosition(this._element,this._newPos),this.fire("drag")},_onUp:function(t){var s;if(clearTimeout(this._longPressTimeout),this._simulateClick&&t.changedTouches){var o=t.changedTouches[0],n=o.target,a=this._newPos&&this._newPos.distanceTo(this._startPos)||0;"a"===n.tagName.toLowerCase()&&e.DomUtil.removeClass(n,"leaflet-active"),e.Draggable.TAP_TOLERANCE>a&&(s=o)}e.Browser.touch||(e.DomUtil.enableTextSelection(),this._restoreCursor());for(var r in e.Draggable.MOVE)e.Draggable.MOVE.hasOwnProperty(r)&&(e.DomEvent.off(i,e.Draggable.MOVE[r],this._onMove),e.DomEvent.off(i,e.Draggable.END[r],this._onUp));this._moved&&(e.Util.cancelAnimFrame(this._animRequest),this.fire("dragend")),this._moving=!1,s&&(this._moved=!1,this._simulateEvent("click",s))},_setMovingCursor:function(){e.DomUtil.addClass(i.body,"leaflet-dragging")},_restoreCursor:function(){e.DomUtil.removeClass(i.body,"leaflet-dragging")},_simulateEvent:function(s,e){var o=i.createEvent("MouseEvents");o.initMouseEvent(s,!0,!0,t,1,e.screenX,e.screenY,e.clientX,e.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(o)}}),e.Handler=e.Class.extend({initialize:function(t){this._map=t},enable:function(){this._enabled||(this._enabled=!0,this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks())},enabled:function(){return!!this._enabled}}),e.Map.mergeOptions({dragging:!0,inertia:!e.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,inertiaThreshold:e.Browser.touch?32:18,easeLinearity:.25,longPress:!0,worldCopyJump:!1}),e.Map.Drag=e.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new e.Draggable(t._mapPane,t._container,t.options.longPress),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDrag,this),t.on("viewreset",this._onViewReset,this))}this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){var t=this._map;t._panAnim&&t._panAnim.stop(),t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(){if(this._map.options.inertia){var t=this._lastTime=+new Date,i=this._lastPos=this._draggable._newPos;this._positions.push(i),this._times.push(t),t-this._times[0]>200&&(this._positions.shift(),this._times.shift())}this._map.fire("move").fire("drag")},_onViewReset:function(){var t=this._map.getSize()._divideBy(2),i=this._map.latLngToLayerPoint(new e.LatLng(0,0));this._initialWorldOffset=i.subtract(t).x,this._worldWidth=this._map.project(new e.LatLng(0,180)).x},_onPreDrag:function(){var t=this._worldWidth,i=Math.round(t/2),s=this._initialWorldOffset,e=this._draggable._newPos.x,o=(e-i+s)%t+i-s,n=(e+i+s)%t-i-s,a=Math.abs(o+s)<Math.abs(n+s)?o:n;this._draggable._newPos.x=a},_onDragEnd:function(){var t=this._map,i=t.options,s=+new Date-this._lastTime,o=!i.inertia||s>i.inertiaThreshold||!this._positions[0];if(o)t.fire("moveend");else{var n=this._lastPos.subtract(this._positions[0]),a=(this._lastTime+s-this._times[0])/1e3,r=i.easeLinearity,h=n.multiplyBy(r/a),l=h.distanceTo(new e.Point(0,0)),c=Math.min(i.inertiaMaxSpeed,l),m=h.multiplyBy(c/l),u=c/(i.inertiaDeceleration*r),d=m.multiplyBy(-u/2).round();e.Util.requestAnimFrame(function(){t.panBy(d,u,r)})}t.fire("dragend"),i.maxBounds&&e.Util.requestAnimFrame(this._panInsideMaxBounds,t,!0,t._container)},_panInsideMaxBounds:function(){this.panInsideBounds(this.options.maxBounds)}}),e.Map.addInitHook("addHandler","dragging",e.Map.Drag),e.Map.mergeOptions({doubleClickZoom:!0}),e.Map.DoubleClickZoom=e.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick)},_onDoubleClick:function(t){this.setView(t.latlng,this._zoom+1)}}),e.Map.addInitHook("addHandler","doubleClickZoom",e.Map.DoubleClickZoom),e.Map.mergeOptions({scrollWheelZoom:!0}),e.Map.ScrollWheelZoom=e.Handler.extend({addHooks:function(){e.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){e.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll)},_onWheelScroll:function(t){var i=e.DomEvent.getWheelDelta(t);this._delta+=i,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var s=Math.max(40-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(e.bind(this._performZoom,this),s),e.DomEvent.preventDefault(t),e.DomEvent.stopPropagation(t)},_performZoom:function(){var t=this._map,i=this._delta,s=t.getZoom();if(i=i>0?Math.ceil(i):Math.round(i),i=Math.max(Math.min(i,4),-4),i=t._limitZoom(s+i)-s,this._delta=0,this._startTime=null,i){var e=s+i,o=this._getCenterForScrollWheelZoom(e);t.setView(o,e)}},_getCenterForScrollWheelZoom:function(t){var i=this._map,s=i.getZoomScale(t),e=i.getSize()._divideBy(2),o=this._lastMousePos._subtract(e)._multiplyBy(1-1/s),n=i._getTopLeftPoint()._add(e)._add(o);return i.unproject(n)}}),e.Map.addInitHook("addHandler","scrollWheelZoom",e.Map.ScrollWheelZoom),e.extend(e.DomEvent,{_touchstart:e.Browser.msTouch?"MSPointerDown":"touchstart",_touchend:e.Browser.msTouch?"MSPointerUp":"touchend",addDoubleTapListener:function(t,s,o){function n(t){var i;if(e.Browser.msTouch?(p.push(t.pointerId),i=p.length):i=t.touches.length,!(i>1)){var s=Date.now(),o=s-(r||s);h=t.touches?t.touches[0]:t,l=o>0&&c>=o,r=s}}function a(t){if(e.Browser.msTouch){var i=p.indexOf(t.pointerId);if(-1===i)return;p.splice(i,1)}if(l){if(e.Browser.msTouch){var o,n={};for(var a in h)o=h[a],n[a]="function"==typeof o?o.bind(h):o;h=n}h.type="dblclick",s(h),r=null}}var r,h,l=!1,c=250,m="_leaflet_",u=this._touchstart,d=this._touchend,p=[];t[m+u+o]=n,t[m+d+o]=a;var _=e.Browser.msTouch?i.documentElement:t;return t.addEventListener(u,n,!1),_.addEventListener(d,a,!1),e.Browser.msTouch&&_.addEventListener("MSPointerCancel",a,!1),this},removeDoubleTapListener:function(t,s){var o="_leaflet_";return t.removeEventListener(this._touchstart,t[o+this._touchstart+s],!1),(e.Browser.msTouch?i.documentElement:t).removeEventListener(this._touchend,t[o+this._touchend+s],!1),e.Browser.msTouch&&i.documentElement.removeEventListener("MSPointerCancel",t[o+this._touchend+s],!1),this}}),e.extend(e.DomEvent,{_msTouches:[],_msDocumentListener:!1,addMsTouchListener:function(t,i,s,e){switch(i){case"touchstart":return this.addMsTouchListenerStart(t,i,s,e);case"touchend":return this.addMsTouchListenerEnd(t,i,s,e);case"touchmove":return this.addMsTouchListenerMove(t,i,s,e);default:throw"Unknown touch event type"}},addMsTouchListenerStart:function(t,s,e,o){var n="_leaflet_",a=this._msTouches,r=function(t){for(var i=!1,s=0;a.length>s;s++)if(a[s].pointerId===t.pointerId){i=!0;break}i||a.push(t),t.touches=a.slice(),t.changedTouches=[t],e(t)};if(t[n+"touchstart"+o]=r,t.addEventListener("MSPointerDown",r,!1),!this._msDocumentListener){var h=function(t){for(var i=0;a.length>i;i++)if(a[i].pointerId===t.pointerId){a.splice(i,1);break}};i.documentElement.addEventListener("MSPointerUp",h,!1),i.documentElement.addEventListener("MSPointerCancel",h,!1),this._msDocumentListener=!0}return this},addMsTouchListenerMove:function(t,i,s,e){function o(t){if(t.pointerType!==t.MSPOINTER_TYPE_MOUSE||0!==t.buttons){for(var i=0;a.length>i;i++)if(a[i].pointerId===t.pointerId){a[i]=t;break}t.touches=a.slice(),t.changedTouches=[t],s(t)}}var n="_leaflet_",a=this._msTouches;return t[n+"touchmove"+e]=o,t.addEventListener("MSPointerMove",o,!1),this},addMsTouchListenerEnd:function(t,i,s,e){var o="_leaflet_",n=this._msTouches,a=function(t){for(var i=0;n.length>i;i++)if(n[i].pointerId===t.pointerId){n.splice(i,1);break}t.touches=n.slice(),t.changedTouches=[t],s(t)};return t[o+"touchend"+e]=a,t.addEventListener("MSPointerUp",a,!1),t.addEventListener("MSPointerCancel",a,!1),this},removeMsTouchListener:function(t,i,s){var e="_leaflet_",o=t[e+i+s];switch(i){case"touchstart":t.removeEventListener("MSPointerDown",o,!1);break;case"touchmove":t.removeEventListener("MSPointerMove",o,!1);break;case"touchend":t.removeEventListener("MSPointerUp",o,!1),t.removeEventListener("MSPointerCancel",o,!1)}return this}}),e.Map.mergeOptions({touchZoom:e.Browser.touch&&!e.Browser.android23}),e.Map.TouchZoom=e.Handler.extend({addHooks:function(){e.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){e.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var s=this._map;if(t.touches&&2===t.touches.length&&!s._animatingZoom&&!this._zooming){var o=s.mouseEventToLayerPoint(t.touches[0]),n=s.mouseEventToLayerPoint(t.touches[1]),a=s._getCenterLayerPoint();this._startCenter=o.add(n)._divideBy(2),this._startDist=o.distanceTo(n),this._moved=!1,this._zooming=!0,this._centerOffset=a.subtract(this._startCenter),s._panAnim&&s._panAnim.stop(),e.DomEvent.on(i,"touchmove",this._onTouchMove,this).on(i,"touchend",this._onTouchEnd,this),e.DomEvent.preventDefault(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length){var i=this._map,s=i.mouseEventToLayerPoint(t.touches[0]),o=i.mouseEventToLayerPoint(t.touches[1]);this._scale=s.distanceTo(o)/this._startDist,this._delta=s._add(o)._divideBy(2)._subtract(this._startCenter),1!==this._scale&&(this._moved||(e.DomUtil.addClass(i._mapPane,"leaflet-zoom-anim leaflet-touching"),i.fire("movestart").fire("zoomstart")._prepareTileBg(),this._moved=!0),e.Util.cancelAnimFrame(this._animRequest),this._animRequest=e.Util.requestAnimFrame(this._updateOnMove,this,!0,this._map._container),e.DomEvent.preventDefault(t))}},_updateOnMove:function(){var t=this._map,i=this._getScaleOrigin(),s=t.layerPointToLatLng(i);t.fire("zoomanim",{center:s,zoom:t.getScaleZoom(this._scale)}),t._tileBg.style[e.DomUtil.TRANSFORM]=e.DomUtil.getTranslateString(this._delta)+" "+e.DomUtil.getScaleString(this._scale,this._startCenter)},_onTouchEnd:function(){if(this._moved&&this._zooming){var t=this._map;this._zooming=!1,e.DomUtil.removeClass(t._mapPane,"leaflet-touching"),e.DomEvent.off(i,"touchmove",this._onTouchMove).off(i,"touchend",this._onTouchEnd);var s=this._getScaleOrigin(),o=t.layerPointToLatLng(s),n=t.getZoom(),a=t.getScaleZoom(this._scale)-n,r=a>0?Math.ceil(a):Math.floor(a),h=t._limitZoom(n+r);t.fire("zoomanim",{center:o,zoom:h}),t._runAnimation(o,h,t.getZoomScale(h)/this._scale,s,!0)}},_getScaleOrigin:function(){var t=this._centerOffset.subtract(this._delta).divideBy(this._scale);return this._startCenter.add(t)}}),e.Map.addInitHook("addHandler","touchZoom",e.Map.TouchZoom),e.Map.mergeOptions({boxZoom:!0}),e.Map.BoxZoom=e.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane},addHooks:function(){e.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){e.DomEvent.off(this._container,"mousedown",this._onMouseDown)},_onMouseDown:function(t){return!t.shiftKey||1!==t.which&&1!==t.button?!1:(e.DomUtil.disableTextSelection(),this._startLayerPoint=this._map.mouseEventToLayerPoint(t),this._box=e.DomUtil.create("div","leaflet-zoom-box",this._pane),e.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",e.DomEvent.on(i,"mousemove",this._onMouseMove,this).on(i,"mouseup",this._onMouseUp,this).preventDefault(t),this._map.fire("boxzoomstart"),s)},_onMouseMove:function(t){var i=this._startLayerPoint,s=this._box,o=this._map.mouseEventToLayerPoint(t),n=o.subtract(i),a=new e.Point(Math.min(o.x,i.x),Math.min(o.y,i.y));e.DomUtil.setPosition(s,a),s.style.width=Math.max(0,Math.abs(n.x)-4)+"px",s.style.height=Math.max(0,Math.abs(n.y)-4)+"px"},_onMouseUp:function(t){this._pane.removeChild(this._box),this._container.style.cursor="",e.DomUtil.enableTextSelection(),e.DomEvent.off(i,"mousemove",this._onMouseMove).off(i,"mouseup",this._onMouseUp);var s=this._map,o=s.mouseEventToLayerPoint(t);if(!this._startLayerPoint.equals(o)){var n=new e.LatLngBounds(s.layerPointToLatLng(this._startLayerPoint),s.layerPointToLatLng(o));s.fitBounds(n),s.fire("boxzoomend",{boxZoomBounds:n})}}}),e.Map.addInitHook("addHandler","boxZoom",e.Map.BoxZoom),e.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),e.Map.Keyboard=e.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61],zoomOut:[189,109,173]},initialize:function(t){this._map=t,this._setPanOffset(t.options.keyboardPanOffset),this._setZoomOffset(t.options.keyboardZoomOffset)},addHooks:function(){var t=this._map._container;-1===t.tabIndex&&(t.tabIndex="0"),e.DomEvent.on(t,"focus",this._onFocus,this).on(t,"blur",this._onBlur,this).on(t,"mousedown",this._onMouseDown,this),this._map.on("focus",this._addHooks,this).on("blur",this._removeHooks,this)},removeHooks:function(){this._removeHooks();var t=this._map._container;e.DomEvent.off(t,"focus",this._onFocus,this).off(t,"blur",this._onBlur,this).off(t,"mousedown",this._onMouseDown,this),this._map.off("focus",this._addHooks,this).off("blur",this._removeHooks,this)},_onMouseDown:function(){this._focused||this._map._container.focus()},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(t){var i,s,e=this._panKeys={},o=this.keyCodes;for(i=0,s=o.left.length;s>i;i++)e[o.left[i]]=[-1*t,0];for(i=0,s=o.right.length;s>i;i++)e[o.right[i]]=[t,0];for(i=0,s=o.down.length;s>i;i++)e[o.down[i]]=[0,t];for(i=0,s=o.up.length;s>i;i++)e[o.up[i]]=[0,-1*t]},_setZoomOffset:function(t){var i,s,e=this._zoomKeys={},o=this.keyCodes;for(i=0,s=o.zoomIn.length;s>i;i++)e[o.zoomIn[i]]=t;for(i=0,s=o.zoomOut.length;s>i;i++)e[o.zoomOut[i]]=-t},_addHooks:function(){e.DomEvent.on(i,"keydown",this._onKeyDown,this)},_removeHooks:function(){e.DomEvent.off(i,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){var i=t.keyCode,s=this._map;if(this._panKeys.hasOwnProperty(i))s.panBy(this._panKeys[i]),s.options.maxBounds&&s.panInsideBounds(s.options.maxBounds);else{if(!this._zoomKeys.hasOwnProperty(i))return;s.setZoom(s.getZoom()+this._zoomKeys[i])}e.DomEvent.stop(t)}}),e.Map.addInitHook("addHandler","keyboard",e.Map.Keyboard),e.Handler.MarkerDrag=e.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new e.Draggable(t,t).on("dragstart",this._onDragStart,this).on("drag",this._onDrag,this).on("dragend",this._onDragEnd,this)),this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(){var t=this._marker,i=t._shadow,s=e.DomUtil.getPosition(t._icon),o=t._map.layerPointToLatLng(s);i&&e.DomUtil.setPosition(i,s),t._latlng=o,t.fire("move",{latlng:o}).fire("drag")
},_onDragEnd:function(){this._marker.fire("moveend").fire("dragend")}}),e.Handler.PolyEdit=e.Handler.extend({options:{icon:new e.DivIcon({iconSize:new e.Point(8,8),className:"leaflet-div-icon leaflet-editing-icon"})},initialize:function(t,i){this._poly=t,e.setOptions(this,i)},addHooks:function(){this._poly._map&&(this._markerGroup||this._initMarkers(),this._poly._map.addLayer(this._markerGroup))},removeHooks:function(){this._poly._map&&(this._poly._map.removeLayer(this._markerGroup),delete this._markerGroup,delete this._markers)},updateMarkers:function(){this._markerGroup.clearLayers(),this._initMarkers()},_initMarkers:function(){this._markerGroup||(this._markerGroup=new e.LayerGroup),this._markers=[];var t,i,s,o,n=this._poly._latlngs;for(t=0,s=n.length;s>t;t++)o=this._createMarker(n[t],t),o.on("click",this._onMarkerClick,this),this._markers.push(o);var a,r;for(t=0,i=s-1;s>t;i=t++)(0!==t||e.Polygon&&this._poly instanceof e.Polygon)&&(a=this._markers[i],r=this._markers[t],this._createMiddleMarker(a,r),this._updatePrevNext(a,r))},_createMarker:function(t,i){var s=new e.Marker(t,{draggable:!0,icon:this.options.icon});return s._origLatLng=t,s._index=i,s.on("drag",this._onMarkerDrag,this),s.on("dragend",this._fireEdit,this),this._markerGroup.addLayer(s),s},_fireEdit:function(){this._poly.fire("edit")},_onMarkerDrag:function(t){var i=t.target;e.extend(i._origLatLng,i._latlng),i._middleLeft&&i._middleLeft.setLatLng(this._getMiddleLatLng(i._prev,i)),i._middleRight&&i._middleRight.setLatLng(this._getMiddleLatLng(i,i._next)),this._poly.redraw()},_onMarkerClick:function(t){if(!(3>this._poly._latlngs.length)){var i=t.target,s=i._index;this._markerGroup.removeLayer(i),this._markers.splice(s,1),this._poly.spliceLatLngs(s,1),this._updateIndexes(s,-1),this._updatePrevNext(i._prev,i._next),i._middleLeft&&this._markerGroup.removeLayer(i._middleLeft),i._middleRight&&this._markerGroup.removeLayer(i._middleRight),i._prev&&i._next?this._createMiddleMarker(i._prev,i._next):i._prev?i._next||(i._prev._middleRight=null):i._next._middleLeft=null,this._poly.fire("edit")}},_updateIndexes:function(t,i){this._markerGroup.eachLayer(function(s){s._index>t&&(s._index+=i)})},_createMiddleMarker:function(t,i){var s,e,o,n=this._getMiddleLatLng(t,i),a=this._createMarker(n);a.setOpacity(.6),t._middleRight=i._middleLeft=a,e=function(){var e=i._index;a._index=e,a.off("click",s).on("click",this._onMarkerClick,this),n.lat=a.getLatLng().lat,n.lng=a.getLatLng().lng,this._poly.spliceLatLngs(e,0,n),this._markers.splice(e,0,a),a.setOpacity(1),this._updateIndexes(e,1),i._index++,this._updatePrevNext(t,a),this._updatePrevNext(a,i)},o=function(){a.off("dragstart",e,this),a.off("dragend",o,this),this._createMiddleMarker(t,a),this._createMiddleMarker(a,i)},s=function(){e.call(this),o.call(this),this._poly.fire("edit")},a.on("click",s,this).on("dragstart",e,this).on("dragend",o,this),this._markerGroup.addLayer(a)},_updatePrevNext:function(t,i){t&&(t._next=i),i&&(i._prev=t)},_getMiddleLatLng:function(t,i){var s=this._poly._map,e=s.latLngToLayerPoint(t.getLatLng()),o=s.latLngToLayerPoint(i.getLatLng());return s.layerPointToLatLng(e._add(o)._divideBy(2))}}),e.Polyline.addInitHook(function(){e.Handler.PolyEdit&&(this.editing=new e.Handler.PolyEdit(this),this.options.editable&&this.editing.enable()),this.on("add",function(){this.editing&&this.editing.enabled()&&this.editing.addHooks()}),this.on("remove",function(){this.editing&&this.editing.enabled()&&this.editing.removeHooks()})}),e.Control=e.Class.extend({options:{position:"topright"},initialize:function(t){e.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var i=this._map;return i&&i.removeControl(this),this.options.position=t,i&&i.addControl(this),this},addTo:function(t){this._map=t;var i=this._container=this.onAdd(t),s=this.getPosition(),o=t._controlCorners[s];return e.DomUtil.addClass(i,"leaflet-control"),-1!==s.indexOf("bottom")?o.insertBefore(i,o.firstChild):o.appendChild(i),this},removeFrom:function(t){var i=this.getPosition(),s=t._controlCorners[i];return s.removeChild(this._container),this._map=null,this.onRemove&&this.onRemove(t),this}}),e.control=function(t){return new e.Control(t)},e.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.removeFrom(this),this},_initControlPos:function(){function t(t,n){var a=s+t+" "+s+n;i[t+n]=e.DomUtil.create("div",a,o)}var i=this._controlCorners={},s="leaflet-",o=this._controlContainer=e.DomUtil.create("div",s+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")}}),e.Control.Zoom=e.Control.extend({options:{position:"topleft"},onAdd:function(t){var i="leaflet-control-zoom",s="leaflet-bar",o=s+"-part",n=e.DomUtil.create("div",i+" "+s);return this._map=t,this._zoomInButton=this._createButton("+","Zoom in",i+"-in "+o+" "+o+"-top",n,this._zoomIn,this),this._zoomOutButton=this._createButton("-","Zoom out",i+"-out "+o+" "+o+"-bottom",n,this._zoomOut,this),t.on("zoomend",this._updateDisabled,this),n},onRemove:function(t){t.off("zoomend",this._updateDisabled,this)},_zoomIn:function(t){this._map.zoomIn(t.shiftKey?3:1)},_zoomOut:function(t){this._map.zoomOut(t.shiftKey?3:1)},_createButton:function(t,i,s,o,n,a){var r=e.DomUtil.create("a",s,o);r.innerHTML=t,r.href="#",r.title=i;var h=e.DomEvent.stopPropagation;return e.DomEvent.on(r,"click",h).on(r,"mousedown",h).on(r,"dblclick",h).on(r,"click",e.DomEvent.preventDefault).on(r,"click",n,a),r},_updateDisabled:function(){var t=this._map,i="leaflet-control-zoom-disabled";e.DomUtil.removeClass(this._zoomInButton,i),e.DomUtil.removeClass(this._zoomOutButton,i),t._zoom===t.getMinZoom()&&e.DomUtil.addClass(this._zoomOutButton,i),t._zoom===t.getMaxZoom()&&e.DomUtil.addClass(this._zoomInButton,i)}}),e.Map.mergeOptions({zoomControl:!0}),e.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new e.Control.Zoom,this.addControl(this.zoomControl))}),e.control.zoom=function(t){return new e.Control.Zoom(t)},e.Control.Attribution=e.Control.extend({options:{position:"bottomright",prefix:'Powered by <a href="http://leafletjs.com">Leaflet</a>'},initialize:function(t){e.setOptions(this,t),this._attributions={}},onAdd:function(t){return this._container=e.DomUtil.create("div","leaflet-control-attribution"),e.DomEvent.disableClickPropagation(this._container),t.on("layeradd",this._onLayerAdd,this).on("layerremove",this._onLayerRemove,this),this._update(),this._container},onRemove:function(t){t.off("layeradd",this._onLayerAdd).off("layerremove",this._onLayerRemove)},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):s},removeAttribution:function(t){return t?(this._attributions[t]--,this._update(),this):s},_update:function(){if(this._map){var t=[];for(var i in this._attributions)this._attributions.hasOwnProperty(i)&&this._attributions[i]&&t.push(i);var s=[];this.options.prefix&&s.push(this.options.prefix),t.length&&s.push(t.join(", ")),this._container.innerHTML=s.join(" &#8212; ")}},_onLayerAdd:function(t){t.layer.getAttribution&&this.addAttribution(t.layer.getAttribution())},_onLayerRemove:function(t){t.layer.getAttribution&&this.removeAttribution(t.layer.getAttribution())}}),e.Map.mergeOptions({attributionControl:!0}),e.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new e.Control.Attribution).addTo(this))}),e.control.attribution=function(t){return new e.Control.Attribution(t)},e.Control.Scale=e.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0,updateWhenIdle:!1},onAdd:function(t){this._map=t;var i="leaflet-control-scale",s=e.DomUtil.create("div",i),o=this.options;return this._addScales(o,i,s),t.on(o.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),s},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,i,s){t.metric&&(this._mScale=e.DomUtil.create("div",i+"-line",s)),t.imperial&&(this._iScale=e.DomUtil.create("div",i+"-line",s))},_update:function(){var t=this._map.getBounds(),i=t.getCenter().lat,s=6378137*Math.PI*Math.cos(i*Math.PI/180),e=s*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),n=this.options,a=0;o.x>0&&(a=e*(n.maxWidth/o.x)),this._updateScales(n,a)},_updateScales:function(t,i){t.metric&&i&&this._updateMetric(i),t.imperial&&i&&this._updateImperial(i)},_updateMetric:function(t){var i=this._getRoundNum(t);this._mScale.style.width=this._getScaleWidth(i/t)+"px",this._mScale.innerHTML=1e3>i?i+" m":i/1e3+" km"},_updateImperial:function(t){var i,s,e,o=3.2808399*t,n=this._iScale;o>5280?(i=o/5280,s=this._getRoundNum(i),n.style.width=this._getScaleWidth(s/i)+"px",n.innerHTML=s+" mi"):(e=this._getRoundNum(o),n.style.width=this._getScaleWidth(e/o)+"px",n.innerHTML=e+" ft")},_getScaleWidth:function(t){return Math.round(this.options.maxWidth*t)-10},_getRoundNum:function(t){var i=Math.pow(10,(Math.floor(t)+"").length-1),s=t/i;return s=s>=10?10:s>=5?5:s>=3?3:s>=2?2:1,i*s}}),e.control.scale=function(t){return new e.Control.Scale(t)},e.Control.Layers=e.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0},initialize:function(t,i,s){e.setOptions(this,s),this._layers={},this._lastZIndex=0,this._handlingClick=!1;for(var o in t)t.hasOwnProperty(o)&&this._addLayer(t[o],o);for(o in i)i.hasOwnProperty(o)&&this._addLayer(i[o],o,!0)},onAdd:function(t){return this._initLayout(),this._update(),t.on("layeradd",this._onLayerChange,this).on("layerremove",this._onLayerChange,this),this._container},onRemove:function(t){t.off("layeradd",this._onLayerChange).off("layerremove",this._onLayerChange)},addBaseLayer:function(t,i){return this._addLayer(t,i),this._update(),this},addOverlay:function(t,i){return this._addLayer(t,i,!0),this._update(),this},removeLayer:function(t){var i=e.stamp(t);return delete this._layers[i],this._update(),this},_initLayout:function(){var t="leaflet-control-layers",i=this._container=e.DomUtil.create("div",t);e.Browser.touch?e.DomEvent.on(i,"click",e.DomEvent.stopPropagation):(e.DomEvent.disableClickPropagation(i),e.DomEvent.on(i,"mousewheel",e.DomEvent.stopPropagation));var s=this._form=e.DomUtil.create("form",t+"-list");if(this.options.collapsed){e.DomEvent.on(i,"mouseover",this._expand,this).on(i,"mouseout",this._collapse,this);var o=this._layersLink=e.DomUtil.create("a",t+"-toggle",i);o.href="#",o.title="Layers",e.Browser.touch?e.DomEvent.on(o,"click",e.DomEvent.stopPropagation).on(o,"click",e.DomEvent.preventDefault).on(o,"click",this._expand,this):e.DomEvent.on(o,"focus",this._expand,this),this._map.on("movestart",this._collapse,this)}else this._expand();this._baseLayersList=e.DomUtil.create("div",t+"-base",s),this._separator=e.DomUtil.create("div",t+"-separator",s),this._overlaysList=e.DomUtil.create("div",t+"-overlays",s),i.appendChild(s)},_addLayer:function(t,i,s){var o=e.stamp(t);this._layers[o]={layer:t,name:i,overlay:s},this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(this._container){this._baseLayersList.innerHTML="",this._overlaysList.innerHTML="";var t=!1,i=!1;for(var s in this._layers)if(this._layers.hasOwnProperty(s)){var e=this._layers[s];this._addItem(e),i=i||e.overlay,t=t||!e.overlay}this._separator.style.display=i&&t?"":"none"}},_onLayerChange:function(t){var i=e.stamp(t.layer);this._layers[i]&&!this._handlingClick&&this._update()},_createRadioElement:function(t,s){var e='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"';s&&(e+=' checked="checked"'),e+="/>";var o=i.createElement("div");return o.innerHTML=e,o.firstChild},_addItem:function(t){var s,o=i.createElement("label"),n=this._map.hasLayer(t.layer);t.overlay?(s=i.createElement("input"),s.type="checkbox",s.className="leaflet-control-layers-selector",s.defaultChecked=n):s=this._createRadioElement("leaflet-base-layers",n),s.layerId=e.stamp(t.layer),e.DomEvent.on(s,"click",this._onInputClick,this);var a=i.createElement("span");a.innerHTML=" "+t.name,o.appendChild(s),o.appendChild(a);var r=t.overlay?this._overlaysList:this._baseLayersList;return r.appendChild(o),o},_onInputClick:function(){var t,i,s,e,o=this._form.getElementsByTagName("input"),n=o.length;for(this._handlingClick=!0,t=0;n>t;t++)i=o[t],s=this._layers[i.layerId],i.checked&&!this._map.hasLayer(s.layer)?(this._map.addLayer(s.layer),s.overlay||(e=s.layer)):!i.checked&&this._map.hasLayer(s.layer)&&this._map.removeLayer(s.layer);e&&(this._map.setZoom(this._map.getZoom()),this._map.fire("baselayerchange",{layer:e})),this._handlingClick=!1},_expand:function(){e.DomUtil.addClass(this._container,"leaflet-control-layers-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-layers-expanded","")}}),e.control.layers=function(t,i,s){return new e.Control.Layers(t,i,s)},e.PosAnimation=e.Class.extend({includes:e.Mixin.Events,run:function(t,i,s,o){this.stop(),this._el=t,this._inProgress=!0,this.fire("start"),t.style[e.DomUtil.TRANSITION]="all "+(s||.25)+"s cubic-bezier(0,0,"+(o||.5)+",1)",e.DomEvent.on(t,e.DomUtil.TRANSITION_END,this._onTransitionEnd,this),e.DomUtil.setPosition(t,i),e.Util.falseFn(t.offsetWidth),this._stepTimer=setInterval(e.bind(this.fire,this,"step"),50)},stop:function(){this._inProgress&&(e.DomUtil.setPosition(this._el,this._getPos()),this._onTransitionEnd(),e.Util.falseFn(this._el.offsetWidth))},_transformRe:/(-?[\d\.]+), (-?[\d\.]+)\)/,_getPos:function(){var i,s,o,n=this._el,a=t.getComputedStyle(n);return e.Browser.any3d?(o=a[e.DomUtil.TRANSFORM].match(this._transformRe),i=parseFloat(o[1]),s=parseFloat(o[2])):(i=parseFloat(a.left),s=parseFloat(a.top)),new e.Point(i,s,!0)},_onTransitionEnd:function(){e.DomEvent.off(this._el,e.DomUtil.TRANSITION_END,this._onTransitionEnd,this),this._inProgress&&(this._inProgress=!1,this._el.style[e.DomUtil.TRANSITION]="",clearInterval(this._stepTimer),this.fire("step").fire("end"))}}),e.Map.include({setView:function(t,i,s){i=this._limitZoom(i);var e=this._zoom!==i;if(this._loaded&&!s&&this._layers){this._panAnim&&this._panAnim.stop();var o=e?this._zoomToIfClose&&this._zoomToIfClose(t,i):this._panByIfClose(t);if(o)return clearTimeout(this._sizeTimer),this}return this._resetView(t,i),this},panBy:function(t,i,s){if(t=e.point(t),!t.x&&!t.y)return this;this._panAnim||(this._panAnim=new e.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),this.fire("movestart"),e.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var o=e.DomUtil.getPosition(this._mapPane).subtract(t)._round();return this._panAnim.run(this._mapPane,o,i||.25,s),this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){e.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_panByIfClose:function(t){var i=this._getCenterOffset(t)._floor();return this._offsetIsWithinView(i)?(this.panBy(i),!0):!1},_offsetIsWithinView:function(t,i){var s=i||1,e=this.getSize();return Math.abs(t.x)<=e.x*s&&Math.abs(t.y)<=e.y*s}}),e.PosAnimation=e.DomUtil.TRANSITION?e.PosAnimation:e.PosAnimation.extend({run:function(t,i,s,o){this.stop(),this._el=t,this._inProgress=!0,this._duration=s||.25,this._easeOutPower=1/Math.max(o||.5,.2),this._startPos=e.DomUtil.getPosition(t),this._offset=i.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(),this._complete())},_animate:function(){this._animId=e.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(){var t=+new Date-this._startTime,i=1e3*this._duration;i>t?this._runFrame(this._easeOut(t/i)):(this._runFrame(1),this._complete())},_runFrame:function(t){var i=this._startPos.add(this._offset.multiplyBy(t));e.DomUtil.setPosition(this._el,i),this.fire("step")},_complete:function(){e.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),e.Map.mergeOptions({zoomAnimation:e.DomUtil.TRANSITION&&!e.Browser.android23&&!e.Browser.mobileOpera}),e.DomUtil.TRANSITION&&e.Map.addInitHook(function(){e.DomEvent.on(this._mapPane,e.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)}),e.Map.include(e.DomUtil.TRANSITION?{_zoomToIfClose:function(t,i){if(this._animatingZoom)return!0;if(!this.options.zoomAnimation)return!1;var s=this.getZoomScale(i),o=this._getCenterOffset(t)._divideBy(1-1/s);if(!this._offsetIsWithinView(o,1))return!1;e.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim"),this.fire("movestart").fire("zoomstart"),this.fire("zoomanim",{center:t,zoom:i});var n=this._getCenterLayerPoint().add(o);return this._prepareTileBg(),this._runAnimation(t,i,s,n),!0},_catchTransitionEnd:function(){this._animatingZoom&&this._onZoomTransitionEnd()},_runAnimation:function(t,i,s,o,n){this._animateToCenter=t,this._animateToZoom=i,this._animatingZoom=!0,e.Draggable&&(e.Draggable._disabled=!0);var a=e.DomUtil.TRANSFORM,r=this._tileBg;clearTimeout(this._clearTileBgTimer),e.Util.falseFn(r.offsetWidth);var h=e.DomUtil.getScaleString(s,o),l=r.style[a];r.style[a]=n?l+" "+h:h+" "+l},_prepareTileBg:function(){var t=this._tilePane,i=this._tileBg;if(i&&this._getLoadedTilesPercentage(i)>.5&&.5>this._getLoadedTilesPercentage(t))return t.style.visibility="hidden",t.empty=!0,this._stopLoadingImages(t),s;i||(i=this._tileBg=this._createPane("leaflet-tile-pane",this._mapPane),i.style.zIndex=1),i.style[e.DomUtil.TRANSFORM]="",i.style.visibility="hidden",i.empty=!0,t.empty=!1,this._tilePane=this._panes.tilePane=i;var o=this._tileBg=t;e.DomUtil.addClass(o,"leaflet-zoom-animated"),this._stopLoadingImages(o)},_getLoadedTilesPercentage:function(t){var i,s,e=t.getElementsByTagName("img"),o=0;for(i=0,s=e.length;s>i;i++)e[i].complete&&o++;return o/s},_stopLoadingImages:function(t){var i,s,o,n=Array.prototype.slice.call(t.getElementsByTagName("img"));for(i=0,s=n.length;s>i;i++)o=n[i],o.complete||(o.onload=e.Util.falseFn,o.onerror=e.Util.falseFn,o.src=e.Util.emptyImageUrl,o.parentNode.removeChild(o))},_onZoomTransitionEnd:function(){this._restoreTileFront(),e.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),e.Util.falseFn(this._tileBg.offsetWidth),this._animatingZoom=!1,this._resetView(this._animateToCenter,this._animateToZoom,!0,!0),e.Draggable&&(e.Draggable._disabled=!1)},_restoreTileFront:function(){this._tilePane.innerHTML="",this._tilePane.style.visibility="",this._tilePane.style.zIndex=2,this._tileBg.style.zIndex=1},_clearTileBg:function(){this._animatingZoom||this.touchZoom._zooming||(this._tileBg.innerHTML="")}}:{}),e.Map.include({_defaultLocateOptions:{watch:!1,setView:!1,maxZoom:1/0,timeout:1e4,maximumAge:0,enableHighAccuracy:!1},locate:function(t){if(t=this._locationOptions=e.extend(this._defaultLocateOptions,t),!navigator.geolocation)return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var i=e.bind(this._handleGeolocationResponse,this),s=e.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(i,s,t):navigator.geolocation.getCurrentPosition(i,s,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),this},_handleGeolocationError:function(t){var i=t.code,s=t.message||(1===i?"permission denied":2===i?"position unavailable":"timeout");this._locationOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:i,message:"Geolocation error: "+s+"."})},_handleGeolocationResponse:function(t){var i=180*t.coords.accuracy/4e7,s=2*i,o=t.coords.latitude,n=t.coords.longitude,a=new e.LatLng(o,n),r=new e.LatLng(o-i,n-s),h=new e.LatLng(o+i,n+s),l=new e.LatLngBounds(r,h),c=this._locationOptions;if(c.setView){var m=Math.min(this.getBoundsZoom(l),c.maxZoom);this.setView(a,m)}this.fire("locationfound",{latlng:a,bounds:l,accuracy:t.coords.accuracy})}})}(this,document),L.Proj={},L.Proj._isProj4Proj=function(t){return t.projName!==void 0},L.Proj.Projection=L.Class.extend({initialize:function(t,i){if(L.Proj._isProj4Proj(t))this._proj=t;else{var s=t;Proj4js.defs[s]=i,this._proj=new Proj4js.Proj(s)}},project:function(t){var i=new L.Point(t.lng,t.lat);return Proj4js.transform(Proj4js.WGS84,this._proj,i)},unproject:function(t,i){var s=Proj4js.transform(this._proj,Proj4js.WGS84,t.clone());return new L.LatLng(s.y,s.x,i)}}),L.Proj.CRS=L.Class.extend({includes:L.CRS,options:{transformation:new L.Transformation(1,0,-1,0)},initialize:function(t,i,s){var e,o,n,a;L.Proj._isProj4Proj(t)?(o=t,e=o.srsCode,a=i||{},this.projection=new L.Proj.Projection(o)):(e=t,n=i,a=s||{},this.projection=new L.Proj.Projection(e,n)),L.Util.setOptions(this,a),this.code=e,this.transformation=this.options.transformation,this.options.origin&&(this.transformation=new L.Transformation(1,-this.options.origin[0],-1,this.options.origin[1])),this.options.scales?this.scale=function(t){return this.options.scales[t]}:this.options.resolutions&&(this.scale=function(t){return 1/this.options.resolutions[t]})}}),L.Proj.CRS.TMS=L.Proj.CRS.extend({initialize:function(t,i,s,e){if(L.Proj._isProj4Proj(t)){var o=t,n=i,a=s||{};a.origin=[n[0],n[3]],L.Proj.CRS.prototype.initialize(o,a)}else{var r=t,h=i,n=s,a=e||{};a.origin=[n[0],n[3]],L.Proj.CRS.prototype.initialize(r,h,a)}this.projectedBounds=n}}),L.Proj.TileLayer={},L.Proj.TileLayer.TMS=L.TileLayer.extend({options:{tms:!0,continuousWorld:!0},initialize:function(t,i,s){if(!(i instanceof L.Proj.CRS.TMS))throw Error("CRS is not L.Proj.CRS.TMS.");L.TileLayer.prototype.initialize.call(this,t,s),this.crs=i;for(var e=this.options.minZoom;this.options.maxZoom>e;e++){var o=(this.crs.projectedBounds[3]-this.crs.projectedBounds[1])/this._projectedTileSize(e);if(Math.abs(o-Math.round(o))>.001)throw Error("Projected bounds does not match grid at zoom "+e)}},getTileUrl:function(t){var i=Math.round((this.crs.projectedBounds[3]-this.crs.projectedBounds[1])/this._projectedTileSize(this._map.getZoom()));return L.Util.template(this._url,L.Util.extend({s:this._getSubdomain(t),z:this._getZoomForUrl(),x:t.x,y:i-t.y-1},this.options))},_projectedTileSize:function(t){return this.options.tileSize/this.crs.scale(t)}}),"undefined"!=typeof module&&(module.exports=L.Proj),"undefined"!=typeof L&&L.CRS!==void 0&&(L.CRS.proj4js=function(){return function(t,i,s,e){return e=e||{},s&&(e.transformation=s),new L.Proj.CRS(t,i,e)}}()),L.Control.MousePosition=L.Control.extend({options:{position:"bottomleft",separator:" : ",emptyString:"Unavailable",lngFirst:!1,numDigits:5,lngFormatter:void 0,latFormatter:void 0},onAdd:function(t){return this._container=L.DomUtil.create("div","leaflet-control-mouseposition"),L.DomEvent.disableClickPropagation(this._container),t.on("mousemove",this._onMouseMove,this),this._container.innerHTML=this.options.emptyString,this._container},onRemove:function(t){t.off("mousemove",this._onMouseMove)},_onMouseMove:function(t){var i=L.Util.formatNum(t.latlng.lng,this.options.numDigits),s=L.Util.formatNum(t.latlng.lat,this.options.numDigits);this.options.lngFormatter&&(i=this.options.lngFormatter(i)),this.options.latFormatter&&(s=this.options.latFormatter(s));var e=this.options.lngFirst?i+this.options.separator+s:s+this.options.separator+i;this._container.innerHTML=e}}),L.Map.mergeOptions({positionControl:!1}),L.Map.addInitHook(function(){this.options.positionControl&&(this.positionControl=new L.Control.MousePosition,this.addControl(this.positionControl))}),L.control.mousePosition=function(t){return new L.Control.MousePosition(t)},function(t,i){L.KSP={},L.KSP.version="0.2.1",L.KSP.CRS={},L.KSP.CRS.EPSG4326=new L.Proj.CRS.TMS(new Proj4js.Proj("EPSG:4326"),[-180,-90,180,90],{resolutions:[.703125,.3515625,.17578125,.087890625,.0439453125,.02197265625]}),L.KSP.CelestialBody=L.Class.extend({initialize:function(t){if(!t.hasOwnProperty("id"))throw Error("must specify id");if(!t.hasOwnProperty("name"))throw Error("must specify name");if(t.hasOwnProperty("crs")){if(!(t.crs instanceof L.Proj.CRS.TMS))throw Error("crs is not an instance of L.Proj.CRS.TMS")}else this.crs=L.KSP.CRS.EPSG4326;t.hasOwnProperty("radius")||(this.radius=1),t.hasOwnProperty("thumbnail")||(this.thumbnail="body-unknown.png"),t.hasOwnProperty("baseLayers")||(this.baseLayers={}),L.Util.extend(this,t)},addTo:function(t){var i,s=t._body;if(t._body=this,t.fire("bodychangestart",{body:this,oldBody:s}),s){for(i in s.baseLayers)s.baseLayers.hasOwnProperty(i)&&t.removeLayer(s.baseLayers[i]);for(i in s.overlays)s.overlays.hasOwnProperty(i)&&t.removeLayer(s.overlays[i])}var e=this.defaultLayer||this.baseLayers.Satellite;if(e){for(i in this.baseLayers)if(this.baseLayers.hasOwnProperty(i)&&this.baseLayers[i]._type===t._baseLayerType){e=this.baseLayers[i];break}t.addLayer(e),t.fire("baselayerchange",{layer:e})}for(i in this.overlays)this.overlays.hasOwnProperty(i)&&t._overlayTypes.indexOf(this.overlays[i]._type)>=0&&(t.addLayer(this.overlays[i]),t.fire("layeradd",{layer:this.overlays[i]}));t.fire("bodychangeend",{body:this,oldBody:s})},onAdd:function(t){this.addTo(t)},removeFrom:function(t){L.KSP.CelestialBody.DUMMY.addTo(t)},onRemove:function(t){this.removeFrom(t)}}),L.KSP.celestialBody=function(t){return new L.KSP.CelestialBody(t)},L.KSP.CelestialBody.DUMMY=L.KSP.celestialBody({id:"",name:"",crs:L.KSP.CRS.EPSG4326}),L.KSP.CelestialBody.ALL_PLANETARY=[L.KSP.CelestialBody.DUMMY],L.KSP.Map=L.Map.extend({options:{crs:L.KSP.CRS.EPSG4326,continuousWorld:!0},initialize:function(t,i){this._baseLayerType=-1,this._overlayTypes=[],L.Util.setOptions(this,i),this.startTrackingLayerState(),this.on("bodychangestart",this._onBodyChangeStart).on("bodychangeend",this._onBodyChangeEnd),L.Map.prototype.initialize.call(this,t,this.options)},clampZoom:function(){var t=this.getZoom(),i=this.getMinZoom(),s=this.getMaxZoom();i>t?this.setZoom(i):t>s?this.setZoom(s):this.fire("zoomend",this)},_onBodyChangeStart:function(){this.stopTrackingLayerState()},_onBodyChangeEnd:function(){this.clampZoom(),this.startTrackingLayerState()},_onLayerStateChange:function(t){if("layeradd"===t.type)t.layer instanceof L.KSP.TileLayer?this._baseLayerType=t.layer._type:t.layer instanceof L.KSP.LayerGroup&&0>this._overlayTypes.indexOf(t.layer._type)&&this._overlayTypes.push(t.layer._type);else if(t.layer instanceof L.KSP.LayerGroup){var i,s,e=t.layer._type,o=this._overlayTypes;for(i=o.length-1;i>=0;i--)s=o[i],s===e&&o.splice(i,1)}},startTrackingLayerState:function(){this.on("layeradd",this._onLayerStateChange).on("layerremove",this._onLayerStateChange)},stopTrackingLayerState:function(){this.off("layeradd",this._onLayerStateChange).off("layerremove",this._onLayerStateChange)}}),L.KSP.map=function(t,i){return new L.KSP.Map(t,i)},L.KSP.TileLayer=L.Proj.TileLayer.TMS.extend({statics:{TYPE_SATELLITE:0,TYPE_COLORRELIEF:1,TYPE_SLOPE:2,DEFAULT_URL:"http://tiles.kerbalmaps.com/{body}/{style}/{z}/{x}/{y}.png"},options:{continuousWorld:!1,noWrap:!1,minZoom:0,maxZoom:5,attribution:"Map data &copy; Joel Pedraza"},initialize:function(t,i,s,e){L.Util.setOptions(this,e),this._type=t,L.Proj.TileLayer.TMS.prototype.initialize.call(this,i,s,this.options)}}),L.KSP.tileLayer=function(t,i,s,e){return new L.KSP.TileLayer(t,i,s,e)},L.KSP.LayerGroup=L.LayerGroup.extend({statics:{TYPE_SPACECENTER:0,TYPE_ANOMALY:1},initialize:function(t,i){this._type=t,L.LayerGroup.prototype.initialize.call(this,i)}}),L.KSP.layerGroup=function(t,i){return new L.KSP.LayerGroup(t,i)},L.KSP.Icon={},L.KSP.Icon.SPACECENTER=new L.Icon({iconUrl:"../assets/images/markers-spacecenter.png",shadowUrl:"../assets/images/markers-shadow.png",iconSize:[30,40],shadowSize:[35,16],iconAnchor:[15,40],shadowAnchor:[10,12],popupAnchor:[0,-35]}),L.KSP.Icon.ANOMALY=new L.Icon({iconUrl:"../assets/images/markers-anomaly.png",shadowUrl:"../assets/images/markers-shadow.png",iconSize:[30,40],shadowSize:[35,16],iconAnchor:[15,40],shadowAnchor:[10,12],popupAnchor:[0,-35]}),L.KSP.Legend={},L.KSP.Legend.SLOPE={"&ge; 60&deg;":"#E19678","&lt; 60&deg;":"#C86464","&lt; 30&deg;":"#965A64","&lt; 15&deg;":"#645064","&lt; 5&deg;":"#325064","0&deg;":"#32465A"},L.KSP.Control=L.KSP.control={},L.KSP.Control.Legend=L.Control.extend({options:{position:"bottomright"},onAdd:function(t){return this._container=L.DomUtil.create("div","leaflet-control-legend"),t.on("baselayerchange",this._onLayerChange,this),this._container},_update:function(t){if(this._container.innerHTML="",t){for(var i in t)t.hasOwnProperty(i)&&(this._container.innerHTML+='<i style="background-color: '+t[i]+';"></i>'+i+"<br>");L.DomUtil.addClass(this._container,"leaflet-control-legend-visible")}else this._container.className=this._container.className.replace(" leaflet-control-legend-visible","")},_onLayerChange:function(t){this._update(t.layer.options.legend)}}),L.Map.mergeOptions({legendControl:!0}),L.Map.addInitHook(function(){this.options.bodyControl&&(this.legendControl=new L.KSP.Control.Legend,this.addControl(this.legendControl))}),L.control.legend=function(t){return new L.KSP.Control.Legend(t)},L.KSP.Control.Scale=L.Control.Scale.extend({options:{imperial:!1},onAdd:function(t){this._radius=0,t._body&&(this._radius=t._body.radius);var i=L.Control.Scale.prototype.onAdd.call(this,t);return t.on("bodychangeend",this._onBodyChangeEnd,this),i},onRemove:function(t){L.Control.Scale.prototype.onRemove.call(this,t),t.off("bodychangeend",this._onBodyChangeEnd)},_onBodyChangeEnd:function(t){this._radius=t.body.radius,this._update()},_update:function(){var t=this._map.getBounds(),i=t.getCenter().lat,s=this._radius*Math.PI*Math.cos(i*Math.PI/180),e=s*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),n=this.options,a=0;o.x>0&&(a=e*(n.maxWidth/o.x)),this._updateScales(n,a)}}),L.KSP.Map.mergeOptions({scaleControl:!1}),L.KSP.Map.addInitHook(function(){this.options.scaleControl&&(this.scaleControl=new L.KSP.Control.Scale,this.addControl(this.scaleControl))}),L.KSP.control.scale=function(t){return new L.KSP.Control.Scale(t)},L.KSP.Control.CelestialBody=L.Control.extend({options:{position:"topright",collapsed:!0},initialize:function(t,i){L.Util.setOptions(this,i),this._bodies=t,this._timeInMillis=(new Date).valueOf(),this._weekInMillis=6048e5},onAdd:function(){return this._initLayout(),this._update(),this._map.on("bodychangeend",this._update,this),this._container},_initLayout:function(){var t="leaflet-control-celestialbodies",s=this._container=L.DomUtil.create("div",t),e=this._bodies;if(this.options.collapsed){L.DomEvent.on(s,"mouseover",this._expand,this).on(s,"mouseout",this._collapse,this);var o=this._bodiesLink=L.DomUtil.create("a",t+"-toggle",s);o.href="#",o.title="Celestial Bodies",L.DomEvent.on(o,"focus",this._expand,this),this._map.on("movestart",this._collapse,this)}var n=this._list=L.DomUtil.create("ul",t+"-list",s);for(var a in e)if(e.hasOwnProperty(a)){var r=this._addBody(e[a],n);if(e[a].children){var h=i.createElement("ul");for(var l in e[a].children)e[a].children.hasOwnProperty(l)&&this._addBody(e[a].children[l],h);r.appendChild(h)}}},_update:function(){this._map._body&&(this._bodiesLink.style.backgroundImage='url("'+this._map._body.thumbnail+'")')},_addBody:function(t,s){var e,o=i.createElement("li"),n=i.createElement("img");if(n.src=t.thumbnail,n.alt=o.title=t.name,t.addedOn){this._timeInMillis-t.addedOn<this._weekInMillis?(e=L.DomUtil.create("h2","leaflet-control-celestialbodies-flag leaflet-control-celestialbodies-flag-orange",o),e.innerHTML="new"):this._timeInMillis-t.lastUpdated<this._weekInMillis&&(e=L.DomUtil.create("h2","leaflet-control-celestialbodies-flag",o),e.innerHTML="update");var a=i.createElement("a");a.href="#";var r=L.DomEvent.stopPropagation;L.DomEvent.on(a,"click",r).on(a,"mousedown",r).on(a,"dblclick",r).on(a,"click",L.DomEvent.preventDefault).on(a,"click",function(){return t.addTo(this._map),!1
},this),a.appendChild(n),o.appendChild(a)}else L.DomUtil.addClass(n,"disabled"),o.appendChild(n);return s.appendChild(o),o},_expand:function(){L.DomUtil.addClass(this._container,"leaflet-control-celestialbodies-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-celestialbodies-expanded","")}}),L.KSP.Map.mergeOptions({bodyControl:!0}),L.KSP.Map.addInitHook(function(){this.options.bodyControl&&(this.bodyControl=new L.KSP.Control.CelestialBody(L.KSP.CelestialBody.ALL_PLANETARY),this.addControl(this.bodyControl))}),L.KSP.control.celestialBody=function(t,i){return new L.KSP.Control.CelestialBody(t,i)},L.KSP.Control.Layers=L.Control.Layers.extend({onAdd:function(t){var i=L.Control.Layers.prototype.onAdd.call(this,t);return t._body&&this.addBody(t._body),t.on("bodychangestart",this._onBodyChangeStart,this),i},onRemove:function(t){L.Control.Layers.prototype.onRemove.call(this,t),t.off("bodychangestart",this._onBodyChangeStart)},addBody:function(t){var i;for(i in t.baseLayers)t.baseLayers.hasOwnProperty(i)&&this.addBaseLayer(t.baseLayers[i],i);for(i in t.overlays)t.overlays.hasOwnProperty(i)&&this.addOverlay(t.overlays[i],i)},removeBody:function(t){var i;for(i in t.baseLayers)t.baseLayers.hasOwnProperty(i)&&this.removeLayer(t.baseLayers[i],i);for(i in t.overlays)t.overlays.hasOwnProperty(i)&&this.removeLayer(t.overlays[i],i)},_onBodyChangeStart:function(t){t.oldBody&&this.removeBody(t.oldBody),this.addBody(t.body)}}),L.KSP.Map.mergeOptions({layersControl:!0}),L.KSP.Map.addInitHook(function(){this.options.layersControl&&(this.layersControl=new L.KSP.Control.Layers,this.addControl(this.layersControl))}),L.KSP.control.layers=function(t,i,s){return new L.KSP.Control.Layers(t,i,s)},L.KSP.CelestialBody.MOHO=L.KSP.celestialBody({id:"moho",name:"Moho",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-moho.png"}),L.KSP.CelestialBody.EVE=L.KSP.celestialBody({id:"eve",name:"Eve",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-eve.png"}),L.KSP.CelestialBody.GILLY=L.KSP.celestialBody({id:"gilly",name:"Gilly",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-gilly.png"}),L.KSP.CelestialBody.KERBIN=L.KSP.celestialBody({id:"kerbin",name:"Kerbin",crs:L.KSP.CRS.EPSG4326,radius:6e5,addedOn:1366416e6,lastUpdated:1366416e6,thumbnail:"body-kerbin.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"kerbin",style:"sat",maxZoom:4}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"kerbin",style:"color",maxZoom:4,legend:{"4500 m":"#FFFFFF","4000 m":"#E6E1E1","3000 m":"#C39B87","2000 m":"#B97855","1000 m":"#B99B6E","600 m":"#5A825A","200 m":"#1E784B","50 m":"#0A6437","0 m":"#004120","-500 m":"#0F4B9B","-100 m":"#1E6E9B"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"kerbin",style:"slope",maxZoom:4})},overlays:{"Space Centers":L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_SPACECENTER,[L.marker([-.0969,-74.6004],{icon:L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Kerbal Space Center</strong><br>-0.0969 : -74.6004"),L.marker([20.5829,-146.5116],{icon:L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Kerbal Space Center 2</strong><br>20.5829 : -146.5116"),L.marker([-1.5409,-71.9099],{icon:L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Island Airfield</strong><br>-1.5409 : -71.9099")]),Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([.1023,-74.5684],{icon:L.KSP.Icon.ANOMALY}).bindPopup("0.1023 : -74.5684"),L.marker([20.6709,-146.4968],{icon:L.KSP.Icon.ANOMALY}).bindPopup("20.6709 : -146.4968"),L.marker([35.5705,-74.9773],{icon:L.KSP.Icon.ANOMALY}).bindPopup("35.5705 : -74.9773"),L.marker([-.6402,-80.7668],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-0.6402 : -80.7668"),L.marker([-28.8083,-13.4401],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-28.8083 : -13.4401"),L.marker([-6.5057,-141.6856],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-6.5057 : -141.6856"),L.marker([81.9551,-128.518],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-81.9551 : -128.518")])}}),L.KSP.CelestialBody.MUN=L.KSP.celestialBody({id:"mun",name:"Mun",crs:L.KSP.CRS.EPSG4326,radius:2e5,addedOn:13682304e5,lastUpdated:1368144e6,thumbnail:"body-mun.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"mun",style:"sat"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"mun",style:"color",legend:{"3150 m":"#EBEBEB","-180 m":"#232323"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{body:"mun",style:"slope",legend:L.KSP.Legend.SLOPE})},overlays:{Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([-9.8314,25.9177],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-9.8314 : 25.9177"),L.marker([-82.2063,102.9305],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-82.2063 : 102.9305"),L.marker([57.6604,9.1422],{icon:L.KSP.Icon.ANOMALY}).bindPopup("57.6604 : 9.1422"),L.marker([2.4695,81.5133],{icon:L.KSP.Icon.ANOMALY}).bindPopup("2.4695 : 81.5133"),L.marker([12.4432,39.178],{icon:L.KSP.Icon.ANOMALY}).bindPopup("12.4432 : 39.1780"),L.marker([-12.4431,-140.822],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-12.4431 : -140.8220"),L.marker([.7027,22.747],{icon:L.KSP.Icon.ANOMALY}).bindPopup("0.7027 : 22.7470"),L.marker([-70.9556,-68.1378],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-70.9556,-68.1378")])}}),L.KSP.CelestialBody.MINMUS=L.KSP.celestialBody({id:"minmus",name:"Minmus",crs:L.KSP.CRS.EPSG4326,radius:6e4,addedOn:13682304e5,lastUpdated:13682304e5,thumbnail:"body-minmus.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"sat",body:"minmus"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"color",body:"minmus",legend:{"5750 m":"#414B41","2500 m":"#BEE6C3","1 m":"#96CDB4","0 m":"#87B9A5"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"slope",body:"minmus",legend:L.KSP.Legend.SLOPE})},overlays:{Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([23.7768,60.0462],{icon:L.KSP.Icon.ANOMALY}).bindPopup("23.7768 : 60.0462")])}}),L.KSP.CelestialBody.DUNA=L.KSP.celestialBody({id:"duna",name:"Duna",crs:L.KSP.CRS.EPSG4326,radius:32e4,addedOn:13688352e5,lastUpdated:13688352e5,thumbnail:"body-duna.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"sat",body:"duna"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"color",body:"duna",legend:{"4800 m":"#C3A082","4000 m":"#966446","3000 m":"#733219","2000 m":"#501E14","1000 m":"#3C140F","0 m":"#280F0A"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"slope",body:"duna",legend:L.KSP.Legend.SLOPE})},overlays:{Anomalies:L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY,[L.marker([17.0483,-85.4717],{icon:L.KSP.Icon.ANOMALY}).bindPopup("17.0483 : -85.4717"),L.marker([-30.3525,-28.6828],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-30.3525 : -28.6828"),L.marker([-66.1344,-160.7432],{icon:L.KSP.Icon.ANOMALY}).bindPopup("-66.1344 : -160.7432")])}}),L.KSP.CelestialBody.IKE=L.KSP.celestialBody({id:"ike",name:"Ike",crs:L.KSP.CRS.EPSG4326,radius:13e4,addedOn:13688352e5,lastUpdated:13688352e5,thumbnail:"body-ike.png",baseLayers:{Satellite:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"sat",body:"ike"}),"Color Relief":L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"color",body:"ike",legend:{"13000 m":"#828282","11000 m":"#6E6E6E","9000 m":"#5A5A5A","7000 m":"#464646","5000 m":"#323232","2500 m":"#191919","70 m":"#070707"}}),Slope:L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,L.KSP.TileLayer.DEFAULT_URL,L.KSP.CRS.EPSG4326,{style:"slope",body:"ike",legend:L.KSP.Legend.SLOPE})},overlays:{}}),L.KSP.CelestialBody.DRES=L.KSP.celestialBody({id:"dres",name:"Dres",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-dres.png"}),L.KSP.CelestialBody.JOOL=L.KSP.celestialBody({id:"jool",name:"Jool",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-jool.png"}),L.KSP.CelestialBody.LAYTHE=L.KSP.celestialBody({id:"laythe",name:"Laythe",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-laythe.png"}),L.KSP.CelestialBody.VALL=L.KSP.celestialBody({id:"vall",name:"Vall",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-vall.png"}),L.KSP.CelestialBody.TYLO=L.KSP.celestialBody({id:"tylo",name:"Tylo",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-tylo.png"}),L.KSP.CelestialBody.BOP=L.KSP.celestialBody({id:"bop",name:"Bop",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-bop.png"}),L.KSP.CelestialBody.POL=L.KSP.celestialBody({id:"pol",name:"Pol",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-pol.png"}),L.KSP.CelestialBody.EELOO=L.KSP.celestialBody({id:"eeloo",name:"Eeloo",crs:L.KSP.CRS.EPSG4326,thumbnail:"body-eeloo.png"}),L.KSP.CelestialBody.KERBIN.defaultLayer=L.KSP.CelestialBody.KERBIN.baseLayers.Satellite,L.KSP.CelestialBody.MUN.defaultLayer=L.KSP.CelestialBody.MUN.baseLayers.Satellite,L.KSP.CelestialBody.MINMUS.defaultLayer=L.KSP.CelestialBody.MINMUS.baseLayers.Satellite,L.KSP.CelestialBody.EVE.children=[L.KSP.CelestialBody.GILLY],L.KSP.CelestialBody.KERBIN.children=[L.KSP.CelestialBody.MUN,L.KSP.CelestialBody.MINMUS],L.KSP.CelestialBody.DUNA.children=[L.KSP.CelestialBody.IKE],L.KSP.CelestialBody.JOOL.children=[L.KSP.CelestialBody.LAYTHE,L.KSP.CelestialBody.VALL,L.KSP.CelestialBody.TYLO,L.KSP.CelestialBody.BOP,L.KSP.CelestialBody.POL],L.KSP.CelestialBody.GILLY.parent=L.KSP.CelestialBody.EVE,L.KSP.CelestialBody.MUN.parent=L.KSP.CelestialBody.MINMUS.parent=L.KSP.CelestialBody.KERBIN,L.KSP.CelestialBody.IKE.parent=L.KSP.CelestialBody.DUNA,L.KSP.CelestialBody.LAYTHE.parent=L.KSP.CelestialBody.VALL.parent=L.KSP.CelestialBody.TYLO.parent=L.KSP.CelestialBody.BOP.parent=L.KSP.CelestialBody.POL.parent=L.KSP.CelestialBody.JOOL,L.KSP.CelestialBody.ALL_PLANETARY=[L.KSP.CelestialBody.MOHO,L.KSP.CelestialBody.EVE,L.KSP.CelestialBody.KERBIN,L.KSP.CelestialBody.DUNA,L.KSP.CelestialBody.DRES,L.KSP.CelestialBody.JOOL,L.KSP.CelestialBody.EELOO],L.KSP.Map.addInitHook(function(){this.options.layers=[L.KSP.CelestialBody.KERBIN]})}(this,document);
var Settings = Class.create({
  initialize: function(defaultHost, defaultPort){
    if(!this.getHost()){ this.setHost(defaultHost)}
    if(!this.getPort()){ this.setPort(defaultPort)}
  },

  getHost: function(){
    return this.get('host')
  },

  getPort: function(){
    return this.get('port')
  },

  setHost: function(value){
    return this.set('host', value)
  },

  setPort: function(value){
    return this.set('port', value)
  },

  get: function(property){
    return localStorage.getItem(property)
  },

  set: function(property, value){
    return localStorage.setItem(property, value)
  }
})
var Telemachus = Class.create({
  initialize: function(host, port){
    this.updateConnection(host, port)
    this.receiverFunctions = []
    this.subscribedFields = {}
    this.orbitingBodies = this.getOrbitalBodies()
    this.rate = 500

    this.loopTimeout = setTimeout(this.poll.bind(this), this.rate)
  },

  url: function(){
    return "http://" + this.host + ":" + this.port + "/telemachus/datalink"
  },

  updateConnection: function(host, port){
    this.host = host
    this.port = port
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    for (var i = fields.length - 1; i >= 0; i--) {
      var field = fields[i]
      this.subscribedFields[field] = field
    };
  },

  dispatchMessages: function(data){
    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      try{
        this.receiverFunctions[i](data)
      } catch(e){
        console.error(e)
      }
    };
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  },

  getOrbitalBodyInfo: function(name){
    var properties = this.orbitingBodies[name]

    if(properties){
      return Object.extend({name: name}, properties)
    } else{
      return null
    }
  },

  notifyIfLOS: function(request){
    if(request.transport.status == 0){
      document.fire('telemachus:loss-of-signal')
      return true
    }
    return false
  },

  prepareParams: function(params){
    var normalizedParams = []
    Object.keys(params).forEach(function(field){
      var sanitizedFieldName = field.replace("[", "{").replace("]","}")
      normalizedParams.push(sanitizedFieldName + "=" + field)
    })
    return normalizedParams
  },

  convertData: function(rawData){
    var data = {}
    var startBracesRegexp = /\{/g
    var endBracesRegexp = /\}/g

    Object.keys(rawData).forEach(function(key){
      var convertedFieldName = key.replace(startBracesRegexp, "[").replace(endBracesRegexp, "]")
      data[convertedFieldName] = rawData[key]
    })

    return data
  },

  poll: function(){
    var params = this.prepareParams(this.subscribedFields)
    var requestURL = this.url() + "?" + params.join("&")

    new Ajax.Request(requestURL, {
      method: "get",
      onSuccess: function(response){
        var rawData = JSON.parse(response.responseText)
        var data = this.convertData(rawData)

        this.dispatchMessages(data)
      }.bind(this),
      onException: this.notifyIfLOS.bind(this),
      onComplete: function(response){
        setTimeout(this.poll.bind(this),this.rate);
      }.bind(this)
    })
  },

  sendMessage: function(params, callback){
    new Ajax.Request(this.url(), {
      method: "post",
      postBody: JSON.stringify(params),
      // parameters: params,
      onSuccess: function(response){
        var rawData = JSON.parse(response.responseText)
        var data = this.convertData(rawData)
        callback(data)
      }.bind(this),
      onException: this.notifyIfLOS.bind(this)
    })
  },

  cameraURL: function(){
    return "http://" + this.host + ":" + this.port + "/telemachus/cameras"
  },

  getCameraList: function(callback){
    new Ajax.Request(this.cameraURL(), {
      method: "get",
      // parameters: params,
      onSuccess: function(response){
        var data = JSON.parse(response.responseText)
        callback(data)
      }.bind(this),
      onException: this.notifyIfLOS.bind(this)
    })
  },

  getOrbitalBodies: function(){
    return {
      "Sun" : {
        id: 0,
        referenceBodyName: null,
        mapBody: null,
        atmosphericRadius: 0,
        color: '#FFFF00',
        surfaceGravity: 17.1 //m/s^2,
      },
      "Kerbin" : {
        id: 1,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.KERBIN,
        atmosphericRadius: 70000,
        color: '#4a5472',
        surfaceGravity: 9.81 //m/s^2
      },
      "Mun" : {
        id: 2,
        referenceBodyName: "Kerbin",
        mapBody: L.KSP.CelestialBody.MUN,
        atmosphericRadius: 0,
        color: '#e2e0d7',
        surfaceGravity: 1.63 //m/s^2
      },
      "Minmus" : {
        id: 3,
        referenceBodyName: "Kerbin",
        mapBody: L.KSP.CelestialBody.MINMUS,
        color: '#98f2c5',
        atmosphericRadius: 0,
        surfaceGravity: 0.491 //m/s^2
      },
      "Moho" : {
        id: 4,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.MOHO,
        atmosphericRadius: 0,
        color: '#fdc39e',
        surfaceGravity: 2.70 //m/s^2
      },
      "Eve" : {
        id: 5,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.EVE,
        atmosphericRadius: 90000,
        color: '#c394fe',
        surfaceGravity: 16.7 //m/s^2
      },
      "Duna" : {
        id: 6,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.DUNA,
        atmosphericRadius: 50000,
        color: '#fc5e49',
        surfaceGravity: 2.94 //m/s^2
      },
      "Ike" : {
        id: 7,
        referenceBodyName: "Duna",
        mapBody: L.KSP.CelestialBody.IKE,
        atmosphericRadius: 0,
        color: '#e2e0d7',
        surfaceGravity: 1.10 //m/s^2
      },
      "Jool" : {
        id: 8,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.JOOL,
        atmosphericRadius: 200000,
        color: '#C5DCAB',
        surfaceGravity: 7.85 //m/s^2
      },
      "Laythe" : {
        id: 9,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.LAYTHE,
        atmosphericRadius: 50000,
        color: '#a8b4fe',
        surfaceGravity: 7.85 //m/s^2
      },
      "Vall" : {
        id: 10,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.VALL,
        atmosphericRadius: 0,
        color: '#b0f4fe',
        surfaceGravity: 2.31 //m/s^2
      },
      "Bop" : {
        id: 11,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.BOP,
        atmosphericRadius: 0,
        color: '#c64605',
        surfaceGravity: 0.589 //m/s^2
      },
      "Tylo" : {
        id: 12,
        referenceBodyName: "Jool",
        mapBody: L.KSP.CelestialBody.TYLO,
        atmosphericRadius: 0,
        color: '#fdf7ed',
        surfaceGravity: 7.85 //m/s^2
      },
      "Gilly" : {
        id: 13,
        referenceBodyName: "Eve",
        mapBody: L.KSP.CelestialBody.GILLY,
        atmosphericRadius: 0,
        color: '#fdcbb1',
        surfaceGravity: 0.049 //m/s^2
      },
      "Pol" : {
        id: 14,
        referenceBodyName: "Pol",
        mapBody: L.KSP.CelestialBody.POL,
        atmosphericRadius: 0,
        color: '#fec681',
        surfaceGravity: 0.373 //m/s^2
      },
      "Dres" : {
        id: 15,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.DRES,
        atmosphericRadius: 0,
        color: '#fef8f9',
        surfaceGravity: 1.13 //m/s^2
      },
      "Eeloo" : {
        id: 16,
        referenceBodyName: "Sun",
        mapBody: L.KSP.CelestialBody.EELOO,
        atmosphericRadius: 0,
        color: '#e5fafe',
        surfaceGravity: 1.69 //m/s^2
      }
    }
  }
})
var TitleBar = Class.create({
  initialize: function(datalink, title_bar_id){
    this.datalink = datalink
    this.title_bar_id = title_bar_id
    this.title_bar = $(this.title_bar_id)
    this.initializeLOSNotifier()
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.title_bar.down("#world-clock").update(TimeFormatters.formatUT(data["t.universalTime"]))
      this.title_bar.down("#mission-time").update(TimeFormatters.formatMET(data["v.missionTime"]))

      this.title_bar.down("#mission-time").removeClassName("loss-of-signal")
    }.bind(this))
  },

  initializeLOSNotifier:function(){
    document.observe('telemachus:loss-of-signal', function(){
      window.requestAnimationFrame(function(){
        this.title_bar.down("#mission-time").update("&#9888; LOS &#9888;")
        this.title_bar.down("#mission-time").addClassName("loss-of-signal")
      }.bind(this))
    }.bind(this))
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      't.timeWarp', 't.universalTime', 'v.missionTime'
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ButtonIndicator = Class.create({
  initialize: function(datalink, indicatorId, apiButtonString){
    this.datalink = datalink
    this.indicatorId = indicatorId
    this.indicator = $(this.indicatorId)
    this.apiButtonString = apiButtonString
    this.initializeDatalink()
  },

  update: function(data){
    if(data[this.apiButtonString] == true){
      this.indicator.addClassName("on")
    } else{
      this.indicator.removeClassName("on")
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([this.apiButtonString])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ReadoutTable = Class.create({
  initialize: function(datalink, tableId, dataRows){
    this.datalink = datalink
    this.tableId = tableId
    this.table = $(this.tableId)
    this.dataRows = dataRows
    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      this.dataRows.forEach(function(row){
        var rowId = row.label
        var tableRow = this.table.down("tr[data-label='"+ rowId +"']")

        if(!tableRow){
          var tableRow = new Element("tr", {
            "data-label" : rowId
          })

          tableRow.insert("<th>" + row.label + "</th><td></td>")
          this.table.insert(tableRow)
        }

        tableRow.down("td").update(row.formatter(data[row.value]))
      }.bind(this))
    }.bind(this))
  },

  initializeDatalink: function(){
    var dataValues = this.dataRows.map(function(dataRow){
      return dataRow.value
    })

    this.datalink.subscribeToData(dataValues)

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ResourceMonitor = Class.create({
  initialize: function(datalink, resourceName, options){
    this.datalink = datalink
    this.resourceName = resourceName
    this.options = Object.extend({
      currentStageProgressBar: null,
      totalProgressBar: null,
      valuePrefix: null
    }, options)

    this.resourceStrings = this.buildResourceStrings()

    this.initializeDatalink()
  },

  update: function(data){
    window.requestAnimationFrame(function(){
      if(this.options.totalProgressBar){
        this.options.totalProgressBar.value = data[this.resourceStrings.totalAvailable]
        this.options.totalProgressBar.max = data[this.resourceStrings.totalMax]
      }

      if(this.options.currentStageProgressBar){
        this.options.currentStageProgressBar.value = data[this.resourceStrings.currentStageAvailable]
        this.options.currentStageProgressBar.max = data[this.resourceStrings.currentStageMax]
      }

      this.updateValue("-total-value", data[this.resourceStrings.totalAvailable])
      this.updateValue("-total-max", data[this.resourceStrings.totalMax])

      this.updateValue("-current-stage-value", data[this.resourceStrings.currentStageAvailable])
      this.updateValue("-current-stage-max", data[this.resourceStrings.currentStageMax])
    }.bind(this))
  },

  updateValue: function(id, value){
    if($(this.options.valuePrefix + id)){
      if(value < 0){
        $(this.options.valuePrefix + id).update("NA")
      } else{
        $(this.options.valuePrefix + id).update(value.toFixed(2))
      }
    }
  },

  buildResourceStrings: function(){
    return {
      totalAvailable: "r.resource["+ this.resourceName +"]",
      totalMax: "r.resourceMax["+ this.resourceName +"]",
      currentStageAvailable: "r.resourceCurrent["+ this.resourceName +"]",
      currentStageMax: "r.resourceCurrentMax["+ this.resourceName +"]",
    }
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData([
      this.resourceStrings.totalAvailable,
      this.resourceStrings.totalMax,
      this.resourceStrings.currentStageAvailable,
      this.resourceStrings.currentStageMax
    ])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var DataTable = Class.create({
  initialize: function(tableID, dataRows){
    this.tableID = tableID
    this.table = $(this.tableID)
    this.dataRows = dataRows
  },

  update: function(){
    window.requestAnimationFrame(function(){
      this.dataRows.forEach(function(row){
        var rowId = row.label
        var tableRow = this.table.down("tr[data-label='"+ rowId +"']")

        if(!tableRow){
          var tableRow = new Element("tr", {
            "data-label" : rowId
          })

          tableRow.insert("<th>" + row.label + "</th><td></td>")
          this.table.insert(tableRow)
        }

        tableRow.down("td").update(row.value)
      }.bind(this))
    }.bind(this))
  },

  clear: function(){
    window.requestAnimationFrame(function(){
      this.dataRows = []
      this.table.innerHTML = ""
    }.bind(this))
  }
})
var AtmosphericDensityGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
    this.func = function(x){return Math.log(2.0 * x)}
  },

  update: function(data){
    var max = this.func(100)
    var value = this.func(data['v.atmosphericPressure'] * 100)
    if(!isFinite(value)){ value = 0 }

    this.gauge.value = value
    this.gauge.max = max
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['v.atmosphericPressure'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var ThrottleGauge = Class.create({
  initialize: function(datalink, gaugeID){
    this.datalink = datalink
    this.gaugeID = gaugeID
    this.gauge = $(this.gaugeID)
    this.initializeDatalink()
  },

  update: function(data){
    this.gauge.value = data['f.throttle'] * 100
    this.gauge.max = 100
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['f.throttle'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var OrbitalMath = {
  partsOfUniversalDateTime: function(time){
    var parts = {}
    if (time == null) {
      time = 0;
    }
    parts.year = ((time / (365 * 24 * 3600)) | 0) + 1;
    time %= 365 * 24 * 3600;
    parts.day = ((time / (24 * 3600)) | 0) + 1;
    time %= 24 * 3600;
    parts.universalTime = time

    parts.hour = (time / 3600) | 0;
    time %= 3600;
    parts.minutes = (time / 60) | 0;
    parts.seconds = (time % 60 | 0).toFixed();

    return parts
  },

  calculateGMSTInDegrees: function(universalDateTime){
    var timeParts = partsOfUniversalDateTime(universalDateTime)
    var G = 6.697374558
    var dayFactor = 0.06570982441908
    var timeFactor = 1.00273790935
    return G + (dayFactor * timeParts.day) + (timeFactor * timeParts.hour)
  },

  eccentricAnomalyFromTrueAnomalyAndEcentricity: function(trueAnomaly, eccentricity){
    return 2 * Math.atan(Math.sqrt((1-eccentricity)/(1+eccentricity)) * Math.tan(trueAnomaly/2))
  },

  meanMotionFromGravitationalParametersAndSemimajorAxis: function(gravitationalParameter, semiMajorAxis, orbitalPeriod){
    // console.log("mu : " + gravitationalParameter + " SMA : " + semiMajorAxis)
    // return orbitalPeriod * Math.sqrt(gravitationalParameter/(4 * Math.pow(Math.PI, 2) * Math.pow(semiMajorAxis, 3)))
    return Math.sqrt(gravitationalParameter/Math.pow(semiMajorAxis, 3))
  },

  meanAnomalyFromEccentricAnomalyAndEccentricity: function(eccentricAnomaly, eccentricity){
    return eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly)
  },

  meanAnomalyAtTimeAndMeanMotion: function(meanMotion, startTime, endTime, originalMeanAnomaly){
    var deltaT = endTime - startTime
    return originalMeanAnomaly + meanMotion * deltaT
  },

  estimateEccentricAnomalyFromMeanAnomalyAndEccentricity: function(meanAnomaly, eccentricity){
    var error = 100
    var eccentricAnomaly1 = meanAnomaly

    while(error > 0.00000000001){
      var newEccentricAnomaly = meanAnomaly + (eccentricity * Math.sin(eccentricAnomaly1))
      error = Math.abs(newEccentricAnomaly - eccentricAnomaly1)
      eccentricAnomaly1 = newEccentricAnomaly
    }
    return eccentricAnomaly1
  },

  trueAnomalyFromEccentricAnomalyAndEccentricity: function(eccentricAnomaly, eccentricity, meanAnomaly){
    // var factor1 = Math.sqrt(1.0 - Math.pow(eccentricity, 2)) * Math.sin(eccentricAnomaly)
    // var factor2 = 1 - eccentricity * Math.cos(eccentricAnomaly)

    // if(longitudeOfAscendingNodeInDegrees > 90 && longitudeOfAscendingNodeInDegrees <= 360){
    //   var inversion = Math.toRadians(360)
    // } else{
      // var inversion = 0
    // }

    var x = Math.sqrt(1 - eccentricity) * Math.cos(eccentricAnomaly/2)
    var y = Math.sqrt(1 + eccentricity) * Math.sin(eccentricAnomaly/2)

    return 2 * Math.atan2(y,x)

    // return Math.asin(factor1/factor2)
  },

  findSemiLatusRectum: function(semiMajorAxis, eccentricity){
    // var x = semiMajorAxis * (1 - Math.pow(eccentricity, 2))
    // console.log("semi latus rectum: " + x)

    var apoapsis = 320565.458678732
    var periapsis = 102454.341836878

    return (2 * apoapsis * periapsis ) / (apoapsis + periapsis)
    // return x
  },

  findPolarEquationOfConic: function(semiMajorAxis, eccentricity, trueAnomaly){
    var p = this.findSemiLatusRectum(semiMajorAxis, eccentricity)
    // console.log("p: " + p)
    // console.log("factor: " + (1 + eccentricity * Math.cos(trueAnomaly)))
    return p/(1 + eccentricity * Math.cos(trueAnomaly))
  },

  positionVectorInPQWFrame: function(semiMajorAxis, eccentricity, trueAnomaly){
    var r = this.findPolarEquationOfConic(semiMajorAxis, eccentricity, trueAnomaly)
    var vector = {}
    vector.p = r * Math.cos(trueAnomaly)
    vector.q = r * Math.sin(trueAnomaly)
    vector.w = 0
    // console.log("trueAnomaly: " + trueAnomaly)
    // console.log("r: " + r)
    // console.log(JSON.stringify(vector))
    return vector
  },

  velocityVectorInPQWFrame: function(semiMajorAxis, eccentricity, trueAnomaly, gravitationalParameter){
    var p = findSemiLatusRectum(semiMajorAxis, eccentricity)
    var factor = Math.sqrt(gravitationalParameter/p)
    var vector = {}
    vector.p = -Math.sin(trueAnomaly)
    vector.q = eccentricity + Math.cos(trueAnomaly)
    vector.w = 0
    return vector
  },

  transformVector: function(matrix, vector){
    var vectorKeys = Object.keys(vector)
    var newVector = {}
    //iterate through the rows of the matrix
    for (var i = 0; i < matrix.length; i++) {
      var row = matrix[i]
      var derivativeVector = vectorKeys[i]
      //iterate through the columns
      for (var j = 0; j < vectorKeys.length; j++) {
        var currentKey = vectorKeys[j]
        if(!newVector[derivativeVector]){ newVector[derivativeVector] = 0 }
        newVector[derivativeVector] += vector[currentKey] * row[j]
      }
    }
    return newVector
  },

  // Thank god for: https://en.wikipedia.org/wiki/Perifocal_coordinate_system
  transformPositionPQWVectorToIJKFrame: function(vector, inclination, longitudeOfAscendingNode, argumentOfPeriapsis){
    var vectorIJK = {}
    var omega = longitudeOfAscendingNode
    var w = argumentOfPeriapsis
    var i = inclination

    //Column, row order. First level is columns, each column has N rows
    var transformationMatrix = [
      [
        // 1 1
        Math.cos(omega) * Math.cos(w) - Math.sin(omega) * Math.sin(w) * Math.cos(i),
        // 1 2
        -Math.cos(omega) * Math.sin(w) - Math.sin(omega)* Math.cos(w) * Math.cos(i),
        // 1 2
        Math.sin(omega) * Math.sin(i)
      ],
      [
        // 2 1
        Math.sin(omega) * Math.cos(w) + Math.cos(omega) * Math.sin(w) * Math.cos(i),
        // 2 2
        -Math.sin(omega) * Math.sin(w) + Math.cos(omega) * Math.cos(w) * Math.cos(i),
        // 2 3
        -Math.cos(omega) * Math.sin(i),
      ],
      [
        // 3 1
        Math.sin(w) * Math.sin(i),
        // 3 2
        Math.cos(w) * Math.sin(i),
        // 3 3
        Math.cos(i)
      ]
    ]

    var transformedPQW = this.transformVector(transformationMatrix, vector)
    vectorIJK.i = transformedPQW.p
    vectorIJK.j = transformedPQW.q
    vectorIJK.k = transformedPQW.w

    return vectorIJK
  },

  findLatitudeOfPositionUnitVector: function(vector){
    var x = Math.sqrt(Math.pow(vector.i, 2) + Math.pow(vector.j, 2))
    var z = vector.k

    return Math.atan(z/x)
  },

  angularFrequencyOfBody: function(period){
    return (2 * Math.PI)/period
  },

  calculateGMSTInRadiansForOrigin: function(vector, longitude){
    var theta = Math.atan(vector.j/vector.i)
    return theta - longitude
  },

  findLongitudeOfPositonUnitVector: function(vector, angularVelocityOfPlanet, startTime, endTime, GMSTInRadians){
    var deltaT = endTime - startTime
    var quadrant = vector.j > 0 ? 1 : -1
    var theta = Math.atan(vector.j/vector.i)
    return theta - GMSTInRadians - (angularVelocityOfPlanet * deltaT)
  },

  TWR: function(thrust, totalMass, surfaceGravity){
    return (thrust)/(totalMass * surfaceGravity)
  },

  MaxTWR: function(maxAcceleration, surfaceGravity){
    return maxAcceleration/surfaceGravity
  },

  secondsToUseFuelAtCurrentThrust: function(massOfFuel, thrust, isp){
    if(thrust <= 0 || isp <= 0){ return -1}
    return (massOfFuel)/((thrust/isp) * (1/9.81))
  },

  // returns in tons
  weightOfFuelUsedDuringBurn: function(thrust, isp, deltaT){
    return (thrust/isp) * (1/9.81) * deltaT;
  },

  deltaVForBurn: function(thrust, startMass, endMass, deltaT){
    if(deltaT > 0 && startMass > endMass && startMass > 0 && endMass > 0){
      return thrust * deltaT / (startMass - endMass) * Math.log(startMass/endMass)
    } else {
      return 0.0
    }
  }
}
var CurrentStageBurnInfo = Class.create({
  initialize: function(datalink, atmoTableID, vacuumTableID){
    this.datalink = datalink
    this.atmoTableID = atmoTableID
    this.vacuumTableID = vacuumTableID

    this.atmoDataTable = new DataTable(this.atmoTableID, [])
    this.vacuumDataTable = new DataTable(this.vacuumTableID, [])

    this.currentStageAtmo = null
    this.currentStageVacuum = null
    this.currentBody = null
    this.initializeDatalink()
  },

  update: function(data){
    // don't do anything if we don't have any staging info
    if(!data['mj.stagingInfo']){return }

    //update the body as necessary
    if(this.currentBody == null || this.currentBody.name != data['v.body']){
      this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    }

    // Calculate the info for the current stage in Atmo
    if(data['mj.stagingInfo']["atmo"]){
      //The current stage is always the last stage
      this.currentStageAtmo = this.calculateStageInfo(
        data['mj.stagingInfo']['atmo'].last(), data
      )
    }

    // Calculate the info for the current stage in a Vaccuum
    if(data['mj.stagingInfo']["vacuum"]){
      //The current stage is always the last stage
      this.currentStageVacuum = this.calculateStageInfo(
        data['mj.stagingInfo']['vacuum'].last(), data
      )
    }

    // Now update the tables
    this.atmoDataTable.dataRows = this.dataRowsForStage(
      this.currentStageAtmo, data
    )

    this.vacuumDataTable.dataRows = this.dataRowsForStage(
      this.currentStageVacuum, data
    )

    this.atmoDataTable.update()
    this.vacuumDataTable.update()
  },

  subscribeToBodyData: function(data){
    this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    this.datalink.subscribeToData([
      'b.o.gravParameter[' + this.currentBody.id + ']'
    ])
  },

  calculateStageInfo: function(stage, data){
    stage["currentThrust"] = stage["startThrust"] * data['f.throttle']
    stage["currentTWR"] = OrbitalMath.TWR(stage["currentThrust"],
      stage["startMass"], this.currentBody.surfaceGravity
    )

    stage["timeUntilEmpty"] = OrbitalMath.secondsToUseFuelAtCurrentThrust(
      stage["resourceMass"], stage["currentThrust"], stage["isp"]
    )

    return stage
  },

  dataRowsForStage: function(stage, data){
    var timeUntilEmpty = stage["timeUntilEmpty"] <= 0 ? "NA" : DataFormatters.timeString(stage["timeUntilEmpty"])
    return [
      {
        label: "Current Thrust",
        value: DataFormatters.newtonsString(stage["currentThrust"]) + " (" + DataFormatters.percentageString(data['f.throttle']) + ")"
      },
      {
        label: "TWR",
        value: DataFormatters.plainNumberString(stage["currentTWR"])
      },
      {
        label: "Remaining Fuel",
        value: DataFormatters.tonnageString(stage["resourceMass"])
      },
      {
        label: "Time until empty",
        value: timeUntilEmpty
      }
    ]
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['mj.stagingInfo', 'f.throttle', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})
var StagingInfoTable = Class.create({
  initialize: function(datalink, stagingInfoTableID){
    this.datalink = datalink
    this.stagingInfoTableID = stagingInfoTableID

    this.stagingInfoTable = $(this.stagingInfoTableID)
    this.stagingInfoTableHeader = null
    this.stagingInfoTableBody = null

    this.currentBody = null

    this.initializeTable()
    this.initializeDatalink()
  },

  update: function(data){
    if(!data['mj.stagingInfo']){
      this.stagingInfoTableBody.update("")
      return
    }

    //update the body as necessary
    if(this.currentBody == null || this.currentBody.name != data['v.body']){
      this.currentBody = this.datalink.getOrbitalBodyInfo(data['v.body'])
    }

    var stagingInfo = data['mj.stagingInfo']
    var stages = stagingInfo['atmo'].length
    if(stages <= 0){ return }

    var documentFragment = document.createDocumentFragment()
    for (var i = 0; i < stages; i++) {
      var stageAtmo = stagingInfo["atmo"][i]
      var stageVacuum = stagingInfo["vacuum"][i]

      var row = document.createElement("tr")

      var thrust = Math.min(stageAtmo["startThrust"],
        stageVacuum["startThrust"]
      )

      var TWR = OrbitalMath.TWR(thrust, stageAtmo["startMass"],
        this.currentBody.surfaceGravity
      )

      if(isNaN(TWR)){ TWR = 0.00 }

      var maxAccel = Math.min(stageAtmo["maxAccel"],stageVacuum["maxAccel"])

      var MaxTWR = OrbitalMath.MaxTWR(maxAccel,
        this.currentBody.surfaceGravity
      )

      if(isNaN(MaxTWR)){ MaxTWR = 0.00 }

      var ISP = Math.min(stageAtmo["isp"],stageVacuum["isp"])

      var atmoDeltaV = stageAtmo["deltaV"]
      var vacuumDeltaV = stageVacuum["deltaV"]

      var time = Math.min(stageAtmo["deltaTime"],stageVacuum["deltaTime"])

      this.addColumnToRow(row, i) //stage
      //start mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["startMass"]))
      //end mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["endMass"]))

      //staged mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["stagedMass"]))

      //burned mass
      this.addColumnToRow(row, DataFormatters.tonnageString(stageAtmo["resourceMass"]))

      //TWR
      this.addColumnToRow(row, DataFormatters.plainNumberString(TWR))

      //Max TWR
      this.addColumnToRow(row, DataFormatters.plainNumberString(MaxTWR))

      //ISP
      this.addColumnToRow(row, DataFormatters.plainNumberString(ISP))

      //atmo delta v
      this.addColumnToRow(row, DataFormatters.velocityString(atmoDeltaV))

      //vacuum delta v
      this.addColumnToRow(row, DataFormatters.velocityString(vacuumDeltaV))

      // time
      this.addColumnToRow(row, DataFormatters.timeString(time))

      documentFragment.appendChild(row)
    }

    window.requestAnimationFrame(function(){
      this.stagingInfoTableBody.innerHTML = ""
      this.stagingInfoTableBody.appendChild(documentFragment)
    }.bind(this))
  },

  addColumnToRow: function(row, columnValue){
    row.appendChild(document.createElement("td").update(columnValue))
  },

  initializeTable: function(){
    var documentFragment = document.createDocumentFragment()
    this.stagingInfoTableHeader = document.createElement("thead")
    var headerRow = this.stagingInfoTableHeader.appendChild(document.createElement("tr"))

    var columns = ["Stage", "Start Mass", "End Mass", "Staged Mass",
      "Burned Mass", "TWR", "Max TWR", "ISP", "Atmo &Delta;V", "Vac &Delta;V",
      "Time"
    ]

    for (var i = 0; i < columns.length; i++) {
      var name = columns[i]
      var element = document.createElement("th")
      element.update(name)
      headerRow.appendChild(element)
    };

    this.stagingInfoTableBody = document.createElement("tbody")

    documentFragment.appendChild(this.stagingInfoTableHeader)
    documentFragment.appendChild(this.stagingInfoTableBody)

    this.stagingInfoTable.appendChild(documentFragment)
  },

  initializeDatalink: function(){
    this.datalink.subscribeToData(['mj.stagingInfo', 'v.body'])

    this.datalink.addReceiverFunction(this.update.bind(this))
  },
})