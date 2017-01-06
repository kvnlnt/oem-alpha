(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Dialog"
    });

    Prototype.init = function(){
        this.width = this.getEl().dataset.oemWidth;
        this.height = this.getEl().dataset.oemHeight;
        this.contentEl = this.getEl().querySelectorAll('.__content')[0];
        this.backdropEl = this.getEl().querySelectorAll('.__backdrop')[0];
        this.backdropEl.addEventListener('click', this.handleBackdropClick.bind(this));
        this.positionContentWindow();
    };

    Prototype.getBackdropEl = function(){
        return this.backdropEl;
    };

    Prototype.close = function(){
        this.getEl().classList.remove('--showing');
    };

    Prototype.getContentEl = function(){
        return this.contentEl;
    };

    Prototype.getWidth = function(){
        return this.width;
    };

    Prototype.getHeight = function(){
        return this.height;
    };

    Prototype.handleBackdropClick = function(e){
        e.preventDefault();
        this.close();
    };

    Prototype.open = function(){
        this.positionContentWindow();
        this.getEl().classList.add('--showing');
    };

    Prototype.positionContentWindow = function(){
        this.getContentEl().style.width = this.getWidth();
        this.getContentEl().style.height = this.getHeight();
        return this;
    };

    COMPONENTS.Dialog.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);