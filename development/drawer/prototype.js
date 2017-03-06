(function(COMPONENTS, COMPONENT, EL, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Drawer"
    });

    Prototype.CLOSE_BUTTON_MODE = {
        ALWAYS: "--close-btn-always",
        ONLY_FULLSCREEN: "--close-btn-only-fullscreen",
        NEVER: "--close-btn-never"
    };

    Prototype.init = function(){
        this._isOpen = false;
        this.fullScreenAt = parseInt(this.getEl().dataset.oemFullScreenAt) || 0;
        this.closeBtn = this.createCloseBtn();
        this.closeBtnMode = this.getEl().dataset.oemCloseButtonMode || 'ALWAYS';
        this.getEl().classList.add(Prototype.CLOSE_BUTTON_MODE[this.closeBtnMode]);

        // add button to dom
        this.getEl().appendChild(this.closeBtn);

        // register vents
        var events = {};
        events.opened = this.getId() + ":opened";
        events.closed = this.getId() + ":closed";
        this.setEvents(events);

        oem.events.addEventListener(oem.EVENTS.WINDOW_RESIZED, this.manageFullScreen.bind(this));
        this.closeBtn.addEventListener("click", this.close.bind(this));

        return this;
    };

    Prototype.close = function(){
        this.setIsOpen(false);
        this.getEl().classList.remove('--open');
        oem.events.dispatch(this.getEvents().closed, this);
        return this;
    };

    Prototype.createCloseBtn = function(){
        var btn = EL("button", {"class":"__closeBtn"}, EL("span"));
        return btn;
    };

    Prototype.getFullScreenAt = function(){
        return this.fullScreenAt;
    };

    Prototype.manageFullScreen = function(){
        var isFullScreen = window.innerWidth <= this.getFullScreenAt();
        if(isFullScreen) {
             this.getEl().classList.add('--fullscreen');
        } else {
             this.getEl().classList.remove('--fullscreen');
        }
        return this;
    };

    Prototype.isFullScreen = function(){
        return this.getEl().classList.contains('--fullscreen');
    };

    Prototype.isOpen = function(){
        return this._isOpen;
    };

    Prototype.open = function(){
        this.setIsOpen(true);
        this.manageFullScreen();
        this.getEl().classList.add('--open');
        oem.events.dispatch(this.getEvents().opened, this);
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

})(oem.Components, oem.Core.Component, oem.Core.El, oem.Core.Prototype);