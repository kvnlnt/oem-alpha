/**
 * Field Prototype
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 *
 * Implementation details:
 * Components looking to prototype this must: 
 * 1) Call the setupField method
 * 2) implement a "getField" method
 * 3) explicitly manage the field's value using setValue
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
        if(oem.read(this.form)) oem.read(this.form).addField(this);
        this.setEvents({
            changed: this.getId() + ":changed"
        });
    };

    // GETTERS
    
    Prototype.getForm = function(){
        return this.form;
    };
    
    Prototype.getLabel = function(){
        return this.getEl().querySelector("label");
    }

    Prototype.getName = function(){
        return this.getField().name;
    };

    Prototype.getValue = function() {
        return this.value;
    };

    // SETTERS

    Prototype.setForm = function(form){
        this.form = form;
        return this;
    };

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