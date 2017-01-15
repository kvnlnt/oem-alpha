(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Drawer"
    });

    Prototype.init = function(){
        this._isOpen = false;
        this.fullScreenAt = parseInt(this.getEl().dataset.oemFullScreenAt) || 0;

        var events = {};
        events.opened = this.getId() + ":opened";
        events.closed = this.getId() + ":closed";
        this.setEvents(events);

        oem.events.addEventListener(oem.EVENTS.WINDOW_RESIZED, this.manageFullScreen.bind(this));

        return this;
    };

    Prototype.close = function(){
        this.getEl().classList.remove('--open');
        oem.events.dispatch(this.getEvents().closed, this);
        this.setIsOpen(false);
        return this;
    };

    Prototype.getFullScreenAt = function(){
        return this.fullScreenAt;
    };

    Prototype.manageFullScreen = function(){
        var isFullScreen = window.innerWidth <= this.getFullScreenAt();
        if(isFullScreen) {
             this.getEl().classList.add('--fullscreen')
        } else {
             this.getEl().classList.remove('--fullscreen')
        }
        return this;
    };

    Prototype.isOpen = function(){
        return this._isOpen;
    };

    Prototype.open = function(){
        this.manageFullScreen();
        this.getEl().classList.add('--open');
        oem.events.dispatch(this.getEvents().opened, this);
        this.setIsOpen(true);
        return this;
    };

    Prototype.setFullScreenAt = function(fullscreenAt){
        this.fullScreenAt = fullScreenAt;
        return this;
    };

    Prototype.setIsOpen = function(isOpen){
        this._isOpen = isOpen;
        return this;
    };

    Prototype.toggle = function(){
        this.isOpen() ? this.close() : this.open();
        return this;
    };

    COMPONENTS.Drawer.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);