(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Spinner"
    });

    Prototype.init = function(){
        this.target = this.getEl().dataset.oemTarget
        this.targetDisplay = this.getEl().style.display;
        this.showOnLoad = this.getEl().dataset.oemShowOnLoad === "true";
        this._isShowing = this.showOnLoad;
        this.spinnerEl = this.getEl().querySelector('.__spinner');
        if(this.showOnLoad) this.show();
        oem.events.addEventListener(oem.EVENTS.WINDOW_RESIZED, this.autoSizeAndPosition.bind(this));
    };

    Prototype.autoSizeAndPosition = function(){
        var targetRect = this.getTargetEl().getBoundingClientRect();
        this.getEl().style.top = targetRect.top + window.scrollY + 'px';
        this.getEl().style.left = targetRect.left + window.scrollX + 'px';
        this.getEl().style.width = targetRect.width + 'px';
        this.getEl().style.height = targetRect.height + 'px';
    };

    Prototype.getSpinnerEl = function(){
        return this.spinnerEl;
    };

    Prototype.getTarget = function(){
        return this.target;
    };

    Prototype.getTargetDisplay = function(){
        return this.targetDisplay;
    };

    Prototype.getTargetEl = function(){
        var target = this.getTarget();
        var component = oem.read(target);
        if(component){
            return component.getEl();
        } else {
            // if we didn't find it, it should at least be a valid DOM id
            return document.getElementById(target);
        }
    };

    Prototype.hide = function(){
        this.setIsShowing(false);
        this.getEl().style.display = 'none';

    };

    Prototype.isShowing = function(){
        return this._isShowing;
    };

    Prototype.setMessage = function(message){
        this.getEl().querySelector('.__message').innerText = message;
    };

    Prototype.setIsShowing = function(isShowing){
        this._isShowing = isShowing;
        return this;
    };

    Prototype.show = function(message) {
        this.setIsShowing(true).autoSizeAndPosition(); 
        this.getEl().style.display = 'table';
    };

    COMPONENTS.Spinner.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);