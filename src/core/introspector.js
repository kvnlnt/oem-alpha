// ToolhouseUI.Core = (function(Core) {

//     Core.Introspect = {
//         getFuncArgs: function(func) {
//             var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
//             var ARGUMENT_NAMES = /([^\s,]+)/g;
//             var funStr = func.toString().replace(STRIP_COMMENTS, '');
//             var result = funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(ARGUMENT_NAMES);
//             if (result === null)
//                 result = [];
//             return result;
//         },
//         getFuncFuncs: function(func) {
//             var methods = {};
//             var methodNames = Object.getOwnPropertyNames(func.prototype);
//             for (var i = 0; i < methodNames.length; i++) {
//                 var method = methodNames[i];
//                 methods[method] = this.getParamNames(func.prototype[method]);
//             }
//             return methods;
//         },
//         getObjectProps: function(obj) {
//             var props = Object.getOwnPropertyNames(obj).filter(function(prop) {
//                 return typeof obj[prop] != "function";
//             });
//             return props.map(function(prop) {
//                 return {
//                     prop: prop,
//                     type: Core.Util.type(obj[prop])
//                 }
//             });
//         },
//         getObjectFuncs: function(obj) {
//             var funcs = Object.getOwnPropertyNames(obj).filter(function(prop) {
//                 return typeof obj[prop] == "function";
//             });
//             return funcs.map(function(func) {
//                 return {
//                     func: func,
//                     args: Core.Reflector.getFuncArgs(obj[func])
//                 }
//             });
//         }
//     };

//     return Core;

// })(ToolhouseUI.Core || {});