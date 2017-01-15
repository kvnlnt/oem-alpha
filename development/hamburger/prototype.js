(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Hamburger"
    });

    Prototype.init = function(){
        this.getEl().addEventListener('click', this.toggle.bind(this));
    };

    Prototype.toggle = function(){
        if(this.getEl().classList.contains('--active')){
            this.getEl().classList.remove('--active');
        } else {
            this.getEl().classList.add('--active');
        }
    };

    COMPONENTS.Hamburger.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);