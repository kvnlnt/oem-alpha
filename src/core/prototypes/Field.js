/**
 * Field Prototype
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 */

(function(CORE, PROTOTYPE, COMPONENT, VALIDATOR, UTIL, EL) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Field"
    });

    // DEFAULTS

    Prototype.form = null;
    Prototype.value = null;

    Prototype.setupField = function(){
        this.form = this.getEl().dataset.oemForm;
        oem.read(this.form).addField(this);
    };

    // GETTERS
    
    Prototype.getName = function(){
        return this.getField().name;
    };

    Prototype.getLabel = function(){
        return this.getEl().querySelector("label");
    }

    Prototype.getValue = function() {
        return this.value;
    };

    // SETTERS

    Prototype.setValue = function(value) {
        this.value = value;
        return this;
    };

    // TODO
    Prototype.reset = function(){};

    CORE.Prototypes.Field = Prototype;
    return CORE;

})(
    oem.Core,
    oem.Core.Modules.Prototype,
    oem.Core.Prototypes.Component,
    oem.Core.Modules.Validator,
    oem.Core.Modules.Util,
    oem.Core.Modules.El
);