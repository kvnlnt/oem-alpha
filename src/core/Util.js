oem.Core = (function(Core){

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
     * Generates a GUID string.
     * @returns {String} The generated GUID.
     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
     * @author Slavik Meltser (slavik@meltser.info).
     * @link http://slavik.meltser.info/?p=142
     */
    Util.guid = function() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    Core.Util = Util;
    return Core;

})(oem.Core || {});