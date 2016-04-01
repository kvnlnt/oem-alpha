/**
 * Get a more meaningful typeof
 * @param {any} obj any value
 * @return {string} string value of object
 * @example
 * toType({a: 4}); //"object"
 * toType([1, 2, 3]); //"array"
 * (function() {console.log(toType(arguments))})(); //arguments
 * toType(new ReferenceError); //"error"
 * toType(new Date); //"date"
 * toType(/a-z/); //"regexp"
 * toType(Math); //"math"
 * toType(JSON); //"json"
 * toType(new Number(4)); //"number"
 * toType(new String("abc")); //"string"
 * toType(new Boolean(true)); //"boolean"
 */

ToolhouseUI.Core = (function(Core){

    function Type(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

    Core.Type = Type;
    return Core;

})(ToolhouseUI.Core || {});
