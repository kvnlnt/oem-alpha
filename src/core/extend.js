ToolhouseUI.Core = (function(Core){

    /**
     * Implements mixin pattern by grafting an object onto another object
     * @param  {object} destination - object to graft onto
     * @param  {object} source      - object to graft from
     * @return {object}             - grafted destination
     */
    function Extend(destination, source) {
        for (var k in source) {
            // append attr value if already exists in destination
            if (destination.hasOwnProperty(k)) {
                destination[k] = destination[k] + source[k];
            } else {
                destination[k] = source[k];
            }
        }
        return destination;
    }

    Core.Extend = Extend;
    return Core;

})(ToolhouseUI.Core || {});