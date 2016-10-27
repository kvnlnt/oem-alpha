(function(CORE) {

    // Module
    var Util = {};

    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     *
     * @method     debounce
     * @param      {<type>}  func       { description }
     * @param      {<type>}  wait       { description }
     * @param      {<type>}  immediate  { description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    Util.debounce = function Debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * Implements "soft" mixin pattern by grafting an object onto another object
     * @param  {object} destination - object to graft onto
     * @param  {object} source      - object to graft from
     * @return {object}             - grafted destination
     */
    Util.mixin = function Extend(destination, source) {
        for (var k in source) {
            // append attr value if already exists in destination
            if (destination.hasOwnProperty(k)) {
                destination[k] = destination[k] + source[k];
            } else {
                destination[k] = source[k];
            }
        }
        return destination;
    };

    /**
     * Parses a json-esque string to an object
     * @param  {[type]} str turns this => "len:6, val:'test'" to this => {len: 6, val:"test"}
     * @return {[type]}     [description]
     */
    Util.parseStringToObject = function(str){
        var keyVals = {};
        if(str){
            str.split(",").forEach(function(keyVal){
                var keyVal = keyVal.split(":");
                keyVals[keyVal[0]] = Util.typeCast(keyVal[1]);
            });
        } 
        return keyVals;
    };

    /**
     * Generates a GUID string.
     * @returns {String} The generated GUID.
     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
     * @author Slavik Meltser (slavik@meltser.info).
     * @link http://slavik.meltser.info/?p=142
     */
    Util.guid = function() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * Convert array like object to array
     * @param  {object} arrayLikeObject 
     * @return {array}
     */
    Util.arrayFrom = function(arrayLikeObject) {
        var ary = [];
        for (var i = 0; i < arrayLikeObject.length; i++) {
            ary.push(arrayLikeObject[i]);
        }
        return ary;
    };

    /**
     * Get URL variables
     */
    Util.getUrlVars = function(urlVars) {
        var urlVars = urlVars || window.location.href;
        var vars = {};
        var search = function(m, key, value) { vars[key] = Util.typeCast(value); };
        var parts = urlVars.replace(/[?&]+([^=&]+)=([^&]*)/gi, search);
        return vars;
    };

    /**
     * Automatically cast string to proper javascript data type
     * // TODO add other type checking, for now we only translate strings, numbers and floats
     * @return {[type]} [description]
     */
    Util.typeCast = function(str){

        // is it an integer?
        if(parseInt(str) == str) return parseInt(str);

        // is it a float?
        if(parseFloat(str) == str) return parseFloat(str);

        // guess it's just a string
        return str;
    };

    CORE.Util = Util;
    return CORE;

})(oem.Core);