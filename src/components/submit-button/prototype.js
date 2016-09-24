(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "SubmitButton"
    });

    // DEFAULTS 

    Prototype.form = null;

    // INIT

    Prototype.init = function(){
         this.form = this.getEl().dataset.oemForm;
         this.getEl().addEventListener('click', this.handleClick.bind(this));
    };

    // GETTERS
 
    Prototype.getForm = function(){
         return this.form;
    };

    // SETTERS

    Prototype.setForm = function(form){
        return this.form;
    };

    // METHODS
    
    Prototype.handleClick = function(e){
        e.preventDefault();
        oem.read(this.form).submit();
    };
    
    // EXPORTS
    // 
    COMPONENTS.SubmitButton.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components, 
    oem.Core.Prototypes.Component, 
    oem.Core.Modules.Prototype);