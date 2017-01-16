(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Hamburger"
    });

    Prototype.init = function(){
        this._isActive = false;
        this.getEl().addEventListener('click', this.handleClick.bind(this));
    };

    Prototype.activate = function(){
        this.setIsActive(true).getEl().classList.add('--active');
        return this;
    };

    Prototype.deactivate = function(){
        this.setIsActive(false).getEl().classList.remove('--active');
        return this;
    };

    Prototype.handleClick = function(){
        this.toggle();
        return this;
    };

    Prototype.isActive = function(){
        return this._isActive;
    };

    Prototype.setIsActive = function(isActive) {
        this._isActive = isActive;
        return this;
    };

    Prototype.toggle = function(){
        if(this.isActive()){
            this.deactivate();
        } else {
            this.activate();
        }
        return this;
    };

    COMPONENTS.Hamburger.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);